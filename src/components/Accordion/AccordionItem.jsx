import React, {useRef, useState} from 'react'
import { ReactComponent as ArrowIcon} from '../../images/ArrowIcon.svg'

export const AccordionItem = ({faqItem, onClick, isOpen, name}) => {
  const itemRef = useRef(null);
  const [bthStateGreen, setBthStateGreen] = useState(false);
  const [bthStateGrey, setBthStateGrey] = useState(false);
  const [bthStateRed, setBthStateRed] = useState(false);
  const [checkedGreen, setCheckedGreen] = useState(false);
  const [checkedGrey, setCheckedGrey] = useState(false);
  const [checkedRed, setCheckedRed] = useState(false);

  const handleCheckGreen =() => {
    setCheckedRed(false);
    setCheckedGrey(false);
    setCheckedGreen(true);
  }

  const handleCheckGrey =() => {
    setCheckedRed(false);
    setCheckedGreen(false);
    setCheckedGrey(true);
  }

  const handleCheckRed =() => {
    setCheckedGrey(false);
    setCheckedGreen(false);
    setCheckedRed(true);
  }

  const handleClickGreen = () => {
    setBthStateRed(false);
    setBthStateGrey(false);
    handleCheckGreen();
    setBthStateGreen(bthStateGreen => !bthStateGreen);
  }
  const handleClickGrey = () => {
    setBthStateGreen(false);
    setBthStateRed(false);
    handleCheckGrey();
    setBthStateGrey(bthStateGrey => !bthStateGrey);
  }
  const handleClickRed = () => {
    setBthStateGreen(false);
    setBthStateGrey(false);
    handleCheckRed();
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
              <textarea className="acc__textarea" type="text" style={{width: "100%"}}></textarea>
            </div>
            <div className="acc__result">
              <div className="acc__checkbox">
                <div className="acc__choice" onClick={handleClickRed}>
                  <input className="acc__input" type="radio" id="red" name={name} value="red" checked={checkedRed}></input>
                  <div className="acc__label" for="red">Надо исправлять</div>
                </div>
                <div className="acc__choice" onClick={handleClickGrey}>
                  <input className="acc__input" type="radio" id="grey" name={name} value="grey" checked={checkedGrey}></input>
                  <div className="acc__label" for="grey">Можно лучше</div>
                </div>
                <div className="acc__choice" onClick={handleClickGreen}>
                  <input className="acc__input" type="radio" id="green" name={name} value="green" checked={checkedGreen}></input>
                  <div className="acc__label" for="green">Отлично</div>
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
