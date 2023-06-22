import React, { useEffect, useState } from "react";

export default function Udocs({ state }) {
  const { con } = state;
  const [docs, setdocs] = useState([]);


  useEffect(() => {
    console.log(con)
    const get = async () => {
      if (con) {
        const a = await con.getall();
        console.log(a);
        setdocs(a);
      }
    }
    get();
  }, [con]);

  return (<>
    <div className="w3-container" style={{ marginTop: 5, marginLeft: 320}} id="showcase">
      <h1 className="w3-jumbo"><b>My Documents</b></h1>
      <h1 style={{ width: 50, border: '5px solid red' }} className="w3-round"> </h1>
      <p></p>
      <hr/>
    </div>

    <div className="w3-container" id="contact" style={{ marginTop: 5, marginLeft: 320 }}>
      <div>

        <div className="w3-row-padding w3-grayscale">
          {docs.length!==0 && docs.map((d) => {

            return (
              <div style={{ marginLeft:10,marginTop:10}} className="w3-col m4"  key={d.hash+d.name}>
              <div className="flip-card"   >
                <div className="flip-card-inner" style={{ height: 380 }}>

                  <div className="flip-card-front">
                    <a href={'https://ipfs.io/ipfs/' + d.hash} target="_blank" rel="noreferrer"><img src={'https://ipfs.io/ipfs/' + d.hash} alt="not Available" style={{ width: "100%", height: 220 }} /></a>
                  
                    <h3>{d.name==="1" ? "Aadhar": d.name==="2" ? "Pan Card": d.name==="3" ? "Passport": d.name=== "4" ?"Birth Certificate":d.name=== "5"?"Sslc marks card":"" }</h3>
           
                  </div>
            
                  <div className="flip-card-back"  >
                    <h5 style={{marginLeft:80}}>Verified By</h5><br/>
                    <div style={{ maxHeight: "100px", overflow: "auto" }}>
    {d.status.slice(0, 5).map((item) => (
      <p>{item}</p>
    ))}

    {d.status.length===0 && <h6 style={{ marginLeft:76 }}>Not Verified yet</h6>}
  </div>
                    <a href={'https://ipfs.io/ipfs/' + d.hash} className="btn btn-primary" style={{ marginTop: 160,marginLeft:105 }} target="_blank" rel="noreferrer">View</a>
                  </div>
                

                </div>
              </div>
              </div>
            
               

            )
          })

          }

          {docs.length===0 && <h3 style={{color:"grey" ,marginLeft:400}}>No Documents Uploaded</h3>}
        </div>

      </div>
    </div>
  </>

  );

}
