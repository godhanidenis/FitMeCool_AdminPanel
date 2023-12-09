import { gql } from "@apollo/client";
import client from "../apollo-client";

export const deleteAccount = async (payload) => {
  const results = await client.mutate({
    mutation: gql`
      mutation DeleteAccount($deleteAccountId: String, $forAdmin: Boolean) {
        deleteAccount(id: $deleteAccountId, forAdmin: $forAdmin)
      }
    `,
    variables: {
      deleteAccountId: payload.id,
      forAdmin: payload.forAdmin,
    },
  });
  return results;
};
