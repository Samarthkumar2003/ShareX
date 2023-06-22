import React from "react";
import {useEffect,useState} from "react";
import qrcode from 'qrcode-generator';
export default function Verifier({state,account}) {
  const {con}=state;
  const [data,setdata]=useState([])
   
  useEffect(()=>{
    const requests=async ()=>{
     const flag=await  con.isVerifier("cmr");
     console.log("aaaf"+flag);
     if(flag===false){
     // await con.reg_verifier("cmr");
      console.log("registered")
     }else{
      console.log("Your registered verifier");
     let d = await con.get_vdocs();
     console.log("gsgsg"+d)
     setdata(d);
     }
      
    }
    
  con&&requests();
  },[con])
 
  function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    
    input = document.getElementById("myInput");
    if(input!=null){
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  }

// qr code javascript
  function accept(ref,sender,name){
    con.attestDocument(sender, name);
    console.log(ref);
    con.removeDoc(ref);
  }

  const [qrCodeImg, setQRCodeImg] = useState(null);
 
  
  const generateQRCode = (event) => {
    setQRCodeImg(null);
    event.preventDefault();
 
    const dtype = event.target.elements.atype.value;
     console.log(dtype)

    var data = account +"&"+ dtype;

    const qr = qrcode(0, 'M');
    qr.addData(data);
    qr.make();

    const qrCodeImg = qr.createImgTag(4);
    setQRCodeImg(qrCodeImg);
  };

//-------------------------------------

return(
<>

<div id="sidebar" style={{marginLeft:320}}>  
<div className="wrapper" >
  
<div id="qrcode" dangerouslySetInnerHTML={{ __html: qrCodeImg }}   ></div>
         
        
     
<div id="dashboard">  
<h3 style={{marginTop :90}}>SCAN QR-CODE</h3>
    <form id="form" onSubmit={generateQRCode}> 
       <label htmlFor="app"><b>Choose purpose type:</b>  </label>
    <select name="Application" id="atype" >
  <option value="123">BMTC  Bus Pass</option>
  <option value="14">Nsp Scholarship</option>
  <option value="15">Passport</option>
  <option value="41">College Admission</option>
  <option value="41">Passport Application</option>
  <option value="31">Bank </option>
  <option value="31">Electrol Id </option>
  <option value="312">Driving License </option>
</select>
<br />
<br />
<input  id="in" style={{marginTop :20}}   type="submit" value="Generate" />

</form>


</div>
    </div>

<div style={{marginTop :20, pady:10,height:320,width:'100%',border:'1  solid #ccc',  boxShadow: '0 0 40 rgba(8,7,16,0.6',font:'16/26  Georgia',overflow:'auto'}}>

 
<div id="tab">
<div className="container">
    <div className="row">
      <div className="col">
        <form  method="post">
        <input type="text" id="myInput" onKeyUp={myFunction} placeholder="Search for names.." />
          <table id="myTable" className="table ">
          <thead>
            <tr>
              <th scope="col">View</th>
              <th scope="col">Ref-Id</th>
              <th scope="col">Document</th>
              <th scope="col">SenderId</th>
              <th scope="col">Verify</th>
              <th scope="col">Reject</th>
              <th scope="col"></th>
            </tr>
           {data.map((d)=> {return(
   
            <tr key={d.ipfsHash}>
               <td><a href={'https://ipfs.io/ipfs/'+d.ipfsHash} type="button"  className="btn btn-primary"   >view</a></td>
              <td><h6>{d.ref}</h6></td>
              <td>{d.name}</td>
              <td>{d.sender}</td>
              <td><button href=" " type="button" className="btn btn-success" onClick={() => accept(d.ref,d.sender, d.name)}><i className="fas fa-edit">Accept</i></button></td>
              <td><button href="  " type="button" className="btn btn-danger"><i className="far fa-trash-alt">Reject</i></button></td>
              
            </tr>
         
           )})

           }
          </thead>
          <tbody>
                 
          </tbody>
        </table>
        </form>
        </div>
       
      </div>
    </div>
</div>
</div>
</div>
</>
);

}
