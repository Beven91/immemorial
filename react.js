import React from 'react';

export default class Immemorial extends React.Component {

  render(){
    return (
      <div>
          {this.props.children}
      </div>
    )
  }
}