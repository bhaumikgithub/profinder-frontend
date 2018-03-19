import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

export default class AfterLoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: true,
    };
  }

  componentWillMount() {
    this.setState({ title: this.props.title });
  }

  render() {
    const {
     condition,
    } = this.state;
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
      })
    );

    return (
      <div className={condition ? 'Toggled AdminApp' : 'AdminApp'}>
        <div className="content-area">
          <div className="page-wrap">
            <Grid fluid={true}>{childrenWithProps}</Grid>
          </div>
        </div>
      </div>
    );
  }
}
