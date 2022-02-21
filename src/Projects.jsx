import React from "react";
import NapaProjectImage from "./images/project-images/Napa Invoices Login.png";
import ACIProjectImage from "./images/project-images/Tag Printer 2.PNG";
import ACILogo from "./images/companylogos/aciLogo.png";
import { useNavigate } from "react-router-dom";

export function Projects() {
  let navigate = useNavigate();

  const napaClickHandler = () =>{
    navigate('/napaProject')
  }

  const aciTagClickHandler = () =>{
    navigate('/aciProject')
  }

  const aciOemClickHandler = () =>{
    navigate('aciOemProject')
  }

  return (
    <div>
      <div className="divider">
        <label className="dividerTextProduction">
          Projects in Production (Sold)
        </label>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "30px",
        }}
      >
        <input
          className="projectInputImage"
          style={{ height: "40vh", width: "25vw", objectFit: "cover" }}
          type="image"
          onClick={napaClickHandler}
          src={NapaProjectImage}
        ></input>
        <input
          className="projectInputImage"
          style={{ height: "40vh", width: "25vw", objectFit: "cover" }}
          type="image"
          onClick={aciTagClickHandler}
          src={ACIProjectImage}
        ></input>
        <input
          className="projectInputImage"
          style={{
            height: "40vh",
            width: "25vw",
            objectFit: "cover",
            objectPosition: -150,
          }}
          type="image"
          onClick={aciOemClickHandler}
          src={ACILogo}
        ></input>
        <label className="projectImageText">Napa Invoices</label>
        <label className="projectImageText">ACI Tags</label>
        <label className="projectImageText">ACI OEM</label>
      </div>
    </div>
  );
}
