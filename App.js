import React from 'react';
import { StyleSheet, View, FlatList, DrawerLayoutAndroid } from 'react-native';

import { COLOR, ThemeProvider, Button, ActionButton } from 'react-native-material-ui';

import { Toolbar } from 'react-native-material-ui';

import { Container, Header, Content, List, ListItem, Text, Left, Right } from 'native-base';

class DrawerMenu extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Text>Categorii</Text>
            </ListItem>
            <ListItem>
              <Text>Produse</Text>
            </ListItem>
            <ListItem>
              <Text>Comenzi</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

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
    this.setState({products: [{id: 1, name: "Espresso un produs cu nume foarte lung care se va intinde pe mai multe randuri", price: "999.99"}, {id: 2, name: "Cappucino", price: "6.00"}]})
  }

  openMenu() {
    this.refs['DRAWER_REF'].openDrawer();
  }

  render() {
    const navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <DrawerMenu />
      </View>
    );
    return (
      <ThemeProvider uiTheme={uiTheme}>  
        <DrawerLayoutAndroid
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}
          ref={'DRAWER_REF'}>       
          <View style={styles.container}>
          <Toolbar
              leftElement="menu"
              centerElement="SimplePOS"
              searchable={{
                autoFocus: true,
                placeholder: 'Cauta',
              }}
              onLeftElementPress={() => this.openMenu()}
            />
             
            <List
                dataArray={this.state.products}
                renderRow={(item) => <ListItem onPress={() => {alert(item.price)}}><Left><Text >{item.name}</Text></Left><Right><Text>{item.price}</Text></Right></ListItem>}
                
                keyExtractor={(item, index) => index.toString()} />
            <ActionButton icon="done" /> 
              
          </View>
        </DrawerLayoutAndroid>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
