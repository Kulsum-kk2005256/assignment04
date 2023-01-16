"use client"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Button
} from "@mui/material";
import {
  Grid,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import users from "../../tmp/users.json";

// import AddButton from '../../../components/add-button';


export default function Ideas(){

  const [showForm, setShowForm] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [ideas, setIdeas] = useState([]);
  let ideasList=[];

  const showFormMethod = () => {
    setShowForm(!showForm);
  }


  
// const fetcher = async (...args) => {
//   const response = await fetch(...args);
//   if (response.ok) {
//     return await response.json();
//   }
//   throw new Error(response.status);
// };

// const query = useQuery(
//   ["identifier"],
//   async () => await fetcher("http://localhost:3000/api/identifier"),
//   {
//     suspense: true,
//     retry: false,
//   }
// );







useEffect(() => {
  
  let uuidStorage = localStorage.getItem('identifier'); 
  if(uuidStorage!=null){
     setIdentifier(JSON.parse(uuidStorage)) ;
  }else{

    const fetchData = async () => {
      // get the data from the api
      const data = await fetch('http://localhost:3000/api/identifier');
      // convert data to json
      const json = await data.json();
      localStorage.setItem('identifier', JSON.stringify(json.uuid));
      setIdentifier(json.uuid);

      const newUsersList = [...users, json.uuid];
      console.log(newUsersList);

      fetch('http://localhost:3000/api/users', {  // Enter your IP address here

      method: 'POST', 
      mode: 'cors', 
      body: JSON.stringify(newUsersList) // body data type must match "Content-Type" header

    })

    // try {
    //   let result = await axios.post(          
    //     "http://localhost:3000/api/users",         
    //     {newUsersList},
    //     {headers:{"Content-Type" : "application/json"}}
    //   );
    //   console.log(result.response.data);
    // } catch (error) {
    //   console.error(error.response.data);     
    // }
      return json.uuid;
    }
    const i = fetchData();
  }

 
  
  const fetchIdeas = async () => {
    // get the data from the api
    const data = await fetch('http://localhost:3000/api/user/ideas');
    // convert data to json
    const json = await data.json();

        
        let  ideasList= json.find((entry)=> entry.uuid==identifier);
          ideasList=ideasList.ideas;


    setIdeas(ideasList);
    return ideasList;
  }
  const list= fetchIdeas();
  setIdeas(list);
  ideasList=list;



},[]);
// useEffect(() => {
// fetchData();
// }, []);

// const fs = require('fs')

// const file = fs.readFileSync('../../tmp/users.json')


// //check if file is empty
// if (file.length == 0) {
//     //add data to json file
//     fs.writeFileSync("../../tmp/users.json", JSON.stringify([identifier]))
// } else {
//     //append data to jso file
//     const json = JSON.parse(file.toString())
//     //add json element to json object
//     json.push(identifier);
//     fs.writeFileSync("../../tmp/users.json", JSON.stringify(json))
// }





  return (
    <>
        <Button onClick={showFormMethod}>Add Idea</Button>
        <Grid container spacing={2}>
        {ideas
          .map((idea) => (
          
            <Grid key={idea} item xs={6} sm={3}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {idea.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {idea.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  )

  //   <p>Button--onclick show form and hide button</p>


}