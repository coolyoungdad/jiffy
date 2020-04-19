import React, {Component} from 'react';
import Header from './components/header';
import UserHint from './components/userhint';
import randomChoice from './components/randomchoice';
import Gif from './components/gif';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            hintText: '',
            loading: false,
            gifs: []
        }
    }

    searchGiphy = async searchTerm => {
        this.setState({
          loading: true
        })
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=pI6CoKK0TJLzPfyCP1hY5NYQyNGtKiob&q=${searchTerm}&limit=1000&offset=0&rating=R&lang=en`);
            const {data} = await response.json();

            if (!data.length){
              throw `Nothing found for ${searchTerm}`
            }

            const randomGif = randomChoice(data)
            this.setState((prevState, props) => ({
              ...prevState,
              loading:false,
              hintText: `Hit enter to see more ${searchTerm}`,
              gifs: [...prevState.gifs, randomGif]
            }))

        } catch (error) {
          this.setState((prevState, props) => ({
            ...prevState,
            hintText: error,
            loading: false,
          }));
            console.log(error)
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

    clearSearch = () => {
      this.setState((prevState, props) => ({
        ...prevState,
        searchTerm: '',
        hintText: '',
        gifs: []
      }));
      this.textInput.focus();
    }

    render() {
        const {searchTerm, gifs} = this.state;
        const hasResults = gifs.length;
        return (
            <div className="page">
                <Header clearSearch={this.clearSearch} hasResults={hasResults}/>
                <div className='search grid'>

                    {this.state.gifs.map(gif => (
                      <Gif {...gif}/>
                    ))}

                    <input
                        className='input grid-item'
                        placeholder='Type something'
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        value={searchTerm}
                        ref = {(input) => {this.textInput = input;}}
                    />
                        
                </div>
                <UserHint {...this.state}/>
            </div>
        );
    }
}

export default App;
