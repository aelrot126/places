import React, { Component } from 'react';
const blue ={
  color: 'blue'
}
const red ={
  color: 'red'
}
const green ={
  color: 'green'
}
class Main extends Component {
  render() {
    return (
      <div>
      <h1 style={blue}>Welcome to Marvel Heroes Comic!</h1>
      <p></p>
      <h3 style={green}>In this Page You Can Search Your Favourite Marvel Hero and have a link to the comics from official Marvel Page!</h3>
      <p></p>
      <h3 style={red}>Here are few of Marvel popular Heroes!</h3>
      <h2 style={red}>iron Man </h2>
      <h2 style={red}>Captain America </h2>
      <h2 style={red}>Black Widow </h2>
      <h2 style={red}>Thor </h2>
      <h2 style={red}>Hulk </h2>
</div>
    );
  }
}

export default Main;
