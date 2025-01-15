import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export default function AdminPanel(){
    return (
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
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Link to={"/admin/createElection"}><Button>Create Election</Button></Link>
            <Link to={"/admin/addCandidate"}><Button>Add Candidate</Button></Link>
            <Link to={"/admin/manageElections"}><Button>Manage Elections</Button></Link>
          </ButtonGroup>
          </Box>
    )
}