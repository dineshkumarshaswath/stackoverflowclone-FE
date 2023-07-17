import React, { useState } from 'react'
import Base from './base'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import { Row, Col, Button } from "react-bootstrap"
import { FormControl, Form } from 'react-bootstrap'
import Reactpaginate from 'react-paginate'

function Answer() {
  const history = useHistory()
  const [answer, setAnswer] = useState([])
  const [error, setError] = useState("")
  const [data, setData] = useState(" ")

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/", { replace: true })

    }
    let token = localStorage.getItem("token")

    async function getAllData() {
      const response = await fetch("https://stackclone-be.onrender.com/api/answerall", {
        method: 'GET',
        headers: {
          "x-auth-token": token
        }

      })

      const data = await response.json()
      console.log(data)
      if (data.answers) {
        setAnswer(data.answers)


      }
      else {
        setError(data.message)

      }



    }
    getAllData()
  }, [])

  const [pagenumber, setPagenumber] = useState(0)
  const usersperpage = 5
  const pagesVisted = pagenumber * usersperpage


  const pageCount = Math.ceil(answer.length / usersperpage)

  const changePage = ({ selected }) => {
    setPagenumber(selected)
  }


  return (
    <>
      <Base>
        <Row xs={1} sm={1} md={1} lg={1}    >
          <Form style={{
            display: "grid", placeItems: "center",
            margin: "20px", borderRadius: "10px"
          }}>
            <Form.Label style={{ fontWeight: 'bolder' }}>Search here</Form.Label>
            <Form.Control value={data} style={{ width: "50%" }} type='text'
              onChange={(e) => setData(e.target.value)} />
          </Form> </Row>



        <Row xs={1} sm={1} md={1} lg={1} style={{ rowGap: "10px", margin: "5px" }}>




          {answer.length > 0 ? answer.filter((a) => {
            return data.toLowerCase() == " " ? a : a.question.toLowerCase().includes(data)

          }).slice(pagesVisted, pagesVisted + usersperpage).map((ans, id) => (
            <Col>

              <Card key={id}>

                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text><a href="#" style={{ textDecoration: 'none' }}> {ans.question}</a>  </Card.Text>


                  <Card.Text> {ans.answer}  </Card.Text>



                  <Badge variant="primary" style={{ marginTop: "10px" }}>{ans.keywords}</Badge>
                  <span style={{ display: "flex", justifyContent: "flex-end" }}>
                    {ans.firstName}
                    <Badge bg="success" style={{ marginLeft: "10px" }}>{ans.date}</Badge>
                  </span>


                </Card.Body>

              </Card>


            </Col>

          )) : <div  ><h3 style={{ display: "grid", placeItems: "center", fontWeight: "bolder" }}>
            Loading...</h3></div>}




        </Row>

        <Row>
          <div style={{
            width: "100%", display: "flex",
            justifyContent: "center", alignItems: "center"
          }}>
            <Reactpaginate

              previousLabel={"previous"}
              nextLabel={"next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName='paginationBttns'
              previousLinkClassName='previousBttn'
              nextLinkClassName='nextBttn'
              disabledClassName='paginationDisabled'
              activeClassName='paginationActive'

            />

          </div>
        </Row>

      </Base>

    </>

  )
}


export default Answer

