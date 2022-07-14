const data = {name:'gokul'}

document.getElementById('addForm').addEventListener('submit',(e)=>{
    console.log("button clicked")
    let name = document.getElementById('name').value
    let roll = document.getElementById('rollno').value
    let dob = document.getElementById('dob').value
    let email = document.getElementById('email').value
    let location = document.getElementById('location').value

    fetch('/student',
    {
        method:"POST",
        body:JSON.stringify({
            rollno:roll,
            name:name,
            dob:dob,
            email:email,
            location:location
        }),
        headers:{
            "content-type":"application/json"
        }
    }
    ).then(res=>res.json())
    .then((data)=>{
        if(data.status ==200){
            let resultBar = "<p> Insert successfully </p>"
            document.getElementById('result').className = 'successResult'
            document.getElementById('result').style.visibility = 'visible'
            document.getElementById('result').innerHTML = resultBar
        }
        else{
            let resultBar = "<p> Data already exists </p>"
            document.getElementById('result').className = 'failureResult'
            document.getElementById('result').style.visibility = 'visible'
            document.getElementById('result').innerHTML = resultBar
        }
    })
    e.preventDefault()
})

// fetch('/student',
//     {
//         method:'POST',
//         body:JSON.stringify({
//             name:'gokul'
//         }),
//         headers:{
//             'content-type':'application/json'
//         }
//     }
// )
