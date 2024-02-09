import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '@components/SearchBar/SearchBar';

// Mock onChangeText function
const mockOnChangeText = jest.fn();

const defaultProps = {
  onChangeText: mockOnChangeText,
  searchText: '',
};

describe('<SearchBar />', () => {
  it('renders correctly with default props', () => {
    const { getByPlaceholderText, getByTestId } = render(<SearchBar {...defaultProps} />);
    const searchInput = getByPlaceholderText('Type name...');
    const searchContainer = getByTestId('search-container');
    const searchImage = getByTestId('search-image');

    expect(searchInput).toBeTruthy();
    expect(searchContainer).toBeTruthy();
    expect(searchImage).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const { getByPlaceholderText } = render(<SearchBar {...defaultProps} />);
    const searchInput = getByPlaceholderText('Type name...');

    fireEvent.changeText(searchInput, 'test');

    expect(mockOnChangeText).toHaveBeenCalledWith('test');
  });

  it('calls onChangeText with empty string when cross is pressed', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} searchText="test" />);
    const crossButton = getByTestId('cross-button');

    fireEvent.press(crossButton);

    expect(mockOnChangeText).toHaveBeenCalledWith('');
  });
});
