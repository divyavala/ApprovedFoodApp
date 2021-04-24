import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput
  
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Dropdown } from "react-native-material-dropdown-v2";

export default class HomeScreen extends React.Component {
constructor(){
    super()
    this.state={
      modalVisible:false
    }
  }
  

  render() {
    return (
      
      <View style={styles.container}>
     
        <TouchableOpacity style={styles.button} onPress={()=>{
          this.props.navigation.navigate("List")
        }}>
          <ImageBackground
            source={require('../image.jpeg')}
            style={styles.image}
          />
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.displayText}>View Approved Food List </Text>
            <Icon name="arrow-right" type="font-awesome" ></Icon>
          </View>
        </TouchableOpacity>

       
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:"#31d6a5"},
  displayText: { fontSize: 15, fontWeight: 'bold' },
  button: {
    backgroundColor: '#FFF',
    height: 200,
    width: 200,
    position: 'relative',
    overflow: "hidden",
     borderRadius:30,
    shadowOffset: {
      width: 0,
      height: 8,
    
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 20,

    shadowColor: '#000',
    marginBottom: 20,
  },
  image: {
    height: 200,
    width: 200,
    opacity: 0.7,
    position: 'absolute',
   
    
  },
});
