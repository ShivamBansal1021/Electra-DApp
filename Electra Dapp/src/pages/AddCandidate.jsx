import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers'
import Typography from '@mui/material/Typography';
import { abi, contractAddress } from '../contracts/VotingSystem.json'

export default function AddCandidate() {
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
        electionId: 0,
        name: ""
    })


    const handleSubmit = async () => {
        const signer = await provider.getSigner()
        const instance = new Contract(contractAddress, abi, signer)
        try{
            const trx = await instance.addCandidate(Data.electionId,Data.name);
            alert("Candidate Added");
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
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}><Typography variant="body1" component="h2">Connected Account: <strong>{address}</strong></Typography></div>
                <form>
                    <div style={{ textAlign: 'center' }}><h1>Add Candidate</h1></div>

                    <TextField sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'gray' },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: '#2074d4' },
                        },
                        input: {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'gray',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#2074d4',
                        }
                    }} id="outlined-basic" onChange={(e) => setData({...Data, electionId:e.target.value })} label="Election Id" variant="outlined" />&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'gray' },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: '#2074d4' },
                        },
                        input: {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'gray',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#2074d4',
                        }
                    }} id="outlined-basic" label="Candidate Name" onChange={(e) => setData({...Data, name:e.target.value })}  variant="outlined" />
                    <br /><br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}><Button onClick={handleSubmit} variant="contained" size='large'>Submit</Button></div>
                </form>
            </Box>
        </>
    )
}