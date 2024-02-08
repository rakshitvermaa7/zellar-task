import { View, FlatList } from 'react-native';
import React from 'react';
import { ZellerCustomer } from 'src/generated/graphql';
import User from '@components/User/User';

type Props = {
  users: ZellerCustomer[];
};

const Users = ({ users }: Props) => {
  const renderItem = ({ item }: { item: ZellerCustomer }) => <User key={item.id} user={item} />;

  return (
    <View
      style={{
        marginTop: 20,
      }}>
      <FlatList
        contentContainerStyle={{
          gap: 12,
        }}
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Users;
