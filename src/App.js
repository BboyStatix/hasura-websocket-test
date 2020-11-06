import logo from "./logo.svg";
import "./App.css";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { ApolloProvider } from "@apollo/client";
import Main from "./Main";
import { SubscriptionClient } from "subscriptions-transport-ws";
import Main1 from "./Main1";
import { useState } from "react";

// const HTTP_ENDPOINT = "http://localhost:8080/v1/graphql";
// const GRAPHQL_ENDPOINT = "ws://localhost:8080/v1/graphql";
const HTTP_ENDPOINT = "http://hasura-staging.goodcity.hk/v1/graphql";
const GRAPHQL_ENDPOINT = "wss://hasura-staging.goodcity.hk/v1/graphql";

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxOSwiYXVkaWVuY2UiOiJnb29kY2l0eSIsImlzc3VlciI6Imdvb2RjaXR5IiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInN1cGVydmlzb3IiLCJ1c2VyIiwicHVibGljIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InN1cGVydmlzb3IiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMTkiLCJ4LWhhc3VyYS1vcmdhbmlzYXRpb24taWRzIjoie30ifSwiaWF0IjoxNjA0NTU2NTYwLCJpc3MiOiJnb29kY2l0eSIsImV4cCI6MTYwNDU2MDE2MCwiaHR0cHM6Ly9nb29kY2l0eS5oay9qd3QvbWV0YWRhdGEiOnsidHlwZSI6ImFwaSJ9fQ.oa1YrK5DV6yAdgwlxtYYHzWJdp3_0bBlnzUOzEzh9pU";

const httpLink = new HttpLink({
  uri: HTTP_ENDPOINT,
  headers: {
    authorization: authToken,
  },
});

const subscriptionClient = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
  connectionParams: {
    authToken,
  },
});
const wsLink = new WebSocketLink(subscriptionClient);
// const wsLink = new WebSocketLink({
//   uri: GRAPHQL_ENDPOINT,
//   options: {
//     reconnect: true,
//   },
// });

// const client = new ApolloClient({
//   // link: httpLink,
//   link: wsLink,
//   cache: new InMemoryCache(),
// });

function App() {
  const [showSubscriptions, setShowSubscriptions] = useState(false);

  return null;
  // return (
  //   <ApolloProvider client={client}>
  //     <Main />
  //     {showSubscriptions && <Main1 />}
  //     <button onClick={() => setShowSubscriptions(true)}>Subscriptions!</button>
  //   </ApolloProvider>
  // );
}

export default App;
