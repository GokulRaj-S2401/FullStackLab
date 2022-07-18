console.log('hel');
document.getElementById('editForm').addEventListener('submit',(e)=>{
    let name = document.getElementById('name').value
    let date = document.getElementById('date').value
    let incharge = document.getElementById('incharge').value
    let id = document.getElementById('hidEl').value
    fetch('/update',{
        method:'POST',
        body:JSON.stringify({
            name:name,
            date:date,
            incharge:incharge,
            sno:id
        }),
        headers:{
            "content-type":"application/json"
        }
    }).then((res)=>res.json())
    .then((r)=>{
        if(r.result==200){
            alert('updated successfully')
        }
        else{
            alert('please verify')
        }
    })
    e.preventDefault()

})