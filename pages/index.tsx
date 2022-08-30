import { NextPage } from 'next';
import { Button, Card } from 'semantic-ui-react';
import { Layout } from '@/components';
import { factory } from '@/ethereum';
import Link from 'next/link'

interface CampaignIndexProps {
  campaigns: string[]
}

const CampaignIndex: NextPage<CampaignIndexProps> = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
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
      <Link href="campaigns/new">
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
