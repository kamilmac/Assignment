import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorButton from './colorButton';


class ColorSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: props.defaultActive,
    };
  }

  setActiveColor(colorIndex) {
    this.setState({ activeColor: colorIndex });
    this.props.onColorChange(this.props.colors[colorIndex]);
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      > 
        {
          this.props.colors.map((color, index) =>
            <div
              style={{
                margin: 20,
              }}
              key={color.toString()}
              onClick={() => this.setActiveColor(index)}
            >
              <ColorButton
                color={color}
                active={index === this.state.activeColor}
              />
            </div>
          )
        }
      </div>
    );
  }
}


ColorSwitch.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  defaultActive: PropTypes.number,
  onColorChange: PropTypes.func,
}
ColorSwitch.defaultProps = {
  defaultActive: 0,
  onColorChange: () => {},
}

export default ColorSwitch;
