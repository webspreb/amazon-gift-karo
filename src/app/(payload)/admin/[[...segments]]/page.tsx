/* Page route for Payload Admin UI */
import configPromise from '@payload-config';
import { generatePageMetadata, RootPage } from '@payloadcms/next/views';
import { importMap } from '../importMap';

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config: configPromise, params, searchParams });

export default function Page({ params, searchParams }: Args) {
  return RootPage({ config: configPromise, params, searchParams, importMap });
}
