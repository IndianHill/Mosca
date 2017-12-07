import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics } from '../../Themes'
const toolBarHeight = (Platform.OS === "ios" ? 64 : 56)

export default StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
    width: Metrics.screenWidth,
    height: toolBarHeight,
  },
  closeicon: {
    fontSize: 30
  }
})
