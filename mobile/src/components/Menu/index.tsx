import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import api from "../../services/httpService";
import { formatCurrency } from "../../utils/formatCurrency";
import { Text } from "../Text";
import {
  AddToCartButton,
  Product,
  ProductImage,
  ProductsDetails,
  Separator,
} from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { ProductModal } from "../ProductModal";
import { Products } from "../../types/Products";

const { URL } = process.env;

interface MenuProps {
  onAddToCart: (product: Products) => void;
  products: Products[];
}
export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

  const handleOpenModal = (product: Products) => {
    setIsModalVisible(true);
    setSelectedProduct(product);
  };

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        product={selectedProduct}
        onAddToCart={onAddToCart}
        onClose={() => {
          setIsModalVisible(false);
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        data={products}
        ItemSeparatorComponent={Separator}
        keyExtractor={(product: Products) => `${product.id}`}
        renderItem={({ item: product }) => {
          return (
            <Product
              onPress={() => {
                handleOpenModal(product);
              }}
            >
              <ProductImage
                source={{
                  uri: `${URL}/uploads/${product.imagePath}`,
                }}
              />
              <ProductsDetails>
                <Text weight="600">{product.name}</Text>
                <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                  {product.description}
                </Text>
                <Text size={14} weight="600">
                  {formatCurrency(product.price)}
                </Text>
              </ProductsDetails>
              <AddToCartButton onPress={() => onAddToCart(product)}>
                <AntDesign name="pluscircleo" size={24} color="red" />
              </AddToCartButton>
            </Product>
          );
        }}
      />
    </>
  );
}
