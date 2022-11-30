export default async function fetchFromAPI() {
      try {
      const response = await fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet');
       const results = await response.json();
       const data = JSON.stringify(results.tweets)
       const posts = JSON.parse(data)
       
      return posts
  
    } catch (e) {
      alert("Could not retrieve tweets", e);
    }  
  }