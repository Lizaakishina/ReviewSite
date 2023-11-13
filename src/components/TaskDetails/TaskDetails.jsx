import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Accordion from '../Accordion/Accordion';
import logo from '../../images/logo.svg';
import './TaskDetails.css';

const faqList = [
  {
    id: 1,
    title: 'Do I have to allow the use of cookies?',
  },
  {
    id: 2,
    title: 'How do I change my My Page password?',
  },
  {
    id: 3,
    title: 'What is BankID?',
  },
  {
    id: 4,
    title: 'Whose birth number can I use?',
  },
  {
    id: 5,
    title: 'When do I recieve a password ordered by letter?',
  },
  {
    id: 6,
    title: 'When do I recieve a password ordered by letter?',
  },
  {
    id: 7,
    title: 'When do I recieve a password ordered by letter?',
  },
  {
    id: 8,
    title: 'When do I recieve a password ordered by letter?',
  },
  {
    id: 9,
    title: 'When do I recieve a password ordered by letter?',
  },
]

const TaskDetails = () => {
  let history = useHistory();

  return (
    <section className="taskDetails">
      <button type="button" onClick={() => history.goBack()} to="/profile" className="link taskDetails__linkLogo">
        <img className="taskDetails__linkLogo" src={logo} alt='логотип' />
        <p className="taskDetails__text">&larr;</p>
        <p className="taskDetails__text">Назад</p>
      </button>
      <Accordion faqList={faqList}/>
    </section>
  )
}

export default TaskDetails
