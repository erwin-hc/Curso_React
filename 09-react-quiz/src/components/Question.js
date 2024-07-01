import React from 'react'
import Options from './Options'
import { queries } from '@testing-library/react'

export default function Question({question, dispatch, answer }) {

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer}/> 
    </div>
  )
}
