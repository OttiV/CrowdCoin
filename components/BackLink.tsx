// @ts-ignore
import { Link } from '@/routes';
import { FC } from 'react';

interface BackLinkProps{
  route: string
}

const BackLink:FC<BackLinkProps> = ({ route }) => (
  <Link route={route}>
    <a>Back</a>
  </Link>
);

export default BackLink