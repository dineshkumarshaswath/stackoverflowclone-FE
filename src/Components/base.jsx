import React from 'react'
import { Children } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';



import { useHistory } from 'react-router-dom';

function Base({ children }) {
  const history = useHistory()
  function handleChange() {
    localStorage.removeItem("token")
    history.push("/")


  }

  return (
    <>
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3"
          style={{ height: '70px', borderBottom: "2px solid lightgrey" }} >
          <Container fluid>
            <Navbar.Brand href="/"><img style={{ Width: "30%", height: "60px", objectFit: "contain" }}
              src="https://logoeps.com/wp-content/uploads/2014/07/Stack-Overflow-logo.png" /></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Stackoverclone
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body >
                <Nav className="justify-content-end flex-grow-1 pe-3" >
                  <NavDropdown
                    title="Home"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/question"> Questions</NavDropdown.Item>
                    <NavDropdown.Item href="/answer">
                      Answers
                    </NavDropdown.Item>

                  </NavDropdown>




                  <NavDropdown
                    title="Your Profile"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/userquestion">your Question</NavDropdown.Item>
                    <NavDropdown.Item href="/useranswer">
                      your Answers
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/addquestion">
                      Add question
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/addanswer">
                      Add Answer
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Button size='sm' style={{ margin: "5px" }} onClick={()=>history.push("/signup")}>Signup</Button>
                  <Button size='sm' style={{ margin: "5px" }} onClick={handleChange}>Logout</Button>

                </Nav>






              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}


      <div>
        {children}
      </div>



    </>
  )

}
export default Base;

