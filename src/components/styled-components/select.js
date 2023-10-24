import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin: ${(props) => props.margin || '5px 0'};
`;

const Select = ({ id, options, onChange, defaultValue }) => {
    return (
        <StyledSelect id={id} onChange={onChange} defaultValue={defaultValue}>
            {options.map(option => (
                <option value={option.value} key={option.value}>{option.label}</option>
            ))}
        </StyledSelect>
    );
}

export default Select;