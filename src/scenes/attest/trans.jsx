import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

 
import React from "react";
import { useEffect, useState } from "react";
 
 
 

const Trans = ({ state, account }) => {

    
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { con } = state;
  const [data, setdata] = useState([])
  const [at, setat] = useState([])

 

  function date(timestamp)
  {
    const date = new Date(timestamp * 1000);  

    const dateString = date.toLocaleString(); 
    
    console.log(dateString);
    return dateString
}
  

 
  useEffect(() => {
    const requests = async () => {
    
        let d = await con.get_trans();
        setdata(d);
        let a =await con.get_vdocs();
        setat(a);

  
console.log(at)
    }

    con && requests();
  }, [con])
  
  return (

    <div  style={{marginLeft:300}}>
    <Box m="20px">
      {/* HEADER */}
     

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
     

        {/* ROW 2 */}

        <Box
          gridColumn="span 8"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
               Transactions
            </Typography>
          </Box>
          <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    borderBottom={`4px solid ${colors.primary[500]}`}
    p="15px"
    fontWeight="600"
    color={colors.grey[100]}
  >
    <Box>Name</Box>
    <Box>IPFS Hash</Box>
    <Box>Time</Box>
    <Box>Status</Box>
  </Box>
          {data.map((d) => {
            return (
              <Box
                key={`${d.time}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {d.name}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                  {d.status}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{d.ipfsHash}</Box>
                <Box color={colors.grey[100]}>{date(d.time)}</Box>
                <Box
                 backgroundColor={d.verified === "Approved" ? colors.greenAccent[500] : colors.redAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {d.verified}
                </Box>
              </Box>

            )
          })};

        </Box>

        {/* ROW 3 */}
      


      </Box>
    </Box>
    </div>
  );
};

export default Trans;
