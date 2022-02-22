import React from "react";
import { Languages } from "./Languages";
import { Projects } from "./Projects";

export function SplashPage() {
  return (
    <div className="sideSpace">
      <Projects />
      <Languages />
    </div>
  );
}
