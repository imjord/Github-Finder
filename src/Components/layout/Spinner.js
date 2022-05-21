import React from 'react'
import spinner from './Spinner.gif';

const Spinner = () => {
    return (
        <div>
          <img src={spinner} alt="Loading..." style={{ width: '200px', maring: 'auto', display: 'block'}} />
      </div>
    )
}




export default Spinner