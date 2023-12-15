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
    title: 'def check_duplicate(lst):',
  },
  {
    id: 3,
    title: '  return len(lst) != len(set(lst))',
  },
  {
    id: 4,
    title: 'print(check_duplicate([51, 37, 3, 45, 5, 49, 77]))',
  },
  {
    id: 5,
    title: 'print(check_duplicate([1, 3, 3]))',
  },
  {
    id: 6,
    title: 'print(check_duplicate([11, 2, 88, 4, 16]))',
  },
  {
    id: 7,
    title: 'var_1 = [1, 5, 6, 7]',
  },
  {
    id: 8,
    title: 'sum = 0',
  },
  {
    id: 9,
    title: 'for i in var_1:',
  },
  {
  id: 10,
    title: '  sum += i',
  },
  {
  id: 11,
    title: 'print(sum/len(var_1))',
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
