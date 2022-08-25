import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xF54D4182C0e78d2934490753d0427FE1439F4d9a'
);

export default instance;
