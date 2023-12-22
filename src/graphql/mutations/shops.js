import { gql } from "@apollo/client";
import client from "../apollo-client";

export const shopUpdate = async (payload) => {
  const results = await client.mutate({
    mutation: gql`
      mutation UpdateShop($shopInfo: updateShopInput) {
        updateShop(shopInfo: $shopInfo) {
          message
        }
      }
    `,
    variables: {
      shopInfo: payload.shopInfo,
    },
  });
  return results;
};
