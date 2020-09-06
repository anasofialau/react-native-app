import React, { Component } from 'react';
import Dishdetail from './DishdetailComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text, ToastAndroid } from 'react-native';
// import Toast from 'react-native-toast-native';
import NetInfo from "@react-native-community/netinfo";
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu,
                navigationOptions: ({ navigation}) => ({
                    headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />
                })
              },
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);

const LoginNavigator = createStackNavigator({
    Login: Login
  }, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }}
      onPress={ () => navigation.toggleDrawer() } />
  })
});

const HomeNavigator = createStackNavigator({
        Home: { screen: Home },
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />,
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        })
    }
);

const ContactNavigator = createStackNavigator({
        Contact: { screen: Contact },
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />,
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        })
    }
);

const AboutUsNavigator = createStackNavigator({
        About: { screen: About },
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />,
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        })
    }
);

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }}
      onPress={ () => navigation.navigate('DrawerToggle') } />
  })
})

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
}, {
    navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
      color: "#fff"
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }}
      onPress={ () => navigation.navigate('DrawerToggle') } />
  })
})

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{top:'always', horizontal: 'never'}}>
      <View style={styles.drawerHeader}>
        <View style={{flex: 1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator({
  Login: {
    screen: LoginNavigator,
    navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='sign-in'
          type='font-awesome'
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon
        name='home'
        type='font-awesome'
        size={24}
        color={tintColor}
        />
      )
    }
  },
  About: {
    screen: AboutUsNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor }) => (
        <Icon
        name='info-circle'
        type='font-awesome'
        size={24}
        color={tintColor}
        />
      )
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor }) => (
        <Icon
        name='list'
        type='font-awesome'
        size={24}
        color={tintColor}
        />
      )
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: '',
      drawerLabel: 'Contact',
      drawerIcon: ({ tintColor }) => (
        <Icon
        name='address-card'
        type='font-awesome'
        size={24}
        color={tintColor}
        />
      )
    }
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      title: 'My Favorites',
      drawerLabel: 'My Favorites',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='heart'
          type='font-awesome'
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
  Reservation: {
    screen: ReservationNavigator,
    navigationOptions: {
      title: 'Reserve Table',
      drawerLabel: 'Reserve Table',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='cutlery'
          type='font-awesome'
          size={24}
          iconStyle={{ color: tintColor }}
          />
      ),
    }
  }
}, {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

const AppContainer = createAppContainer(MainNavigator);

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    NetInfo.fetch()
        .then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
              + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType, ToastAndroid.LONG);
        });

    const unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);

    unsubscribe();
  }

  componentWillUnmount() {
    // NetInfo.removeEventListener(this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View
        style={{flex: 1,paddingTop: Platform.OS === 'ios' ? 0 : 0,}}>
        <AppContainer />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
