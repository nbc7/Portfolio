import { Layout } from '../components';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
