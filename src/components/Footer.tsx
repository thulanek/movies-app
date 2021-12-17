import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <p className="footer-text">{`awesome movies ${new Date().getFullYear()}`}</p>
    </footer>
  );
};

export default Footer;
