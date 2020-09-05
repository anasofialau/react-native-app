import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment, date) => dispatch(postComment(dishId, rating, author, comment, date))
})

function RenderDish(props) {

    const dish = props.dish;

        if (dish != null) {
            return(
              <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                  featuredTitle={dish.name}
                  image={{uri: baseUrl + dish.image}}>
                      <Text style={{margin: 10}}>
                          {dish.description}
                      </Text>
                      <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                      />
                      <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type="font-awesome"
                        color="#0000ff"
                        onPress={() => props.showCommentFormModal()}
                      />
                </Card>
              </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {

        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating readonly
                  startingValue={item.rating}
                  imageSize={20}
                  style={{paddingVertical: 10, marginBottom: 30, textAlign: 'left'}}
                />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <Card title='Comments' >
          <FlatList
              data={comments}
              renderItem={renderCommentItem}
              keyExtractor={item => item.id.toString()}
              />
          </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      rating: 0,
      author: '',
      new_comment: '',
      date: new Date().toISOString(),
    }
  }

  markFavorite(dishId) {
      this.props.postFavorite(dishId);
  }

  showCommentFormModal = () => {
    this.setState({showModal: true})
  }

  submitComment = (dishId) => {
    this.resetForm()
    this.props.postComment(dishId, this.state.rating, this.state.author, this.state.new_comment, this.state.date);
  }

  resetForm() {
      this.setState({
        showModal: false,
        rating: 0,
        author: '',
        new_comment: '',
        date: new Date().toISOString(),
      });
  }

  static navigationOptions = {
      title: 'Dish Details'
  };

  render() {
    const dishId = this.props.navigation.getParam('dishId','');
    return(
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    showCommentFormModal={() => this.showCommentFormModal()} />
        <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              readonly={false}
              startingValue={this.state.rating}
              imageSize={20}
              style={{paddingVertical: 10, marginBottom: 30}}
              onFinishRating={(value) => this.setState({rating: value})}
            />
            <Input
              placeholder='Author'
              leftIcon={
                <Icon
                  name='user-o'
                  type='font-awesome'
                  size={24}
                  color='black'
                />
              }
              style={{paddingBottom: 30}}
              onChangeText={(text) => this.setState({author: text})}
            />
            <Input
              placeholder='Comment'
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                  size={24}
                  color='black'
                />
              }
              style={{paddingBottom: 30}}
              onChangeText={(text) => this.setState({new_comment: text})}
            />
            <View style={{marginTop: 40}}>
              <Button
                onPress={() => this.submitComment(dishId)}
                color='#512DA8'
                title='Submit'
              />
            </View>
            <View style={{marginTop: 20}}>
              <Button
                onPress={() => this.resetForm()}
                color='grey'
                title='Cancel'
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
