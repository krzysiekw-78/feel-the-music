import React from 'react';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

export class Menu extends React.Component{
    render(){

        return <div className='topMenu'>

            <ul>
                <li>
                    <NavLink exact activeClassName='menuActive' to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink activeClassName='menuActive' to='/artist'>Find Artist</NavLink>
                </li>
                <li>
                    <NavLink activeClassName='menuActive' to='/player'>Listen to music</NavLink>
                </li>
            </ul>
        </div>
    }
}