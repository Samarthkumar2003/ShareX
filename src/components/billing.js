import React from "react";
import { useState, useEffect } from 'react';
import {ethers} from "ethers";
 

import Lock from  "../artifacts/contracts/Lock.sol/Lock.json"

export default function Bill() {
  const [c, setc] =useState(null)
    const [sstate, sset] = useState({
      provider: null,
      signer: null,
      contract: null,
      });
      const [bal,setbal]=useState(0.00);
      const [account,setaccount]=useState("None");
      useEffect(() => {
        
    
        const connectsWallet=async()=>{
         
          try {
            const { ethereum } = window;
    
            if (ethereum) {
             
              const account = await ethereum.request({
                method: "eth_requestAccounts",
              });
              setaccount(account);
  
              window.ethereum.on("chainChanged", () => {
                window.location.reload();
              });
    
              window.ethereum.on("accountsChanged", () => {
                window.location.reload();
              });
    
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              
          const contract = "0xC673B5e2ccd8d080343C34e89935826190f039bc";
          setc(contract)
          const conn = new ethers.Contract(contract, Lock.abi, signer)
          sset({ provider, signer, conn });
             
        }
    } catch (error) {
        console.log(error);
      }
    
      
    
    
    }
connectsWallet();
 
 
 
},[]);
 
const getbal=async()=>{
console.log(account)
const balance = await sstate.conn.balanceOf(account[0]);
console.log(`Balance: ${balance}`);
}
getbal()
 
const { BigNumber } = require('ethers');
 
const add_bal=async()=>{
  console.log(sstate); 
  const value = BigNumber.from('100000000000000000');
// const a= await sstate.conn.mint(account[0], value) 
//  console.log(a)
// a.send({
//   from: account[0],
//   gas: 10000000000000000,
// });

const toAddress = account[0];

 
 

 
await sstate.conn.mint(toAddress, value)
 
//await sstate.conn.increaseAllowance(account[0],value);

}
return(
    <>
    <h6 style={{float:"right"}}>Contract address  :  {c}</h6>
    <div className="w3-container w3-center " style={{marginTop:10,marginLeft:40}} id="pricing">
  <h3>PRICING</h3>
  <p className="w3-large">Choose a pricing plan that fits your needs.</p>
  <div className="w3-row-padding" style={{marginTop:64}}>
    <div className="w3-third w3-section">
      <ul className="w3-ul w3-white w3-hover-shadow">
        <li className="w3-black w3-xlarge w3-padding-32">Basic</li>
        <li className="w3-padding-16"><b>0.2</b> Share Tokens</li>
        <li className="w3-padding-16"><b></b> </li>
        <li className="w3-padding-16"><b></b> </li>
        <li className="w3-padding-16"><b></b> </li>
        <li className="w3-padding-16">
          <h2 className="w3-wide">Rs 100</h2>
          <span className="w3-opacity"></span>
        </li>
        <li className="w3-light-grey w3-padding-24">
          <button className="w3-button w3-black w3-padding-large"  onClick={add_bal}>Buy </button>
        </li>
      </ul>
    </div>
    <div className="w3-third">
      <ul className="w3-ul w3-white w3-hover-shadow">
        <li className="w3-red w3-xlarge w3-padding-48">Pro</li>
        <li className="w3-padding-16"><b>0.5</b> Share tokens</li>
        <li className="w3-padding-16"><b></b> </li>
        <li className="w3-padding-16"><b></b> </li>
        <li className="w3-padding-16"><b></b> </li>
        <li className="w3-padding-16">
          <h2 className="w3-wide">Rs. 250</h2>
          <span className="w3-opacity"></span>
        </li>
        <li className="w3-light-grey w3-padding-24">
          <button className="w3-button w3-black w3-padding-large" onClick={add_bal}>Buy</button>
        </li>
      </ul>
    </div>
    <div className="w3-third w3-section">
      <ul className="w3-ul w3-white w3-hover-shadow">
        <li className="w3-black w3-xlarge w3-padding-32">Premium</li>
        <li className="w3-padding-16"><b>1</b> Share tokens</li>
        <li className="w3-padding-16"><b></b> </li>
        <li className="w3-padding-16"><b></b> </li>
        <li className="w3-padding-16"><b></b> </li>
        <li className="w3-padding-16">
          <h2 className="w3-wide">Rs 500</h2>
          <span className="w3-opacity"></span>
        </li>
        <li className="w3-light-grey w3-padding-24">
          <button className="w3-button w3-black w3-padding-large"  onClick={add_bal}>Buy</button>
        </li>
      </ul>
    </div>
  </div>
</div>

    </>
    );}
