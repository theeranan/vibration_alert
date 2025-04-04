## 📊 Sensor Dashboard with MQTT + Next.js + Recharts

Dashboard แบบเรียลไทม์สำหรับแสดงค่า sensor (เช่น แรงสั่นสะเทือน, อุณหภูมิ ฯลฯ) ที่ส่งผ่าน MQTT และแสดงผลบนกราฟ `Recharts` ด้วย `Next.js`

---

## 🚀 Features

- เชื่อมต่อ MQTT ผ่าน WebSocket (`mqtt.js`)
- แสดงกราฟเรียลไทม์ด้วย Recharts
- รองรับ `.env` สำหรับตั้งค่า URL ของ MQTT
- รองรับ Mosquitto MQTT Broker ผ่าน Docker Compose

---

## 📦 Installation

1. **Clone โปรเจกต์**
   ```bash
   git clone https://github.com/theeranan008/vibration-dashboard.git
   cd vibration-dashboard
   ```

2. **ติดตั้ง Dependencies**
   ```bash
   npm install
   ```

3. **สร้างไฟล์ `.env.local`**
   ```env
   NEXT_PUBLIC_MQTT_BROKER_URL=ws://localhost:9001
   ```

   > 💡 ถ้าใช้ MQTT บน Server จริง ให้เปลี่ยน `localhost` เป็น IP หรือ domain ของ Broker เช่น:
   > `ws://192.168.1.100:9001`

---

## 🐳 MQTT Docker (Mosquitto)

1. **สร้าง `docker-compose.yml`**
   ```yaml
   version: "3"
   services:
     mosquitto:
       image: eclipse-mosquitto:2
       container_name: mqtt-broker
       ports:
         - "1883:1883"
         - "9001:9001"
       volumes:
         - ./mosquitto/config:/mosquitto/config
         - ./mosquitto/data:/mosquitto/data
         - ./mosquitto/log:/mosquitto/log
   ```

2. **สร้างไฟล์ config สำหรับ WebSocket**
   📌 `mosquitto/config/mosquitto.conf`
   ```conf
   listener 1883
   protocol mqtt

   listener 9001
   protocol websockets

   allow_anonymous true
   ```

3. **รัน MQTT Broker**
   ```bash
   docker-compose up -d
   ```

---

## 🧪 ทดสอบ MQTT

**Publish message**
```bash
mosquitto_pub -h localhost -p 1883 -t sensor/value -m 123
```

**Subscribe (ลองรับค่าจาก sensor)**
```bash
mosquitto_sub -h localhost -p 1883 -t sensor/value
```

---

## 🔤 Run Next.js App

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000` เพื่อดูกราฟเรียลไทม์

---

## 📂 โครงสร้างโปรเจกต์

```bash
.
├── mqtt.js                # เชื่อมต่อ MQTT
├── components/
│   └── LineChart.tsx     # กราฟ sensor
├── pages/
│   └── index.tsx         # Home page
├── .env.local            # MQTT WebSocket URL
├── docker-compose.yml    # MQTT Broker setup
└── mosquitto/
    └── config/
        └── mosquitto.conf
```

---

## 🛠 Tech Stack

- **Next.js 14** (App Router หรือ Pages ได้หมด)
- **MQTT.js**
- **Recharts**
- **Docker + Mosquitto**

---

## 🦮 ขอบคุณที่ใช้งาน

ถ้าคุณชอบโปรเจกต์นี้ อย่าลืมกด ⭐ หรือ fork ไปต่อยอดนะครับ 😄  
สำหรับคำถามเพิ่มเติมสามารถเปิด Issue หรือถามใน Git ได้เลยครับ

