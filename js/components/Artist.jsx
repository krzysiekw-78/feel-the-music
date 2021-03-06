import React from 'react';

export class Artist extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            artistName: null,
            artistPicture: null,
            artistTextSearch:'',
            artistBioContent: '',
            similarArtists: [],
        }
    }

    showArtist(){
        fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+this.state.artistTextSearch+'&api_key=447584cc16091b467c2f003db99e2e6b&format=json')
            .then( resp => resp.json() )
            .then( data => this.setState({
                artistName: data.artist.name,
                artistPicture: data.artist.image[3]['#text'],
                artistBioContent: data.artist.bio.summary,
                similarArtists: data.artist.similar.artist,
            }) )
            .catch( err => console.log(err) );
    }

    componentDidMount(){
        this.showArtist();
    }

    artistInput = (event) =>{
        this.setState({
            artistTextSearch: event.target.value
        })
    };

    handleArtist = (event) => {
        event.preventDefault();
        this.showArtist()
    };

    similarShowInfo = (event) => {
        event.preventDefault();
        this.setState({
            artistTextSearch: event.target.dataset.value
        }, () => this.showArtist());
        //dodaje funkcje dla pewności odświeżenia state

    };

    render(){

        let findArtist = <div className='searchBox'>
            <input placeholder={'Find artist'} onChange={this.artistInput}/><div onClick={this.handleArtist} className='searchBtn'>Search</div>
        </div>;

        if(this.state.artistName === null) return findArtist;

        return (<div>
            {findArtist}
            <div className='artistTitle'>
                <div className='artistName'>{this.state.artistName}</div>
                <div className='artistImage'>
                    <img className='mainImage' src={this.state.artistPicture}/>
                </div>
            </div>
            <p className='bioArtist'>{this.state.artistBioContent}</p>
            <div className='similarArtistText'>Similar artists</div>
            <div className='simArtists'>
                <div className='similarArtistsList'>
                    {this.state.similarArtists.map(el =>
                        <div className='similarArtistsInfo'>
                            <div className='similarArtistImage'><img src={el.image[1]['#text']}/></div>
                            <div className='similarArtistName'>{el.name}</div>
                            <div className='showArtistInfo' data-value={el.name} onClick={this.similarShowInfo}>Show me more...</div>
                        </div>
                    )}
                </div>
            </div>
        </div>)
    }
}