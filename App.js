import React from 'react';
import { StyleSheet, Text, View, FlatList, Switch } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }

  getFavorites() {
    return fetch('http://192.168.1.2:8080/json.htm?type=devices&filter=all&used=true&favorite=1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({favorites: responseJson.result});
      })
      .catch((error) => {
        console.error(error);
      }
    );
  }

  componentDidMount() {
    this.getFavorites();
  }

  render() {
    const { favorites } = this.state;
    console.log(favorites);
    
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <FlatList
          data={favorites}
          renderItem={({item}) => <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 5}}><Text>{item.Name}</Text><Switch></Switch></View>}
          keyExtractor={(item, index) => item.idx}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#fff',
  },
});
