import { Layout } from '../components';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
