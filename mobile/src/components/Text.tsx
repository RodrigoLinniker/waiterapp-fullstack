import styled from "styled-components/native";

interface TextProps {
  weight?: string;
  color?: string;
  size?: number;
  opacity?: number;
}

export const Text = styled.Text<TextProps>`
  color: ${({ color }) => color || "#333"};
  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
  opacity: ${({ opacity }) => opacity || 1};
  font-weight: ${({ weight }) => (weight ? weight : "normal")};
`;
