import React from 'react';
import { render } from 'react-dom';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

// Exploring Reacts Compound Components

function HouseDoor({ isOpen, ...props }) {
  return <div>{isOpen ? "Door open" : props.children}</div>
}

function HouseWindow({ isOpen, ...props }) {
  return <div>{isOpen ? props.children : ""}</div>
}

class House extends React.Component {
  static Door = HouseDoor
  static Window = HouseWindow

  state = { isOpen:false }
  
  toggleDoor = () => {
    this.setState({ isOpen: !this.state.isOpen})
  }

  render() {
    const children = React.Children.map(
      this.props.children, 
      child =>  
        React.cloneElement(child, { 
          isOpen: this.state.isOpen, 
          child: child
        })
      )
    
    return <div onClick={this.toggleDoor}>{children}</div>
  }
}

const App = () => (
  <div style={styles}>
    <House>
      <House.Door>Welcome inside</House.Door>
      <House.Window>So hot inside</House.Window>
    </House>
  </div>
);
render(<App />, document.getElementById('root'));
