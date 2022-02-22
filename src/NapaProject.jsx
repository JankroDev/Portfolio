import React, { useState } from "react";
import LoginImage from "./images/project-images/Napa Invoices Login.png";
import InvoicesScreenImage from "./images/project-images/Invoices Screen.png";
import EntryScreen from "./images/project-images/Entry Screen.png";
import { Card } from "react-bootstrap";
import BackArrowImage from "./images/buttonresources/backarrow.png"
import { useNavigate } from "react-router-dom";
import {
  Bootstrap,
  Git,
  Python,
  ReactImage,
  Web,
  Firebase
} from "./data/ImageHolder";

export function NapaProject() {
  
  let navigate = useNavigate();

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
      name: "Git",
      source: Git,
    },
    {
      name: "B/S",
      source: Bootstrap,
    },
    {
      name: "Python",
      source: Python,
    },
    {
      name: "Firebase",
      source: Firebase,
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
            The owner of a group of Napa Auto Parts stores needed a place where
            one of their larger customers could access and review their invoices
            from the local store. This site let's the manager scan the invoices
            (more info on that below) and grab the relevant information from all
            invoices scanned in a certain folder. They can then upload them to
            the database afterward for the customer to view.
          </Card.Text>
        </Card.Header>
      </Card>
      <div>
        <img style={imageHolder} src={LoginImage} alt=""></img>
        <img style={imageHolder} src={InvoicesScreenImage} alt=""></img>
        <img style={imageHolder} src={EntryScreen} alt=""></img>
      </div>
      <div className="divider">
        <label className="dividerTextProduction">The in's and out's</label>
      </div>
      <Card style={{paddingBottom:'5vh'}}>
        <Card.Header style={{fontWeight:"bold" , fontSize: '20px'}}>The Problem</Card.Header>
        <Card.Text style={{padding:"20px"}}>
          Napa Auto Parts stores use a program "Tams II" for all of the services
          they currently do for the customer. This includes part look up,
          invoicing, ROA's for accounts, and inventory. Tams doesn't offer any
          sort of electronic invoicing "ie no downloads or exporting". This
          means that a Manager would have to print, scan, and email every
          invoice that a customer would request. Even then the customer would be
          required to go through a long list of invoices to find the specific
          ones they needed when looking at their account. One rather large
          account quit buying from the store owner because of this lack of
          accessibility. The owner requested a site that would not only show
          them the invoices, but allow them to sort, filter, find, and view any
          invoices that were run through the week. There are no optinons to export the
          invoices to any kind of digital media, so unless the Manager of the store has time to enter in all
          the fields for each invoice (sometimes 20-60 different fields) a better
          solution had to be implemented.
        </Card.Text>
        <Card.Header style={{fontWeight:"bold", fontSize: '20px'}}>The Solution</Card.Header>
        <Card.Text style={{padding:"20px"}}>
          What if the Manager could, at the end of the week, scan every invoice
          for that account, then run one script that would prepare all of the
          files for upload? No extra work for the manager other than selecting
          all the invoices to print, running them through a scanner, and double
          clicking a script! That's exactly what I ended up making with a
          combination of Python, pyimage, and pytesseract. The script will go
          through all of the files in a folder and rename them based on the
          bounding boxes set in tesseract and pyimage it would grab the Invoice
          number, the date, and the total amount of the invoice. After doing
          that it renames the file accordingly 123456_022122_1567.89 the file is
          then ready to be uploaded from the site by the store manager. The
          uploads section is only accessible if the user is logged in (Firebase
          Authentication) as the store. From there the Manager can select all of
          the files for upload, and error check as you saw in the image above.
          On upload a firestore document is created with all of the information
          of the invoice including the download url. The user can then get a
          quick view (invoice#, date, total) without actually needing to
          download the invoice. On viewing the invoice the download URL is sent
          to the browser so they can view the invoice in more detail.
        </Card.Text>
        <Card.Header style={{display:"grid", gridTemplateColumns: "2fr 2fr 1fr", fontSize: "18px", fontWeight:"bold"}}>
          <a href="https://github.com/JankroDev/NapaInvoices/tree/master/NapaInvoices" target="_blank">
            The public repo of the site
          </a>
          <a href="https://eliteinvoices.netlify.app" target="_blank">The site</a>
          <a href="https://github.com/JankroDev/PythonSriptInvoiceInfo" target="_blank">The Python</a>
        </Card.Header>
      </Card>
      <div className="divider">
    <label className="dividerTextProduction">Technologies Used</label>
    </div>
    <div className="languageCardWrapper">{productionLanguageViews}</div>
    </div>
  );
}
