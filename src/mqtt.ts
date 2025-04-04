import mqtt from "mqtt";

const MQTT_BROKER =
  process.env.NEXT_PUBLIC_MQTT_BROKER_URL || "ws://localhost:9001"; // เปลี่ยนเป็น IP Broker ของคุณ
const MQTT_TOPIC = "sensor/value";

const client = mqtt.connect(MQTT_BROKER);

export { client, MQTT_TOPIC };
