import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Home(){
    return(
        <>
            <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height:'90vh',
            '& > *': {
              m: 1,
            },
          }}
        >
            <Link to="/admin"><Button variant="contained" size="large">ADMIN</Button></Link>
            <Link to="/voter"><Button variant="contained" size="large">VOTER</Button></Link>
        </Box>
        </>
    )
}