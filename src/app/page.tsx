import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import GaugeMeter from "../components/GaugeMeter";
import SensorLineChart from "../components/LineChart";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>MQTT Sensor Dashboard</h1>
      <GaugeMeter />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SensorLineChart />
      </div>
    </div>
  );
}
