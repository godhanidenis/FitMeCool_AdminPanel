import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllCustomers = async (payload) => {
  const result = await client.query({
    query: gql`
      query AdminUserLists {
        adminUserLists {
          id
          first_name
          last_name
          user_email
          user_contact
          user_password
          user_type
          flag
        }
      }
    `,

    fetchPolicy: "no-cache",
  });
  return result?.data;
};
