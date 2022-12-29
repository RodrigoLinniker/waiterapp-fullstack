import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { Products } from "../../types/Products";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { Text } from "../Text";
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductsDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from "./styles";
import api from "../../services/httpService";

const { URL } = process.env;

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Products) => void;
  onDecrement: (product: Products) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder,
  selectedTable,
}: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const total = cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);

  const handleConfirmOrder = async () => {
    setIsLoading(true);

    await api.post("/orders", {
      table: selectedTable,
      orderProducts: cartItems.map((cartItems) => ({
        productsId: cartItems.product.id,
        quantity: cartItems.quantity,
      })),
    });

    setIsLoading(false);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onConfirmOrder();
    setIsModalVisible(false);
  };

  return (
    <>
      <OrderConfirmedModal visible={isModalVisible} onOk={handleOk} />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => `${cartItem.product.id}`}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `${URL}/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductsDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductsDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <AntDesign name="pluscircleo" size={24} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <AntDesign name="minuscircleo" size={24} color="red" />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>
        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}
