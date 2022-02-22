import React from "react";
import { AboutMe } from "./AboutMe";
import { ContactMe } from "./ContactMe";
import { Languages } from "./Languages";
import { Projects } from "./Projects";

export function SplashPage() {
  return (
    <div className="sideSpace" >
      <AboutMe/>
      <Projects />
      <Languages />
      <ContactMe/>
    </div>
    
  );
}
