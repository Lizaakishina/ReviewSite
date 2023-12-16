import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Markdown from 'react-markdown'
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { AccordionItem } from './AccordionItem';

SyntaxHighlighter.registerLanguage('javascript', js);

const Accordion = ({faqList}) => {
  const [openId, setId] = useState(null);
  const [text, setNewText] = useState("");
  const [isEditing, setEditing] = useState(true);
  const [isVisible, setIsVisible ] = useState(false);

  const handleTimerClick = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 100);
  }

  const setEditingState = () => {
    setEditing(isEditing => !isEditing)
  }
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
      <div>
        {isEditing ? (
          <div className="acc__container">
          <p className="acc__title noselect"></p>
            <div className="acc__review">
              <Markdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={docco}
                        PreTag="div"
                        language={match[1]}
                        children={String(children).replace(/\n$/, '')}
                        {...props}
                      />
                    ) : (
                      <code className={className ? className : ''} {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {text}
              </Markdown>
            </div>
            {!isVisible &&
            <div className="acc__change">
              <button className={`acc__edit noselect`} type="submit" onClick={setEditingState}>Редактировать</button>
              <button
                className={`acc__delete noselect`}
                type="submit"
                onClick={() => {
                  setNewText("");
                  }}>
                  Удалить комментарий
              </button>
            </div>}
          </div>
        )
        :
        (
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
              <button className={`acc__comment noselect`} type="submit" onClick={() => {handleTimerClick(); setEditingState()}}>Комментировать</button>
            </div>
          </div>
        )}
      </div>
      <div className="acc__bth-contaier"><button className={`acc__bth-end noselect`} type="submit">Отправить комментарий</button></div>
    </div>
  )
}

export default Accordion
