import { View, Text } from 'react-native';
import React from 'react';
import { ZellerCustomer } from 'src/generated/graphql';
import styles from './User.styles';

type Props = {
  user: ZellerCustomer;
};

const User = ({ user }: Props) => {
  const userNameFirstLetter = user.name?.slice(0, 1);

  return (
    <View style={styles.userContainer}>
      <View style={styles.nameIconContainer}>
        <Text style={styles.nameText}>{userNameFirstLetter}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userRole}>{user.role}</Text>
      </View>
    </View>
  );
};

export default User;
