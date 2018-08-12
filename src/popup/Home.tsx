import * as React from 'react';
import * as jsforce from 'jsforce';

interface HomeState {
}

interface HomeProps {
  onClick: () => void,
  connection: object,
}

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps, state: HomeState) {
    super(props);

    this.state = { connection: null };
  }

  componentDidMount() {
    if (this.props.connection) {
      const conn = jsforce.Connection({
        instanceUrl: this.props.connection.instanceUrl,
        accessToken: this.props.connection.access_token,
      });
// conn.chatter.resource('/users/me').retrieve(function(err, res) {

    }
  }

  render() {
    console.log('render Home');
    return 'foo';
  }
}