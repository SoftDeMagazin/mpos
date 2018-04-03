import React from 'react';
import { StyleSheet, View, FlatList, DrawerLayoutAndroid, ScrollView } from 'react-native';

import { COLOR, ThemeProvider, Button, ActionButton } from 'react-native-material-ui';

import { Toolbar } from 'react-native-material-ui';

import { Container, Header, Content, List, ListItem, Text, Left, Right } from 'native-base';

import DrawerMenu from './components/DrawerMenu'

import {
  AppRegistry,
  NativeEventEmitter,
  NativeModules
} from 'react-native';

import BatchedBridge from "react-native/Libraries/BatchedBridge/BatchedBridge";

export class ExposedToJava {
  alert(message) {
      alert(message);
  }
}

const exposedToJava = new ExposedToJava();
BatchedBridge.registerCallableModule("JavaScriptVisibleToJava", exposedToJava);

const activityStarter = NativeModules.ActivityStarter;

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
    this.setState({products: [
      {id: 1, name: "Espresso un produs cu nume foarte lung care se va intinde pe mai multe randuri", price: "999.99"}
      , {id: 2, name: "Cappucino", price: "6.00"} 
      , {id: 3, name: "Cappucino", price: "6.00"}
      , {id: 4, name: "Cappucino", price: "6.00"}
      , {id: 5, name: "Cappucino", price: "6.00"}
      , {id: 6, name: "Cappucino", price: "6.00"}
      , {id: 7, name: "Cappucino", price: "6.00"}
      , {id: 8, name: "Cappucino", price: "6.00"}
      , {id: 9, name: "Cappucino", price: "6.00"}
      , {id: 11, name: "Cappucino", price: "6.00"}
      , {id: 12, name: "Cappucino", price: "6.00"}
      , {id: 13, name: "Cappucino", price: "6.00"}
      , {id: 14, name: "Cappucino", price: "6.00"}
      , {id: 15, name: "Cappucino", price: "6.00"}
    ]})
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
            <ScrollView> 
            <List
                dataArray={this.state.products}
                renderRow={(item) => <ListItem onPress={() => {alert(item.price)}}><Left><Text >{item.name}</Text></Left><Right><Text>{item.price}</Text></Right></ListItem>}
                
                keyExtractor={(item, index) => index.toString()} />
            </ScrollView>    
            <ActionButton icon="done" /> 
            <Text
            onPress={() => activityStarter.navigateToExample()}
            >Start activity</Text>  
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
