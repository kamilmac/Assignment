import React, { Component } from 'react';
import Feet from './components/feet';
import ColorSwitch from './components/colorSwitch';


class App extends Component {
  colorOptions = [
    [49, 84, 89],
    [75, 105, 84],
    [208, 209, 136],
    [166, 99, 46],
  ]

  state = {
    feetRGBColor: this.colorOptions[0],
  }
  
  onColorChange = color =>  {
    this.setState({ feetRGBColor: color });
  }

  logo() {
    return <img
      style={{
        position: 'absolute',
        zIndex: -1,
        filter: 'invert(30%)',
        width: 80,
        clip: 'rect(0px, 80px, 30px, 0px)',
        marginTop: 40,
        left: 'calc(50vw - 40px)',
      }}
      src="https://www.volumental.com/static/img/volumental_logo.svg"
    />
  }

  render() {
    return <div>
      {this.logo()}
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          width: '100%',
        }}
      >
        <ColorSwitch
          colors={this.colorOptions}
          defaultActive={0}
          onColorChange={this.onColorChange}
        />
      </div>
      <Feet
        leftUrl='objs/left.obj'
        rightUrl='objs/right.obj'
        color={this.state.feetRGBColor}
      />
    </div>;
  }
}


export default App;
