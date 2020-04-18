import React from 'react'
import loader from '../images/loader.svg'

const UserHint = ({loading, hintText}) => (
    <div className='user-hint'>
        {loading ? <img className='block mx-auto' alt='' src={loader}/> : hintText}
    </div>
);

export default UserHint