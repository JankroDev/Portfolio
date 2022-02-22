import React from 'react'
import BackArrowImage from "./images/buttonresources/backarrow.png"
import { useNavigate } from "react-router-dom";
import { Card } from 'react-bootstrap';
import {
  CSharp,
  Git,
  JQuery,
  SQL,
  Web,
  XML,
} from "./data/ImageHolder";


export function ACIOEMProject() {

  let navigate = useNavigate();

  const productionLanguages = [
    
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
      name: "C#",
      source: CSharp,
    },
    
    {
      name: "XML",
      source: XML,
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

  const imageHolder = {
    maxWidth: "90vw",
    display: "block",
    paddingTop: "30px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const backClickHandler = () => {
    navigate("/");
  }

  return (
    <div className="sideSpace">
      <input type="image" className="backButton" src={BackArrowImage} onClick={backClickHandler}></input>
      <div className="divider">
        <label className="dividerTextProduction">
          TL:DR (More Technical info below)
        </label>
      </div>
      <Card>
        <Card.Header>
          <Card.Text style={{ fontSize: "20px" }}>
            Due to an NDA (Non-Disclosure) I will share what I can about the Site. ACI Needed a single place all 
            of their sales team could go to have more uniform profit margins as well as updated costs available from
            anywhere. The site pulls from various databases, last sales, and profit margins. The user can search various 
            fields (ie. part#'s, assembly numbers, orders, and so on). 
          </Card.Text>
        </Card.Header>
      </Card>
      <div className="divider">
        <label className="dividerTextProduction">The in's and out's</label>
      </div>
      <Card style={{paddingBottom:'5vh', marginTop: '5vh' }}>
        <Card.Header style={{fontWeight:"bold" , fontSize: '20px'}}>The Problem</Card.Header>
        <Card.Text style={{padding:"20px"}}>
          The sales team would reference various excel files with outdated costs to formulate quotes for customers.
          Only a couple members of the sales team new the files well enough to operate them and this would lead to discord
          among the sales team, skewed cost data, and wildly changing profit margins. The owner of ACI wanted this corrected, as 
          the time to generate a quote was too long, and the end quote would vary from salesman to salesman.
        </Card.Text>
        <Card.Header style={{fontWeight:"bold", fontSize: '20px'}}>The Solution</Card.Header>
        <Card.Text style={{padding:"20px"}}>
         SOLUTION HERE 
        </Card.Text>
        <Card.Header style={{textAlign:"center"}}>
          <a href='https://aciservices.com/' target='_blank'> ACI Services Website</a>
        </Card.Header>
      </Card>
      <div className="divider">
      <label className="dividerTextProduction">Languages used in this project</label>
      </div>
      <div className="languageCardWrapper">{productionLanguageViews}</div>
    </div>
  );
}
