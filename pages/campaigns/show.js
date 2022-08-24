import React, { Component } from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import { ContributeForm, Layout } from '../../components';
import getCampaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = await getCampaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestCount,
      approversCount,
      manager,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: requestCount,
        meta: 'Number of requests',
        description:
          'A request tries to withdraw monty from the Contract. Requests must be approved by approvers',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description:
          'Number of people who have already donated to this campaign',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether',
        description:
          'The balance is how much money the Campaign has left to spend',
        style: { overflowWrap: 'break-word' },
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    const { address } = this.props;
    return (
      <Layout>
        <h3>Campaign Details</h3>
        <Grid>
          <Grid.Column width={10}>
            {this.renderCards()}
            <Link route={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
