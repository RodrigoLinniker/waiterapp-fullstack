import image from "../../assets/quatro-queijos.png";
import { Order } from "../../types/Orders";
import { formatCurrency } from "../../utils/formatCurrency";

interface ModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  onChangeOrderStatus: () => void;
}

export function Modal({
  onClose,
  visible,
  order,
  onCancelOrder,
  onChangeOrderStatus,
}: ModalProps) {
  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce((total, { Products, quantity }) => {
    return total + Products.price * quantity;
  }, 0);

  return (
    <div
      onClick={onClose}
      className="fixed flex top-0 bottom-0 left-0 p-4 right-0 bg-black/80 backdrop-blur-sm items-center justify-center z-[999]"
    >
      <div
        className="w-full max-w-[480px] flex flex-col bg-white rounded-lg p-8 gap-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Mesa {order.table}</h1>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="w-full flex flex-col gap-2">
          <h1 className="text-gray-500 text-sm">Status do Pedido</h1>
          <div className="flex gap-2">
            <span>
              {order.status === "WAITING" && "⏱"}
              {order.status === "IN_PRODUCTION" && "👨‍🍳"}
              {order.status === "DONE" && "✅"}
            </span>
            <strong>
              {order.status === "WAITING" && "Fila de espera"}
              {order.status === "IN_PRODUCTION" && "Em produção"}
              {order.status === "DONE" && "Pronto!"}
            </strong>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-gray-500 text-sm">itens</h1>

          <div className="flex flex-col gap-4">
            {order.products.map(({ productsId, Products, quantity }) => (
              <div className="flex gap-3 items-center" key={productsId}>
                <img
                  src={`http://localhost:3333/uploads/${Products.imagePath}`}
                  alt={Products.name}
                  width="56"
                  height="28.51"
                  className="rounded-md"
                />
                <div className="flex gap-1">
                  <h1 className="text-gray-500 text-sm min-w-[20px] mt-[2px]">
                    {quantity}x
                  </h1>

                  <div className="flex flex-col gap-1">
                    <strong>{Products.name}</strong>
                    <h1 className="text-gray-500 text-sm">
                      {formatCurrency(Products.price)}
                    </h1>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <h1 className="text-gray-500 text-sm"> Total</h1>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </div>
        </div>
        {order.status !== "DONE" && (
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={onChangeOrderStatus}
              className="py-[11px] px-6 bg-[#333333] hover:bg-[#27272a] rounded-full "
            >
              <div className="flex gap-2 justify-center">
                <span>
                  {order.status === "WAITING" && "👨‍🍳"}
                  {order.status === "IN_PRODUCTION" && "✅"}
                </span>
                <strong className="text-white">
                  {order.status === "WAITING" && "Iniciar Produção"}
                  {order.status === "IN_PRODUCTION" && "Concluir Pedido!"}
                </strong>
              </div>
            </button>
          </div>
        )}
        <button
          onClick={onCancelOrder}
          className="py-[11px] px-6 rounded-full text-red-500 hover:text-red-700 "
        >
          <div className="flex gap-1 justify-center items-center">
            <strong>Cancelar Pedido</strong>
          </div>
        </button>
      </div>
    </div>
  );
}
