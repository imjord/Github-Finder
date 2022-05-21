import React, {Component, Fragment} from 'react'
import Navbar from './Components/layout/Navbar';
import './App.css'
import Users from './Components/users/Users';
import axios from 'axios';

class App extends Component {

    state = {
        users: [],
        loading: false
    }


    // useEffect
    async componentDidMount(){
        this.setState({loading: true})

        const response = await axios.get(`https://api.github.com/users?client_id${process.env.client_ID}&client_secret=${process.env.client_secret}`)

        this.setState({users: response.data, loading: false})
        console.log(response.data);

    }


    // 
    render(){
     
      

        return (
            <Fragment>
               <div className='App'>
                   <Navbar />
                   <div className='container'>
                   <Users loading={this.state.loading} users={this.state.users}/>
                   </div>
              
                   
               </div>
                
            </Fragment>
        )
    }
}

export default App;