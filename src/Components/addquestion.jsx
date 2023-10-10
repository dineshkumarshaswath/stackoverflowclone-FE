import React, { useState, useEffect } from 'react'
import { Row, Col, FormControl, Button, Form } from 'react-bootstrap'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Base from './base';
import * as yup from 'yup'
import { useFormik } from 'formik';
import ReactQuill from "react-quill"

import "react-quill/dist/quill.snow.css"
import Userbase from './userbase';

const questionSchema = yup.object({
  question: yup.string().required("*  required").min(15, "minimum 15 characters required"),
  keywords: yup.string().required("*  required").min(3, "minimum 3 characters required"),

})

function Addquestion() {
  const history = useHistory()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/", { replace: true })

    }
  })

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      question: "",
      keywords: "",

    },
    validationSchema: questionSchema,
    onSubmit: (newquestion) => {
      console.log(newquestion);
      newclassTopics(newquestion)
    }
  })

  async function newclassTopics(newquestion) {

    if (!localStorage.getItem("token")) {
      history.push("/", { replace: true })

    }
    let token = localStorage.getItem("token")



    const response = await fetch("https://stackclone-be.onrender.com/api/postquestion", {
      method: 'POST',
      body: JSON.stringify(newquestion),
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



    alert("succefully added")
    history.push("/userquestion")


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
export default Addquestion


