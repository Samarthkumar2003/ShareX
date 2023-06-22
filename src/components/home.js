import React from "react";
import { useEffect } from "react";
 
export default function Home(props) {
  useEffect(() => {
    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const carouselChildrens = [...carousel.children];
    
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
    
 
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
    
 
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
    
   
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
     
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
    
     
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });
    
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }
    
    const dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
    
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }
    
    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
    
        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if(!wrapper.matches(":hover")) autoPlay();
    }
    
    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();
    
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
  }, []);  
return(
    <>
       
 
 
<nav id="tophome">
          
                      <div className="menu">
               <ul>
                  <li><a href="#"  className="active">Home</a></li>
                  <li>    <a href="/user"  >User</a></li>
                  <li>  <a href="/admin"  >Admin</a></li>
                  <li><a href="/verifier" >Verifier</a></li>
                  <li><a href="/developer"  >Integrations</a></li>
                  <li> <a href="/billing" >Token Deposits</a></li>
               </ul>
            </div> 
            
         </nav>
 
        
<header className="w3-container w3-red w3-center" style={{paddingTop: 228, paddingBottom: 128 }} id="hometop">
 
  <div className="contentt" style={{paddingLeft:750}}  > <h2>ShareX</h2>
    <h2>ShareX</h2></div> 
  <p className="w3-xlarge" style={{paddingTop: 108 }}> Application & verification simplified</p>
  <a href="/user/scan" ><button className="w3-button w3-black w3-padding-large w3-large w3-margin-top">Get Started</button></a>
  
</header> 
 
<div className="w3-row-padding w3-padding-64 w3-container" style={{backgroundColor:"white",color:"black"}}>
  <div className="w3-content">
    <div className="w3-twothird">
      <h1>ShareX</h1>
      <h5 className="w3-padding-32">ShareX is a web-based application for document sharing, verification, and application. It allows users to upload, share, and verify documents with ease. The platform is designed to streamline the process of document sharing and verification for businesses, organizations, and individuals.
      </h5>

      <p className="w3-text-grey">With ShareX, users can experience a seamless and secure document sharing process. The integration of blockchain technology ensures the immutability and authenticity of documents, providing users with a trusted source of truth. By leveraging IPFS, documents are stored in a decentralized network, eliminating the risks associated with centralized storage and enhancing security.Also made process of application a breeze.
 </p>
    </div>

    <div className="w3-third w3-center" >
      <img  src="https://img.freepik.com/free-vector/completed-steps-concept-illustration_114360-5521.jpg?w=740&t=st=1684064876~exp=1684065476~hmac=27482d9df347a58deffb14850083d698f48b932e8a7c62eb370a121b162ae109" style={{height:500}}></img>
    </div>
    
  </div> 
  
  </div>
  
  <h2 style={{paddingLeft:670,marginTop:80}}>Types of Roles</h2>
 
 
<div className="wrapper" style={{marginLeft:200,marginTop:21}}>
  <i id="left" className="fa-solid fa-angle-left" />
  <ul className="carousel">
    <li className="card">
      <div className="img">
        <img src="https://img.freepik.com/free-vector/text-files-concept-illustration_114360-4402.jpg?w=996&t=st=1684052638~exp=1684053238~hmac=400c9a88355b17bbdf3f3750d6c0d093d273cd888df8fb3264a4c362514d36cb" alt="img" draggable="false" />
      </div>
      <h2>USER</h2>
       
    </li>
    <li className="card">
      <div className="img">
        <img src="https://img.freepik.com/free-vector/file-searching-concept-illustration_23-2148277021.jpg?w=900&t=st=1684052985~exp=1684053585~hmac=5f2c3e36a6932714142412ef203518c3fb1d698e9760644d48e009c1e1cefe7a" alt="img" draggable="false" />
      </div>
      <h2>Admin</h2>
      <span></span>
    </li>
    <li className="card">
      <div className="img">
        <img src="https://play-lh.googleusercontent.com/5mQ8M1CfrOyYC5UbaUtQBpUDj7gLxLRcS3m-w4Ytbw-kHZ45AJTg3pAbjhDgSrbA1Gl9" alt="img" draggable="false" />
      </div>
      <h2>Verifier</h2>
      <span> </span>
    </li>
     </ul>
  <i id="right" className="fa-solid fa-angle-right" />
</div>
 
 
<div className="w3-row-padding w3-light-grey w3-padding-64  "  >
  <div className=" ">
    <div className="w3-half  "  >
      <img src="https://img.freepik.com/free-psd/3d-nft-icon-chain_629802-28.jpg?size=626&ext=jpg&ga=GA1.1.2035169776.1684052345&semt=sph" style={{ height:550,width:550 ,marginTop:1}}></img>
    </div>

    <div className="w3-half">
      <h1>Web 3.0</h1>
      <h5 className="w3-padding-32">With the integration of IPFS (InterPlanetary File System), your documents are securely stored in a decentralized network of nodes. Our Web3 solution eliminates the need for physical copies or carrying important documents with you.You can access your documents instantly through a user-friendly web interface or mobile application.Whether it's educational certificates, identity proofs, or legal documents, all your important paperwork is just a few clicks away.</h5>

      <p className="w3-text-grey">In conclusion, ShareX represents the epitome of the Web3 revolution, offering a powerful and versatile web-based application that embraces the principles of decentralization, security, and user empowerment. By combining the cutting-edge technologies of blockchain, IPFS, and a user-centric approach, ShareX is at the forefront of shaping the future of document management and sharing.</p>
    </div>
    <div>
      <img src="https://play-lh.googleusercontent.com/4jlq9fgOmpkCikwBzJYkbXlkruFo1ygmaLaaLcLph9ln8sQgQ78P0-6teFkczp1S0N-l"  style={{width:70}}/>
      <img src="https://cdn-icons-png.flaticon.com/512/1237/1237946.png?w=740&t=st=1684115990~exp=1684116590~hmac=8591829b99e1e9f20ce8c1a9cb315dd86fe208a551c8dc6ac60bde2c51c0580a" style={{width:20}}/>
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png"  style={{width:50,marginLeft:13}}/>
      
      <h3 style={{display:"inline"}}> = ShareX</h3>
    </div>
  </div>
</div>

<div className="w3-container w3-black w3-center w3-opacity w3-padding-64">
    <h1 className="w3-margin w3-xlarge">Motto: "Sharing made secure and effortless - your decentralized document hub."</h1>
</div>

<footer className="w3-container w3-padding-64 w3-center w3-opacity">  
  <div className="w3-xlarge w3-padding-32">
    <i className="fa fa-facebook-official w3-hover-opacity"></i>
    <i className="fa fa-instagram w3-hover-opacity"></i>
    <i className="fa fa-snapchat w3-hover-opacity"></i>
    <i className="fa fa-pinterest-p w3-hover-opacity"></i>
    <i className="fa fa-twitter w3-hover-opacity"></i>
    <i className="fa fa-linkedin w3-hover-opacity"></i>
 </div>
 
</footer>
 
    </>)
}
     
