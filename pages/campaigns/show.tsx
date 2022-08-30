import { Button, Grid } from 'semantic-ui-react';
import { CampaignCardGroup, ContributeForm, Layout } from '@/components';
import { Campaign } from '@/ethereum';
// @ts-ignore
import { Link } from '@/routes';
import { NextPage } from 'next';

interface CampaignShowProps {
  address: string
  minimumContribution: number
  balance: number
  requestCount: number
  approversCount: number
  manager: string
}
// @ts-ignore
const CampaignShow: NextPage<CampaignShowProps> = ({
  address,
  minimumContribution,
  balance,
  requestCount,
  approversCount,
  manager,
}) => {
  const { Column, Row } = Grid;
  return (
    <Layout>
      <h3>Campaign Details</h3>
      <Grid>
        <Row>
          <Column width={10}>
            <CampaignCardGroup
              manager={manager}
              minimumContribution={minimumContribution}
              requestCount={requestCount}
              approversCount={approversCount}
              balance={balance}
            />
          </Column>
          <Column width={6}>
            <ContributeForm address={address} />
          </Column>
        </Row>
        <Row>
          <Column>
            <Link route={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Column>
        </Row>
      </Grid>
    </Layout>
  );
};
// @ts-ignore
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
