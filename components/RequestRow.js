import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Campaign, web3 } from '@/ethereum';

const RequestRow = ({ id, request, address, approversCount }) => {
  const { Row, Cell } = Table;
  const { description, value, recipient, approvalCount, complete } = request;
  const amount = web3.utils.fromWei(value, 'ether');
  const isReadyToFinalize = approvalCount > approversCount / 2;

  const onApprove = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(address);
    await campaign.methods.approveRequest(id).send({ from: accounts[0] });
  };

  const onFinalize = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(address);
    await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
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
          <Button color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {complete ? null : (
          <Button color="teal" basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
