import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import { Layout } from '../../../components';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  render() {
    const { value, description, recipient } = this.state;
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form>
          <Form.Field>
            <label>Description</label>
            <Input
              value={description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={recipient}
              onChange={(e) => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>
          <Button primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
