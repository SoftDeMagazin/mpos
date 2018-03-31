import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { COLOR, ThemeProvider, Button } from 'react-native-material-ui';


import { Toolbar } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

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
      <ThemeProvider uiTheme={uiTheme}>         
        <View style={styles.container}>
        <Toolbar
            leftElement="menu"
            centerElement="SimplePOS"
            searchable={{
              autoFocus: true,
              placeholder: 'Cauta',
            }}
          />
          <FlatList
              data={this.state.products}
              renderItem={({item}) => <Button key={item.id} text={item.name} onPress={() => {alert(item.price)}}/>}  
              keyExtractor={(item, index) => index} />
        </View>
      </ThemeProvider>
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
