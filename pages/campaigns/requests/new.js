import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import { Layout } from '@/components';
import Campaign from '@/ethereum/campaign';
import web3 from '@/ethereum/web3';
import { Link, Router } from '@/routes';

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    errorMessage: '',
    loading: false,
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { value, description, recipient } = this.state;
    const { address } = this.props;

    const campaign = Campaign(address);
    this.setState({ loading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    const { value, description, recipient, errorMessage, loading } = this.state;
    const { address } = this.props;

    return (
      <Layout>
        <Link route={`/campaigns/${address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
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
          <Message error header="Oops" content={errorMessage} />
          <Button primary loading={loading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
