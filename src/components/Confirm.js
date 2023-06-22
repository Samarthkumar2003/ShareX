import React, { useEffect ,useState} from "react";

export default function Confirm({state,account}) {
     const [data,setdata]=useState(null)
  useEffect(()=>{
    let d=account;
setdata(d)
  });


return(
<>
<div className="container">     

    <h2 style={{marginTop:100}}>Introduction</h2>
    <div >
    <h6 style={{marginTop:40}}>You can interact with the API by placing the qr code in the application form in your website, to accept the document/proofs from users.</h6>
  <h5 style={{marginTop:20}}><b>1) Add  image tag for  displaying Qr code , paste it inside the form .</b> </h5>
  
  <div style={{backgroundColor:"black"}}>
  <pre><code>
    
  &lt;img   src ="" 
        class = "qr-code img-thumbnail img-responsive" id="myimg" / &gt;
	</code></pre>
  </div>

  <h5 style={{marginTop:90}}><b>2) Paste Script inside the body tag at the end :</b> </h5>
  <div style={{backgroundColor:"black" ,marginTop:30}}>
  <pre><code  >
  &lt;script&gt;<br/>
        var dt = new Date().getTime();
        <br/>
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) &#123;
    <br/>
        var r = (dt + Math.random()*16)%16 | 0;
        <br/>
        dt = Math.floor(dt/16);<br/>
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);<br/>
        &#125;);
    </code></pre></div>
    <h6 style={{marginTop:40}}><strong>Important: </strong>Store uuid in your database as refrence to submitted documents by user,which you can view in our admin dash board,by using filter in table.</h6>
  <h6 style={{marginTop:30}}>Qr code is encoded with  <code>publicId</code>&<code>Document.Nos</code>&<code>TransactionId</code><br/> You can mention Documents to be requested from below document Nos <ol style={{marginTop:27}}><li>Adhar</li><li>Passport</li><li>PanCard</li></ol>example : (publicId&12)</h6>
  <div style={{backgroundColor:"black" ,marginTop:30}}>
  <pre><code>
   
  
    <br/>
    let data= <q>{data}&<code style={{color:"green"}}>&lt; Document-Nos&gt;</code>&</q>+uuid<br/>
const link="https://chart.googleapis.com/chart?cht=qr&chl="+data+"&chs=160x160&chld=L|0";<br />
 const image = document.getElementById("myimg");<br/>
 image.src = link;<br/>

      <br/>
      &lt;/script&gt;

	</code></pre>
  </div>
     </div>
     <img src =  
"https://chart.googleapis.com/chart?cht=qr&chl=Hello+World&chs=160x160&chld=L|0"  
        class = "qr-code img-thumbnail img-responsive" />  
          <h5 style={{marginTop:90}}><b>3) Listen to endpoint:</b> </h5>
          <h6 style={{marginTop:30}}>Add this javascript to listen to recieve confirmation from ShareX about the documents transfer status</h6>
        <div style={{backgroundColor:"black" ,marginTop:30}}>
  <pre><code>
  &lt;script&gt;
  let timerId = setInterval(function() &#123<br/>
    fetch(url)<br/>
        .then(response = &#123 response.text())<br/>
        .then(data =&gt &#123<br/>
            console.log("pending")
            if (data === 'success')  &#123<br/>
              console.log("success")<br/>
              document.getElementById("my-form").submit();<br/>
              clearInterval(timerId);<br/>
              &#125;<br/>
            &#125; )<br/>
        .catch(error &eq; &gt; console.error(error));<br/>
        &#125;, 12000);<br/>
  setTimeout(() =&gt;  &#123 clearInterval(timerId); &#125; , 78000);<br/>
    &#125; ,[]);<br/>
    &lt;/script&gt;
    </code></pre>
  </div>
   
<h6 style={{marginTop:30}}>Based on language used for frontEnd you can add script accordingly.Incase of reactjs you can add javascript inside useEffect.</h6>
</div>
 
     
    </>
  );
}
