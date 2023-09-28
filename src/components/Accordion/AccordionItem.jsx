import React, {useRef, useState} from 'react'
import { ReactComponent as ArrowIcon} from '../../images/ArrowIcon.svg'

export const AccordionItem = ({faqItem, onClick, isOpen, name}) => {
  const itemRef = useRef(null);
  const [bthStateGreen, setBthStateGreen] = useState(false);
  const [bthStateGrey, setBthStateGrey] = useState(false);
  const [bthStateRed, setBthStateRed] = useState(false);

  const handleClickGreen = () => {
    setBthStateRed(false);
    setBthStateGrey(false);
    setBthStateGreen(bthStateGreen => !bthStateGreen);
  }
  const handleClickGrey = () => {
    setBthStateGreen(false);
    setBthStateRed(false);
    setBthStateGrey(bthStateGrey => !bthStateGrey);
  }
  const handleClickRed = () => {
    setBthStateGreen(false);
    setBthStateGrey(false);
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
                  <div className="acc__label" for="refact">Надо исправлять</div>
                </div>
                <div className="acc__choice">
                  <input className="acc__input" type="radio" id="maybe" name={name} value="grey" onClick={handleClickGrey}></input>
                  <div className="acc__label" for="maybe">Можно лучше</div>
                </div>
                <div className="acc__choice">
                  <input className="acc__input" type="radio" id="cool" name={name} value="green" onClick={handleClickGreen}></input>
                  <div className="acc__label" for="cool">Отлично</div>
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
