import React, { useState } from 'react'
import { Row, Col, FormControl, Button, Form } from 'react-bootstrap'

import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Base from './base';
import * as yup from 'yup'
import { useFormik } from 'formik';

const questionSchema = yup.object({
  question: yup.string().required("*  required").min(15, "minimum 15 characters required"),
  keywords: yup.string().required("*  required").min(3, "minimum 3 characters required"),

})

function Editquestion({ question, setQuestion }) {

  const history = useHistory()

  const { id, token } = useParams()

  const edituser = question.find((data, idx) => data._id == id)




  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      question: edituser.question,
      keywords: edituser.keywords,

    },
    validationSchema: questionSchema,
    onSubmit: (newquestion) => {
      console.log(newquestion)
      newclassTopics(newquestion)
    }
  })

  async function newclassTopics(newquestion) {

    if (!localStorage.getItem("token")) {
      history.push("/", { replace: true })

    }
    let token = localStorage.getItem("token")



    const response = await fetch(`https://stackclone-be.onrender.com/api/edit/${edituser._id}`, {
      method: 'PUT',
      body: JSON.stringify(newquestion),
      headers: {
        "x-auth-token": token,
        "content-type": "application/json"
      }

    })

    const data = await response.json()
    console.log(data)
    if (data.message == "successfully updated") {

      question[edituser._id] = newquestion

      setQuestion(question)

      alert("successfully edited")

      history.push("/userquestion")

    }
    else {
      console.log(data.message)
    }

  }




  return (
    <Base>
      <Row sm={1} md={1} lg={1}>






        <Form onSubmit={handleSubmit} style={{ display: "grid", placeItems: "center", marginTop: "20px" }} >

          <Col style={{ textAlign: "center", width: '50%' }} variant="success"  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>question</Form.Label>
              <Form.Control as="textarea" rows={3}
                type="text" placeholder="question"
                value={values.question} onChange={handleChange}
                onBlur={handleBlur}
                name="question" />

            </Form.Group></Col>

          <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "10px" }}>
            {touched.question ? errors.question : ""}</Col>

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






          <Col><Button type="submit">Edit</Button></Col>


        </Form>
      </Row>

    </Base>

  )
}
export default Editquestion


