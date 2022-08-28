import { Button, Card } from 'semantic-ui-react';
import { factory } from '@/ethereum';
import { Layout } from '@/components';
import { Link } from '@/routes';

const CampaignIndex = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Open Campaigns</h3>
      <Link route="campaigns/new">
        <a>
          <Button
            content="Create Campaign"
            icon="add circle"
            floated="right"
            primary
          />
        </a>
      </Link>
      {renderCampaigns()}
    </Layout>
  );
};

CampaignIndex.getInitialProps = async (ctx) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { campaigns };
};

export default CampaignIndex;
