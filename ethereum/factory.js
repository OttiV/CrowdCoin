import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xFea7058f7bce29826a6C8C562082490D53427747'
);

export default instance;
