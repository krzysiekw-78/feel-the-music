import React from 'react';
import {Header} from "./components/Header.jsx";
import {Menu} from "./components/Menu.jsx";
import {MainPage} from "./components/MainPage.jsx";
import {Artist} from "./components/Artist.jsx";
import {Footer} from "./components/Footer.jsx";
import {Player} from "./components/Player.jsx";
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

export class App extends React.Component{
    render(){
        return (
            <HashRouter>
                <div className={'container'}>
                    <Header/>
                    <Menu/>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/artist" component={Artist}/>
                        <Route path="/player" component={Player}/>
                        {/*<Route path="/checkage/:age" component={CheckAge}/>*/}
                    </Switch>
                    <Footer/>
                </div>
            </HashRouter>
        )
    }
}