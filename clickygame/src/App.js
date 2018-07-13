import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DogCard from "./components/DogCard";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import dogs from "./dogs.json";


class App extends Component {
  state = {
      message: "Click an image to begin!",
      topScore: 0,
      curScore: 0,
      dogs: dogs,
      unselectedDogs: dogs
  }

  componentDidMount() {
  }

  shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  selectDog = name => {
      const findDog = this.state.unselectedDogs.find(item => item.name === name);

      if(findDog === undefined) {
          // failure to select a new dog
          this.setState({ 
              message: "You guessed incorrectly!",
              topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
              curScore: 0,
              dogs: dogs,
              unselectedDogs: dogs
          });
      }
      else {
          // success to select a new dog
          const newDogs = this.state.unselectedDogs.filter(item => item.name !== name);
          
          this.setState({ 
              message: "You guessed correctly!",
              curScore: this.state.curScore + 1,
              dogs: dogs,
              unselectedDogs: newDogs
          });
      }

      this.shuffleArray(dogs);
  };

  render() {
      return (
          <Wrapper>
         
          
              <Header />
              {
                  this.state.dogs.map(dog => (
                      <DogCard
                          name={dog.name}
                          image={dog.image}
                          selectDog={this.selectDog} 
                          curScore={this.state.curScore}
                      />
                  ))
              }
          </Wrapper>
      );
  }
}
      

export default App;
