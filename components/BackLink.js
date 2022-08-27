import { Link } from '@/routes';

const BackLink = ({ route }) => (
  <Link route={route}>
    <a>Back</a>
  </Link>
);

export default BackLink