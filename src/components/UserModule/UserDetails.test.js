import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserDetails from './UserDetails';

const mockStore = configureStore([]);

describe('UserDetails Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            usersReducer: {
                usersLoaded: true,
                users: [
                    { id: 1, name: 'John Doe', email: 'john.doe@example.com', dateJoined: '2022-01-01' },
                ],
            },
            reportsReducer: {
                reportsLoaded: true,
                reports: [
                    { id: 1, userId: 1, title: 'Report 1' },
                    { id: 2, userId: 1, title: 'Report 2' },
                ],
            },
        });
    });

    it('renders back button', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users/1']}>
                    <UserDetails />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Back')).toBeInTheDocument();
    });
});
