import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Imagelinks from 'src/assets/images';
import styles from './SearchBar.styles';
import STRINGS from 'src/types/strings';

type Props = {
  searchText: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({ onChangeText, searchText }: Props) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput placeholder={STRINGS.TYPE_NAME} style={styles.searchInput} value={searchText} onChangeText={text => onChangeText(text)} />
      {searchText ? (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Image source={Imagelinks.cross} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <Image source={Imagelinks.search} style={styles.image} />
      )}
    </View>
  );
};

export default SearchBar;
