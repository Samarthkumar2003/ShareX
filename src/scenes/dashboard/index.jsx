import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import Header from "../../components/Header";
import React from "react";
import { useEffect, useState } from "react";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";


const Dashboard = ({ state, account ,isAdmin}) => {

  const handleDownload = () => {
    // Generate the report data (you can customize this based on your data structure)
    const reportData = data.map((d) => `${d.name}, ${d.status}, ${d.ipfsHash}`).join('\n');
    
    // Create a Blob object with the report data
    const blob = new Blob([reportData], { type: 'text/plain' });
    
    // Create a temporary URL for the Blob object
    const url = URL.createObjectURL(blob);
    
    // Create a link element and set its attributes for downloading
    const link = document.createElement('a');
    link.href = url;
    link.download = 'report.csv'; // Specify the file name and extension
    
    // Simulate a click on the link to trigger the download
    link.click();
    
    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  };
  

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { con } = state;
  const [data, setdata] = useState([])
  const [at, setat] = useState([])


  useEffect(() => {
    const requests = async () => {

      let d = await con.get_trans();
      setdata(d);
      let a = await con.get_vdocs();
      setat(a);



    }

    con && requests();
  }, [con])
  const verifiedCount = data.filter((d) => d.verified === 'Verified').length;
const acceptedCount = data.filter((d) => d.status === 'Rejected').length;
console.log(acceptedCount);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
        <Button
  sx={{
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
  }}
  onClick={handleDownload}
>
  <DownloadOutlinedIcon sx={{ mr: "10px" }} />
  Download Reports
</Button>

        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {!isAdmin &&   <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
 <StatBox
            title={at.length}
            subtitle=  "Requests Pending" 
            
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
}

{isAdmin &&   <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
 <StatBox
            title={at.length}
            subtitle=  "Documents Stored" 
            
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
}

        { !isAdmin &&   <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
      <StatBox
            title={data.length}
            subtitle="Attested Docs"

            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>  }
        {  isAdmin &&   <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
      <StatBox
            title={data.length}
            subtitle="Removed Documents"

            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>  }

        {/* ROW 2 */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
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
              Recent Transactions
            </Typography>
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
                    {d.name==="1" ? "Aadhar": d.name==="2" ? "Pan Card": d.name==="3" ? "Passport": d.name=== "4" ?"Birth Certificate":d.name=== "5"?"Sslc marks card":"" }
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {d.status}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{d.ipfsHash}</Box>
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
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" color={colors.greenAccent[400]} fontWeight="600">
           {isAdmin && "Reject/Accept Stats"}
           {!isAdmin && "Documents Stats"}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >

            <ProgressCircle progress={verifiedCount/ data.length} size={200}></ProgressCircle>
          </Box>
        </Box>


      </Box>
    </Box>
  );
};

export default Dashboard;
