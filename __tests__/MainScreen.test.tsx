/**
 * @jest-environment node
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import MainScreen from '@screens/MainScreen/MainScreen';
import { useListZellerCustomersQuery } from 'src/generated/graphql';

const mockedNavigate = jest.fn();
// Mocking the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => true),
  useNavigation: () => ({ navigate: { setOptions: mockedNavigate }, setOptions: mockedNavigate }),
}));

// Mocking Apollo Client query hook
jest.mock('src/generated/graphql', () => ({
  ...jest.requireActual('src/generated/graphql'),
  useListZellerCustomersQuery: jest.fn(),
}));

// Mock data for useListZellerCustomersQuery
const mockData = {
  listZellerCustomers: {
    items: [
      { id: '1', name: 'User1', role: 'Admin' },
      { id: '2', name: 'User2', role: 'Admin' },
    ],
  },
};

describe('<MainScreen />', () => {
  // Mocked Apollo Client query
  // @ts-expect-error mocking the return values
  useListZellerCustomersQuery.mockReturnValue({
    data: mockData,
    loading: false,
    refetch: jest.fn(),
  });

  it('renders correctly', () => {
    const { getByText, queryByTestId } = render(
      <MockedProvider mocks={[]}>
        <MainScreen />
      </MockedProvider>,
    );

    const homeNavigator = queryByTestId('navigator-home');
    const adminTypeCard = queryByTestId('admin-type-card');
    const managerTypeCard = queryByTestId('manager-type-card');
    const adminUsersHeader = getByText('Admin Users');

    expect(homeNavigator).toBeDefined();
    expect(adminTypeCard).toBeDefined();
    expect(managerTypeCard).toBeDefined();
    expect(adminUsersHeader).toBeDefined();
  });
});
