// import axios from 'axios'
// import React, { useEffect,useState } from 'react'


// const API=()=>{
  
//   const [data, setdata] = useState([]);

//   useEffect(() => {
//     fetch();
//   }, []);

//   const fetch = () => {
//    axios.get("https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=ee0b824f0e86e6076ab1446590729c3e")
//       .then((res) => {
//         console.log(res.data);
        
//         setdata(res.data.articles);
//       })
//       .catch((err) => {
//         console.log(err);
        
//       });
//   };


//  return(
//     <>
//      <div className="container">
//       <h1>Fetched Data</h1>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Sno.</th>
          
//             <th>Title</th>
//             <th>description</th>
//             <th>url</th>
//             <th>Articles</th>
          
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((el,index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
             
//               <td>{el.title}</td>   
//               <td>{el.description}</td>   
//               <td>{el.url}</td>   
//               <td>{el.articles}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     <div className="mt-5">
//                                         </div>
//                                         <div>
//                                             <button onClick={fetch} className="register" >Fetch</button>
//                                     </div>
//     </>
//     )


    
   
// }

// export default API;