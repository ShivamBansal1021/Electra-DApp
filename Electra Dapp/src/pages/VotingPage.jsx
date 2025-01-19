import { useLocation } from 'react-router-dom';
import * as React from 'react';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers'
import { abi, contractAddress } from '../contracts/VotingSystem.json'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    py: 0,
    width: '100%',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};


export default function VotingPage() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const eId = queryParams.get('eId');

    const provider = new BrowserProvider(window.ethereum);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [election, setElection] = useState({});
    const [candidates, setCandidates] = useState([]);
    useEffect(() => {
        const connectMetamask = async () => {
            const signer = await provider.getSigner();
            setAddress(signer.address);
        }
        const fetchElection = async () => {
            try {
                const signer = await provider.getSigner()
                const instance = new Contract(contractAddress, abi, signer)
                const electionData = await instance.elections(eId);
                const candidatesData = await instance.getCandidates(eId);
                setCandidates(candidatesData);
                setElection(electionData);
            } catch (e) {
                alert(e)
            } finally {
                setLoading(false);
            }
        }
        fetchElection();
        connectMetamask();
    }, []);

    const vote = async (id)=>{
        try{
            setLoading(true);
            const signer = await provider.getSigner()
            const instance = new Contract(contractAddress, abi, signer)
            const trx = await instance.vote(eId,id);
            await trx.wait();
            setLoading(false);
            alert("Successfully Voted!");
        }
        catch(e){
            setLoading(false);
            alert(e);
        }
    }

    return (
        <>
            <ThemeProvider theme={darkTheme}>
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
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}><h4>Connected Account: <strong>{address}</strong></h4></div>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (<>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '2rem' }}>
                            <h3 style={{ textAlign: 'center' }}>Election Details</h3>
                            <List sx={style}>
                                <ListItem>
                                    <ListItemText primary={`Post-: ${election.post}`} />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem>
                                    <ListItemText primary={`Duration-: ${new Date(Number(election.startTime) * 1000).toLocaleString()} - ${new Date(Number(election.endTime) * 1000).toLocaleString()}`} />
                                </ListItem>
                            </List>
                        </div>

                        <div style={{ display: 'flex', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>

                            {
                                candidates.map((candidate, idx) => (
                                    <Card sx={{ minWidth: 275, margin: '2rem' }} key={idx}>
                                        <CardContent>
                                            <Typography gutterBottom style={{ display: 'flex', justifyContent: 'center' }} sx={{ color: 'text.secondary', fontSize: 14 }}>
                                                ID: {idx}
                                            </Typography><br />
                                            <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="h5" component="div">
                                                {candidate}
                                            </Typography>
                                        </CardContent>
                                        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button size="small" onClick={()=>vote(idx)}>Vote</Button>
                                        </CardActions>
                                    </Card>
                                ))
                            }
                        </div>
                    </>)
                    }
                </Box>
            </ThemeProvider>
        </>
    )
}