import { render, screen } from '@testing-library/react';
import UserList from './UserList';

test('user can see title of user list', () => {
    render(<UserList />);
    const titleElement = screen.getByText(/Table User 👩🏻/i);
    expect(titleElement).toBeInTheDocument();
});
