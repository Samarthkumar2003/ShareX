 
import React from "react";
import {useEffect,useState} from "react";
import { v4 as uuidv4 } from 'uuid';
export default function Verify({state}) {
  const {con}=state;
  const [docs,setdocs]=useState([]);
    

  const sub=async(event)=>
  {  event.preventDefault();
    const sendTo=document.getElementById("p").value;
    console.log(sendTo)
    const hashes= document.getElementsByClassName("vehicle1");
    const selectedHashes = [];
    console.log(hashes.length)
     
    for (let i = 0; i < hashes.length; i++) {
      if (hashes[i].checked) {
        var data =hashes[i].value.split("&");
        
        let uuid = uuidv4();
        await con.Share(uuid,sendTo,data[0],data[1])
      
      }
    }
  
    console.log("k"+selectedHashes)

  };
  
  useEffect(() => {  
    console.log(con)
    const get = async()=> {
      if(con){
       const a=await con.getall();
      console.log(a);
      setdocs(a);
      }
    }
    get();
  }, [con]); 



 return( <>  <div className="w3-container" style={{marginTop:1,marginLeft:320 }} id="showcase">
        <h1 className="w3-jumbo"><b>Verify</b> </h1>
        <h1 style={{width:50,border:'5 solid red'}} className="w3-round"> </h1>
    <p>Select & send required documents to be attested.</p>
 
<div className="w3-container" id="contact" style={{marginTop:20,marginLeft:30}}>
 <div id="tab">
     
             <form >
             <div className="input-group">
    <div className="input-group-prepend">
      <div className="input-group-text" id="btnGroupAddon2">@</div>
                 <input type="text" name="id" placeholder="verifier_id" required id="p" />
               </div>
               <button  className="sub" type="Send"  onClick={sub}>Send</button>
               </div>
                 <div className="container">
                     <div className="row">
                       <div className="col">
               <table id="ta" className="table " style={{marginTop:30,width:900}}>
               <thead>
                 <tr>
                   <th scope="col"></th>
                   <th scope="col">Document</th>
                   <th scope="col">Select</th>
                 
                 </tr>
               </thead>
               <tbody>
           
               {docs.map((d)=> {return(
            <tr key={d.ipfs+d.name+d.sender}>
              <td><a href={'https://ipfs.io/ipfs/'+d.hash} type="button"  className="btn btn-primary"   >View</a></td>
              <td>{d.name==="1" ? "Aadhar": d.name==="2" ? "Pan Card": d.name==="3" ? "Passport": d.name=== "4" ?"Birth Certificate":d.name=== "5"?"Sslc marks card":"" }</td>
              <td>{d.sender}</td>
              <td><input type="checkbox" id="vehicle1" className="vehicle1" value={d.hash+"&"+d.name} / ></td>
            </tr>

           )})

           }               
               </tbody>
             </table>
         
     
             </div>
         </div>
         </div>
             </form>   
     </div>
       
     </div>
     </div>
</> );
 
}
