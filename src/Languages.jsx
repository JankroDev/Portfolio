import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import {
  Android,
  Babel,
  Bootstrap,
  CSharp,
  Git,
  Java,
  JQuery,
  Kotlin,
  MySQL,
  Python,
  ReactImage,
  SQL,
  TypeScript,
  Web,
  XML,
} from "./data/ImageHolder";
import "./App.css";

export function Languages() {
  
  const productionLanguages = [
    {
      name: "React",
      source: ReactImage,
    },
    {
      name: "Web",
      source: Web,
    },
    {
      name: "JQuery",
      source: JQuery,
    },
    {
      name: "SQL",
      source: SQL,
    },
    {
      name: "Git",
      source: Git,
    },
    {
      name: "B/S",
      source: Bootstrap,
    },
    {
      name: "C#",
      source: CSharp,
    },
    {
      name: "Java",
      source: Java,
    },
    {
      name: "Python",
      source: Python,
    },
    {
      name: "XML",
      source: XML,
    },
    
  ];

  const projectLanguages = [
    {
      name: "Kotlin",
      source: Kotlin,
    },
    {
      name: "Type Script",
      source: TypeScript,
    },
    {
      name: "Android",
      source: Android,
    },
    {
      name: "MySQL",
      source: MySQL,
    },
    {
      name: "Babel",
      source: Babel,
    },
  ];

  const productionLanguageViews = productionLanguages.map((language) => {
    return (
      <Card className="languageCard">
        <Card.Img className="languageCardImage" src={language.source}></Card.Img>
        <Card.Text className="languageCardName" >{language.name}</Card.Text>
      </Card>
    );
  });

  const projectLanguageViews = projectLanguages.map((language) => {
    return (
      <Card className="languageCard">
        <Card.Img className="languageCardImage" src={language.source}></Card.Img>
        <Card.Text className="languageCardName" >{language.name}</Card.Text>
      </Card>
    );
  });

  return (
  <div>
    <div className="divider">
    <label className="dividerTextProduction">In Production Technologies Used</label>
    </div>
    <div className="languageCardWrapper">{productionLanguageViews}</div>
    <div className="divider">
    <label className="dividerTextProjects">Self projects completed in</label>
    </div>
    <div className="languageCardWrapper">{projectLanguageViews}</div>
  </div>
  
  );
}
