import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';
import { MemoryRouter } from 'react-router-dom';

test('renders sidebar with navigation links', () => {
    const { getByText } = render(
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    );

    expect(getByText('Users')).toBeInTheDocument();
    expect(getByText('Reports')).toBeInTheDocument();
    expect(getByText('Analytics')).toBeInTheDocument();
});