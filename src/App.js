import React, {Component} from 'react';
import Header from './components/header';
import UserHint from './components/userhint';
import randomChoice from './components/randomchoice';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            hintText: '',
            gif: null,
            gifs: []
        }
    }

    searchGiphy = async searchTerm => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=pI6CoKK0TJLzPfyCP1hY5NYQyNGtKiob&q=${searchTerm}&limit=1000&offset=0&rating=R&lang=en`);
            const {data} = await response.json();
            const randomGif = randomChoice(data)
            this.setState((prevState, props) => ({
              ...prevState,
              gif: randomGif,
              gifs: [...prevState.gifs, randomGif]
            }))
        } catch (error) {
            alert(error);
        }
    }

    handleChange = event => {
        const {value} = event.target;
        this.setState((prevState, props) => ({
            ...prevState,
            searchTerm: value,
            hintText: (value.length > 2 ? `Hit enter to search for ${value}` : '')
        }))
    }

    handleKeyPress = event => {
        console.log(event.key)
        const {value} = event.target
        if (value.length > 2 && event.key === "Enter") {
            this.searchGiphy(value);
        }
    }

    render() {
        const {searchTerm, gif} = this.state;
        return (
            <div className="page">
                <Header/>
                <div className='search grid'>
                    {/*Stuff goes here*/}
                    {/* {gif && <video className='grid-item video' autoPlay loop src={gif.images.original.mp4}/>}    */}

                    {this.state.gifs.map(gif => (
                      <video className='grid-item video' autoPlay loop src={gif.images.original.mp4}/>
                    ))}

                    <input
                        className='input grid-item'
                        placeholder='Type something'
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        value={searchTerm}/>
                </div>
                <UserHint {...this.state}/>
            </div>
        );
    }
}

export default App;
