import { AntDesign } from "@expo/vector-icons";
import { FlatList, Modal } from "react-native";
import { Products } from "../../types/Products";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { Text } from "../Text";
import {
  CloseButton,
  Image,
  ModalBody,
  Header,
  IngredientsContainer,
  Ingredient,
  Footer,
  FooterContainer,
  PriceContainer,
} from "./styles";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Products | null;
  onAddToCart: (product: Products) => void;
}

const { URL } = process.env;
export function ProductModal({
  visible,
  onClose,
  product,
  onAddToCart,
}: ProductModalProps) {
  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `${URL}/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <AntDesign name="close" size={16} color="#fff" />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text color="#666" style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight="600" color="#666">
              Ingredientes
            </Text>
            <FlatList
              data={product.ingredients}
              keyExtractor={(ingredient) => `${ingredient.id}`}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color="#666" style={{ marginLeft: 20 }}>
                    {ingredient.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>
      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600" style={{}}>
              {formatCurrency(product.price)}
            </Text>
          </PriceContainer>
          <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
