import React from "react";
import { Button as MuiButton } from "@mui/material";

const BaseButton = ({
  text,
  onClick,
  type = "button",
  variantType = "primary",
}) => {
  const getButtonStyle = () => {
    switch (variantType) {
      case "delete":
        return { variant: "contained", color: "error" };
      case "primary":
      default:
        return { variant: "contained", color: "primary" };
    }
  };

  const { variant, color } = getButtonStyle();

  return (
    <MuiButton type={type} onClick={onClick} variant={variant} color={color}>
      {text}
    </MuiButton>
  );
};

export default BaseButton;
