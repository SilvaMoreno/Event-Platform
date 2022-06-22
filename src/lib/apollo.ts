import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-us-west-2.graphcms.com/v2/cl4onvdjs0ltj01z48ene2mso/master",
  cache: new InMemoryCache(),
});
