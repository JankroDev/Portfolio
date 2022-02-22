import React from "react";
import { Languages } from "./Languages";
import { Projects } from "./Projects";

export function SplashPage() {
  return (
    <div style={{ paddingLeft: "5vh", paddingRight: "5vh" }}>
      <Projects />
      <Languages />
    </div>
  );
}
