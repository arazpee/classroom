import React, { Component, Fragment } from 'react';
import ShowProduct from '../common/ShowProduct/ShowProduct';
import ShowCase from '../common/ShowCase/ShowCase';

export default class extends Component {
  render() {
    return (
      <div>
        <ShowCase/>
        <ShowProduct/>
      </div>
    )
  }
}
