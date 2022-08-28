import {  Message } from 'semantic-ui-react';

const ErrorMessage = ({message}) =>  <Message error header="Oops" content={message} />

export default ErrorMessage