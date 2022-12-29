import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Modal } from "react-native";
import { Text } from "../Text";
import { Container, OkButton } from "./styles";

interface OrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({
  visible,
  onOk,
}: OrderConfirmedModalProps) {
  return (
    <Modal animationType="fade" visible={visible}>
      <StatusBar style="light" />
      <Container>
        <AntDesign name="checkcircleo" size={24} color="white" />

        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>

        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>

        <OkButton onPress={onOk}>
          <Text weight="600" color="#d73035">
            Ok
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
