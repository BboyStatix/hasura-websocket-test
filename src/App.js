import "./App.css";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import Main from "./Main";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "apollo-utilities";
import { split } from "apollo-link";
import { SubscriptionClient } from "subscriptions-transport-ws";

const HTTP_ENDPOINT       = "https://hasura-staging.goodcity.hk/v1/graphql";
const WEBSOCKET_ENDPOINT  = "wss://hasura-staging.goodcity.hk/v1/graphql";

// const authToken =
//   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxOSwiYXVkaWVuY2UiOiJnb29kY2l0eSIsImlzc3VlciI6Imdvb2RjaXR5IiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInN1cGVydmlzb3IiLCJ1c2VyIiwicHVibGljIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InN1cGVydmlzb3IiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMTkiLCJ4LWhhc3VyYS1vcmdhbmlzYXRpb24taWRzIjoie30ifSwiaWF0IjoxNjA0NTU2NTYwLCJpc3MiOiJnb29kY2l0eSIsImV4cCI6MTYwNDU2MDE2MCwiaHR0cHM6Ly9nb29kY2l0eS5oay9qd3QvbWV0YWRhdGEiOnsidHlwZSI6ImFwaSJ9fQ.oa1YrK5DV6yAdgwlxtYYHzWJdp3_0bBlnzUOzEzh9pU";

const getHeaders = () => {
  return {
    "x-hasura-admin-secret": "ADMIN SECRET"
  };
};

const createApolloClient = () => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        ...getHeaders()
      }
    };
  });

  const wsLink = new WebSocketLink(
    new SubscriptionClient(WEBSOCKET_ENDPOINT, {
      reconnect: true,
      timeout: 10000,
      connectionParams: {
        headers: getHeaders()
      }
    })
  );

  const httpLink = new HttpLink({
    uri: HTTP_ENDPOINT,
    headers: getHeaders()
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache({
      addTypename: true
    })
  });
};

function App() {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Main /> 
    </ApolloProvider>
  );
}

export default App;
