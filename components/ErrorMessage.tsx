import { FC } from 'react';
import { Message } from 'semantic-ui-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (
  <Message error header="Oops" content={message} />
);

export default ErrorMessage;
