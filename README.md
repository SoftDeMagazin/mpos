# Simple Mobile POS

The goal is to create a simple mobile pos that shows a list of products and sends products to the cash register

## Interation 1

### Build

App scheleton with React Native [done]
Create an interface with a list 
Add a title
Add a search button
Add a drawer

### Measure

After the first iteration the application is compiling with the warning VirtualizedList: missing keys for items, make sure to specify a key property on each item. Curently it renders a list of products stored in the state of the App component. 

Component used is FlatList. It requires a parameter data and a function method renderItems that describes the template for each list item.

* Initial Build: 2517ms
* Subsequent builds: 153ms


### Learn

* http://facebook.github.io/react-native/docs/flatlist.html

FlatList is an interface to build simple list. It supports the following parameters

* data - an array of items data
* extraData 
* renderItem - a method that describes how each item should be rendered. Expects a ReactElement to be returned
