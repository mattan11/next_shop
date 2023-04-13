import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clgc19cl93s4401tf9j8v4kau/master",
  cache: new InMemoryCache(),
});
