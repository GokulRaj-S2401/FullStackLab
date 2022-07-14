const data = {name:'gokul'}

document.getElementById('addForm').addEventListener('submit',(e)=>{
    e.preventDefault()
    let name = document.getElementById('name')
    let roll = document.getElementById('rollno')
    let dob = document.getElementById('dob')
    let email = document.getElementById('email')
    let location = document.getElementById('location')

    fetch('/student',
    {
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
    )

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
