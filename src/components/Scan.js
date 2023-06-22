/* eslint-disable */
import React from "react";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import { v4 as uuidv4 } from 'uuid';

export default function Scan({ state }) {
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setmsg] = useState(null);
 
  useEffect(() => {
    let scanner = new Instascan.Scanner({ video: document.getElementById("preview") });
 
    const handleScan = (c) => {
      if (c.length > 0) {
        let cc = c.split("&");
        check_reciever(cc[0], state.con);
        state.con && operation(cc, state.con);
      }
    };

    Instascan.Camera.getCameras()
      .then(function (cameras) {
        if (cameras.length > 0) {
          scanner.addListener("scan", handleScan);
          scanner.start(cameras[0]);
        } else {
          alert("no camera found");
        }
      })
      .catch(function (e) {
        console.error(e);
      });

    return () => {
      scanner.removeListener("scan", handleScan);
      scanner.stop();
    };
  }, [state.con]);


  const operation = async (cc, cona) => {
    let str = cc[1];
    let k = 0, t = 0;
    let a = [];
    let ll = cc[0];
    let l = [];
    let mm=[];
    if (ll.length == 42) {
      if (cona) {
        for (let i = 0; i < str.length; i++) {
          try {
            let ha = await cona.getDocumentHash(str[i]);
            console.log(ha.length)
            if (ha.length == 0) {
              a[k++] = str[i];
              
              mm[k++]=  str[i]==="1" ? "Aadhar": str[i]==="2" ? "Pan Card": str[i]==="3" ? "Passport": str[i]=== "4" ?"Birth Certificate":str[i]=== "5"?"Sslc marks card":"" ;
            } else {
              if (ha) {
                ha.forEach(document => {
                  if (document.hash && document.hash !== '') {
                    console.log(document.hash + "a")
                    l[t++] = document.hash;
                  }
                });

              }
            }
          } catch (error) {
            console.error(error);
          }


        }
        console.log(a + "a" + str + "J" + l)

        if (a.length != 0) {

          setShowAlert(true);
          setmsg({ m: `Add required documents\t${mm}`, type: "danger" })
        } else {
          let uuid;
          if(cc[2].length==0){
         uuid = uuidv4();
          console.log(uuid + "faa")
          }else{
              uuid =cc[2];
          }
          for (let i = 0; i < l.length; i++) {
            console.log(l[i] + "Sg");
            try {
             
              await cona.Share(uuid, ll, l[i], str[i]);
            } catch (error) {
              console.error(error);
            }
            setShowAlert(true);
            setmsg({ m: "Document Sent Sucessfully", type: "success" })
          }
         
          if(cc[2].length!=0){
            const url = 'https://sharex-385913.nw.r.appspot.com/transactions/'+cc[2]
            console.log(url)
            fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
     
              })
            })
              .then(response => {
                // handle the response here
              })
              .catch(error => {
                // handle the error here
              });
          }
        }
        console.log("oveer");
      }

    } else {
      setShowAlert(true);
      setmsg({ m: "Invalid Address", type: "danger" })
    }
  }


  const check_reciever = async (c, cona) => {

    let res = ""

    if (cona) {
      console.log(c)
      res = await cona.getVerifier("cmr");
      console.log("this" + res)
      if (res.length >= 42) {
        if (res == "0x0000000000000000000000000000000000000000") {
          setShowAlert(true);
          setmsg({ m: "Verifier Does Not Exist", type: "primary" })
        }
      } else if (res.length < 42) {
        setShowAlert(true);
        setmsg({ m: "Verifier Does Not Exist", type: "primary" })
      }
    }
  }

  return (
    <>

      <div className="w3-main" id="share-top" style={{ marginLeft: 300, marginTop: 10, position: "relative" }} >

        <div className="w3-container" id="showcase">
          <h1 className="w3-jumbo"  ><b>ShareX</b></h1>
          <h1 className="w3-xxxlarge w3-text-red"><b> Scan QR Code.</b></h1>
          <h1 className="w3-round"> </h1>

          <p>Scan Qr code of organisation or administration where you want to send.</p>
          {showAlert && <Alert alert={msg} />}
          <div className="w3-container" id="services" style={{ marginLeft: 110 }}  >
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <video id="preview" width="450px" breadth="450px"  ></video>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}
