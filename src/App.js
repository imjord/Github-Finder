import React, {useState, Fragment} from 'react'
import Navbar from './Components/layout/Navbar';
import './App.css'
import Users from './Components/users/Users';
import axios from 'axios';
import Search from './Components/users/Search';
import  Alert  from './Components/layout/Alert';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './Components/pages/About';
import User from './Components/users/User';

const App = ({}) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, settAlert] = useState(null);

    // get a single user
    const getUser = async (username) => {
        setLoading(true)
        const response = await axios.get(`https://api.github.com/users/${username}?client_id${process.env.client_ID}&client_secret=${process.env.client_secret}`)

        setUser(response.data)
        setLoading(false)
       
    }

    const getRepos = async (username) => {
        setLoading(true)
        const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id${process.env.client_ID}&client_secret=${process.env.client_secret}`)

        setRepos(response.data)
        setLoading(false)
    }

    // serach github users
    const searchUsers = async (text) => {
        setLoading(true)
        const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id${process.env.client_ID}&client_secret=${process.env.client_secret}`)

        setUsers(response.data.items);
        setLoading(false)
        
    }

    const clearUsers =  () => {
        setUsers([]);
        setLoading(false)
    }

    const setAlert = (msg, type) => {
        settAlert({msg: msg, type: type});

        setTimeout(() => settAlert(null), 3000)
        
    }
    
        return (
            <Router>
            <Fragment>
               <div className='App'>
                   <Navbar />
                   <div className='container'>
                       <Alert alert={alert} />
                       <Switch>
                           <Route exact path='/' render={props => (
                               <Fragment>
                                   <Search setAlert={setAlert} searchUsers={searchUsers} clearUsers={clearUsers} showClear={ users.length > 0 ? true : false}/>
                                     <Users loading={loading} users={users}/>
                               </Fragment>
                           )} />
                           <Route exact path='/about' component={About}/>
                           <Route exact path='/user/:login' render={props => (
                               <User { ...props } getRepos={getRepos} repos={repos} getUser={getUser} user={user} loading={loading}/>
                                )} />
                       </Switch>
                       
                   </div>
              
                   
               </div>
                
            </Fragment>
            </Router>
            
        )
    
}

export default App;