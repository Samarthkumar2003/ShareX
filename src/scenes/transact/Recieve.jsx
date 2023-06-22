import React from "react";
import {useState} from "react";
import qrcode from 'qrcode-generator';
export default function Recieve({state,account}) {
   
    
 
  

// qr code javascript 

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

<div id="sidebar" style={{marginLeft:100,marginTop:100}}>  
<div className="wrapper" >
  
<div id="qrcode" dangerouslySetInnerHTML={{ __html: qrCodeImg }}   ></div>
         
        
     
<div id="dashboard">  
<h3 style={{marginTop :90}}>SCAN QR-CODE</h3>
    <form id="form" onSubmit={generateQRCode}> 
       <label htmlFor="app"><b>Choose Application type:</b>  </label>
    <select name="Application" id="atype" >
  <option value="123">BMTC  Bus Pass</option>
  <option value="14">Nsp Scholarship</option>
  <option value="15">Passport</option>
  <option value="41">College Admission</option>
</select>
<br />
<br />
<input  id="sub" style={{marginTop :100,width:300}}   type="submit" value="Generate" />

</form>


</div>
    </div>

 
</div>
</>
);

}