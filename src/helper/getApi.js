export default async function getApi() {
  
    // containerRef.innerHTML = "Loading...";
  
    try {
      const response = await fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet');
       const result = await response.json();

      return result
  
    } catch (e) {
      console.log("API", e);
    }  
  }

  