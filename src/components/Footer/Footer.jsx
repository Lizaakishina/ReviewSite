import { memo } from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__description noselect">Учебный проект ReviewSite</h3>
      <div className="footer__line"></div>
      <div className="footer__flexbox">
        <p className="footer__date noselect">&#169; 2024</p>
        <div className="footer__container">
          <a className="link footer__link" href="https://github.com/Lizaakishina" target="blank">Github</a>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
