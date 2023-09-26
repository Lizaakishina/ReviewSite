import "./Footer.css";
import { memo } from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__description">Учебный проект ReviewSite</h3>
      <div className="footer__line"></div>
      <div className="footer__flexbox">
        <p className="footer__date">&#169; 2023</p>
        <div className="footer__container">
          <a className="link footer__link" href="https://github.com/Lizaakishina" target="blank">Github</a>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer);