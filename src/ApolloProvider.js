import React from "react";
import ApolloClient from "apollo-boost";
import App from "./App";
import { InMemoryCache } from "apollo-boost";

import { ApolloProvider } from "react-apollo-hooks";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? token : "",
      },
    });
  },
});
const Provider = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Provider;
