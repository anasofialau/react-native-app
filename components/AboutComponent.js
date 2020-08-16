import React, { Component } from 'react';
import { ScrollView, Text, View, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

function History() {
  return (
    <Card
      title={'Our History'}>
      <Text style={{margin: 10}}>
        Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
      </Text>
      <Text style={{margin: 10}}>
        The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
      </Text>
    </Card>
  );
}

function LeadersList(props) {
  const leaders = props.leaders

  const renderItem = ({item, index}) => {
      return (
        <ListItem
            key={index}
            title={item.name}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitle={item.description}
            leftAvatar={{ source: require('./images/uthappizza.png')}}
          />
      );
  };

  return (
    <Card
      title={'Corporate Leadership'}>

      <FlatList
          data={leaders}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

class About extends Component {

  constructor(props) {
        super(props);
        this.state = {
          leaders: LEADERS
        };
    }

    static navigationOptions = {
        title: 'About Us'
    };

    render() {
      return (
        <ScrollView>
          <History />
          <LeadersList leaders={this.state.leaders}/>
        </ScrollView>

      );
    }
}


export default About;
