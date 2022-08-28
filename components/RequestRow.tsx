import { FC, SyntheticEvent, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
// @ts-ignore
import { Campaign, web3 } from '@/ethereum';
// @ts-ignore
import { Router } from '@/routes';

interface Request {
  description: string;
  value: string;
  recipient: string;
  approvalCount: number;
  complete: boolean;
}

interface RequestRowProps {
  id: number;
  request: Request;
  address: string;
  approversCount: number;
  setErrorMessage: (value: string) => void;
}

const RequestRow: FC<RequestRowProps> = ({
  id,
  request,
  address,
  approversCount,
  setErrorMessage,
}) => {
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isFinalizeLoading, setIsFinalizeLoading] = useState(false);

  const { Row, Cell } = Table;
  const { description, value, recipient, approvalCount, complete } = request;
  // @ts-ignore
  const amount = web3.utils.fromWei(value, 'ether');
  const isReadyToFinalize = approvalCount > approversCount / 2;

  const onApprove = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsApproveLoading(true);
    setErrorMessage('');
    try {
      // @ts-ignore
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(address);
      await campaign.methods.approveRequest(id).send({ from: accounts[0] });
      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      // @ts-ignore
      setErrorMessage(err.message);
    }
    setIsApproveLoading(false);
  };

  const onFinalize = async (e) => {
    e.preventDefault();
    setIsFinalizeLoading(true);
    setErrorMessage('');
    try {
      // @ts-ignore
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(address);
      await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      // @ts-ignore
      setErrorMessage(err.message); 
    }
    setIsFinalizeLoading(false);
  };

  return (
    <Row disabled={complete} positive={isReadyToFinalize && !complete}>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{amount}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>
        {approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {complete ? null : (
          <Button
            color="green"
            basic
            onClick={onApprove}
            loading={isApproveLoading}
          >
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {complete ? null : (
          <Button
            color="teal"
            basic
            onClick={onFinalize}
            loading={isFinalizeLoading}
          >
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
