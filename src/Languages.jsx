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
  JSON,
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
      name: "Java Script, HTML, CSS",
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
      name: "Bootstrap",
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
    {
      name: "JSON",
      source: JSON,
    },
  ];

  const projectLanguages = [
    {
      name: "Kotlin",
      source: { Kotlin },
    },
    {
      name: "TypeScript",
      source: { TypeScript },
    },
    {
      name: "Android",
      source: { Android },
    },
    {
      name: "MySQL",
      source: { MySQL },
    },
    {
      name: "Babel",
      source: { Babel },
    },
  ];

  const productionLanguageViews = productionLanguages.map((language) => {
    return (
      <Card className="languageCard">
        <Card.Img src={language.source}></Card.Img>
      </Card>
    );
  });
  return <div className="languageCardWrapper">{productionLanguageViews}</div>;
}
