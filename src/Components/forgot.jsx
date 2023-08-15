import React, { useState } from 'react'
import { Col, Form,Navbar,Button } from 'react-bootstrap'



import * as yup from 'yup'
import { useFormik } from 'formik'


import Row from 'react-bootstrap/Row';
import Base from './base';


//schema for the forgotpassword

const forgotSchema = yup.object({
  email: yup.string().required("* required").min(15, 'minimum 15 characters required'),


})

function Forgotpassword() {


  const [error, setError] = useState()
  const [message, setMessage] = useState()

  //here is the formik  validatieon

  const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
    initialValues: {
      email: "",


    },
    validationSchema: forgotSchema,
    onSubmit: (user) => {

      handleClick(user)
    }

  })


  //function for forgot password 
  
  async function handleClick(user) {



    const response = await fetch("https://stackclone-be.onrender.com/api/forgot", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }

    })



    const data = await response.json()
    console.log(data)
    if (data.error) {
      setError(data.error)
    }
    else if (data.message) {

      alert(data.message)
    }



  }

  return (
  
     

    <Base>


      <Row
        sm={1} md={1} xs={1} lg={1} style={{marginTop:"30px",width:"100%" ,textAlign:"center", 
        }} >
      
              <h2 style={{marginTop:"10px",fontWeight:"bolder" ,textAlign:"center", 
        }}>Forgot password</h2>
           
              <Form onSubmit={handleSubmit} style={{width:"100%",display:"grid",placeItems:"center"}}>
              <Col style={{ width: "60%", textAlign: "center" ,marginTop:"10px"}} >
              <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
           <Form.Label style={{ display: "flex", alignItmes: "start" }}>Email</Form.Label>
               
                <Form.Control 
                

                  type="email"
                  placeholder="Example:johndue@gmail.com"
                  value={values.email}
                  name='email'
                  onBlur={handleBlur}
                  onChange={handleChange} /></Form.Group>
                   </Col>
                <Col>
                <div style={{ color: "crimson" }}>
                  {touched.email ? errors.email : ""}
                </div>
                </Col>
                <Col style={{ width: "30%", textAlign: "center" ,marginTop:"10px"}}>
                {error ?
                  <Form.Control style={{
                    margin: "10px",
                    Color: "crimson"
                    , fontWeight: "bold", textAlign: "center",
                  }}
                    placeHolder={error} /> : " "}
                </Col>
               


                <Button variant="success" type='submit' style={{ marginTop: "10px" }}>submit</Button>
              </Form>
            
       



      </Row>
      </Base>

  )
}

export default Forgotpassword