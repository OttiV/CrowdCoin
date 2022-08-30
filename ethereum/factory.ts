import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x71112a4fae3d9f5e968E249F44883c382303e982'
);

export default instance;
