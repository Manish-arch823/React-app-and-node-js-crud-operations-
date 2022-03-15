const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser =require('body-parser')
const cors = require('cors')

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud',
})
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.get('/' , (req, res) => {
    // const sqlInsert= "INSERT INTO details_student (id,name) VALUES (1,'mohan')"
    // db.query(sqlInsert, (err,result) => {
        // res.send("hello world")
    // })
    
    
// })
app.post('/api/insert' , ( req , res ) => {

    const stdname=req.body.name
    const stdid=req.body.id  
    const stdemail=req.body.email  
    const stdcontact=req.body.contact 
    const stddob=req.body.dob  
    // const stdphoto=req.body.photo

    sqlInsert = "INSERT INTO details_student (id,name,email,contactno,dob) VALUES (?,?,?,?,?)"
    db.query(sqlInsert,[stdid,stdname,stdemail,stdcontact,stddob],(err,result)=>{
        console.log(result)
    })
} )

app.get('/api/get',(req,res)=>{

    sqlSelect = "select * from details_student "
    db.query(sqlSelect,(err,result)=>{

        // console.log(result)
        res.send(result)
    })
})

app.delete('/api/delete/:s_name',(req,res)=>{
    const  d_name = req.params.s_name
    sqlDelete = "DELETE FROM details_student WHERE name = ? ";
    db.query(sqlDelete,d_name,(err,result) => {
       if (err)  console.log(err)
    })

})

app.put('/api/update',(req,res)=>{
    const stname = req.body.name
    const stid= req.body.email
    // const setemail= req.body.upemail 
    // console.log("stname",stname,stid)
    const sqlUpdate = "UPDATE details_student SET email = ?  WHERE name = ? ";
    db.query(sqlUpdate,[stid,stname],(err,result) => {
       if (err)  console.log(err)
    })

})




app.listen(3001, () => {
    console.log("Running on Port 3001")
})

