import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Layout, RequestRow } from '@/components';
import { Campaign } from '@/ethereum';
import { Link } from '@/routes';

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
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
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    const { address, requests, requestCount, approversCount } = this.props;

    const renderRows = () => {
      return requests.map((request, index) => {
        return (
          <RequestRow
            key={index}
            id={index}
            request={request}
            address={address}
            approversCount={approversCount}
          />
        );
      });
    };

    const requestsTotalText = `Found ${requestCount} request${
      parseInt(requestCount) === 1 ? '' : 's'
    }`;

    return (
      <Layout>
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
          <Body>{renderRows()}</Body>
        </Table>
        <div>{requestsTotalText}</div>
      </Layout>
    );
  }
}

export default RequestIndex;
