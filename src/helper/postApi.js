  export default function sendToApi(date, content, userName) {
    console.log(date, content, userName)
      fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',{
    method: 'POST',
    headers: {
        'content-Type': 'application/json',
    },
    body : JSON.stringify({
        content : "",
        userName : 'Hell',
        date : '2022-11-24T13:48:44.474Z',   
    })

}).then(response => {
  
  console.log(response.json())
    return 
})

    // .then( data => console.log(data))
    // .catch(error => console.log(error))
  }

