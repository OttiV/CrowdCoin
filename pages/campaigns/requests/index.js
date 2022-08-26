import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { ErrorMessage, Layout, RequestRow } from '@/components';
import { Campaign } from '@/ethereum';
import { Link } from '@/routes';

class RequestIndex extends Component {
  state = {
    errorMessage: '',
  };

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
    const { errorMessage } = this.state;

    const requestsTotalText = `Found ${requestCount} request${
      parseInt(requestCount) === 1 ? '' : 's'
    }`;

    const setErrorMessage = (error) => {
      this.setState({ errorMessage: error });
    };

    return (
      <Layout>
        <Link route={`/campaigns/${address}`}>
          <a>Back</a>
        </Link>
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
                key={address}
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
  }
}

export default RequestIndex;
