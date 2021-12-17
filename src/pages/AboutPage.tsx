import React from "react";

interface AboutPageProps {}

const AboutPage: React.FC<AboutPageProps> = ({}) => {
  return (
    <div className="about-page-container page">
      <h1 className="page-heading">About</h1>

      <div className="about-card-container">
        <h3 className="about-card-name">Thulane Khumalo</h3>
        <h4 className="about-card-email about-card-small-detail">
          thulane.dev@gmail.com
        </h4>
        <a
          href="https://thulane.co.za"
          className="about-card-website about-card-small-detail"
        >
          thulane.co.za
        </a>
        <h4 className="about-card-phone about-card-small-detail">
          068 538 4578
        </h4>

        <p className="about-card-description">
          Hello. I hope you enjoyed my submission. Limited time and a busy week
          meant the I couldn't use my full set of tricks but I believe I've done
          enough to warrent a conversation with you. Hence, I cannot wait to
          speak to you and communicate what I can contribute to your
          organisation.
        </p>

        <p className="about-card-description">Happy holidays.</p>
      </div>
    </div>
  );
};

export default AboutPage;
