import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";



let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on an image to begin, but be careful not to click on the same one twice!"

class App extends Component {
  state = {
      matches,
      correctGuesses,
      bestScore,
      clickMessage
  };

  setClicked = id => {

    //Make a copy of the state matches array to work with
    const matches = this.state.matches;

    //Filter for the clicked match
    const clickedMatch = matches.filter(match => match.id === id);

    //If the clicked match is already true restart game actions
    if (clickedMatch[0].clicked){
        console.log("Correct guesses:" + correctGuesses);
        console.log("best score: " + bestScore);

        correctGuesses = 0;
        clickMessage = " TRY AGAIN YOU FAIL"

        for (let i =0; i< matches.length; i++){
            matches[i].clicked = false;
        }

        //Set the state
        this.setState({clickMessage});
        this.setState({correctGuesses});
        this.setState({matches});

    }else if (correctGuesses<11){
        
        //set clicked to true
        clickedMatch[0].clicked = true;

        //Add to counter
        correctGuesses++;

        clickMessage = "Good Job! Keep going!!"

        if (correctGuesses > bestScore){
            bestScore = correctGuesses;
            this.setState({bestScore});
        }

        //Shuffle array to render in random order
        matches.sort(function(a,b){ return 0.5 - Math.random()});

        //Sets this.state. equal to the new array
        this.setState({clickMessage});
        this.setState({correctGuesses});
        this.setState({matches});
    } else {

        //Set value to true
        clickedMatch[0].clicked=true;

        //Restart counter
        correctGuesses = 0;

        //Ask to play again
        clickMessage = "Nicely done!! Let's keep playing!!"
        bestScore = 12;
        this.setState({bestScore});

        for (let i =0; i< matches.length; i++){
            matches[i].clicked=false;
        }

        //Shuffle array
        matches.sort(function(a,b){return 0.5 - Math.random()})

        //Set state equal to matches array 
        this.setState({clickMessage});
        this.setState({correctGuesses});
        this.setState({matches});
    }

  };

  render(){
      return (
          <Wrapper>
            <Title> Are you up to the click challenge?!</Title>

            <h3 className = "scoreSummary">
              {this.state.clickMessage}
            </h3>

            <h3 className = "scoreSummary">
                Correct Guesses: {this.state.correctGuesses}
                <br />
                Best Score : {this.state.bestScore}
            </h3>

            {this.state.matches.map(match =>(
                <MatchCard 
                setClicked = {this.setClicked}
                id={match.id}
                key={match.id}
                image={match.image}
                />
            ))}
            </Wrapper>
 
      );
  }


};


      

export default App;
