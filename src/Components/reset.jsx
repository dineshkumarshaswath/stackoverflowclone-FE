import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { useParams, useHistory } from "react-router-dom"

import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';


import * as yup from 'yup'
import { useFormik } from 'formik'
import Base from './base';


//schema for the reset the password

const resetSchema = yup.object({
    password: yup.string().required("* required").min(10, ' * minimum 10 characters required'),
    confirmPassword: yup.string().required("* required").min(10, ' * minimum 10 characters required'),


})

function Resetpassword() {

    // const [email,setEmail]=useState()

    const [error, setError] = useState()
    const [message, setMessage] = useState()
    const { token } = useParams()
    const history = useHistory()


    //formik validation part 

    const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""


        },
        validationSchema: resetSchema,
        onSubmit: (userpass) => {

            handleClick(userpass)
        }

    })

    //api the reset the password

    async function handleClick(userpass) {



        const response = await fetch(`https://stackclone-be.onrender.com/api/reset/password/${token}`, {
            method: "POST",
            body: JSON.stringify(userpass),
            headers: {
                "content-type": "application/json"
            }

        })



        const data = await response.json()
        console.log(data)
        if (data.message == " successfully reset the password") {
            alert(data.message)

            history.push("/")
        } else if (data.error) {
            setError(data.error)
        }




    }

    return (
       
          
        <Base>
            <Row
                sm={1} md={1} xs={1} lg={1} style={{
                    marginTop: "30px", width: "100%", textAlign: "center",
                }} >

                <h2 style={{
                    marginTop: "10px", fontWeight: "bolder", textAlign: "center",
                }}>Reset password page</h2>

                <Form onSubmit={handleSubmit} style={{ display: "grid", placeItems: "center" }}>
                    <Col style={{ width: "60%", textAlign: "center", marginTop: "10px" }} >
                        <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{ display: "flex", alignItmes: "start" }}>Password</Form.Label>

                            <Form.Control


                                type="password"
                                Placeholder="your password"
                                value={values.password}
                                name='password'
                                onBlur={handleBlur}
                                onChange={handleChange} /> </Form.Group></Col>

                    <div style={{ color: "crimson" }}>
                        {touched.password ? errors.password : ""}</div>
                    <Col style={{ width: "60%", textAlign: "center", marginTop: "10px" }} >
                        <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{ display: "flex", alignItmes: "start" }}> Confirm Password</Form.Label>


                            <Form.Control


                                type="password"
                                Placeholder="your password"
                                value={values.confirmPassword}
                                name='confirmPassword'
                                onBlur={handleBlur}
                                onChange={handleChange} /></Form.Group></Col>

                    <div style={{ color: "crimson" }}>
                        {touched.confirmPassword ? errors.confirmPassword : ""}
                    </div>

                     <Col style={{ width: "30%", textAlign: "center", marginTop: "10px" }}>
                     {error ?
                        <div style={{ color: "crimson" ,fontweight:"bold" }}>{error}</div> : " "}

                     </Col>
                    

                    <Button variant="warning"
                        type='submit' style={{ marginTop: "10px" }}>submit</Button>

                </Form>




            </Row>
            </Base>






    )
}

export default Resetpassword