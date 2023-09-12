import React, { useState } from 'react'

const Question = ({ title, info }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className='acc'>
      <header className="acc__header">
        <h4 className="acc__title" onClick={() => setExpanded(!expanded)}>
          {title}
        </h4>
        <button className='acc__btn' onClick={() => setExpanded(!expanded)}>
        </button>
      </header>
      {expanded && <p className="acc__text">{info}</p>}
    </article>
  )
}

export default Question
