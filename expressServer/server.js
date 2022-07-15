const express = require('express')
const app = express()

const { engine } = require('express-handlebars')
const mongo = require('mongodb').MongoClient

app.set('view engine','hbs')
app.set('views','./views')
app.use('handlebars',engine({extname:'hbs',helpers:{}}))

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))

app.use(express.static(__dirname+'/src'))

const dbUrl = "mongodb://localhost:27017/"

app.get('/add',(req,res)=>{
    res.render('add')
})

app.post('/student',(req,res)=>{
    mongo.connect(dbUrl,(err,db)=>{

        const dbo = db.db('mydb')
        dbo.collection('student').find({rollno:req.body.rollno}).toArray((err,result)=>{
            if(result.length ==0){
                dbo.collection('student').find().count().then((count)=>{
                    dbo.collection('student').insertOne({...req.body,sno:count+1},(err,result)=>{
                        db.close()
                        res.json({'status':200})
                    })
                })
               
            }
            else{
                res.json({'status':100})
            }
        })
    })
})

app.get('/',(req,res)=>{
    mongo.connect(dbUrl,(err,db)=>{
        if(err){
            throw err
        }
        else{
            let dbo = db.db('mydb')
            dbo.collection('student').find().toArray((err,result)=>{
                res.render('index',{result:result})
                db.close()
            })
        }
    })
})

app.get('/edit/:rollno',(req,res)=>{
    res.render('edit',{rollno:req.params.rollno})
})

app.patch('/update',(req,res)=>{
   mongo.connect(dbUrl,(err,db)=>{
    let dbo = db.db('mydb')
    dbo.collection('student').find({rollno:req.body.rollno}).toArray((err,result)=>{
        if(result.length !=0){
            dbo.insertOne(req.body,(err,result)=>{
                if(err){
                    throw err
                }
                else{
                    db.close()
                    req.json({'status':200})
                }
            })
        }
        else{
            req.json({'status':100})
            db.close()
        }
    })
   })
})




app.listen(3000,()=>console.log("server start on \nlocalhost:3000"))