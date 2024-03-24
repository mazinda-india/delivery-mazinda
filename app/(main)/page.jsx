import OrderList from "@/components/OrderList";
import UserDetails from "@/components/UserDetails";
import React from "react";

const Home = async () => {
  return (
    <div className="p-2 md:w-1/2 mx-auto">
      <UserDetails />
      <OrderList />
    </div>
  );
};

export default Home;
