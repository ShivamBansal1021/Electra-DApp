import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Voter from './pages/Voter'
import CreateElection from './pages/CreateElection'
import AddCandidate from './pages/AddCandidate'
import ManageElections from './pages/ManageElections'

import Header from './layouts/Header'
import VotingPage from './pages/VotingPage'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path="/admin" element = {<Admin/>}/>
          <Route exact path="/voter" element = {<Voter/>}/>
          <Route exact path="/admin/createElection" element = {<CreateElection/>}/>
          <Route exact path="/admin/addCandidate" element = {<AddCandidate/>}/>
          <Route exact path="/admin/manageElections" element = {<ManageElections/>}/>
          <Route exact path="/voter/vote" element={<VotingPage/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
