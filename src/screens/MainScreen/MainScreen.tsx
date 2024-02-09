/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ZellerCustomer, useListZellerCustomersQuery } from 'src/generated/graphql';
import { CHECKED_ROLES, COLOR_CODE, USER_ROLES } from 'src/types/enums';
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
  const [checked, setChecked] = useState<CHECKED_ROLES>(CHECKED_ROLES.ADMIN);
  const [role, setRole] = useState<USER_ROLES>(USER_ROLES.ADMIN);
  const navigation = useNavigation<MainScreenNavigationProp>();
  const isFocused = useIsFocused();
  const firstChecked = useMemo(() => checked === CHECKED_ROLES.ADMIN, [checked]);
  const secondChecked = useMemo(() => checked === CHECKED_ROLES.MANAGER, [checked]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedUsers, setSearchedUsers] = useState<ZellerCustomer[]>([]);

  const { data, loading, refetch } = useListZellerCustomersQuery({
    variables: {
      filter: {
        role: { eq: role },
      },
    },
    onCompleted: () => console.log('FETCHED DATA'),
    onError: e => console.log('error', e),
  });

  // FILTERING USERS BECAUSE THE RESPONSES FOR BOTH ADMIN AND MANAGER ROLES ARE SAME i.e. ALL 4 USERS
  const users = data?.listZellerCustomers?.items?.filter(user => user?.role === role);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: STRINGS.USERS,
      headerTitleStyle: styles.headerTitle,
      headerRight: () => <Navigator imageSource={Imagelinks.arrowRight} text={STRINGS.HOME} onPress={() => navigation.navigate('Home')} />,
    });
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      refetchData();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const refetchData = async () => {
    await refetch().then(data => console.log('data', data));
  };

  useEffect(() => {
    if (isFocused) {
      refetchData();
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

  const handleClick = (checkedValue: CHECKED_ROLES, roleValue: USER_ROLES) => {
    setChecked(checkedValue);
    setRole(roleValue);
    refetchData();
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
          <View>
            <Text style={styles.header}>{STRINGS.USER_TYPES}</Text>

            <View
              style={{
                marginTop: 10,
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleClick(CHECKED_ROLES.ADMIN, USER_ROLES.ADMIN)}
                style={[
                  styles.userTypeCard,
                  {
                    backgroundColor: checked === CHECKED_ROLES.ADMIN ? COLOR_CODE.COMPLEMENTARY : COLOR_CODE.BACKGROUND_COLOR,
                  },
                ]}>
                <RadioButton.Android
                  color={COLOR_CODE.PRIMARY}
                  uncheckedColor={COLOR_CODE.GRAY}
                  value={CHECKED_ROLES.ADMIN}
                  status={firstChecked ? 'checked' : 'unchecked'}
                  onPress={() => handleClick(CHECKED_ROLES.ADMIN, USER_ROLES.ADMIN)}
                />
                <Text style={styles.userTypeText}>{STRINGS.ADMIN}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleClick(CHECKED_ROLES.MANAGER, USER_ROLES.MANAGER)}
                style={[
                  styles.userTypeCard,
                  {
                    backgroundColor: checked === CHECKED_ROLES.MANAGER ? COLOR_CODE.COMPLEMENTARY : COLOR_CODE.BACKGROUND_COLOR,
                  },
                ]}>
                <RadioButton.Android
                  color={COLOR_CODE.PRIMARY}
                  uncheckedColor={COLOR_CODE.GRAY}
                  value={CHECKED_ROLES.MANAGER}
                  status={secondChecked ? 'checked' : 'unchecked'}
                  onPress={() => handleClick(CHECKED_ROLES.MANAGER, USER_ROLES.MANAGER)}
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
            <Text style={styles.header}>{checked === CHECKED_ROLES.ADMIN ? STRINGS.ADMIN_USERS : STRINGS.MANAGER_USERS}</Text>

            <SearchBar onChangeText={(text: string) => setSearchText(text)} searchText={searchText} />

            {loading ? (
              <ActivityIndicator size="small" color={COLOR_CODE.PRIMARY} style={styles.loadingIndicator} />
            ) : searchText && searchedUsers.length === 0 ? (
              <Text style={styles.noResults}>{STRINGS.NO_SEARCH_RESULTS}</Text>
            ) : (
              <Users
                //  @ts-ignore
                users={searchedUsers.length > 0 ? searchedUsers : users}
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
