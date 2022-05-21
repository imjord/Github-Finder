import React, {Component, Fragment} from 'react'
import Navbar from './Components/layout/Navbar';
import './App.css'
import Users from './Components/users/Users';

class App extends Component {

    // https://api/github.com/users
    render(){
     
      

        return (
            <Fragment>
               <div className='App'>
                   <Navbar />
                   <div className='container'>
                   <Users />
                   </div>
              
                   
               </div>
                
            </Fragment>
        )
    }
}

export default App;