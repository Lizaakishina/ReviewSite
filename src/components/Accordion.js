import React, { useState } from 'react'
import data from '../utils/data'
import SingleQuestion from './Question'

const Accordion = () => {
  const [questions, setQuestions] = useState(data)

  return (
    <main>
      <div className='acc__container'>
        <section className='info'>
          {questions.map((question) => (
            <SingleQuestion key={question.id} {...question} />
          ))}
        </section>
      </div>
    </main>
  )
}

export default Accordion
