import React, { PropTypes } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, ImageBackground, NativeModules, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import Styles from "./Styles/LoginScreenStyles";
import { Images, Metrics } from "../Themes";
import LoginActions, { isLoggedIn } from "../Redux/LoginRedux";
import { Button, Text as NBText, Contant, Form, Item, Input, Label, Container, Content } from "native-base";
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
console.disableYellowBox = true;

class LoginScreen extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func,
		fetching: PropTypes.bool,
		attemptLogin: PropTypes.func,
	};

	isAttempting = false;

	constructor(props) {
		super(props);
		this.state = {
		};
		this.isAttempting = false;
	}

	componentWillReceiveProps(newProps) {
	  const {user, fetching} = newProps.login;
		this.isAttempting = fetching;
		if(user){
			this.props.navigation.navigate('NavigationDrawer');
		}
	}

	componentWillMount() {
	}

	componentWillUnmount() {
	}

	onTwitterLogin() {
		this.props.attemptTwitterLogin();
	}

	onFacebookLogin() {
		this.props.attemptFacebookLogin();
	}

	onGoogleLogin() {
		this.props.attemptGoogleLogin();
	}

	onPhoneLogin() {
		// this.props.navigation.navigate('InputPhoneNumber');
		// this.props.attemptPhoneLogin();
	}

	render() {
		return (
		  <ImageBackground source={Images.background} style={Styles.bg}>
		  	{
				(this.isAttempting) ?
					(<ActivityIndicator size="large" color="#ffffff" style={Styles.center}/>)
					: (<Text />)
			}
		  	<View style={Styles.content}>
			  <Text style={Styles.logotxt}>CHECK IN</Text>
			</View>
			<View style={Styles.socialview}>
				<IconFontAwesome name="facebook" style={Styles.icon} onPress={()=>this.onFacebookLogin()} />
				<IconFontAwesome name="twitter" style={Styles.icon} onPress={()=>this.onTwitterLogin()} />
				<IconFontAwesome name="google" style={Styles.icon} onPress={()=>this.onGoogleLogin()} />
				{/* <IconFontAwesome name="phone" style={Styles.icon} onPress={()=>this.onPhoneLogin()}/> */}
			</View>
		  </ImageBackground>
		);
	}
}

const mapStateToProps = state => {
	return {
		login: state.login,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		attemptTwitterLogin: () => dispatch(LoginActions.twitterLoginRequest()),
		attemptFacebookLogin: () => dispatch(LoginActions.facebookLoginRequest()),
		attemptGoogleLogin: () => dispatch(LoginActions.googleLoginRequest()),
		attemptPhoneLogin: () => dispatch(LoginActions.phoneLoginRequest())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
