import React from 'react';
import {  View,Image,FlatList,TouchableOpacity} from 'react-native';
import {
  Text,
   Left, Body, Title, Grid,Col,Card

} from 'native-base';

import appStyles from '../../theme/appStyles';
import {ItemList} from '../data/data';

class Catalog extends React.Component {

   constructor(props) {
    super(props);
  }

  // onPressRecipe = item => {
  //   this.props.navigation.navigate('Recipe', { item });
  // };

   renderItems = ({ item, index}) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
       <View style={index == 0 ? styles.ItemContainer : styles.ItemContainer}>
        <Image style={styles.photo} source={ item.photo_url } />
        <Text style={styles.productTitle}>{item.title}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
           <View style={styles.ItemLayout}>
            <View style={styles.shopSubTitle}>
              <Text style={styles.shopSubTitleText}>Shop by Categories</Text>
            </View>
           { <FlatList 
                     vertical
                     showsVerticalScrollIndicator={false}
                     numColumns={2}
                     data={ItemList}
                     renderItem={this.renderItems}
                     keyExtractor={item => `${item.itemId}`}
                   />}

                   <View>
                    {
                    
                     // ItemList.map((item, index) => {
                     //    return (
                     //     <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
                     //       <View style={index == 0 ? styles.FirstItem : styles.ItemContainer}>
                     //        <Image style={styles.photo} source={ item.photo_url } />
                     //        <Text style={styles.productTitle}>{item.title}</Text>
                     //      </View>
                     //    </TouchableHighlight>
                     //    );
                     //  })
                    }

                   </View>
          </View>
    );
  }
}
// Exports
export default Catalog;