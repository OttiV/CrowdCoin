import { useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { BackLink, ErrorMessage, Layout, RequestRow } from '@/components';
import { Campaign } from '@/ethereum';
import { Link } from '@/routes';

const RequestIndex = ({ address, requests, requestCount, approversCount }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const { Header, Row, HeaderCell, Body } = Table;

  const requestsTotalText = `Found ${requestCount} request${
    parseInt(requestCount) === 1 ? '' : 's'
  }`;

  return (
    <Layout>
      <BackLink route={`/campaigns/${address}`} />
      <h3>Request List</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.map((request, index) => (
            <RequestRow
              key={`${address}${index}`}
              id={index}
              request={request}
              address={address}
              approversCount={approversCount}
              setErrorMessage={setErrorMessage}
            />
          ))}
        </Body>
      </Table>
      <div>{requestsTotalText}</div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </Layout>
  );
};

RequestIndex.getInitialProps = async (ctx) => {
  const { address } = ctx.query;
  const campaign = Campaign(address);
  const approversCount = await campaign.methods.approversCount().call();
  const requestCount = await campaign.methods.getRequestsCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((el, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return { address, requests, requestCount, approversCount };
};

export default RequestIndex;
