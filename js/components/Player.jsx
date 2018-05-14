import React from 'react';
import ReactPlayer from 'react-player'

export class Player extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            track: '',
            category: [],
            songs: [],
            selectedCategory: 'pop',
            selectedSong: 0,
            data: null,
            playing: false
        }
    }

    componentDidMount(){
        fetch('http://localhost:3002/category')
            .then( resp => resp.json() )
            .then( data => this.setState({
                category: Object.keys(data),
                data: data
            }) )
            .catch( err => console.log(err) );
    }

    selectCategory = (event) =>{
        event.preventDefault();
        this.setState({
            selectedCategory: event.target.value,
        })
    };

    selectSong = (event) => {
        event.preventDefault();
        this.setState({
            selectedSong: event.target.value
        })
    };

    handlePlay = (event) => {
        event.preventDefault();
        this.setState({
            track: this.state.data[this.state.selectedCategory][this.state.selectedSong].track,
            playing: true
        })
    };


    render () {
        if(this.state.data === null) return null;

        return <div className='player'>

            <div className='searchSong'>
                <div className='catSong'>Category:</div>
                <select onChange={this.selectCategory} className='chooseCategory'>
                    {this.state.category.map((el) => <option>{el}</option>)}
                </select>
                <div className='catSong'>Song:</div>
                <select onChange={this.selectSong} className='chooseSong'>
                    {this.state.data[this.state.selectedCategory].map((el, index) => <option value={index}>{el.name}</option>)}
                </select><br/>
                <div onClick={this.handlePlay} className='playSong'>Wczytaj</div>                
            </div>
            <div>(You have to run json-server)</div>

           <div className='playerArray'>
                <ReactPlayer url={this.state.track} controls playing/>
           </div>
        </div>

    }
}