document.getElementById('addForm').addEventListener('submit',(e)=>{
    let name = document.getElementById('name').value
    let date = document.getElementById('date').value
    let incharge = document.getElementById('incharge').value
    e.preventDefault()

    fetch('/add',{
        method:'POST',
        body:JSON.stringify({
            name:name,
            date:date,
            incharge:incharge
        }),
        headers:{
            "content-type":"application/json"
        }
    }).then((res)=>res.json())
    .then((r)=>{
        if(r.result==200){
            alert('successfully event created')
        }
        else{
            alert('already same event is registered')
        }
    })
})