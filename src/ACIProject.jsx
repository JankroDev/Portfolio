import React from 'react'
import TagImageOne from './images/project-images/Tag Printer 1.PNG';
import TagImageTwo from './images/project-images/Tag Printer 2.PNG';
import TagImageThree from './images/project-images/Tag Printer 3.PNG';
import BackArrowImage from "./images/buttonresources/backarrow.png"
import { useNavigate } from "react-router-dom";
import {Card} from 'react-bootstrap';
import {
  Git,
  Java,
  JQuery,
  SQL,
  Web,
  XML,
} from "./data/ImageHolder";


export function ACIProject() {
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
      name: "Java",
      source: Java,
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
            ACI Services uses a Laser Etching Printer to label their completed compressors. This Program would
            allow their techs to add any new labels to their existing database of labels by dragging new text 
            boxes over and image of the currently selected tag. They could add notes to the tags, as well as save
            the current configuration of text boxes with the order they need it printed in, to the existing database.
          </Card.Text>
        </Card.Header>
      </Card>
      <div>
        <img style={imageHolder} src={TagImageOne} alt=""></img>
        <img style={imageHolder} src={TagImageTwo} alt=""></img>
        <img style={imageHolder} src={TagImageThree} alt=""></img>
      </div>
      <div className="divider">
        <label className="dividerTextProduction">The in's and out's</label>
      </div>
      <Card style={{paddingBottom:'5vh', marginTop: '5vh' }}>
        <Card.Header style={{fontWeight:"bold" , fontSize: '20px'}}>The Problem</Card.Header>
        <Card.Text style={{padding:"20px"}}>
          The techs in their shop weren't "tech savy", so anytime a new label would need to be created, it 
          would have to be redone manually by a designer. This would cause a lot of work for the team as the designer would 
          have to drop their current tasks to take care of the new tag that needed formatted, insert it into the 
          existing database and then label/relable orders created with info from the techs. This was a lot of leg work on
          the designer, and not very dynamic as any changes that needed to be implemented would start the process 
          from scratch. This led to a loss of effeciency for both the techs in the back having to explain the tag
          to the designer. The designer also experienced a loss of time running back and forth and resetting, and reuploading
          any time there was a change in the format, or a new tag was needed.
        </Card.Text>
        <Card.Header style={{fontWeight:"bold", fontSize: '20px'}}>The Solution</Card.Header>
        <Card.Text style={{padding:"20px"}}>
          Using a combination of 
          Jquery, Html, JavaScript and Java for the SQL Queries, and a third party measuring/text box creation tool
          a solution was made! This site would allow the techs themselves, or the designer access both the database and the 
          templates online. They could upload the new tag image, then select where they wanted the text boxes, 
          select what order they want them in, and how many boxes they want to print. Then finally save them to the database, 
          as well as edit them anytime the needed to, right from the site with an easy to use GUI that the "non tech savy" techs 
          could use.  
        </Card.Text>
        <Card.Header style={{textAlign:"center"}}>
          <a href='https://aciservices.com/' target='_blank'> ACI Services Website</a>
        </Card.Header>
      </Card>
      <div className="divider">
      <label className="dividerTextProduction">Technologies used</label>
      </div>
      <div className="languageCardWrapper">{productionLanguageViews}</div>
    </div>
  );
}
