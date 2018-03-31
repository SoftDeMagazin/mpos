import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    this.setState({products: [{id: 1, name: "Espresso", price: 5.00}, {id: 2, name: "Cappucino", price: 6.00}]})
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.products}
            renderItem={({item}) => <Text key={item.id}>{item.name}</Text>} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
