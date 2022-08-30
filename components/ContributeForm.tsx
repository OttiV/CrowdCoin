import React, { FC, SyntheticEvent, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { Campaign, web3 } from '@/ethereum';
// @ts-ignore
import { Router } from '@/routes';
import ErrorMessage from './ErrorMessage';

interface ContributeFormProps {
  address: string
}

const ContributeForm: FC<ContributeFormProps> = ({ address }) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: SyntheticEvent) => {
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
// @ts-ignore
      setErrorMessage(err.message);
    }
    setValue('');
    setLoading(false);
  };
  const { Field } = Form;
  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Field>
        <label>Amount to contribute</label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Field>
      <ErrorMessage message={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
