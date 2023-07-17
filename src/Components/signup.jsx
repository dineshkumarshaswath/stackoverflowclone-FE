import React from 'react'
import Base from './base'
import { useState } from 'react'
import { Button, Row, Col } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Navbar from 'react-bootstrap/Navbar';

const singinSchema = yup.object({
   name: yup.string().required("* required").min(7, "minimum 15 characters required"),
   email: yup.string().required("* required").min(15, "minimum 15 characters required"),
   contact: yup.string().required("* required").min(10, "minimum 10 characters required").
      max(10, "maximum 10 characters required"),
   password: yup.string().required("* required").min(10, "Must contain all uppercase and lowercase")
})

function Signup() {
   const history = useHistory()
   const [error, setError] = useState("")

   const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
      initialValues: {
         name: "",
         email: "",
         password: "",
         contact: ""

      },
      validationSchema: singinSchema,
      onSubmit: (signinUser) => {
         console.log(signinUser)
         signupUser(signinUser)
      }

   })


   async function signupUser(signinUser) {


      const response = await fetch("https://stackclone-be.onrender.com/api/signup", {
         method: "POST",
         body: JSON.stringify(signinUser),
         headers: {
            "content-type": "application/json"
         }
      })

      const data = await response.json()
      if (data.token) {

         localStorage.setItem("token", data.token)
         history.push("/")
      }
      else (
         setError(data.message)
      )

   }





   return (
      <>
         <Base>

            <Row sm={1} md={1} lg={1}
               style={{ textAlign: 'center', marginTop: "10px", }}>
               <Form onSubmit={handleSubmit}
                  style={{ display: "grid", placeItems: "center", marginTop: "30px" }}
               >
                  <Col style={{ textAlign: "center", width: '30%' }} variant="success"  >
                     <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{ display: "flex", alignItmes: "start" }}>Name</Form.Label>
                        <Form.Control type="text" placeholder="Your name" style={{
                           textAlign: "center",
                           borderRadius: "20px"
                        }}
                           value={values.name}
                           onBlur={handleBlur}
                           name='name'
                           onChange={handleChange}
                        /></Form.Group>

                  </Col>
                  <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "1px" }}>
                     {touched.name ? errors.name : ""}</Col>

                  <Col style={{ textAlign: "center", width: '30%' }} variant="success" >
                     <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{ display: "flex", alignItmes: "start" }}>Email</Form.Label>
                        <Form.Control type="email" placeholder="Example:john@gmail.com" style={{
                           textAlign: "center",
                           borderRadius: "20px"
                        }}
                           value={values.email}
                           onBlur={handleBlur}
                           name="email"
                           onChange={handleChange}
                        /></Form.Group>

                  </Col>
                  <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "1px", }}>
                     {touched.email ? errors.email : ""}</Col>

                  <Col style={{ textAlign: "center", width: '30%' }} variant="success" >
                     <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{ display: "flex", alignItmes: "start" }}>Contact</Form.Label>
                        <Form.Control type="number" placeholder="Enter phone No"
                           style={{ textAlign: "center", borderRadius: "20px" }}
                           value={values.contact}
                           onBlur={handleBlur}
                           name="contact"

                           onChange={handleChange}
                        /></Form.Group>

                  </Col>
                  <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "1px" }}>
                     {touched.contact ? errors.contact : ""}</Col>

                  <Col style={{ textAlign: "center", width: '30%' }} variant="success"  >
                     <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{ display: "flex", alignItmes: "start" }}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                           style={{ textAlign: "center", borderRadius: "20px" }}
                           value={values.password}
                           onBlur={handleBlur}
                           onChange={handleChange}
                           name="password"
                        /></Form.Group>

                  </Col> <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "1px" }}>
                     {touched.password ? errors.password : ""}</Col>

                  {error ? <Col style={{ textAlign: "center", width: '30%', margin: "10px" }}
                  ><Form.Control style={{
                     Color: "crimson"
                     , fontWeight: "bold", textAlign: "center"
                  }}
                     placeHolder={error} /></Col> : ""}

                  <Col>
                     <Button type='submit'>signup</Button>
                  </Col>


               </Form>
            </Row>
         </Base>
      </>
   )
}

export default Signup