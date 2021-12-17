import React from "react";
import { Link } from "react-router-dom";

interface NoListContentProps {
  message: string;
  linkBtnText: string;
  link: string;
}

const NoListContent: React.FC<NoListContentProps> = ({
  link,
  linkBtnText,
  message,
}) => {
  return (
    <div className="no-list-content-container">
      <p className="no-list-content-text">{message}</p>

      <Link to="/">
        <button className="no-list-content-btn">{linkBtnText}</button>
      </Link>
    </div>
  );
};

export default NoListContent;
