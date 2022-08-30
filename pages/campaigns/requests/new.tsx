import { NextPage } from 'next';
import { SyntheticEvent, useState } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import { BackLink, ErrorMessage, Layout } from '@/components';
import { Campaign, web3 } from '@/ethereum';
import Router from '@/routes';

interface RequestNewProps {
  address: string;
}

// @ts-ignore
const RequestNew: NextPage<RequestNewProps> = ({ address }) => {
  const { Field } = Form;
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const campaign = Campaign(address);
    setIsLoading(true);
    setErrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <BackLink href={`/campaigns/${address}/requests`} />
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <Field>
          <label>Value in Ether</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Field>
        <ErrorMessage message={errorMessage} />
        <Button primary loading={isLoading}>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

// @ts-ignore
RequestNew.getInitialProps = (ctx) => {
  const { address } = ctx.query;
  return { address };
};

export default RequestNew;
