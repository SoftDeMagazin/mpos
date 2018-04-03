import React from 'react';

import { Container, Header, Content, List, ListItem, Text } from 'native-base';

export default class DrawerMenu extends React.Component {
    render() {
      return (
        <Container>
          <Content>
            <List>
              <ListItem onPress={() => alert('Categorii')}>
                <Text>Categorii</Text>
              </ListItem>
              <ListItem onPress={() => alert('Produse')}>
                <Text>Produse</Text>
              </ListItem>
              <ListItem onPress={() => alert('Comenzi')}>
                <Text>Comenzi</Text>
              </ListItem>
              <ListItem onPress={() => alert('Rapoarte')}>
                <Text>Comenzi</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }
  }