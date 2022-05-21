import React, {Component, Fragment} from 'react'
import Navbar from './Components/layout/Navbar';
import './App.css'
import Users from './Components/users/Users';
import axios from 'axios';
import Search from './Components/users/Search';
import  Alert  from './Components/layout/Alert';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './Components/pages/About';

class App extends Component {

    state = {
        users: [],
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


    // serach github users
    searchUsers = async (text) => {
        this.setState({loading: true})
        const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id${process.env.client_ID}&client_secret=${process.env.client_secret}`)

        this.setState({users: response.data.items, loading: false})
        console.log(response.data);
    }

    clearUsers =  () => {
        this.setState({users: [], loading: false})
    }
    setAlert = (msg, type) => {
        this.setState({alert: {msg: msg, type: type}});

        setTimeout(() => this.setState({alert: null}), 3000)
        
    }
    
    render(){
     
      
        const {users, loading} = this.state;
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
                       </Switch>
                       
                   </div>
              
                   
               </div>
                
            </Fragment>
            </Router>
            
        )
    }
}

export default App;