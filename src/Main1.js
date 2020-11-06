import React from "react";
import { gql, useLazyQuery, useSubscription } from "@apollo/client";

const OFFERS_SUBSCRIPTION = gql`
  subscription MySubscription {
    offers {
      id
    }
  }
`;

const Main1 = () => {
  const { error, data } = useSubscription(OFFERS_SUBSCRIPTION);

  console.log("Subscriptions", { error, data });

  return (
    <div>
      Subscriptions!
      {data?.offers.map(({ id }) => (
        <div>{id}</div>
      ))}
    </div>
  );
};

export default Main1;
