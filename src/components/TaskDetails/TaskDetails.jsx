import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Accordion from '../Accordion/Accordion';
import logo from '../../images/logo.svg';
import './TaskDetails.css';

const faqList = [
  {
    id: 1,
    title: 'const [text, setNewText] = useState("");',
  },
  {
    id: 2,
    title: 'print("Hello")',
  },
  {
    id: 3,
    title: 'return 0',
  },
  {
    id: 4,
    title: 'import CopyToClipboard from "react"',
  },
  {
    id: 5,
    title: 'class Test:',
  },
  {
    id: 6,
    title: '  def __init__(self):',
  },
  {
    id: 7,
    title: '    pass',
  },
  {
    id: 8,
    title: 'for i in var_1:',
  },
  {
  id: 9,
    title: '  sum += i',
  },
]

const TaskDetails = () => {
  let history = useHistory();

  return (
    <section className="taskDetails">
      <button type="button" onClick={() => history.goBack()} to="/users/me" className="link taskDetails__linkLogo">
        <img className="taskDetails__linkLogo" src={logo} alt='логотип' />
        <p className="taskDetails__text">&larr;</p>
        <p className="taskDetails__text">Назад</p>
      </button>
      <Accordion faqList={faqList}/>
    </section>
  )
}

export default TaskDetails
