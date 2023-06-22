import './App.css';
import Navbar from './components/Navbar';
import Udocs from './components/Udocs';
import Scan from './components/Scan';
import Confirm from './components/Confirm';
import Upload from './components/Upload';
import Verify from './components/Verify';
import AScan from "./components/ascan";
import {ethers} from "ethers";
import Doc from "./artifacts/contracts/Doc.sol/Doc.json";
import { useState, useEffect } from 'react';
import {
 
  Routes,
  Route
} from "react-router-dom";
import Home from './components/home';
import Trans from "./scenes/attest/trans"
 import Error from './components/Error';

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import Sidebar from './scenes/global/Sidebar';
import Topbar from "./scenes/global/Topbar"
import Attest from "./scenes/attest/index"
import Check from "./scenes/attest/Check"
import Recieve from "./scenes/transact/Recieve"
import Bill from "./components/billing"
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const change = () => {
    setState({
      provider: null,
      signer: null,
      contract: null,
    });
    setAccount("None");
  }

  const set = async () => {

    const { ethereum } = window;


    const account = await ethereum.request({
      method: "eth_requestAccounts",
    });

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = "0xC3312d75b6628803E1F84e7f5636AD8D83fAc08F";

    const con = new ethers.Contract(contract, Doc.abi, signer)
    setState({ provider, signer, con });


    setAccount(account);

  }


  const [account, setAccount] = useState("None");
  useEffect(() => {
    
    const connectWallet = async () => {

      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });



          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = "0xC3312d75b6628803E1F84e7f5636AD8D83fAc08F";
          setAccount(account);
          const con = new ethers.Contract(contract, Doc.abi, signer)
          setState({ provider, signer, con });

        } else {
          if (window.confirm("MetaMask Not Installed, Do you want to Install?"))
            window.location.href = "https://metamask.io/download/";
        }

      } catch (error) {
        console.log(error);
      }
    };


    connectWallet();

  }, []);

  console.log(state);


  return (<>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        
          <Routes>
            
            <Route path="/" element={<Home state={state} />} />
            <Route path="/developer" element={<>
              <div className="app">
                  <main className="content">
            <Topbar setIsSidebar={setIsSidebar} state={state} account={account} change={change} set={set} isAdmin={true}/>
             <Confirm state={state} account={account} />
             </main>
             </div></>} />
             <Route path="/billing" element={<>
              <div className="app">
              <main className="content">
              <Topbar setIsSidebar={setIsSidebar} state={state} account={account} change={change} set={set} isAdmin={true}/>
                <Bill />
              </main>
             </div></>} />
            <Route path="/user/*" element={
              <>
                <div className="app">
                  <Navbar account={account} change={change} set={set} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} state={state} account={account} change={change} set={set} isAdmin={false}/>
                    <Routes>
                      <Route index element={<Scan state={state} />} />
                      <Route path='/scan' element={<Scan state={state} />} />
                      <Route path="/ascan" element={<AScan state={state} />} />
                      <Route path="/document" element={<Udocs state={state} />} />
                      <Route path="/dverify" element={<Verify state={state} />} />
                      <Route path="/history" element={<Trans state={state} account={account} />} />
                      <Route path="/upload" element={<Upload state={state} account={account} />} />
                      <Route path="/confirm" element={<Confirm />} />
                    </Routes>
                  </main>
                </div>

              </>
            } />


          <Route path='*' element={<Error />} />
            <Route path="/verifier/*" element={
              <>
                <div className="app">
                  <Sidebar isSidebar={isSidebar} account={account} change={change} set={set} isadmin={true} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} state={state} account={account} change={change} set={set} isAdmin={true}/>
                    <Routes>
                      <Route index element={<Dashboard state={state} account={account} />} />
                      <Route path='/dash' element={<Dashboard state={state} account={account} />} />
                      <Route path="/attest" element={<Attest state={state} account={account} />} />
                      <Route path="/docinfo" element={<Check state={state} account={account} />} />
                      <Route path="/recieve" element={<Recieve state={state} account={account} />} />
                      <Route path="/history" element={<Trans state={state} account={account} />} />
                      <Route path="/send" element={<Scan state={state} account={account} />} />
                    </Routes>
                  </main>
                </div>
 
              </>
            } />

<Route path="/admin/*" element={
              <>
                <div className="app">
                  <Sidebar isSidebar={isSidebar} account={account} change={change} set={set} isAdmin={true} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} state={state} account={account} change={change} set={set} isAdmin={true}/>
                    <Routes>
                      <Route index element={<Dashboard state={state} account={account} isAdmin={true}/>} />
                      <Route path='/dash' element={<Dashboard state={state} account={account} isAdmin={true}/>} />
                      <Route path="/attest" element={<Attest state={state} account={account} isAdmin={true}/>} />
                      <Route path="/docinfo" element={<Check state={state} account={account} />} />
                      <Route path="/recieve" element={<Recieve state={state} account={account} />} />
                      <Route path="/history" element={<Trans state={state} account={account} />} />
                      <Route path="/send" element={<Scan state={state} account={account} />} />
                    </Routes>
                  </main>
                </div>
 
              </>
            } />
          </Routes>

         
      </ThemeProvider>
    </ColorModeContext.Provider>
 
</>
  );
}

export default App;
