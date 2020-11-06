import React from "react";
import { gql, useLazyQuery, useSubscription } from "@apollo/client";

const FETCH_OFFERS = gql`
  query MyQuery {
    offers(order_by: {id: asc}) {
      id,
      notes
    }
  }
`;

const SUBSCRIBE_TO_OFFERS = gql`
  subscription MyQuery {
    offers(order_by: {id: asc}) {
      id,
      notes
    }
  }
`;

const style = {
  borderBottom: "1px solid gray",
  padding: "20px",
}

const Main = () => {
  // const [fetchOffers, { error, data }] = useLazyQuery(FETCH_OFFERS);
  const { loading, error, data } = useSubscription(SUBSCRIBE_TO_OFFERS);

  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    console.error(error);
    return <span>Error!</span>;
  }

  return (
    <div>
      {data?.offers.map(({ id, notes, state }) => (
        <div style={style} key={id}>[Order {id}] notes="{notes}" state="{state}"</div>
      ))}
      {/* <button onClick={() => fetchOffers()}>Fetch Offers</button> */}
    </div>
  );
};

export default Main;
