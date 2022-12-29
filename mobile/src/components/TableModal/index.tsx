import { Modal, TouchableOpacity, Platform } from "react-native";
import { Text } from "../Text";
import { useState } from "react";
import { ModalBody, Overlay, Header, Form, Input } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "../Button";

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}
export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState("");

  const handleSave = () => {
    onSave(table);
    setTable("");
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={24} color="#666" />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
            />
            <Button onPress={handleSave} disabled={table.length === 0}>
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
