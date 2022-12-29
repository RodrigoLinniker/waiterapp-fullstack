import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import api from "../../services/httpService";
import { Category } from "../../types/Category";
import { Text } from "../Text";
import { CategoryContainer, Icon } from "./styles";

interface CategoriesProsp {
  categories: Category[];
  onSelectCategory: (categoryId: number) => Promise<void>;
}
export function Categories({ categories, onSelectCategory }: CategoriesProsp) {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleSelectCategory = (categoryId: number) => {
    const category = selectedCategory === categoryId ? 0 : categoryId;

    onSelectCategory(category);
    setSelectedCategory(category);
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(category: Category) => `${category.id}`}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category.id;
        return (
          <CategoryContainer
            onPress={() => {
              handleSelectCategory(category.id);
            }}
          >
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>
            <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </CategoryContainer>
        );
      }}
    />
  );
}
