const express = require('express')
const app = express()

const { engine } = require('express-handlebars')
const mongo = require('mongodb')

app.set('view engine','hbs')
app.set('views','./views')
app.use('handlebars',engine({extname:'hbs'}))

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))

app.use(express.static(__dirname+'/src'))

const mongoControl = mongo.MongoClient
const dbUrl = "mongodb://localhsot:27017/"


app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/student',(req,res)=>{
    // mongoControl.connect(dbUrl,(error,db)=>{
    //     if(error){
    //         throw error
    //     }
    //     else{
    //         const dbControl = db.db('mydb')
    //         dbControl.collection('student').insertOne(
    //             {rollNo:req.body.rollNo,name:req.body.name,dob:req.body.dob,email:req.body.email,location:req.body.location},
    //             (error,result)=>{
    //             if(error){
    //                 throw error
    //             }
    //             else{
    //                 console.log(`insertion did successfully`)
    //                 db.close()
    //             }
    //         })    
    //     }
    //   })
    console.log(req.body)
})

app.get('/add',(req,res)=>{
    res.render('add')
})

app.get('/student',(req,res)=>{
    console.log(req.body)
})
app.listen(3000,()=>console.log("server start on \nlocalhost:3000"))