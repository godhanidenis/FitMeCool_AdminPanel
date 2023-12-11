import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_BASE_URL}`,
});

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === "Invalid/Expired token") {
        localStorage.clear();
        Navigate("/");
        toast.success("User Logout Successfully!!", { theme: "colored" });
      }
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
