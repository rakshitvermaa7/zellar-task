import React from 'react';
import { render } from '@testing-library/react-native';
import User from '@components/User/User';

const mockUser = {
  name: 'John Doe',
  role: 'Developer',
  id: '123',
};

const defaultProps = {
  user: mockUser,
};

describe('<User />', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<User {...defaultProps} />);

    const nameText = getByText('J'); // Assuming 'John Doe' starts with 'J'
    const userNameText = getByText('John Doe');
    const userRoleText = getByText('Developer');

    expect(nameText).toBeTruthy();
    expect(userNameText).toBeTruthy();
    expect(userRoleText).toBeTruthy();
  });

  it('displays the correct user name and role', () => {
    const { getByText } = render(<User {...defaultProps} />);

    const userNameText = getByText('John Doe');
    const userRoleText = getByText('Developer');

    expect(userNameText).toBeTruthy();
    expect(userRoleText).toBeTruthy();
  });
});
