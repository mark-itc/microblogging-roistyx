  export default function sendToApi(date, content, userName) {
    fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/weetERROR',{
    method: 'POST',
    headers: {
        'content-Type': 'application/json',
    },
    body : JSON.stringify({
        date : date,
        content : content,
        userName : userName,

    })

}).then(response => {
  
  console.log(response.json())
    return 
})

    .then( data => console.log(data))
    .catch(error => console.log(error))
  }

