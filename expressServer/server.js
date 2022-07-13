const e = require('express')
const express = require('express')
const app = express()

const {engine} = require('express-handlebars')

const mongo = require('mongodb')

const mongoControl  = mongo.MongoClient

app.set('view engine','hbs')
app.set('views','./views')

app.use('handlebars',engine({extname:'hbs'}))

app.use(express.static(__dirname+'/src'))

app.get('/',(req,res)=>{
    res.render('index')
})

// const dbUrl = 'mongodb://localhost:27017/'
// mongoControl.connect(dbUrl,(error,db)=>{
//     if(error){
//         throw error
//     }
//     else{
//         const dbo = db.db('mydb')
//         var myobj = { name: "Company Inc", address: "Highway 37" };
//         dbo.collection('student').insertOne(myobj,(error,res)=>{
//             if(error){
//                 throw error
//             }
//             else{
//                 console.log('insert')
//                 db.close()
//             }
//         })
//     }
// })

app.listen(3000,()=>console.log('server start'))



