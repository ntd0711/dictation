import { StyleSheet, Text, View } from 'react-native';
import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useMe } from '@mobile/hooks/apis/useMe';
import { useUserStore } from '@mobile/stores';
import Typography from '../Typography';

const AuthProvider: FC<PropsWithChildren> = (props) => {
  const meQuery = useMe();
  const { user, setUser } = useUserStore((state) => state);
  useEffect(() => {
    setUser(meQuery.data);
  }, [meQuery.data]);

  if (meQuery.isFetched) {
    if (meQuery.isSuccess && user) {
      return <>{props.children}</>;
    }
  }
  return (
    <View>
      <Typography>Loading...</Typography>
    </View>
  );
};

export default AuthProvider;
