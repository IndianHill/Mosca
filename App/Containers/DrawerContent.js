import React, { Component } from "react";
import { ScrollView, Image, BackHandler, Dimensions, Platform } from "react-native";
import { List, ListItem, Text, View, Container, Content, Thumbnail, Footer } from "native-base";

import styles from "./Styles/DrawerContentStyles";
import { Images } from "../Themes";
import { connect } from 'react-redux';

const {width, height} = Dimensions.get('window');
const statusbarHeight = (Platform.OS ==='ios'?20:0)

class DrawerContent extends Component {
	render() {
		const navigation = this.props.navigation;
		const {user} = this.props.login;
		return (
			<Container style={styles.container}>
				<Content>
					<View style={{flexDirection:'row', alignItems:'center'}}>
						<Thumbnail large source={{uri: (user) ? user.photoURL : ''}} style={{margin:10}}/>
						<View>
							<Text style={{color:'black', fontSize:20}}>{(user) ? user.displayName : ''}</Text>
						</View>
					</View>
					<List>
					</List>
				</Content>
				<Footer style={styles.footer}>
				</Footer>
			</Container>
		);
	}
}

const mapStateToProps = state => {
    return {
		login: state.login,
    };
};

const mapDisaptchToProps = (dispatch) =>{
    return{
    }
}
export default connect(mapStateToProps, mapDisaptchToProps)(DrawerContent)
