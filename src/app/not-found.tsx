'use client';

import Link from 'next/link';
import { Text } from 'react-aria-components';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center flex-col gap-2">
      <Text elementType="h1" className="font-bold text-xl">
        Not Found
      </Text>
      <Text elementType="p">Could not find requested resource</Text>
      <Link href="/" className="text-blue-400 underline">
        Return Home
      </Link>
    </div>
  );
}
