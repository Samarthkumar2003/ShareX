
import { Box} from "@mui/material";
 
 
import Header from "../../components/Header";
import {useState} from "react";
const Check= ({state,account}) => {
 
   const [at, setat] = useState([])
  const {con}=state;
  const [data,setdata]=useState([])
  const [vhash,setvhash]=useState([])
  const requests=async ()=>{
     
    let hash = document.getElementById("myInput").value;
    if(hash.length>20){
      
    var d = await con.get_docinfo(hash);
    console.log(await con.get_docinfo(hash)+"fa")
    setdata(d);
    console.log(d);
    }
    var a=[]
    if(d){
    d.forEach(element => {
       
      var f=getname(element);
      
      a.push(f);
      
    });
  }
  console.log(a)
setvhash(a);
 
   }
   console.log("this"+vhash)
   
 
const getname=async(element)=>{
 return await con.getVerifierName(element);
}
  return (<>


 
    <Box m="20px">
      <Header title="Document Info" subtitle="check verification information" />
     
 
       
      <input type="text" id="myInput"   placeholder="Enter Document Hash" style={{width:800}} />
               
               <button id="sub" className="sub" type="Send"  onClick={requests} style={{width:140,fontSize:14,}}>Check</button>
  
      <table id="myTable" className="table " style={{width:800,marginTop:24}}>
          <thead>
            <tr>
              <th scope="col">Verified Id</th>
              {/*<th scope="col">Owner Name</th>
              <th scope="col">Document Name</th>
  <th scope="col"></th>*/}
            </tr>
          
            {data.map((d, index) => {
    const a = at[index];
    return(
            <tr>
              <td>{d}</td>
              <td>{a} </td>
            </tr>
            

            )})}
            </thead>
            </table>
            
      </Box>
</>    );
};

export default Check;
