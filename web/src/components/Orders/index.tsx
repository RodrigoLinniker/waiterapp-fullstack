import { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import api from "../../services/httpService";
import { Order } from "../../types/Orders";
import { OrdersBoard } from "../OrdersBoard";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo("http://localhost:3333", {
      transports: ["websocket"],
    });

    socket.on("orders@new", (order) => {
      setOrders((prevState) => prevState.concat(order));
    });

    return () => {
      socket.off("orders@new");
    };
  }, []);

  useEffect(() => {
    function getOrders() {
      api
        .get("/orders")
        .then((response: any) => {
          setOrders(response.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    getOrders();
  }, []);

  const waiting = orders.filter((order) => order.status === "WAITING");
  const inProduct = orders.filter((order) => order.status === "IN_PRODUCTION");
  const done = orders.filter((order) => order.status === "DONE");

  const handleCancelOrder = (orderId: number) => {
    setOrders((prevState) => prevState.filter((order) => order.id !== orderId));
  };

  const handleOrderStatusChange = (
    orderId: number,
    status: Order["status"]
  ) => {
    setOrders((prevState) =>
      prevState.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <div className="w-full max-w-[1216px] flex max-md:flex-col gap-8 mx-auto mt-10 max-md:px-10 px-2">
      <OrdersBoard
        icon="⏱"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        icon="👨‍🍳"
        title="Em produção"
        orders={inProduct}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </div>
  );
}
