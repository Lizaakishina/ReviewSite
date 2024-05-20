import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Accordion from '../Accordion/Accordion';
import logo from '../../images/logo.svg';
import './TaskDetails.css';

const faqList = []

const TaskDetails = () => {
  let history = useHistory();
  const [faqs, setFaqs] = useState(faqList);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const lines = e.target.result.split('\n');
        const newFaqs = lines.map((line, index) => ({
          id: faqs.length + index + 1,
          title: line,
        }));
        setFaqs((prevFaqs) => [...prevFaqs, ...newFaqs]);
      };
      reader.readAsText(file);
    }
  };

  return (
    <section className="taskDetails">
      <button type="button" onClick={() => history.goBack()} to="/users/me" className="link taskDetails__linkLogo">
        <img className="taskDetails__linkLogo" src={logo} alt='логотип' />
        <p className="taskDetails__text">&larr;</p>
        <p className="taskDetails__text">Назад</p>
      </button>
      <input type="file" className="taskDetails__file" accept=".txt" onChange={handleFileUpload} />
      <Accordion faqList={faqs}/>
    </section>
  )
}

export default TaskDetails