import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};


 
const Sidebar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  function handleLogin(){
    props.set();
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
  return (<>
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {!props.isadmin &&
                <Typography variant="h4" color={colors.grey[100]}>
                 ADMIN
                </Typography>
}
{(props.isadmin) &&
                <Typography variant="h4" color={colors.grey[100]}>
                 VERIFIER
                </Typography>
}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
               
              
              <Box textAlign="center">
              {props.account=== 'None' && <button id="sub" onClick={handleLogin} style={{width:210,height:44,fontSize:14}}>Login</button>}
              {props.account !== 'None' && (
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  fontSize="11px"
                  sx={{ m: "10px 0 0 0" }}
                >
                    
                  {props.account}
                </Typography>)}
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  <hr />
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/verifier/dash"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Operations
            </Typography>
            {props.isadmin && <>
            <Item
              title="Attest Requests"
              to="/verifier/attest"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}

            />
            <Item
              title="Attestation History"
              to="/verifier/history"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /></>
}
{!props.isadmin && <>
            <Item
              title="Database"
              to="/admin/attest"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}

            />
            <Item
              title="Transactions"
              to="/admin/history"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /></>
}
            <Item
              title="Document Information"
              to="/verifier/docinfo"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />


            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Utilities
            </Typography>
            <Item
              title="Receive"
              to="/verifier/recieve"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Send"
              to="/verifier/send"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />


            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Help
            </Typography>
            <Item
              title="Help"
              to="/help"
              icon={<HelpOutlineOutlinedIcon />}
              onClick={() => window.location.href = "https://www.youtube.com/watch?v=cOv1GoWVcY4"}
              selected={selected}
              setSelected={setSelected}
            />
             {props.account !== 'None' && <button style={{marginTop:20,width:210,height:44,fontSize:14}}    id="sub" onClick={swit}className="w3-bar-item w3-button w3-hover-white" >Switch account</button>}
    {props.account !== 'None' && <button  style={{backgroundColor:'#f54f4a',width:210,height:44,fontSize:14}} id="sub" onClick={logout}className="w3-bar-item w3-button w3-hover-white">Log out</button>}
          </Box>
          
        </Menu>
      </ProSidebar>
    </Box>
 
    <Outlet />
  </>
  );
};

export default Sidebar;
