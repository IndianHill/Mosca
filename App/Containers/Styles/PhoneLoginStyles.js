import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  bg: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
      width: 50,
      height: 50,
  },
  nextButton: {
      width: 100,
      height: 100,
      
  },
  title: {
    fontSize: 22,
    color: 'black',
  },
  description: {
    fontSize: 15,
    color: 'gray',
  }
})
