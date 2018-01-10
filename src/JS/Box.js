import React from 'react';

class Box extends React.Component {

  render() {

    return (<div
      className={this.props.boxClass}
      id={this.props.id}
      boxposition={this.props.boxPosition}/>);
  }
}

export default Box;