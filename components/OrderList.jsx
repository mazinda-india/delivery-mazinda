"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";
import OvalLoader from "./loader/OvalLoader";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remainingTimes, setRemainingTimes] = useState([]);
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);
  const [otp, setOtp] = useState({
    index: null,
    value: "",
    error: false,
  });
  const [otpSubmitting, setOtpSubmitting] = useState({
    index: null,
    loading: false,
  });

  const handleOtpSubmit = async (order, index) => {
    setOtpSubmitting({
      index,
      loading: true,
    });
    if (!order.vendorVerified) {
      if (otp.index === index && parseInt(otp.value) === order.vendorOTP) {
        console.log("correct");
        const { data } = await axios.post("/api/order/update/status", {
          orderId: order._id,
        });
        console.log(data);
        if (data.success) {
          let updatedOrders = orders.map((mappedOrder) => {
            if (order._id === mappedOrder._id) {
              return { ...mappedOrder, vendorVerified: true };
            }
            return mappedOrder;
          });
          setOrders(updatedOrders);
        }
      } else {
        setOtp((prev) => ({ ...prev, error: true }));
      }
    } else if (order.vendorVerified && !order.userVerified) {
      if (otp.index === index && parseInt(otp.value) === order.userOTP) {
        console.log("correct");
        const { data } = await axios.post("/api/order/update/status", {
          orderId: order._id,
        });
        console.log(data);
        if (data.success) {
          let updatedOrders = orders.map((mappedOrder) => {
            if (order._id === mappedOrder._id) {
              return { ...mappedOrder, userVerified: true };
            }
            return mappedOrder;
          });
          setOrders(updatedOrders);
        }
      } else {
        setOtp((prev) => ({ ...prev, error: true }));
      }
    }

    setOtpSubmitting({
      index,
      loading: false,
    });
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await axios.get("/api/order/fetch-orders");
        console.log(data);
        if (data.success) {
          setOrders(data.foodOrders.reverse());
          const times = data.foodOrders.map((item) =>
            calculateRemainingTime(item.createdAt)
          );
          setRemainingTimes(times);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const calculateRemainingTime = (createdAtTimestamp) => {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - new Date(createdAtTimestamp).getTime();
    return Math.max(20 * 60 * 1000 - elapsedTime, 0);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTimes((prevTimes) =>
        prevTimes.map((time) => Math.max(time - 1000, 0))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3">
        <span>Loading Orders</span>
        <OvalLoader />
      </div>
    );
  }

  if (!loading && !orders.length) {
    return (
      <div className="flex justify-center text-gray-500">
        <span>No Orders Currently</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {orders.map((order, index) => {
        const remainingMinutes = Math.floor(
          remainingTimes[index] / (60 * 1000)
        );
        const remainingSeconds = Math.floor(
          (remainingTimes[index] % (60 * 1000)) / 1000
        );
        return (
          <div key={index}>
            {!order.vendorVerified ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>{order.vendorName}</span>
                    <span>₹{order.amount}</span>
                  </CardTitle>
                  <CardDescription>
                    <span>Order ID: {order._id.slice(-4)}</span>
                    <br />
                    {remainingMinutes === 0 && remainingSeconds === 0 ? (
                      <span className="font-bold text-red-500 text-lg">
                        YOU ARE LATE{" "}
                      </span>
                    ) : (
                      <span className="text-xl">
                        {remainingMinutes}:{remainingSeconds}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1">
                    <Input
                      value={otp.index === index ? otp.value : ""}
                      onChange={(e) => setOtp({ index, value: e.target.value })}
                      placeholder="Enter OTP provided by store"
                    />
                    {otpSubmitting.index === index && otpSubmitting.loading ? (
                      <Button disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying
                      </Button>
                    ) : (
                      <Button onClick={() => handleOtpSubmit(order, index)}>
                        Enter
                      </Button>
                    )}
                  </div>

                  {otp.index === index && otp.error ? (
                    <span className="text-red-500 text-sm">Incorrect OTP</span>
                  ) : null}
                </CardContent>
              </Card>
            ) : order.vendorVerified && !order.userVerified ? (
              <Card
                onClick={() => {
                  setExpandedOrderIndex(expandedOrderIndex ? null : index);
                }}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>{order.vendorName}</span>
                    <span>₹{order.amount}</span>
                  </CardTitle>
                  <CardDescription>
                    Order ID: {order._id.slice(-4)}
                  </CardDescription>
                </CardHeader>

                {expandedOrderIndex === index ? (
                  <CardContent>
                    <div>
                      <h1 className="font-bold text-lg">Delivery Details : </h1>
                      <span>
                        {order.address.hostel}, {order.address.campus}
                      </span>
                      <br />
                      <a
                        href={`tel:${order.address.phoneNumber}`}
                        className="text-blue-500 underline"
                      >
                        {order.address.phoneNumber}
                      </a>
                    </div>
                    <div className="mt-4">
                      <h1 className="font-bold text-lg">Items : </h1>
                      {Object.keys(order.products).map((itemName, index) => (
                        <span key={index}>
                          {itemName} - {order.products[itemName].quantity}
                        </span>
                      ))}
                    </div>

                    <div
                      className="flex gap-1 mt-3"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Input
                        value={otp.index === index ? otp.value : ""}
                        onChange={(e) =>
                          setOtp({ index, value: e.target.value })
                        }
                        placeholder="Enter OTP provided by the user"
                      />
                      {otpSubmitting.index === index &&
                      otpSubmitting.loading ? (
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying
                        </Button>
                      ) : (
                        <Button onClick={() => handleOtpSubmit(order, index)}>
                          Enter
                        </Button>
                      )}
                    </div>
                    {otp.index === index && otp.error ? (
                      <span className="text-red-500 text-sm">
                        Incorrect OTP
                      </span>
                    ) : null}
                  </CardContent>
                ) : null}
              </Card>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
