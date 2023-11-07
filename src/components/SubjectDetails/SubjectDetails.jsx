import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.svg";
import Task from "../Task/Task.jsx";
import "./SubjectDetails.css";

const SubjectDetails = () => {
  return (
    <section className="subjectDetails">
      <Link to="/profile" className="link subjectDetails__linkLogo">
        <img src={logo} alt='логотип' />
        <p className="subjectDetails__text">&larr;</p>
        <p className="subjectDetails__text">Назад</p>
      </Link>
      <div>
        <Task />
      </div>
    </section>
  )
}

export default SubjectDetails;
