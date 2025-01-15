import * as React from 'react';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers'
import { abi, contractAddress } from '../contracts/VotingSystem.json'
import './ElectionList.css'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'

export default function ElectionList(){

        const [elections, setElections] = useState([]);
        const [loading, setLoading] = useState(true);

        const provider = new BrowserProvider(window.ethereum);

        useEffect(()=>{
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
            fetchElections();
        },[])


    return(
        <>
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
                            <th>Action</th>
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
                                <td>{election.isActive ? <Link to={`/voter/vote?eId=${election.id}`}><Button variant="contained">Vote</Button> </Link>: null}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>)
                }
        </>
    )
}