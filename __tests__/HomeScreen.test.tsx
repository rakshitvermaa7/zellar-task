import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen, { HomeScreenNavigationProp } from '@screens/HomeScreen/HomeScreen';

// Mocking the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

const mockNavigation: Partial<HomeScreenNavigationProp> = {
  goBack: jest.fn(),
  navigate: jest.fn(),
  reset: jest.fn(),
  dispatch: jest.fn(),
  setOptions: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
};

describe('<HomeScreen />', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );

    const mainContainer = getByTestId('main-container');
    const navigatorText = getByText('Main');
    const homeScreenText = getByText('Home Screen');

    expect(mainContainer).toBeTruthy();
    expect(navigatorText).toBeTruthy();
    expect(homeScreenText).toBeTruthy();
  });

  it('navigates back when Navigator is pressed', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );

    const navigatorButton = getByTestId('navigator-button');
    fireEvent.press(navigatorButton);

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
