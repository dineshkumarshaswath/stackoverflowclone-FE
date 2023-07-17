import React, { useState } from 'react'
import Base from './base'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import {Row,Col, Button} from "react-bootstrap"
import {  FormControl, Form } from 'react-bootstrap'

function Userquestion({question,setQuestion}){
   const history=useHistory()
    // const [question,setQuestion]=useState([])
    const [error,setError]=useState("")
    const[data ,setData]=useState(" ")

    const tok= localStorage.getItem("token")
    useEffect(()=>{
        if(!localStorage.getItem("token")){  
          history.push("/",{replace:true})

        }
        let token= localStorage.getItem("token")

         async function getAllData(){
            const response= await fetch("https://stackclone-be.onrender.com/api/userquestion",{
                method:'GET',
                headers:{
                    "x-auth-token":token
                }

            } )
          
            const data=await response.json()
            console.log(data)
            if(data.userquestion){
                setQuestion(data.userquestion)
                console.log(data.userquestion);

            }
            else{
                       setError(data.message)
                       console.log(data.message)
            }

           

        }
        getAllData()
    },[])

    

  async function handleDelete(id){

    const response=await fetch(`https://stackclone-be.onrender.com/api/delete/${id}`,{
      method:"DELETE",
      headers:{
        "x-auth-token":tok
      }
    })
    const data= await response.json()

    if(data.message="successfully deleted"){
      const userquestion = question.filter((data,idx)=> data._id !== id)
     console.log(userquestion)
     setQuestion(userquestion)
    
    }
  
  else {
    console.log("you have not deleted")
  }
}


    return(
        <>
     <Base>
     <Row  xs={1} sm={1} md={1} lg={1}  >
      <Form  style={{ display:"grid", placeItems: "center",
     margin: "20px", borderRadius:"10px" }}>
       <Form.Label style={{fontWeight:'bolder'}}>Search here</Form.Label>
     <Form.Control   value={data} style={{width:"50%"}} type='text' 
       onChange={(e)=>setData(e.target.value)}/>
      </Form> </Row>
      
     

     <Row  xs={1} sm={1} md={1} lg={1} style={{rowGap:"10px",margin:"5px"}}>

   

    
     {question.length >0?  question.filter((a)=>{ 
       return data.toLowerCase().trim() == ""? a:a.question.toLowerCase().includes(data)

    }).map((qus,id)=>(
       <Col>
      
       <Card key={id}>
        
         <Card.Body>
           <Card.Title></Card.Title>
           <Card.Text><a href="#" style={{textDecoration: 'none'}}> {qus.question}</a>
          
           </Card.Text>
           
           <Badge variant="primary" style={{marginTop:"10px"}}>{qus.keywords}</Badge>
           <span style={{display:"flex",justifyContent:"flex-end" }}>
          {qus.firstName}
           <Badge bg="success" style={{marginLeft:"10px"}}>{qus.date}</Badge>
           </span>
          
           <Button variant='danger'  size="sm" style={{margin:"5px"}}
            onClick={()=>handleDelete(qus._id)}>Delete</Button>
           <Button variant='info' size="sm" 
             onClick={()=>history.push(`/edit/${qus._id}/${tok}`)} >Edit</Button>

         </Card.Body>
        
       </Card>
     
        
        </Col> 

    )):<div>
      <h3 style={{display:"grid",placeItems:"center",fontWeight:"bolder"}}>
        you haven't posted yet</h3></div>}
    
    

    
   </Row>
   </Base>

   </>
   
    )
}
 

export default Userquestion

