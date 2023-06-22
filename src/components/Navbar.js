import React from "react";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import StorageIcon from '@mui/icons-material/Storage';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import{NavLink} from "react-router-dom"
export default function Navbar(props) {
 
    const w3_open=()=> {
        console.log()
      document.getElementById("mySidebar").style.display = "block";
      document.getElementById("myOverlay").style.display = "block";
    }
     
    const w3_close =()=> {
      document.getElementById("mySidebar").style.display = "none";
      document.getElementById("myOverlay").style.display = "none";
    } 

    function myAccFunc() {
      var x = document.getElementById("demoAcc");
      if (x.className.indexOf("w3-show") === -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace("w3-show", "");
      }
    }

    const swit= async()=>
    {
      if (window.ethereum && window.ethereum.isMetaMask) {
        try {
          await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
          await window.ethereum._metamask.deactivate();
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      
      
      }
      
    }
    const logout=async()=>{
      props.change();
    }

   function handleLogin (){
      // handle login logic here
      props.set();
    };
return(
     <>
      <nav className="w3-sidebar w3-red w3-collapse w3-top w3-large w3-padding"  id="mySidebar"><br/>
       
      <NavLink to="" onClick={w3_close} className="w3-button w3-hide-large w3-display-topleft"  >Close Menu</NavLink>
     
    <div className="w3-bar-block">
    {props.account=== 'None' && <button id="sub" onClick={handleLogin} style={{width:210,height:44,fontSize:14}} >Login</button>}
    {props.account !== 'None' && (<div>
      <h5>Account ID</h5>
      <p style={{fontSize:11}}>{props.account}</p>
      </div>)}
      <hr/>
      <a href="/user/scan" onClick={w3_close}  className="w3-bar-item w3-button w3-hover-white"><QrCodeScannerIcon sx={{ fontSize: 24 }} style={{marginRight:10}}/>Scan To Send</a>
      <NavLink to="/user/document" onClick={w3_close} className="w3-bar-item w3-button w3-hover-white"> <StorageIcon sx={{ fontSize: 24 }} style={{marginRight:10}}/>Portfolio</NavLink> 
      <NavLink to="/user/dverify"  onClick={myAccFunc} className="w3-bar-item w3-button w3-hover-white" id="myBtn">Attestation<i className="fa fa-caret-down"></i></NavLink> 
 
    <div id="demoAcc" className="w3-bar-block w3-hide w3-padding-large w3-medium">
    <NavLink to="/user/dverify" className="w3-bar-item w3-button w3-hover-white"><PlaylistAddCheckIcon sx={{ fontSize: 30 }} style={{marginRight:10}}/>Manual attest</NavLink>
    <a  href="/user/ascan" className="w3-bar-item w3-button w3-hover-white"> <QrCodeScannerIcon sx={{ fontSize: 24 }} style={{marginRight:10}}/>Scan To Attest</a>
 
 
    </div>
       
      <NavLink to="/user/history" onClick={w3_close} className="w3-bar-item w3-button w3-hover-white"><ReceiptOutlinedIcon sx={{ fontSize: 24 }} style={{marginRight:10}}/>Transactions</NavLink> 
      <NavLink to="/user/upload" onClick={w3_close} className="w3-bar-item w3-button w3-hover-white"><UploadFileIcon sx={{ fontSize: 24 }} style={{marginRight:10}}/>Upload</NavLink> 
       
    </div>
    {props.account !== 'None' && <button style={{marginLeft:24,marginTop:180,width:210,height:44,fontSize:14}} id="sub" onClick={() => { w3_close(); swit(); } }className="w3-bar-item w3-button w3-hover-white">Switch account</button>}
    {props.account !== 'None' && <button  style={{marginLeft:24,backgroundColor:'#f54f4a',width:210,height:44,fontSize:14}} id="sub" onClick={() => { w3_close(); logout(); } }className="w3-bar-item w3-button w3-hover-white">Log out</button>}
  </nav>
 
<header className="w3-container w3-top w3-hide-large w3-red w3-xlarge w3-padding">
<button className="w3-button w3-red w3-margin-right" onClick={w3_open}>☰</button>

  <span>InstaShare</span>
</header>

 
<div className="w3-overlay w3-hide-large" onClick={w3_close}   title="close side menu" id="myOverlay"></div>

      </>
);
}
 