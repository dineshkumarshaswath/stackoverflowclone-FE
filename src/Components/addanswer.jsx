import React, { useEffect, useState } from 'react'
import { Row, Col, FormControl, Button, Form } from 'react-bootstrap'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


import * as yup from 'yup'
import { useFormik } from 'formik';
import Userbase from './userbase';






const answerSchema = yup.object({

  question: yup.string().required("*  required"),
  answer: yup.string().required("* required"),
  keywords: yup.string().required("*  required")

})

function Addanswer() {

  const history = useHistory()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/", { replace: true })

    }
  })





  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {

      question: "",
      answer: "",
      keywords: "",

    },
    validationSchema: answerSchema,
    onSubmit: (newanswer) => {
      console.log(newanswer);
      newclassTopics(newanswer)
    }
  })

  async function newclassTopics(newanswer) {

    if (!localStorage.getItem("token")) {
      history.push("/", { replace: true })

    }
    let token = localStorage.getItem("token")



    const response = await fetch("https://stackclone-be.onrender.com/api/postanswer", {
      method: 'POST',
      body: JSON.stringify(newanswer),
      headers: {
        "x-auth-token": token,
        "content-type": "application/json"
      }

    })

    const data = await response.json()
    console.log(data)
    if (data.topics) {

      console.log(data.topics);

    }
    else {

      console.log(data.message)
    }

    alert("successfully added")
    history.push("/useranswer")
  }






  return (
    <Userbase>
      <Row sm={1} md={1} lg={1}>






        <Form onSubmit={handleSubmit} style={{
          display: "grid",
          placeItems: "center", marginTop: "20px"
        }} >

          <Col style={{ textAlign: "center", width: '50%' }} variant="success"  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Question</Form.Label>
              <Form.Control as="textarea" rows={3}
                type="text" placeholder="Question"
                value={values.question} onChange={handleChange}
                onBlur={handleBlur}
                name="question" />

            </Form.Group></Col>

          <Col style={{ color: 'crimson', textAlign: "center", width: '50%', margin: "10px" }}>
            {touched.question ? errors.question : ""}</Col>

          <Col style={{ textAlign: "center", width: '50%' }} variant="success"  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Answer</Form.Label>
              <Form.Control theme='snow' module as="textarea" rows={3}
                style={{ height: "200px", }}
                type="text" placeholder="answers"
                value={values.answer} onChange={handleChange}
                onBlur={handleBlur}
                name="answer" />

            </Form.Group></Col>

          <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "10px" }}>
            {touched.answer ? errors.answer : ""}</Col>




          <Col style={{ textAlign: "center", width: '50%', margin: "30px" }} variant="success"  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tagwords</Form.Label>
              <Form.Control
                type="text" placeholder="Tagwords"
                value={values.keywords} onChange={handleChange}
                onBlur={handleBlur}
                name="keywords"
              />
            </Form.Group></Col>

          <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "10px" }}>
            {touched.keywords ? errors.keywords : ""}</Col>






          <Col><Button type="submit">Add</Button></Col>


        </Form>
      </Row>

    </Userbase>

  )

}
export default Addanswer

