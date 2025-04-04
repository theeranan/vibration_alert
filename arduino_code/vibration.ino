#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define sensor_pin A0

// กำหนดชื่อ WiFi และรหัสผ่าน
const char* ssid = "your_wifi_name";
const char* password = "your_wifi_password";
const char* mqtt_server = "your_mqtt_broker_ip";
// const char* mqtt_server = "broker.hivemq.com"; // Public MQTT broker

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  // if ((char)payload[0] == '1') {
  //   digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
  //   // but actually the LED is on; this is because
  //   // it is active low on the ESP-01)
  // } else {
  //   digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  // }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void setup() {
  Serial.begin(115200);
  delay(100);

  // เริ่มเชื่อมต่อ WiFi
  WiFi.begin(ssid, password);
  Serial.print("กำลังเชื่อมต่อ WiFi");

  // รอจนกว่าจะเชื่อมต่อสำเร็จ
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // แสดง IP Address ที่ได้รับ
  Serial.println("");
  Serial.println("เชื่อมต่อ WiFi สำเร็จ");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());


  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();


  // if (now - lastMsg > 2000) {
  int sensorValue = analogRead(sensor_pin);
  String strvalue = String(sensorValue);
  lastMsg = now;
  Serial.print("Vibration : ");
  Serial.println(strvalue);
  client.publish("sensor/value", strvalue.c_str());
  // }
  delay(500);

  // put your main code here, to run repeatedly:
  //
  // Serial.println(value);
  // delay(500);
}
