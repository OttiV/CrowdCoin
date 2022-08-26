import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import { BackLink, ErrorMessage, Layout } from '@/components';
import { Campaign, web3 } from '@/ethereum';
import { Router } from '@/routes';

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
    const { Field } = Form;
    return (
      <Layout>
        <BackLink route={`/campaigns/${address}/requests`} />
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
          <Field>
            <label>Description</label>
            <Input
              value={description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Field>
          <Field>
            <label>Value in Ether</label>
            <Input
              value={value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </Field>
          <Field>
            <label>Recipient</label>
            <Input
              value={recipient}
              onChange={(e) => this.setState({ recipient: e.target.value })}
            />
          </Field>
          <ErrorMessage message={errorMessage} />
          <Button primary loading={loading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
