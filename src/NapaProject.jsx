import React, { useState } from "react";
import LoginImage from "./images/project-images/Napa Invoices Login.png";
import InvoicesScreenImage from "./images/project-images/Invoices Screen.png";
import EntryScreen from "./images/project-images/Entry Screen.png";
import { Card } from "react-bootstrap";

export function NapaProject() {
  const imageHolder = {
    maxWidth: "90vw",
    display: "block",
    paddingTop: "30px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
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
    </div>
  );
}
