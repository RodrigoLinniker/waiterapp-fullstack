import { useState } from "react";
import api from "../../services/httpService";
import { Order } from "../../types/Orders";
import { Modal } from "../Modal";
import { toast } from "react-toastify";

interface PropsOrdersModal {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderID: number) => void;
  onChangeOrderStatus: (orderId: number, status: Order["status"]) => void;
}
export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}: PropsOrdersModal) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

  const handleOpenModal = (order: Order) => {
    setIsModalVisible(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleOnChangeOrderStatus = async () => {
    const status =
      selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";

    await api.patch(`/orders/${selectedOrder?.id}`, { status });

    toast.success(
      `O pedido da mesa ${selectedOrder?.table} teve o status alterado!`,
      { autoClose: 2000 }
    );
    onChangeOrderStatus(selectedOrder!.id, status);
    setIsModalVisible(false);
  };

  const handleCancelOrder = async () => {
    await api.delete(`/orders/${selectedOrder?.id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado`, {
      autoClose: 2000,
    });
    onCancelOrder(selectedOrder!.id);

    setIsModalVisible(false);
  };

  return (
    <div className="w-full flex flex-col justify-center gap-6 p-4 border-[1px] border-solid rounded-2xl border-[#CCCCCC/40]">
      <header className="flex gap-2 p-2 justify-center text-sm">
        <span>{icon}</span> <strong>{title}</strong>{" "}
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <div className="flex flex-col gap-6">
          {orders.map((order: Order) => {
            return (
              <button
                key={order.id}
                onClick={() => handleOpenModal(order)}
                className=" w-full border-[1px] border-solid rounded-2xl border-[#CCCCCC/40] py-10 bg-white"
              >
                <div className="flex flex-col gap-1 items-center ">
                  <strong>Mesa {order.table}</strong>
                  <h1 className="text-sm text-gray-400">
                    {order.products.length} itens
                  </h1>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <Modal
        onClose={handleCloseModal}
        visible={isModalVisible}
        order={selectedOrder}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOnChangeOrderStatus}
      />
    </div>
  );
}
