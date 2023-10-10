import React, { useState } from 'react'
import { Row, Col, FormControl, Button, Form } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Base from './base';
import * as yup from 'yup'
import { useFormik } from 'formik';
import Userbase from './userbase'

const answerSchema = yup.object({

  question: yup.string().required("* required").min(15, "minimum 15 characters required"),
  answer: yup.string().required("* required").min(15, "minimum 15 characters required"),
  keywords: yup.string().required("*  required").min(3, "minimum 3 characters required")

})

function Editanswer({ answer, setAnswer }) {

  const history = useHistory()

  const { id, token } = useParams()

  const edituser = answer.find((data, idx) => data._id == id)




  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {

      question: edituser.question,
      answer: edituser.answer,
      keywords: edituser.keywords,

    },
    validationSchema: answerSchema,
    onSubmit: (newanswer) => {
      console.log(newanswer)
      newclassTopics(newanswer)
    }
  })

  async function newclassTopics(newanswer) {




    const response = await fetch(`https://stackclone-be.onrender.com/api/ansedit/${edituser._id}`, {
      method: 'PUT',
      body: JSON.stringify(newanswer),
      headers: {
        "x-auth-token": token,
        "content-type": "application/json"
      }

    })

    const data = await response.json()
    console.log(data)
    if (data.message == "successfully updated") {

      answer[edituser._id] = newanswer
      console.log(newanswer)
      setAnswer(answer)

      alert("successfully edited")
      history.push("/useranswer")



    }
    else {
      console.log(data.message)
    }


  }




  return (
    <Userbase>
      <Row sm={1} md={1} lg={1}>






        <Form onSubmit={handleSubmit} style={{ display: "grid", placeItems: "center", marginTop: "20px" }} >

          <Col style={{ textAlign: "center", width: '50%' }} variant="success"  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Question</Form.Label>
              <Form.Control as="textarea" rows={3}
                type="text" placeholder="Question"
                value={values.question} onChange={handleChange}
                onBlur={handleBlur}
                name="question" />

            </Form.Group></Col>

          <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "10px" }}>
            {touched.question ? errors.question : ""}</Col>

          <Col style={{ textAlign: "center", width: '50%' }} variant="success"  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Answer</Form.Label>
              <Form.Control as="textarea" rows={3}
                type="text" placeholder="Answer"
                value={values.answer} onChange={handleChange}
                onBlur={handleBlur}
                name="answer" />

            </Form.Group></Col>

          <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "10px" }}>
            {touched.answer ? errors.answer : ""}</Col>



          <Col style={{ textAlign: "center", width: '50%' }} variant="success"  >
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






          <Col><Button type="submit" variant="outline-success">Edit</Button></Col>


        </Form>
      </Row>

    </Userbase>

  )
}
export default Editanswer

