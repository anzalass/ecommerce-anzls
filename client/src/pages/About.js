import React from "react";
import Layout from "../components/Layout/Layout";
import bgcontact from "../images/bannercopy.png";
import imgcontact from "../images/a6.jpg";

function About() {
  return (
    <Layout title={"About ➡️ Eccommerce App"}>
      <div className="about">
        <div className="aboutHeader">
          <img src={bgcontact} alt="" className="bgcontact" />
          <div className="contactTiltle">
            <h1>About Us</h1>
            <p>Everything About our Ecommerce</p>
          </div>
        </div>
        <div className="aboutDetail">
          <img src={imgcontact} alt className="imgAbout" />
          <div className={"aboutDesc"}>
            <h2>About Us</h2>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              eaque est quos facere! Hic praesentium, quis recusandae quaerat
              ipsa dicta corrupti nisi a est temporibus, sit nulla quibusdam quo
              atque. Lorem ipsum dolor sit amet cbonsectetur adipisicing elit.
              Iusto perferendis id aspernatur tempora laborum, ratione vel,
              nostrum impedit maiores possimus cumque quam veniam aliquam
              laudantium, obcaecati et mollitia magnam atque? Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Sint assumenda sapiente
              aliquid odit, veniam laborum? Amet animi iure blanditiis,
              architecto, facere, sint optio libero soluta excepturi ipsum aut
              suscipit nostrum.
            </p>
            <abbr title>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
              perferendis cum reprehenderit recusandae asperiores. Cum totam
              possimus blanditiis recusandae incidunt repellendus facilis
              repudiandae nostrum. Reiciendis ullam corrupti magni ea. Quasi?
            </abbr>
            <br />
            <br />
            <br />
            <br />
            <marquee background-color="#ccc" loop={-1} scrolamount={5}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ea,
              dolor corporis blanditiis impedit mollitia laboriosam voluptatibus
              ipsum odio fugiat sint magni nisi. Et ipsa, eaque voluptatem saepe
              minima nostrum!
            </marquee>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
