import express from "express"
import  bootstrap  from "./src/index.route.js"
//import fetch from 'node-fetch';

// Define the URL of the Java EE API endpoint

const app = express()


bootstrap(express,app)

// const apiUrl = 'http://localhost:8081/ejb8-1.0-SNAPSHOT/api/hello-world';

// // Make a GET request to fetch data
// fetch(apiUrl)
//   .then(response => {
//     // Check if the response status is OK (200)
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     // Parse the JSON response
//     return response.json();
//   })
//   .then(data => {
//     // Handle successful response
//     console.log('Response data:', data);
//   })
//   .catch(error => {
//     // Handle error
//     console.error('Error:', error);
//   });

app.listen(5000,()=>{
    console.log("server is connected")
})