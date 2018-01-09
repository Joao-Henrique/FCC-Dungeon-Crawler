import React from 'react';

class Box extends React.Component {

  render() {
    return (<div className={this.props.boxClass} id={this.props.id}/>);
  }
}

export default Box;