import { Button, Card, Grid } from 'semantic-ui-react';
import { ContributeForm, Layout } from '@/components';
import { Campaign, web3 } from '@/ethereum';
import { Link } from '@/routes';

const CampaignShow = ({
  address,
  minimumContribution,
  balance,
  requestCount,
  approversCount,
  manager,
}) => {
  const renderCards = () => {
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
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money the Campaign has left to spend',
        style: { overflowWrap: 'break-word' },
      },
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

CampaignShow.getInitialProps = async (ctx) => {
  const { address } = ctx.query;
  const campaign = await Campaign(address);
  const summary = await campaign.methods.getSummary().call();
  return {
    address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

export default CampaignShow;
