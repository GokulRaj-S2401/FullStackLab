document.getElementById('editForm').addEventListener('submit',(e)=>{
    let name = document.getElementById('e_name').value
    let roll = document.getElementById('e_rollno').value
    let dob = document.getElementById('e_dob').value
    let email = document.getElementById('e_email').value
    let location = document.getElementById('e_location').value

    fetch('/update',
    {
        method:'PATCH',
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
            let resultBar = "<p> update successfully </p>"
            document.getElementById('result').className = 'successResult'
            document.getElementById('result').style.visibility = 'visible'
            document.getElementById('result').innerHTML = resultBar
        }
        else{
            let resultBar = "<p>Please check roll number try again </p>"
            document.getElementById('result').className = 'failureResult'
            document.getElementById('result').style.visibility = 'visible'
            document.getElementById('result').innerHTML = resultBar
        }
    })
    e.preventDefault()
})