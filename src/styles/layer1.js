import { StyleSheet } from 'react-native';
import {windowWidth, windowHeight} from '../utils/Dimensions';

export default StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      width: windowWidth / 2.3,
      height: windowHeight / 13,
      backgroundColor: '#6646ee',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      overflow: 'hidden'
    },
    button2Container: {
      marginTop: 10,
      marginLeft:15,
      width: windowWidth / 3,
      height: windowHeight / 10,
      backgroundColor: '#6646ee',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8
    },
    container: {
      flex: 1,
      backgroundColor: '#bbded6',
      alignItems: 'center',
      padding: 20
      
    },
    text: {
      
      fontSize: 20,
      color: '#ffffff'
    },
    imageContainer:{
      elevation:2,
      height:150,
      width:150,
      backgroundColor:'#efefef',
      margin: 20,
      borderRadius:999,
      overflow:'hidden',
  },
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1
  },
  columnContainer: {
    backgroundColor: '#bbded6',
    padding: 16,
    flex: 1,
    flexDirection: 'column',
  }
});