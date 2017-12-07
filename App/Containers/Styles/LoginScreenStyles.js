import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  bg: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
  },
  content: {
    backgroundColor: 'transparent',
    height: Metrics.screenHeight/2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logotxt: {
    width: Metrics.screenWidth,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center'
  },
  socialview: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight/2,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  icon: {
    color: 'white',
    fontSize: 40,
    marginLeft: 20,
    marginRight: 20
  },
  center: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
