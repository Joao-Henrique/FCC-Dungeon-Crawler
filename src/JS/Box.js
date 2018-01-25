import React from 'react';

class Box extends React.Component {

  render() {

    const selectBox = () => {
      this
        .props
        .selectBox(this.props.row, this.props.col)
    }

    return (<div
      className={this.props.boxClass}
      id={this.props.id}
      boxposition={this.props.boxPosition}
      onClick={selectBox} />);
  }
}

export default Box;