import Link from 'next/link'
import { FC } from 'react';

interface BackLinkProps{
  href: string
}

const BackLink:FC<BackLinkProps> = ({ href }) => (
  <Link href={href}>
    <a>Back</a>
  </Link>
);

export default BackLink