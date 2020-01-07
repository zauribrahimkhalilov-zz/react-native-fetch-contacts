import React, { Component } from 'react';
import { View, Button, PermissionsAndroid } from 'react-native';
var Contacts = require('react-native-contacts')

export default class App extends Component {

  fetchContacts = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'React Native Contact Permission',
          message: 'React Native needs access to your contacts',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
        Contacts.getAll((err, contacts) => {
          if (err && err.type === 'permissionDenied') {
            console.log("permissionDenied");
          } else {
            console.log("contacts: ", contacts);
            console.log("=====================");
            contacts.map(c =>
              c.phoneNumbers.map(p =>
                console.log(c.displayName + " - " + p.number)
              )
            )
          }
          
        })
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <Button
          title="Scan Contacts"
          onPress={() => this.fetchContacts()}
        />
      </View>
    );

  }

}