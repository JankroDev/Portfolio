import React from "react";
import { Card } from "react-bootstrap";
import NapaLogo from "./images/companylogos/napalogo.png";
import ACILogo from "./images/companylogos/aciLogo.png";

export function AboutMe() {
  const companyLogoStyle = {
    width: "10vw",
    height: "10vh",
  };

  return (
    <div>
      <div style={{ marginBottom: "3vh" }} className="divider">
        <label className="dividerTextProjects">About Me</label>
      </div>
      <Card>
        <Card.Header style={{ fontSize: "20px", fontWeight: "bold" }}>
          Experience
        </Card.Header>
        <Card.Text style={{ padding: "20px" }}>
          My name is <b>Chris Janke</b> nice to meet you! I have been
          coding/programming for around 5 Years now, and for the past 3 years I
          have taken it to the next level by doing projects for the companies in
          my area. Two of the projects were in a team enviroment. I worked in
          tandum with another developer/designer all while also being under
          supervision from another senior developer. All of the code was done by
          me, the other developers were there to make requests/revisions. I
          currently have 3 projects out and into production (Completed/Sold) for
          my clients. Thanks for stopping by and checking me out!
        </Card.Text>
        <Card.Text style={{ padding: "20px", fontWeight: "bold" }}>
          Companies I have completed Projects for
        </Card.Text>
        <div
          style={{
            paddingLeft: "10vw",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
          }}
        >
          <img
            style={{ width: "70%", height: "70%" }}
            src={ACILogo}
            alt=""
          ></img>
          <img
            style={{ width: "75%", height: "90%" }}
            src={NapaLogo}
            alt=""
          ></img>
        </div>
        <label
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "18px" }}
        >
          {" "}
          This site was also made by me in React!
        </label>
        <a
          style={{
            textAlign: "center",
            padding: "20px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          href="https://github.com/JankroDev/Portfolio"
          target="_blank"
        >
          This sites Repo
        </a>
        <Card.Header style={{ fontSize: "20px", fontWeight: "bold" }}>
          How I learned programming
        </Card.Header>
        <Card.Text style={{ padding: "20px" }}>
          <a
            style={{ fontWeight: "bold", fontSize: "18px" }}
            href="https://teamtreehouse.com/"
            target="_blank"
            rel="noreferrer"
          >
            Treehouse
          </a>
          <br></br>I studied with Treehouse vigorously for 2 Years, completing
          many of their courses, consuming any and all projects I could. If I
          had any freetime it was spent here, learning more coding.<br></br>
        </Card.Text>
        <Card.Text style={{ padding: "20px" }}>
          <a
            style={{ fontWeight: "bold", fontSize: "18px" }}
            href="https://www.freecodecamp.org/"
            target="_blank"
          >
            Free Code Camp
          </a>
          <br></br>
          When I was somewhere I couldn't have sound for the Treehouse courses I
          was grinding out freecodecamp lessons.
        </Card.Text>

        <Card.Text style={{ padding: "20px" }}>
          <a
            style={{ fontWeight: "bold", fontSize: "18px" }}
            href="https://www.udemy.com/"
            target="_blank"
          >
            Udemy
          </a>
          <br></br>
          Lastly Udemy, where I purchased more than a few courses on Android,
          Java, and Web Development.
        </Card.Text>
        <Card.Text style={{ padding: "20px" }}>
          The Best education by far was working on projects for paying
          customers, where needs HAD to be met. No getting out of features or
          requests because they were overwhelming. This taught me how to read
          Documentation, and really buckle down and grasp concepts I would have
          otherwised overlooked as not important.
        </Card.Text>
      </Card>
    </div>
  );
}
