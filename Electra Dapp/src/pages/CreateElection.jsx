import * as React from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers'
import Typography from '@mui/material/Typography';
import {abi, contractAddress} from '../contracts/VotingSystem.json'

export default function CreateElection() {

  const provider = new BrowserProvider(window.ethereum);
      const [address, setAddress] = useState(null);

      useEffect(() => {
              const connectMetamask = async () => {
                  const signer = await provider.getSigner();
                  setAddress(signer.address);
              }
              connectMetamask();
          },[]);

    const [Data, setData] = useState({
        post:"",
        startTime:0,
        endTime:0
    })

    const handleSubmit = async ()=>{
        const signer = await provider.getSigner()
        const instance = new Contract(contractAddress, abi, signer)
        try{
          const trx = await instance.createElection(Data.post,Data.startTime,Data.endTime);
          alert("Election Created");
        }catch(e){
          alert(e);
        }
    }

    return (
        <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <div style={{display:'flex',justifyContent:'center',marginTop:'2rem'}}><Typography variant="body1" component="h2">Connected Account: <strong>{address}</strong></Typography></div>
            <form>
                <div style={{textAlign:'center'}}><h1>Create Election</h1></div>
                <div><label style={{fontSize:'1.25rem'}} htmlFor='post'>Election Post </label>&nbsp;&nbsp;
                <input onChange={(e) => setData({...Data, post: e.target.value})} style={{fontSize:'1.25rem'}} id='post' type='text'></input></div><br/>
                <div><label style={{fontSize:'1.25rem'}} htmlFor='startTime'>Start Time </label>&nbsp;&nbsp;
                <input onChange={(e) => setData({...Data, startTime: ((new Date(e.target.value)).getTime())/1000})} style={{fontSize:'1.25rem'}} id='startTime' type='datetime-local'></input></div><br/>
                <div><label style={{fontSize:'1.25rem'}} htmlFor='endTime'>End Time </label>&nbsp;&nbsp;
                <input onChange={(e) => setData({...Data, endTime: ((new Date(e.target.value)).getTime())/1000})} style={{fontSize:'1.25rem'}} id='endTime' type='datetime-local'></input></div><br/><br/>
                <div style={{display:'flex',justifyContent:'center'}}><Button onClick={handleSubmit} variant="contained" size='large'>Submit</Button></div>
            </form>
        </Box>
        </>
    )
}