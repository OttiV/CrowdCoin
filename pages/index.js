import { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  render() {
    const { campaigns } = this.props;
    
    return (
      <div>
        <div>Campaign index</div>
        <div>
          {campaigns.map((campaign) => (
            <div key={campaign}>{campaign}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default CampaignIndex;
