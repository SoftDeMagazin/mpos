# Simple Mobile POS

The goal is to create a simple mobile pos that shows a list of products and sends products to the cash register

<img src="https://raw.githubusercontent.com/SoftDeMagazin/mpos/master/docs/images/Screenshot_2018-04-02-14-13-56.png" width="285">

<img src="https://raw.githubusercontent.com/SoftDeMagazin/mpos/master/docs/images/Screenshot_2018-04-02-14-14-03.png" width="285">

## Interation 1

### Build

* App scheleton with React Native [done]
* Create an interface with a list [done] 
* Add a title [done]
* Add a search button [done]
* Add a drawer [done]

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

## Iteration 2

### Build

* Implement an existing template for the list 

### Measure

After the second iteration Material UI was added (https://github.com/xotahal/react-native-material-ui)

The library is still in development so it lacks documentation and some of the components are not implmlemented. Still I managed to add a Toolbar component with a search fuctionality that gave my application a better look and feel. I've replaced the FlatList items with Button component and added an alert function that displays the price

### Learn

* Expore the Awesome React Native list (https://github.com/jondot/awesome-react-native)

## Interation 3

### Build

Create an apk for the application

### Measure

Created a new organization account in github an pushed the code in the mpos repo. Went in the appscenter.ms interface and configured the app. Seems that I need to specify a build variant.

* Installed Android 6.0 (Marshmallow)
* Installed Android Buid Tools 23.0.1
* Configured Android Home environmental variable


### Learn

How to build React Native APK

## Iteration 4

Create an apk for the application

### Measure

Managed to create a valid apk build both from the local development and using Microsoft AppCenter build tool

## Learn

## Iteration 5

### Build

Expore UI frameworks and templates

### Measure

React Native Base is a free and opensource UI component library. It's well documented and has a rich list of components. 

### Learn

## Iteration 6


### Build

Launch native android activity to select bluetooth devices

### Measure

Created a new DeviceActivity that allows to select form a list of paired bluetooth devices. Added a new class ActivityStarterModule and ActivityStarterReactPackage that act as a proxy between javascript and java code. Edited the MainApplication to include the new package. 

Build ends with the error No resource found that matches the given name (at 'text' with value '@string/msg_please_select_device')

### Learn

Understand how activities are linked with layout resources (https://developer.android.com/guide/topics/resources/layout-resource.html)

