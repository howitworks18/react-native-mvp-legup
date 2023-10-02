import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

const MapScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await firestore().collection('TestData').get();
      const usersData = usersSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          title: data.first_name + ' ' + data.last_name,
          description: data.email,
        };
      });
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30.2672, // Setting it to Downtown Austin's coordinates
          longitude: -97.7431,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {users.map(user => (
          <Marker
            key={user.id}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
            title={user.title}
            description={user.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
