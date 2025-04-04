"use client";
import React, { useState, useEffect } from "react";
import { client, MQTT_TOPIC } from "../mqtt";

export default function GaugeMeter() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    client.on("message", (topic, message) => {
      if (topic === MQTT_TOPIC) {
        setValue(parseInt(message.toString()));
      }
    });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>มาตรวัดแรงสั่นสะเทือน</h3>
      <svg width="200" height="120" viewBox="0 0 200 100">
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#ccc"
          strokeWidth="10"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="blue"
          strokeWidth="10"
          strokeDasharray="600"
          strokeDashoffset={600 - value}
          transform="rotate(-90 100 100)"
        />
        <text x="100" y="110" fontSize="24" textAnchor="middle">
          {value}
        </text>
      </svg>
    </div>
  );
}
