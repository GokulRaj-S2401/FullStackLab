const express = require('express')
const app = express()
const mysql = require('mysql')
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydb'
})

app.use(express.static(__dirname+'/src'))


connection.connect()

const { engine } = require('express-handlebars')

app.set('view engine','hbs')
app.set('views','./views')
app.use('handlebars',engine({extname:'hbs'}))

app.get('/',(req,res)=>{
    connection.query('select * from eventDetails',(err,rows)=>{
        res.render('index',{events:rows}) 
    })
})

app.get('/addEvent',(req,res)=>{
    res.render('add')
})
app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))
app.post('/add',(req,res)=>{
    connection.query(`select * from eventDetails where event_name='${req.body.name}'`,(err,rows)=>{
        if(err){
            throw err
        }
        else{
            if(rows.length == 0){
                connection.query(`insert into eventDetails(event_name,event_date,event_incharge) values('${req.body.name}','${req.body.date}','${req.body.incharge}')`,(err,result)=>{
                    res.json({result:200})
                })
            }
            else{
                res.json({result:100})
            }
        }
    })
})

app.get('/edit/:id',(req,res)=>{
    connection.query(`select * from eventDetails where event_sno='${req.params.id}'`,(err,rows)=>{
        res.render('edit',{event:rows})
    })
})

app.get('/delete/:id',(req,ress)=>{
    connection.query(`delete from eventDetails where event_sno='${req.params.id}'`,(err,rows)=>{
    ress.redirect('/')
    })
})

app.post('/update',(req,res)=>{
    connection.query(`update eventDetails set event_name='${req.body.name}',event_date='${req.body.date}',event_incharge='${req.body.incharge}' where event_sno=${req.body.sno}`,(err,result)=>{
        if(err){
            res.json({result:100})
        }
        else{
            res.json({result:200})
        }
    })
})


app.listen(3000,()=>console.log('server start'))