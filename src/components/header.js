import React from 'react';
import clearButton from '../images/close-icon.svg'

const Header = ({clearSearch, hasResults}) => (
    <div className='header grid'>
        {hasResults ? <img src={clearButton} onClick={clearSearch}/> : <h1 className='title' onClick={clearSearch}>Jiffy</h1> }
    </div>
);

export default Header;