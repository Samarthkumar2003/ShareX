import React from "react";
import { useState } from "react";

import axios from "axios";
const Upload = ({ state, account }) => {
  const [file, setFile] = useState(null);
  

  const handleSubmit = async (event) => {
    event.preventDefault();


    const formData = new FormData();
    formData.append("file", file);

    axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        pinata_api_key: 'dcd078cbcf78ef9ef7f3',
        pinata_secret_api_key: '35e4b5e2c63279553f3d7d7322cdb7d075a49a573384bb6b5918722ccd8fe58b',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        let ipfsHash = response.data.IpfsHash;

        console.log(`IPFS hash: ${ipfsHash}`);

        if (state.con) {
          const signer = state.con.connect(state.provider.getSigner());
          
          signer.store(ipfsHash, document.getElementById("dtype").value);
          alert("uploaded ipfs to blockchain sucessfully");
        } else {
          alert("Contract object is undefined or null");
        }
      })
      .catch(error => {
        console.error('Error uploading file to Pinata:', error);
        // Handle error
      });
   await getfile(document.getElementById("dtype").value);

  };

  const [url, seturl] = useState(null);
  const getfile = async (dno) => {

    const documentHash = await state.con.getDocumentHash(dno);
    let u = 'https://ipfs.io/ipfs/' + documentHash;
    console.log(u);
    seturl(u);

  }

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
  
    e.preventDefault();

  };
  return (<>
    <div className="w3-container" style={{ marginTop: 10 ,marginLeft:300}} id="showcase">
      <h3 className="w3-jumbo"><b>Upload</b></h3>
 
      <p>Docments are Stored in ipfs and blockchain</p>
 

    <div className="w3-container" id="contact" style={{ marginTop: 5, marginLeft: 300 }}>

      <div id="wrapper" style={{ marginTop: 15 }}>
      <form onSubmit={handleSubmit} id="foorm" >
   <div class="formbold-mb-5">
           
          <br />
          

<div class="formbold-mb-5 formbold-file-input">
 
          <label for="file">
            <div>
            <input disabled={!account}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile} required />
              <span class="formbold-drop-file"> Drop files here </span>
              <span class="formbold-or"> Or </span>
              <span class="formbold-browse"> Browse </span>
            </div>
          </label>
        </div>
            </div>
          <br /><label htmlFor="app">Doc type: </label>
          <select style={{ color: 'black' }} name="Doctype" id="dtype">
            <option style={{ color: "black" }} value="1">Adhar Card</option>
            <option style={{ color: "black" }} value="2">Pan Card</option>
            <option style={{ color: "black" }} value="3">Passport</option>
            <option style={{ color: "black" }} value="4">Birth Certificate</option>
            <option style={{ color: "black" }} value="5">Sslc Marks Card</option>
            <option style={{ color: "black" }} value="6">Caste Certificate</option>
            <option style={{ color: "black" }} value="7">Voter ID Card</option>
        
          </select>
          <br />

          <a href={url} disabled={!url}>View image</a>
          <button id="sub" type="submit" disabled={!file} style={{marginTop:80 }} >Submit</button>
           
        </form>
    
      </div>
    </div>

    </div>
  </>

  );

};

export default Upload;
