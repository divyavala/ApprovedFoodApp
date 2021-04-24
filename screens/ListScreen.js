import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
} from 'react-native';
import { Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
export default class ListScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      data: [],
      categories: [],
      items: [],
      subcategories: [],
      list: [],
     
      zindex: 1000,
    };
  }

  getData() {
    return fetch('https://api.jsonbin.io/b/5fce7e1e2946d2126fff85f0')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson.categories,
        });
        // console.log(this.state.data)
        var categories = [];
        var items = [];
        var subcategories = [];
        var subItems = [];
        var list = [];
        this.state.data.map((item) => {
          item.category.subcategories.map((item) => {
            subcategories.push(item.subCategoryname);
            subItems.push({
              label: item.subCategoryname,
              value: item.subCategoryname,
            });
           if( item.subCategoryname !==""){
             list.push({ name: item.subCategoryname })
           }
            
      

            item.items.map((item) => {
              if(item!==""){
              subItems.push({ label: item, value: item });
              }
              list.push({ name: item });
            });
          });
          items.push(subItems);
          subItems = [];
          this.setState({
            categories: categories,
            subcategories: subcategories,
            items: items,
            list: list,
          });
        });

        //console.log(this.state.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    var list=this.state.list
    console.log(list)
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#eae3ff' }}>
        <View
          style={{
            flexDirection: 'row',
            margin: 20,
            padding: 10,
            justifyContent: 'space-evenly',
          }}>
          <Icon
            name="times-circle"
            type="font-awesome"
            onPress={() => {
              this.props.navigation.navigate('HomeScreen');
            }}></Icon>
          <Text style={styles.title}>Approved Food List 🥘 </Text>
        </View>
        <View>
         
          <SearchableDropdown
            multi={true}
            selectedItems={this.state.selectedItems}
           
            containerStyle={{ padding: 5 }}
            
              
            
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={this.state.list}
            defaultIndex={2}
            chip={true}
            resetValue={false}
            textInputProps={{
              placeholder: 'Try searching fat,sauces names.....',
              placeholderTextColor: '#565e58',

              underlineColorAndroid: 'transparent',
              style: {
                padding: 12,
                borderWidth: 2,
                borderColor: 'blue',
                borderRadius: 5,
                backgroundColor: '#bdbfbe',
                
              },
               onTextChange: text => this.setState({search:text}),
               value:this.state.search
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
        <View>
          {this.state.data.map((item, index) => {
            var send = this.state.items[index];
            //console.log(index);

            return (
              <View style={{ marginTop: 30 }}>
                <DropDownPicker
                  items={send}
                  placeholder={item.category.localImagePath}
                  placeholderStyle={{ color: item.category.colorCode }}
                  containerStyle={{ height: 40 }}
                  arrowStyle={{ marginRight: 10 }}
                  itemStyle={{
                    borderBottom: 'solid',
                    borderBottomWidth: 0.1,
                    borderColor: '#d2d4d2',
                    justifyContent: 'flex-start',
                    color: 'grey',
                  }}
                  showArrow={true}
                  searchable={true}
                  searchablePlaceholder="Search..."
                  searchablePlaceholderTextColor="gray"
                  searchableError={() => <Text>Not Found</Text>}
                  style={{
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                  dropDownStyle={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  }}></DropDownPicker>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  bar: {
    borderWidth: 2,
    height: 30,
    width: 300,
    paddingLeft: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 20,
    backgroundColor: '#bdbfbe',
    justifyContent: 'center',
  },
});
