/*


*/

export default async function getApi() {
  
    // containerRef.innerHTML = "Loading...";
  
    try {
      const response = await fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet');
    //   console.log("response", response);
      const result = await response.json();
    //   console.log("result", result);
      return result
  
    } catch (e) {
      console.log("API", e);
    }
   
   
    // console.log("After catch");
    
  }
  
  
  