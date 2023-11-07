import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <section className="taskDetails">
      <Link to="/profile" className="link subjectDetails__linkLogo">
        <img src={logo} alt='логотип' />
        <p className="subjectDetails__text">&larr;</p>
        <p className="subjectDetails__text">Назад</p>
      </Link>
      <Accordion faqList={faqList}/>
    </section>
  )
}

export default TaskDetails
