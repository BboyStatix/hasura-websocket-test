import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
const FETCH_OFFERS = gql`
  query MyQuery {
    offers {
      id
    }
  }
`;

const Main = () => {
  const [fetchOffers, { error, data }] = useLazyQuery(FETCH_OFFERS);

  console.log({ error, data });

  return (
    <div>
      {data?.offers.map(({ id }) => (
        <div key={id}>{id}</div>
      ))}
      <button onClick={() => fetchOffers()}>Fetch Offers</button>
    </div>
  );
};

export default Main;
