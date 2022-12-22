import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.main}>
      <Text style={styles.text}> Расписание занятий</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingTop: 5,
    height: 50,
    backgroundColor: '#ecf0f2',
    opacity: 1,
  },
  text: {
    fontSize: 21,
    textAlign: 'center',
    // color: 'red'
  },
});
