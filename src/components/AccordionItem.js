import React, {useRef} from 'react'
import { ReactComponent as ArrowIcon} from '../images/ArrowIcon.svg'

export const AccordionItem = ({faqItem, onClick, isOpen, name}) => {
  const itemRef = useRef(null);

  return (
    <li className="acc__item">
      <button
        className="acc__header"
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
                  <input className="acc__input" type="radio" id="refact" name={name} ></input>
                  <label className="acc__label" for="refact">Надо исправлять</label>
                </div>
                <div className="acc__choice">
                  <input className="acc__input" type="radio" id="maybe" name={name}></input>
                  <label className="acc__label" for="maybe">Можно лучше</label>
                </div>
                <div className="acc__choice">
                  <input className="acc__input" type="radio" id="cool" name={name}></input>
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
