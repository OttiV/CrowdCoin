import { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNewIndex extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    isLoading: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { errorMessage, isLoading, minimumContribution } = this.state;
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Minimum contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={minimumContribution}
              onChange={(e) =>
                this.setState({ minimumContribution: e.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={errorMessage} />
          <Button primary type="submit" loading={isLoading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNewIndex;
