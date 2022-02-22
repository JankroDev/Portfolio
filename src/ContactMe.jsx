import React from "react";
import Email from './images/buttonresources/gmail.png';
import LinkedIn from './images/buttonresources/linkedin.png';
import {Card} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export function ContactMe() {

    let navigate = useNavigate();

    const emailClickHandler = () => {
        window.location.href = "mailto:jankrodev@gmail.com";
    }
  
    const linkedInClickHandler = () => {
        window.open("https://www.linkedin.com/in/chris-janke-b58a76231/");
    }

 

  return (
    <div>
      <div className="divider">
        <label className="dividerTextProduction">Contact Me</label>
      </div>
      <div  className="languageCardWrapper">
      <Card className="languageCard" onClick={emailClickHandler}>
        <Card.Img className="languageCardImage" src={Email}></Card.Img>
        <Card.Text className="languageCardName" >Email</Card.Text>
      </Card>
      <Card className="languageCard" onClick={linkedInClickHandler}>
        <Card.Img className="languageCardImage" src={LinkedIn}></Card.Img>
        <Card.Text className="languageCardName" >LinkedIn</Card.Text>
      </Card>
      </div>
    </div>
  );
}
