import React, {useState, useEffect, Fragment} from 'react'
import Navbar from './Components/layout/Navbar';
import './App.css'
import Users from './Components/users/Users';
import axios from 'axios';
import Search from './Components/users/Search';
import  Alert  from './Components/layout/Alert';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './Components/pages/About';
import User from './Components/users/User';

class App extends Component {

    state = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null
    }


    // useEffect
    // async componentDidMount(){
    //     this.setState({loading: true})

    //     const response = await axios.get(`https://api.github.com/users?client_id${process.env.client_ID}&client_secret=${process.env.client_secret}`)

    //     this.setState({users: response.data, loading: false})
    //     console.log(response.data);

    // }

    // get a single user
    getUser = async (username) => {
        this.setState({loading: true})
        const response = await axios.get(`https://api.github.com/users/${username}?client_id${process.env.client_ID}&client_secret=${process.env.client_secret}`)

        this.setState({user: response.data, loading: false})
       
    }

    getRepos = async (username) => {
        this.setState({loading: true})
        const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id${process.env.client_ID}&client_secret=${process.env.client_secret}`)

        this.setState({repos: response.data, loading: false})
    }

    // serach github users
    searchUsers = async (text) => {
        this.setState({loading: true})
        const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id${process.env.client_ID}&client_secret=${process.env.client_secret}`)

        this.setState({users: response.data.items, loading: false})
        
    }

    clearUsers =  () => {
        this.setState({users: [], loading: false})
    }
    setAlert = (msg, type) => {
        this.setState({alert: {msg: msg, type: type}});

        setTimeout(() => this.setState({alert: null}), 3000)
        
    }
    
    render(){
     
      
        const {users, user, loading, repos} = this.state;
        return (
            <Router>
            <Fragment>
               <div className='App'>
                   <Navbar />
                   <div className='container'>
                       <Alert alert={this.state.alert} />
                       <Switch>
                           <Route exact path='/' render={props => (
                               <Fragment>
                                   <Search setAlert={this.setAlert} searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={ users.length > 0 ? true : false}/>
                                     <Users loading={loading} users={users}/>
                               </Fragment>
                           )} />
                           <Route exact path='/about' component={About}/>
                           <Route exact path='/user/:login' render={props => (
                               <User { ...props } getRepos={this.getRepos} repos={repos} getUser={this.getUser} user={user} loading={loading}/>
                                )} />
                       </Switch>
                       
                   </div>
              
                   
               </div>
                
            </Fragment>
            </Router>
            
        )
    }
}

export default App;