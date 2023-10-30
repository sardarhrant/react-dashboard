import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './button';

test('renders button with correct text', () => {
    const buttonText = 'Click Me';
    const { getByText } = render(<Button text={buttonText} />);

    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
});

test('calls onClick prop when button is clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button text="Click Me" onClick={handleClick} />);

    const buttonElement = getByText('Click Me');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
});
