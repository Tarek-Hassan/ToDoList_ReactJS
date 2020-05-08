import React, { Component } from "react";

class App extends React.Component {

    constructor() {      
      super();
      this.state = {
        count:0,
      };
    }
  
    btnClicked= () => {
      this.setState({ count: this.state.count+1, });
    };
  
  
    render() {
      return (
        <div>
            <h1>{this.state.count}</h1>
            <botton onClick={this.btnClicked}>click</botton>
        </div>

      );
    }
  }
  export default App;