import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  image: string;
}

export function MetaTags({ title, description, image }: Props) {
  return (
    <Head>
      <meta property="robots" content="all" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
