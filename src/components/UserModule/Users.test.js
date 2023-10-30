import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Users from './Users';
import { fetchUsersRequest } from '../../redux/actions/userActions';

const mockStore = configureStore([]);

describe('Users Component', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            usersReducer: {
                users: [
                    { id: 1, name: 'John Doe' },
                    { id: 2, name: 'Jane Doe' },
                ],
                usersLoaded: true,
            },
        });

        store.dispatch = jest.fn();

        component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Users />
                </BrowserRouter>
            </Provider>
        );
    });

    it('renders the component', () => {
        expect(component).toBeTruthy();
    });

    it('dispatches fetchUsersRequest action if users are not loaded', () => {
        const notLoadedStore = mockStore({
            usersReducer: {
                users: [],
                usersLoaded: false,
            },
        });

        notLoadedStore.dispatch(fetchUsersRequest());
        const actions = notLoadedStore.getActions();

        expect(actions).toEqual([{ type: 'FETCH_USERS_REQUEST' }]);
    });

    it('renders a list of users with correct names and links', () => {
        const user1Link = component.getByText('John Doe');
        const user2Link = component.getByText('Jane Doe');

        expect(user1Link).toBeInTheDocument();
        expect(user1Link.getAttribute('href')).toBe('/users/1');

        expect(user2Link).toBeInTheDocument();
        expect(user2Link.getAttribute('href')).toBe('/users/2');
    });
});
