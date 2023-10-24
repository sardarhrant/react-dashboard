import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor || 'blue'};
  font-size: ${(props) => props.fontSize || '16px'};
  padding: ${(props) => props.padding || '10px'};
  border: ${(props) => props.border || 'none'};
  border-radius: ${(props) => props.borderRadius || '3px'};
  color: ${(props) => props.color || 'white'};
  cursor: ${(props) => props.cursorPointer || 'pointer'};
  margin: ${(props) => props.margin || '0 4px'};
`;

const Button = ({ onClick, text, style, ...props }) => (
    <StyledButton onClick={onClick} style={style} {...props}>
        {text}
    </StyledButton>
);

export default Button;