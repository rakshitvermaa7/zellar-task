import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import MainScreen, { MainScreenNavigationProp } from '@screens/MainScreen/MainScreen';
import { useListZellerCustomersQuery } from 'src/generated/graphql';

// Mocking the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => true),
  useNavigation: jest.fn(),
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
  // Mocked navigation prop
  const mockNavigation: Partial<MainScreenNavigationProp> = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
    reset: jest.fn(),
    dispatch: jest.fn(),
    isFocused: jest.fn(),
    canGoBack: jest.fn(),
  };

  // Mocked Apollo Client query
  // @ts-expect-error mocking the return values
  useListZellerCustomersQuery.mockReturnValue({
    data: mockData,
    loading: false,
    refetch: jest.fn(),
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <MockedProvider mocks={[]}>
        <MainScreen />
      </MockedProvider>,
    );

    const homeNavigator = getByTestId('navigator-home');
    const adminTypeCard = getByTestId('admin-type-card');
    const managerTypeCard = getByTestId('manager-type-card');
    const adminUsersHeader = getByText('Admin Users');

    expect(homeNavigator).toBeTruthy();
    expect(adminTypeCard).toBeTruthy();
    expect(managerTypeCard).toBeTruthy();
    expect(adminUsersHeader).toBeTruthy();
  });

  it('navigates to Home screen when "Home" is pressed', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <MainScreen />
      </MockedProvider>,
    );

    const homeNavigator = getByTestId('navigator-home');
    fireEvent.press(homeNavigator);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
  });

  it('changes role and refetches data when admin/manager type card is pressed', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <MainScreen />
      </MockedProvider>,
    );

    const adminTypeCard = getByTestId('admin-type-card');
    const managerTypeCard = getByTestId('manager-type-card');

    fireEvent.press(adminTypeCard);

    await waitFor(() => {
      expect(useListZellerCustomersQuery).toHaveBeenCalledWith({
        variables: { filter: { role: { eq: 'Admin' } } },
      });
    });

    fireEvent.press(managerTypeCard);

    await waitFor(() => {
      expect(useListZellerCustomersQuery).toHaveBeenCalledWith({
        variables: { filter: { role: { eq: 'Manager' } } },
      });
    });
  });
});
