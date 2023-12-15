import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Markdown from 'react-markdown'
import { docco, a11yLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ReactComponent as ArrowIcon } from '../../images/ArrowIcon.svg';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
SyntaxHighlighter.registerLanguage('javascript', js);

export const AccordionItem = ({faqItem, onClick, isOpen, name }) => {
  const itemRef = useRef(null);
  const [bthStateGreen, setBthStateGreen] = useState(false);
  const [bthStateGrey, setBthStateGrey] = useState(false);
  const [bthStateRed, setBthStateRed] = useState(false);
  const [checkedGreen, setCheckedGreen] = useState(false);
  const [checkedGrey, setCheckedGrey] = useState(false);
  const [checkedRed, setCheckedRed] = useState(false);
  const [isEditing, setEditing] = useState(true)
  const [isVisible, setIsVisible ] = useState(false);
  const [text, setNewText] = useState("");

  const handleTimerClick = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 100);
  }

  const setEditingState = () => {
    setEditing(isEditing => !isEditing)
  }

  const handleCheckGreen = () => {
    setCheckedRed(false);
    setCheckedGrey(false);
    setCheckedGreen(true);
  }

  const handleCheckGrey = () => {
    setCheckedRed(false);
    setCheckedGreen(false);
    setCheckedGrey(true);
  }

  const handleCheckRed = () => {
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
        onClick={() => {onClick()}}
      >
        <SyntaxHighlighter className="acc__highlighter" language="javascript" style={a11yLight}>{faqItem.title}</SyntaxHighlighter>
        <ArrowIcon className={`acc__arrow ${isOpen ? "active" : ""}`} />
      </button>
      <div>
        {isEditing ? (
          <div className="acc__collapse" style={isOpen ? {height: itemRef.current.scrollHeight} : {height: "0px"}}>
            <div className="acc__body" ref={itemRef}>
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
                      setBthStateRed(false);
                      setBthStateGreen(false);
                      setBthStateGrey(false);
                      setCheckedRed(false);
                      setCheckedGrey(false);
                      setCheckedGreen(false);}}>
                      Удалить комментарий
                  </button>
                </div>}
              </div>
            </div>
          </div>
        )
        :
        (
          <div className="acc__collapse acc__collapse-edit" style={isOpen ? {height: itemRef.current.scrollHeight} : {height: "0px"}}>
            <div className="acc__body" ref={itemRef}>
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
                  <div className="acc__checkbox">
                    <div className="acc__choice" onClick={handleClickRed}>
                      <input className="acc__input" type="radio" id="red" name={name} value="red" checked={checkedRed}></input>
                      <div className="acc__label noselect">Надо исправлять</div>
                    </div>
                    <div className="acc__choice" onClick={handleClickGrey}>
                      <input className="acc__input" type="radio" id="grey" name={name} value="grey" checked={checkedGrey}></input>
                      <div className="acc__label noselect">Можно лучше</div>
                    </div>
                    <div className="acc__choice" onClick={handleClickGreen}>
                      <input className="acc__input" type="radio" id="green" name={name} value="green" checked={checkedGreen}></input>
                      <div className="acc__label noselect">Отлично</div>
                    </div>
                  </div>
                  <button className={`acc__comment noselect`} type="submit" onClick={() => {onClick(); handleTimerClick(); setEditingState()}}>Комментировать</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </li>
  )
}
