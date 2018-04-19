import React from 'react';

export class MainPage extends React.Component{
    render(){
        return <div>
            <div className='mainContent'>

                <div className='slide slideLeft'>
                    <div className="overlay">
                        <div className="text">POCZUJ</div>
                    </div>
                </div>

                <div className='slide slideCenter'>
                    <div className="overlay">
                        <div className="text">RADOŚĆ</div>
                    </div>
                </div>

                <div className='slide slideRight'>
                    <div className="overlay">
                        <div className="text">MUZYKI</div>
                    </div>
                </div>

            </div>
        </div>
    }
}