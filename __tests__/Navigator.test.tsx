import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Navigator from '@components/Navigator/Navigator';
import { ImageSourcePropType } from 'react-native';

import { describe, expect, it } from '@jest/globals';

// Mock onPress function
const mockOnPress = jest.fn();

const defaultProps = {
  imageSource: {} as ImageSourcePropType,
  text: 'Test Navigator',
  onPress: mockOnPress,
};

describe('<Navigator />', () => {
  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(<Navigator {...defaultProps} />);
    const navigatorText = getByText('Test Navigator');
    const navigatorContainer = getByTestId('navigator-container');

    expect(navigatorText).toBeTruthy();
    expect(navigatorContainer).toBeTruthy();
  });

  it('calls onPress when navigator is pressed', () => {
    const { getByTestId } = render(<Navigator {...defaultProps} />);
    const navigatorContainer = getByTestId('navigator-container');

    fireEvent.press(navigatorContainer);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
