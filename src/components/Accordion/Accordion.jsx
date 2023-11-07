import React, { useState } from 'react';
import { AccordionItem } from './AccordionItem';
import './Accordion.css';

const Accordion = ({faqList}) => {
  const [openId, setId] = useState(null);

  return (
    <ul className="acc">
      {faqList.map((faqItem, id) => {
        return (
          <AccordionItem
            onClick={() => (id === openId ? setId(null) : setId(id))}
            faqItem={faqItem}
            isOpen={id === openId}
            key={id}
            name={id}
          />
        )
      })}
    </ul>
  )
}

export default Accordion
