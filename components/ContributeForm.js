import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { Campaign, web3 } from '@/ethereum';
import { Router } from '@/routes';
import ErrorMessage from './ErrorMessage';

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const campaign = Campaign(address);
    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });
      Router.replaceRoute(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setValue('');
    setLoading(false);
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to contribute</label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <ErrorMessage message={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
