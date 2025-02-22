import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
import { StoreProvider } from './utils/GlobalState';
import { setContext } from '@apollo/client/link/context';
import useTranslation from "./components/customHooks/translation";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
  const translation = useTranslation();
  
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
      <div>
        <Header />
          <main>
            <Outlet />
          </main>
        <Footer />
      </div>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;