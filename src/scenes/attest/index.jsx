 
import { Box,  useTheme, Button } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {useEffect,useState} from "react";
const Attest = ({state,account,isAdmin}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {con}=state;
  const [data,setdata]=useState([])


  useEffect(()=>{
    const requests=async ()=>{
      
     let d = await con.get_vdocs();
     setdata(d);
      
    }
    
  con&&requests();
  },[con])

  const handleAccept=async(ref,sender,ipfs,name,status)=>{
    console.log(sender+" f"+ipfs+" "+name)
    if(status)
    con.attestDocument(sender, name);
    console.log(ref);
    if(data.length)
    con.removeDoc(ref);
    if(status)
    con.store_trans(sender,name,ipfs,"Approved")
    else
    con.store_trans(sender,name,ipfs,"Rejected")
  }
  
  const columns = [
    { field: "id", headerName: "APP-ID" },
    {
      field: "dname",
      headerName: " Name",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "from",
      headerName: "From",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "ipfs",
      headerName: "Ipfs Hash",
      flex: 1,
    },
    
    {
      field: "accessLevel",
      headerName: "Actions",
      flex: 1,
      renderCell:({ row }) => {
        return (
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
           {!isAdmin && <Button
            
              variant="contained"
              color="success"
              onClick={() =>handleAccept(row.id,row.from,row.ipfs,row.dname,true)}
            > Approve
            </Button>
      }
            <Button
              variant="contained"
              color="error"
              onClick={() => handleAccept(row.id,row.from,row.ipfs,row.dname,false)}
            >  { !isAdmin && "Reject"}
            {isAdmin && "Delete"}
            </Button>
            <a href={'https://ipfs.io/ipfs/'+row.ipfs} target="_blank" rel="noreferrer">
            <Button
              variant="contained"
              color="primary"
            >View
            </Button> </a>
          </Box>
        );
      },
      
     
    },
  ];

  return (
    <Box m="20px">
      <Header title="Document Hub" subtitle="Securly viewing document from decentralized storage" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
         
        <DataGrid checkboxSelection rows={data.map((d) => ({
    id: d.ref,
    from: d.sender,
    dname: d.name,
    ipfs: d.ipfsHash,
    accessLevel: "admin",
  }))}
  colum columns={columns} />
         
      </Box>
    </Box>
  );
};

export default Attest;
