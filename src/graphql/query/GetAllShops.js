import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllShops = async (payload) => {
  const result = await client.query({
    query: gql`
      query AdminShopLists {
        adminShopLists {
          id
          user_id
          owner_id
          shop_name
          shop_email
          shop_logo {
            extraSmall
            small
            medium
            large
          }
          shop_cover_image {
            large
            medium
            small
          }
          shop_images {
            links {
              medium
              small
            }
          }
          shop_video
          shop_type
          flag
          shop_social_link {
            facebook
            instagram
            website
          }
          shopFollowerCount
          shopReviewCount
          shop_review {
            id
            shop_id
            user_id
            user_name
            user_type
            stars
            message
            flag
            updatedAt
            createdAt
          }
          shop_rating
          branch_info {
            id
            shop_id
            branch_address
            branch_pinCode
            branch_city
            branch_state
            same_as
            manager_name
            manager_contact
            manager_email
            branch_type
            flag
          }
          shop_time {
            week
            open_time
            close_time
            is_close
            is_24Hours_open
          }
          ownerInfo {
            id
            owner_firstName
            owner_lastName
            owner_email
            owner_contact
            user_id
            flag
          }
          productLimit
          balanceProduct
          createdAt
          subscriptionDate
        }
      }
    `,

    fetchPolicy: "no-cache",
  });
  return result?.data;
};
