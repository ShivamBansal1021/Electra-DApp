import * as React from 'react';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers'
import Typography from '@mui/material/Typography';
import { abi, contractAddress } from '../contracts/VotingSystem.json'
import './ManageElections.css'
import CircularProgress from '@mui/material/CircularProgress';



export default function ManageElections() {
    const provider = new BrowserProvider(window.ethereum);
    const [address, setAddress] = useState(null);
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchElections = async () => {
        try {
            const signer = await provider.getSigner()
            const instance = new Contract(contractAddress, abi, signer)
            const electionCount = await instance.electionCount();
            const electiondata = []
            for (let i = 0; i < electionCount; i++) {
                const data = await instance.elections(i);
                electiondata[i] = {
                    id: i,
                    post: data.post,
                    isActive: data.isActive,
                    startTime: new Date(Number(data.startTime)*1000).toLocaleString(),
                    endTime: new Date(Number(data.endTime)*1000).toLocaleString()
                };
            }
            setElections(electiondata);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        const connectMetamask = async () => {
            const signer = await provider.getSigner();
            setAddress(signer.address);
        }
        connectMetamask();
        fetchElections();
    },[]);


    // Handle activating an election
    const activateElection = async (id) => {
        try{
            setLoading(true);
            const signer = await provider.getSigner()
            const instance = new Contract(contractAddress, abi, signer)
            const tx = await instance.startElection(id);
            await tx.wait();
            await fetchElections();
        }catch(e){
            alert(e);
        }
    };

    // Handle deactivating an election
    const deactivateElection = async (id) => {
        try{
            setLoading(true);
            const signer = await provider.getSigner()
            const instance = new Contract(contractAddress, abi, signer)
            const tx = await instance.endElection(id);
            await tx.wait();
            await fetchElections();
        }catch(e){
            alert(e);
        }
    };

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
                <div style={{ textAlign: 'center' }}><h1>Manage Elections</h1></div>
            </Box>
            {loading ? (
                <Box sx={{ display: 'flex',justifyContent:'center' }}>
                <CircularProgress />
              </Box>
            ) : elections.length === 0 ? (
                <p>No elections found.</p>
            ) : (<table className="elections-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Post</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {elections.map((election) => (
                        <tr key={election.id}>
                            <td>{election.id}</td>
                            <td>{election.post}</td>
                            <td>{election.startTime}</td>
                            <td>{election.endTime}</td>
                            <td>{election.isActive ? "Active" : "Inactive"}</td>
                            <td>
                                {election.isActive ? (
                                    <button
                                        className="deactivate-button"
                                        onClick={() => deactivateElection(election.id)}
                                    >
                                        Deactivate
                                    </button>
                                ) : (
                                    <button
                                        className="activate-button"
                                        onClick={() => activateElection(election.id)}
                                    >
                                        Activate
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>)
            }
        </>
    )
}