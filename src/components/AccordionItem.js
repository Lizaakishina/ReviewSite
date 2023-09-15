import React, {useRef, useState} from 'react'
import { ReactComponent as ArrowIcon} from '../images/ArrowIcon.svg'

export const AccordionItem = ({faqItem, onClick, isOpen, name}) => {
  const itemRef = useRef(null);
  const [bthStateGreen, setBthStateGreen] = useState(false);
  const [bthStateGrey, setBthStateGrey] = useState(false);
  const [bthStateRed, setBthStateRed] = useState(false);

  const handleClickGreen = () => {
    setBthStateGreen(bthStateGreen => !bthStateGreen);
  }
  const handleClickGrey = () => {
    setBthStateGrey(bthStateGreen => !bthStateGreen);
  }
  const handleClickRed = () => {
    setBthStateRed(bthStateRed => !bthStateRed);
  }

  let toggleClassCheckGreen = bthStateGreen ? 'acc__header-green' : ' ';
  let toggleClassCheckGrey = bthStateGrey ? 'acc__header-grey' : ' ';
  let toggleClassCheckRed = bthStateRed ? 'acc__header-red' : ' ';

  return (
    <li className="acc__item">
      <button
        className={`acc__header ${toggleClassCheckGreen} ${toggleClassCheckGrey} ${toggleClassCheckRed}`}
        onClick={() => onClick()}
      >
        {faqItem.title}
        <ArrowIcon className={`acc__arrow ${isOpen ? "active" : ""}`} />
      </button>
      <div className="acc__collapse" style={isOpen ? {height: itemRef.current.scrollHeight} : {height: "0px"}}>
        <div className="acc__body" ref={itemRef}>
          <div className="acc__container">
            <p className="acc__title">Написать</p>
            <div className="acc__review">
              <input type="text"></input>
            </div>
            <div className="acc__result">
              <div className="acc__checkbox">
                <div className="acc__choice">
                  <input className="acc__input" type="radio" id="refact" name={name} value="red" onClick={handleClickRed}></input>
                  <label className="acc__label" for="refact">Надо исправлять</label>
                </div>
                <div className="acc__choice">
                  <input className="acc__input" type="radio" id="maybe" name={name} value="grey" onClick={handleClickGrey}></input>
                  <label className="acc__label" for="maybe">Можно лучше</label>
                </div>
                <div className="acc__choice">
                  <input className="acc__input" type="radio" id="cool" name={name} value="green" onClick={handleClickGreen}></input>
                  <label className="acc__label" for="cool">Отлично</label>
                </div>
              </div>
              <button className={`acc__comment`} type="submit" onClick={() => onClick()}>Комментировать</button>
            </div>
          </div>
        </div>
      </div>
    </li>
    )
}
