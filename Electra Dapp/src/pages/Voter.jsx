import { BrowserProvider, Contract } from 'ethers'
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ElectionList from '../components/ElectionList';

export default function Voter() {

    const metamaskLogo = "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg";
    const provider = new BrowserProvider(window.ethereum);
    const [address, setAddress] = useState(null);
    const connectMetamask = async () => {
        const signer = await provider.getSigner();
        setAddress(signer.address);
    }


    return(
        <>
        {!address ? <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <Button variant="contained" onClick={connectMetamask} size="large"><img src={metamaskLogo} style={{ width: '3rem', height: '3rem' }}/> &nbsp;&nbsp;Connect with Metamask</Button>
            </div> : (
                <>
                <div className="voter-actions">
                    <div style={{display:'flex',justifyContent:'center',marginTop:'2rem'}}><Typography variant="body1" component="h2">Connected Account: <strong>{address}</strong></Typography></div>
                    <br/>
                </div>
                <ElectionList/>
                </>
                
            )}
        </>
    )
}