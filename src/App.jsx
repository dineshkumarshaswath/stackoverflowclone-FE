
import React from 'react'
import Login from './Components/login'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from 'react-router-dom'
import Question from './Components/question'
import Signup from './Components/signup';
import Addquestion from './Components/addquestion';
import { useState,useEffect } from 'react';
import Userquestion from './Components/userquestion';
import Editquestion from './Components/edituserqus';
import Answer from './Components/answer';
import Useranswer from './Components/useranswer';
import Addanswer from './Components/addanswer';
import Editanswer from './Components/edituseranswer';
import Base from './Components/base';
import Forgotpassword from './Components/forgot';
import Resetpassword from './Components/reset';


function App() {

  const[question,setQuestion]=useState([])
  const[answer,setAnswer]=useState([])
 

  return ( 
    <>
    <Switch>
    <Route exact path="/">
     <Login/>
    </Route>

    <Route path ="/signup">
    <Signup/>
    </Route>


    <Route path="/forgot">
      <Forgotpassword/>
    </Route>

    <Route path="/reset/password/:token">
      <Resetpassword/>
    </Route>

    <Route path ="/question">
    <Question 
    />
    </Route>

   
    <Route path="/userquestion">
      <Userquestion
      question={question} 
      setQuestion={setQuestion}/>
    </Route>

    <Route path ="/addquestion">
    <Addquestion/>
    </Route>

    <Route path="/edit/:id/:token">
    <Editquestion
     question={question} 
     setQuestion={setQuestion}/>
    </Route>
   
    <Route path="/answer">
      <Answer/>
    </Route>
   
    <Route path="/useranswer">
    <Useranswer
    answer={answer}
    setAnswer={setAnswer}
    />
    </Route>

    <Route path ="/addanswer">
    <Addanswer/>
    </Route>

    <Route path="/ansedit/:id/:token">
      <Editanswer
      answer={answer}
      setAnswer={setAnswer}
      />
    </Route>
 

  
    </Switch>
   
 
    </>
  )
}

export default App
