  import React, { Component } from 'react'
  // import PropTypes from 'prop-types';
  import { Dimensions, Platform, WebView, ImageBackground } from 'react-native'
  import { Container, Header, Content, Right, View, Text, Button } from 'native-base'
  import styles from './Styles/AireLineViewStyle'
  import IconIonic from 'react-native-vector-icons/Ionicons';

  import { Images, Metrics } from "../Themes";

  const deviceHeight = Metrics.screenHeight;
  const deviceWidth = Metrics.screenWidth;
  const toolBarHeight = (Platform.OS === "ios" ? 64 : 56)

  export default class AireLineView extends React.Component {
    // // Prop type warnings
    // static propTypes = {
    //   someProperty: PropTypes.object,
    //   someSetting: PropTypes.bool.isRequired,
    // }
    //
    // // Defaults for props
    // static defaultProps = {
    //   someSetting: false
    // }

    constructor(props) {
      super(props);
      this.state = {
      };
    }
    
    render () {
      return (
        <Container>
          <Header>
            <Right>
              <Button transparent onPress = {this.props.onClose}>
                <IconIonic name="ios-close" style={styles.closeicon}/>
              </Button>
            </Right>
        </Header>
        <WebView source={{uri: this.props.url}} />
      </Container>
    )
  }
}
