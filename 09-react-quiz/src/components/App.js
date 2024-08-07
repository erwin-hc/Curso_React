import { useEffect, useReducer } from 'react';
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions:[],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
}

function reducer(state, action){
    switch(action.type) {
      case 'dataReceived':
          return {
            ...state,
            questions: action.paylod,
            status: "ready"
        }
      case 'dataFailed':
        return {
          ...state,
          status: 'error'
        }
      case 'start':
        return {
          ...state,
          status: 'active',
          secondsRemaining: state.questions.length * SECS_PER_QUESTION
        }
      case 'newAnswer':
        const question = state.questions.at(state.index)        
        return {
          ...state,
          answer: action.payload,
          points: 
           action.payload === question.correctOption
           ? state.points + question.points
           : state.points,
        }  
      case 'nextQuestion':
        return {
          ...state,
          index: state.index + 1,
          answer: null
        } 
      case 'finish':
        return {
          ...state,
          status: 'finished',
          highScore: state.points > state.highScore ? state.points : state.highScore
        }
      case 'restart':
        return {
            ...initialState, 
            questions: state.questions, 
            status:'ready',
            highScore: state.highScore
        }     
      case 'tick':
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: 
            state.secondsRemaining === 0
            ? "finished"
            : state.status
        }

      default:
        throw new Error("Action unknow!");
    }
}

function App() {
  const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)
  
  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, curr)=> prev + curr.points, 0)

  useEffect(function(){
    fetch('http://localhost:8000/questions')
    .then(res=>res.json())
    .then(data=> dispatch({ type: 'dataReceived', paylod: data }))
    .catch(err=> dispatch({ type: 'dataFailed' }))    
  },[])

  return (
    <div className="app">
      <Header/>
      <Main>
       {status === 'loading' && <Loader/>}
       {status === 'error' && <Error/>}
       {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
       {status === 'active' && 
        <>
          <Progress answer={answer} index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints}/>
          <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
          <Footer>
            <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index}/> 
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
          </Footer>
        </>
       }
       {status === 'finished' && <FinishScreen dispatch={dispatch} highScore={highScore} points={points} maxPossiblePoints={maxPossiblePoints}/>}
      </Main>

      
    </div>
  );
}

export default App;
