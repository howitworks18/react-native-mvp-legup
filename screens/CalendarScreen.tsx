import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';

const CalendarScreen: React.FC = () => {
  const [items, setItems] = useState({});

  const fetchUsers = async () => {
    const usersSnapshot = await firestore().collection('TestData').get();
    const usersData = usersSnapshot.docs.map(doc => doc.data());

    const updatedItems = {};

    usersData.forEach(user => {
      const {date, first_name, last_name} = user;
      if (date) {
        if (!updatedItems[date]) {
          updatedItems[date] = [];
        }
        updatedItems[date].push({
          name: `Booked by ${first_name} ${last_name}`,
          height: 50,
        });
      }
    });

    setItems(updatedItems);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = item => {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(`Book appointment at ${item.name}`)}>
        <Text style={{fontSize: 16}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No available slots</Text>
      </View>
    );
  };

  console.log(items)
  return (
    <Agenda
      items={items}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      showClosingKnob={true}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default CalendarScreen;
