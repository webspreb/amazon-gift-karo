/* Root layout for Payload Admin UI */
import configPromise from '@payload-config';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import React from 'react';
import { importMap } from './importMap';
import '@payloadcms/next/css';

type Args = {
  children: React.ReactNode;
};

export default function Layout({ children }: Args) {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={async function (args) {
        'use server';
        return handleServerFunctions({
          ...args,
          config: configPromise,
          importMap,
        });
      }}
    >
      {children}
    </RootLayout>
  );
}
