import OrderList from "@/components/OrderList";
import UserDetails from "@/components/UserDetails";
import { headers } from "next/headers";
import React from "react";
// const getData = async () => {
//   const response = await fetch(
//     `${process.env.NEXT_BASE_API_URL}/api/order/fetch-orders`,
//     {
//       method: "GET",
//       cache: "no-store",
//       headers: headers(),
//     }
//   );
//   return await response.json();
// };

const Home = async () => {
  // const data = await getData();
  return (
    <div className="p-2 md:w-1/2 mx-auto">
      <UserDetails />
      <OrderList />
    </div>
  );
};

export default Home;
