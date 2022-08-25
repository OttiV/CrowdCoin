import { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { ErrorMessage, Layout } from '@/components';
import { factory, web3 } from '@/ethereum';
import { Router } from '@/routes';

const CampaignNewIndex = () => {
  const [minimumContribution, setMinimumContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });
      Router.pushRoute('/');
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
        </Form.Field>
        <ErrorMessage message={errorMessage} />
        <Button primary type="submit" loading={isLoading}>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNewIndex;
