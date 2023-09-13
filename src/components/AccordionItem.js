import React, {useRef} from 'react'
import { ReactComponent as ArrowIcon} from '../images/ArrowIcon.svg'

export const AccordionItem = ({faqItem, onClick, isOpen}) => {
  const itemRef = useRef(null);

  return (
    <li className="acc__item">
      <button
        className="acc__header"
        onClick={() => onClick()}>
          {faqItem.title}
          <ArrowIcon className={`acc__arrow ${isOpen ? "active" : ""}`} />
      </button>
      <div className="acc__collapse" style={isOpen ? {height: itemRef.current.scrollHeight} : {height: "0px"}}>
        <div className="acc__body" ref={itemRef}>{faqItem.info}</div>
      </div>
    </li>
    )
}
