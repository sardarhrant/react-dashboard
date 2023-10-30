import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider
import Dashboard from './Dashboard';
import store from '../../redux/store';

test('renders dashboard with sidebar and main content', () => {
    const { getByText, getAllByText } = render(
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );

    expect(getAllByText('Users').length).toBeGreaterThan(0);
    expect(getByText('Reports')).toBeInTheDocument();
    expect(getByText('Analytics')).toBeInTheDocument();
    expect(getByText('Footer Content')).toBeInTheDocument();
});