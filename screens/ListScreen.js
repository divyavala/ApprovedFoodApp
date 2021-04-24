import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
const fat = require('../assets/fat.jpeg');
const fruit = require('../assets/fruit.png');
const protein = require('../assets/protein.jpeg');
const seafood = require('../assets/fish.png');
const sauces = require('../assets/sauces.jpeg');
const vegetable = require('../assets/vegetable.jpeg');
const images = [protein, seafood, vegetable, fruit, fat, sauces];
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
            if (item.subCategoryname !== '') {
              list.push({ name: item.subCategoryname });
            }

            item.items.map((item) => {
              if (item !== '') {
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
    var list = this.state.list;
    console.log(list);
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#eae3ff' }}>
        <View
          style={{
            flexDirection: 'row',
            margin: 20,
            padding: 10,
            justifyContent: 'space-evenly',
            marginTop: 50,
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
              onTextChange: (text) => this.setState({ search: text }),
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {this.state.data.map((item, index) => {
            var send = this.state.items[index];
            //console.log(index);

            return (
              <View style={styles.containerStyle}>
                <Image
                  source={images[index]}
                  style={{
                    width: 30,
                    height: 36,
                    borderWidth: 0.1,
                    borderRightWidth: 0,
                    borderColor: '#d2d4d2',
                    borderTopLeftRadius: 10,
                  }}
                />
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
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderLeftWidth: 0,
                    width: 310,
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  containerStyle: {
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 340,
    height: 40,
    borderTopRightRadius: 10,
  },
});
