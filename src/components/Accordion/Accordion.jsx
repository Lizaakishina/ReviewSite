import React, { useState } from 'react';
//import supportedLanguages from 'react-syntax-highlighter/dist/cjs/languages/hljs/supported-languages';
import { AccordionItem } from './AccordionItem';
import './Accordion.css';

const Accordion = ({faqList}) => {
  const [openId, setId] = useState(null);
  const defaultLanguage = "javascript";
  //const [language, setLanguage] = useState(defaultLanguage);

  return (
    <ol className="acc">
      {faqList.map((faqItem, id) => {
        return (
          <AccordionItem
            onClick={() => (id === openId ? setId(null) : setId(id))}
            faqItem={faqItem}
            isOpen={id === openId}
            key={id}
            name={id}
            //language={language}
          />
        )
      })}
    </ol>
  )
}

export default Accordion

/*
<select
        defaultValue={defaultLanguage}
        name="languages"
        onChange={(e) => setLanguage(e.target.value)}>
          {supportedLanguages.map((language, i) => (
            <option key={i}>{language}</option>
          ))}
      </select>
*/
