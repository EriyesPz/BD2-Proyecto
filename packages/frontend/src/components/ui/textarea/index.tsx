import React from "react";
import { StyledTextArea, Wrapper } from "./styled";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, error, ...props }) => {
  return (
    <Wrapper>
      {label && <label>{label}</label>}
      <StyledTextArea {...props} />
      {error && <span className="error">{error}</span>}
    </Wrapper>
  );
};

export { TextArea };
