import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Analytics from './Analytics';
import store from '../../redux/store';

test('renders Analytics component with charts', () => {
    const { getByText } = render(
        <Provider store={store}>
            <Analytics />
        </Provider>
    );

    expect(getByText('Monthly Reports')).toBeInTheDocument();
    expect(getByText('User Reports')).toBeInTheDocument();
    expect(document.querySelectorAll('.recharts-wrapper').length).toBe(2);
});
