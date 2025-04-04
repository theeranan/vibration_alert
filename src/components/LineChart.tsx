"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { client, MQTT_TOPIC } from "../mqtt";
import React from "react";

export default function SensorLineChart() {
  const [data, setData] = useState<{ time: string; value: number }[]>([]);
  const [ready, setReady] = useState(false); // 👈 ใช้ flag ป้องกัน SSR

  useEffect(() => {
    setReady(true); // render เมื่อ client เท่านั้น

    client.on("connect", () => {
      console.log("Connected to MQTT");
      client.subscribe(MQTT_TOPIC);
    });

    client.on("message", (topic, message) => {
      if (topic === MQTT_TOPIC) {
        const value = parseInt(message.toString());
        setData((prevData) => [
          ...prevData.slice(-20),
          {
            time: new Date().toLocaleTimeString(), // ✅ render ฝั่ง client เท่านั้น
            value,
          },
        ]);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  if (!ready) return null; // ❗ ป้องกัน render SSR

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}
