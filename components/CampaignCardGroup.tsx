import { Card } from 'semantic-ui-react';
import { web3 } from '@/ethereum';
import { FC } from 'react';

interface CampaignCardGroupProps {
  manager: string
  minimumContribution: number
  requestCount: number
  approversCount:number
  balance: number
}

const CampaignCardGroup: FC<CampaignCardGroupProps> = ({
  manager,
  minimumContribution,
  requestCount,
  approversCount,
  balance,
}) => {
  const { Group } = Card;
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
      description: 'Number of people who have already donated to this campaign',
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
  return <Group items={items} />;
};

export default CampaignCardGroup;
