import React from 'react';
import Accordion from '../Accordion/Accordion';

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

const Task = () => {
  return (
    <section className="task">
      <Accordion faqList={faqList}/>
    </section>
  )
}

export default Task;
