/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ZellerCustomer, useListZellerCustomersQuery } from 'src/generated/graphql';
import { COLOR_CODE } from 'src/types/enums';
import { ActivityIndicator, Divider, RadioButton } from 'react-native-paper';
import styles from './MainScreen.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Users from '@components/Users/Users';
import Navigator from '@components/Navigator/Navigator';
import { RootStackParamList } from '@navigators/RootNavigator';
import SearchBar from '@components/SearchBar/SearchBar';
import STRINGS from 'src/types/strings';
import Imagelinks from 'src/assets/images';

export type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const MainScreen = () => {
  const [checked, setChecked] = useState('admin');
  const [role, setRole] = useState('Admin');
  const navigation = useNavigation<MainScreenNavigationProp>();
  const isFocused = useIsFocused();
  const firstChecked = checked === 'admin';
  const secondChecked = checked === 'manager';
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedUsers, setSearchedUsers] = useState<ZellerCustomer[]>([]);

  const { data, loading, refetch } = useListZellerCustomersQuery({
    variables: {
      filter: {
        role: { eq: role },
      },
    },
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refetch();
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (searchText) {
      const res = data?.listZellerCustomers?.items?.filter(item => {
        if (item?.name?.includes(searchText)) return item;
      });

      if (res) {
        // @ts-ignore
        setSearchedUsers(res);
      }
    } else {
      setSearchedUsers([]);
    }
  }, [searchText]);

  const handleClick = (checkedValue: string, roleValue: string) => {
    setChecked(checkedValue);
    setRole(roleValue);
    refetch();
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR_CODE.BACKGROUND_COLOR} />

      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLOR_CODE.PRIMARY]} />}>
          <Navigator imageSource={Imagelinks.arrowRight} text={STRINGS.HOME} onPress={() => navigation.navigate('Home')} />

          <View>
            <Text style={styles.header}>{STRINGS.USER_TYPES}</Text>

            <View
              style={{
                marginTop: 10,
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleClick('admin', 'Admin')}
                style={[
                  styles.userTypeCard,
                  {
                    backgroundColor: checked === 'admin' ? COLOR_CODE.COMPLEMENTARY : COLOR_CODE.BACKGROUND_COLOR,
                  },
                ]}>
                <RadioButton.Android
                  color={COLOR_CODE.PRIMARY}
                  uncheckedColor={COLOR_CODE.GRAY}
                  value="admin"
                  status={firstChecked ? 'checked' : 'unchecked'}
                  onPress={() => handleClick('admin', 'Admin')}
                />
                <Text style={styles.userTypeText}>{STRINGS.ADMIN}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleClick('manager', 'Manager')}
                style={[
                  styles.userTypeCard,
                  {
                    backgroundColor: checked === 'manager' ? COLOR_CODE.COMPLEMENTARY : COLOR_CODE.BACKGROUND_COLOR,
                  },
                ]}>
                <RadioButton.Android
                  color={COLOR_CODE.PRIMARY}
                  uncheckedColor={COLOR_CODE.GRAY}
                  value="manager"
                  status={secondChecked ? 'checked' : 'unchecked'}
                  onPress={() => handleClick('manager', 'Manager')}
                />
                <Text style={styles.userTypeText}>{STRINGS.MANAGER}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View
            style={{
              marginTop: 20,
            }}>
            <Text style={styles.header}>{checked === 'admin' ? 'Admin Users' : 'Manager Users'}</Text>

            <SearchBar onChangeText={(text: string) => setSearchText(text)} searchText={searchText} />

            {loading ? (
              <ActivityIndicator size="small" color={COLOR_CODE.PRIMARY} style={styles.loadingIndicator} />
            ) : searchText && searchedUsers.length === 0 ? (
              <Text style={styles.noResults}>{STRINGS.NO_SEARCH_RESULTS}</Text>
            ) : (
              <Users
                //  @ts-ignore
                users={searchedUsers.length > 0 ? searchedUsers : data?.listZellerCustomers?.items}
              />
            )}
          </View>

          <Divider style={styles.divider} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MainScreen;
