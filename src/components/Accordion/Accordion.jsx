import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { AccordionItem } from './AccordionItem';

const Accordion = ({faqList}) => {
  const [openId, setId] = useState(null);
  const [text, setNewText] = useState("");

  return (
    <div>
      <ol className="acc">
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
      </ol>
      <div className="acc__container">
        <p className="acc__title noselect">Написать</p>
        <div className="acc__review">
          <TextareaAutosize className="acc__textarea" type="text" style={{width: "100%"}} id='notes'
            value={text}
            placeholder="Напишите здесь что-то..."
            onChange={(e) => {
              const newText = e.target.value;
              setNewText(newText);
            }}>
          </TextareaAutosize>
        </div>
        <div className="acc__result">
          <button className={`acc__comment noselect`} type="submit">Отправить комментарий</button>
        </div>
      </div>
    </div>
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
