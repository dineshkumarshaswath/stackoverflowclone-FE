import React from 'react'
import Base from './base'
import { useState } from 'react'
import { Button, Row, Col, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { useFormik } from 'formik'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const loginSchema = yup.object({
    email: yup.string().required("* required").min(10, 'minimum 10 characters required'),
    password: yup.string().required("* required")

})



function Login() {

    const [error, setError] = useState("")
    const history = useHistory()


    const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema: loginSchema,
        onSubmit: (loginUser) => {
            console.log(loginUser)
            loginFunction(loginUser)
        }

    })

    async function loginFunction(loginUser) {

        setError("")

        const response = await fetch("https://stackclone-be.onrender.com/api/login", {
            method: "POST",
            body: JSON.stringify(loginUser),
            headers: {
                "content-type": "application/json"
            }


        })
        const data = await response.json()

        if (data.token) {

            localStorage.setItem("token", data.token)
            history.push("/answer")

        }
        else {

            setError(data.message)
        }


    }

    return (
        <>
            <Base>


                <Row sm={1} md={1} lg={1} xl={1}
                    style={{ textAlign: "center" }}>

                    <Form onSubmit={handleSubmit}
                        style={{ display: "grid", placeItems: "center", marginTop: "50px", }}
                    >

                        <Col style={{ textAlign: "center", width: '30%', margin: "5px" }}  >
                            <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                                <Form.Label style={{ display: "flex", alignItmes: "start" }}>Email</Form.Label>
                                <Form.Control style={{ textAlign: "center", borderRadius: "20px" }}
                                    type="email"
                                    placeholder="Example:johndue@gmail.com"
                                    value={values.email}
                                    name='email'
                                    onBlur={handleBlur}
                                    onChange={handleChange} /> </Form.Group></Col>

                        <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "5px" }}>
                            {touched.email ? errors.email : ""}</Col>

                        <Col style={{ textAlign: "center", width: '30%', margin: "5px" }} variant="success" >
                            <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                                <Form.Label style={{ display: "flex", alignItmes: "start" }}>Password</Form.Label>
                                <Form.Control type="password" placeholder="Your Password"
                                    style={{ textAlign: "center", borderRadius: "20px" }}
                                    value={values.password}
                                    name='password'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                /></Form.Group> </Col>

                        <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "5px" }}>
                            {touched.password ? errors.password : ""}</Col>


                        <Col style={{ margin: "5px" }}><Button type='submit'>Login</Button>
                        </Col>


                        {error ? <Col style={{ textAlign: "center", width: '30%', margin: "5px" }}
                        ><Form.Control style={{
                            Color: "crimson"
                            , fontWeight: "bold", textAlign: "center"
                        }}
                            placeHolder={error} /></Col> : " "}


                    </Form>

                    <Col >Don't have account?<a href='/signup' >Sign in</a>
                    </Col>
                </Row>
            </Base>
        </>
    )
}

export default Login