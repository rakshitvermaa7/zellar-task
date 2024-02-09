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
    const { getByPlaceholderText } = render(<SearchBar {...defaultProps} />);
    const searchInput = getByPlaceholderText('Type name...');
    expect(searchInput).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const { getByPlaceholderText } = render(<SearchBar {...defaultProps} />);
    const searchInput = getByPlaceholderText('Type name...');
    fireEvent.changeText(searchInput, 'test');
    expect(mockOnChangeText).toHaveBeenCalledWith('test');
  });
});
