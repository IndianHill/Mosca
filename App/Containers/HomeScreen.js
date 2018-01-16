import React, { Component, PropTypes } from 'react'
import { BackHandler, ImageBackground, Dimensions, Image, Modal, TouchableOpacity } from 'react-native'
import { Content, Container, Header, View, Left, Right, Body, Button, Text, Title, Icon, Footer, FooterTab } from 'native-base'
import { connect } from 'react-redux'
import { Images, Metrics } from "../Themes";
import ImageLoad from 'react-native-image-placeholder';
import AirLineView from '../Components/AireLineView';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import AirLineActions from "../Redux/AirLineRedux";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {

  static propTypes = {
		dispatch: PropTypes.func,
		fetching: PropTypes.bool
	};

	isAttempting = false;

	constructor(props) {
		super(props);
		this.state = {
      modalVisible: false,
      url: '',
      airlines: []
		};
    this.isAttempting = false;
    this.renderAirLines = this.renderAirLines.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onSelectAirLine = this.onSelectAirLine.bind(this);
	}

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  componentWillMount() {
    this.props.attemptGetAirLines();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.airline.airlines !== nextProps.airline.airlines){
      this.setState({
        airlines: nextProps.airline.airlines
      });
    }
  }

  onSelectAirLine(url) {
    this.setState({
      modalVisible: true,
      url: url
    });
  }

  onCloseModal() {
    this.setState({ modalVisible: false });
  }

  renderAirLines() {
    const {airlines} = this.props.airline;
    let key = new Date().getTime();
    let index = 0;
    let result = [];
    for(let airline in airlines){
      key += index;
      result.push(
          <View key={key} style={styles.item}>
            <TouchableOpacity onPress={ ()=>this.onSelectAirLine(airlines[airline].url) }>
              <ImageLoad source={{uri: airlines[airline].image}} style={styles.image} />
              <Text style={styles.name}>{airlines[airline].name}</Text>
            </TouchableOpacity>
          </View>
      );
      index++;
    }
    return result;
  }

  render () {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" style={{color: 'black'}}/>
            </Button>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
            <Text style={{ color: 'black', fontSize: 30}}>SELECT AIRLINE</Text>
          </View>
          <View style={styles.airlinecontainer}>
            {
              this.renderAirLines()
            }
          </View>
        </Content>
        <Modal
          animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
        >
          <AirLineView url={this.state.url} onClose={() => {this.onCloseModal()}} />
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    airline: state.airline,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptGetAirLines: () => dispatch(AirLineActions.getAirLinesRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)