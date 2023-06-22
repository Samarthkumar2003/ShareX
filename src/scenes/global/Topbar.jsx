import { Box, IconButton, Popover, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
const Topbar = (props) => {
  const theme = useTheme();
  const { con } = props.state;

  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
const [regs,setregs]=useState("")


const logout=async()=>{
  props.change();
}

function login (){
  // handle login logic here
  props.set();
};
useEffect(() => {
  const check = async () => {
    if (props.account[0].length !== 0) {
      // Add a null check for con
      if (con) {
        var name = await con.getVerifierName(props.account[0]);
        console.log(name)
        if (name.length === 0) {
          var res = window.confirm("Not Registered username,Do you want to register");
        } else {
          setregs(name);
        }

         
        if (res) {  
          reg();
        }
      }
    }
  };
  console.log(props.isadmin)
  if(props.isadmin){
  props.account.length!==0 &&check();
  }
  },[props.account]);

  const  reg=async()=>{
    const name = prompt("Enter unique to recognise you as admin/verifier")
    if(name.length!==0){
    var flag = await con.isVerifier(name);
    }
    if(flag===true)
    {
      window.alert("username already exist add something unique")
    }else{
      await con.reg_verifier(name);
      console.log("registered")
      window.alert("Registered succesfully as "+name);
    }
  }
  // State for the popover
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const openPopover = Boolean(popoverAnchorEl);

  // Content for the popover
  const popoverContent = (
    <Box p={2}>
     {regs.length!==0 && <Typography>{regs}</Typography>}
     {regs.length===0 && <Typography onClick={reg}>Register</Typography>}
      {props.account.length!==0 && <Typography  onClick={logout}>Log Out</Typography>}
      {props.account.length===0 && <Typography  onClick={login}>Log In</Typography>}
    </Box>
  );

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton  component={Link} to="/">
        <HomeIcon />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton >
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton  onClick={handlePopoverOpen}>
          <PersonOutlinedIcon />
        </IconButton>

        {/* Popover */}
        <Popover
          open={openPopover}
          anchorEl={popoverAnchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {popoverContent}
        </Popover>
      </Box>
    </Box>
  );
};

export default Topbar;
