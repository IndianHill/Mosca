import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  header: {
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  content: {
    backgroundColor: 'white',
  },
  bg: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  airlinecontainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 50,
    width: Metrics.screenWidth
  },
  name: {
    fontSize: 12,
    marginTop: 10,
    color: 'grey',
    textAlign: 'center'
  },
  image: {
    width: (Metrics.screenWidth-70)/3,
    height: (Metrics.screenWidth-70)/3
  },
  item: {
    width: (Metrics.screenWidth-70)/3,
    alignItems: 'center',
    justifyContent:'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  }
})
