import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// v5 of react-router-dom: Routes is Switch
import AppNavbar from './components/AppNavbar';
import DestinationView from './components/DestinationView';
// import Banner from './components/Banner';
// import Highlights from './components/Highlights';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import './index.css';
import { UserProvider } from './UserContext'

function App() {

  // to verify if user is logged in
  const [user, setUser] = useState({
    id: null, 
    isAdmin: null

  })

  const unsetUser =() => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch('https://cryptic-oasis-42379.herokuapp.com/users/details', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if(typeof data !== "undefined"){

        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      } else {
        setUser({
        id: null,
        isAdmin: null
        })
        
      }
    })
  }, [])


  return (
    <UserProvider value={{user, setUser, unsetUser}}>
    <Router> 
      <AppNavbar/>
      <Container>
      <Routes>
        {/*<Banner/>
          <Highlights/>*/}
          <Route exact path= "/" element={<Home/>}/>
          <Route exact path= "/destinations" element={<Destinations/>}/>
          <Route exact path= "/profile" element={<Profile/>}/>
          <Route exact path= "/destinations/:destinationId" element={<DestinationView/>}/>
          <Route exact path= "/register" element={<Register/>}/>
          <Route exact path= "/login" element={<Login/>}/>
          <Route exact path= "/logout" element={<Logout/>}/>
          <Route exact path= "*" element={<Error/>}/>
      </Routes>
      </Container>
    </Router>
    </UserProvider>
    )
}

export default App;
