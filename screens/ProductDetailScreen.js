import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AirbnbRating} from 'react-native-ratings';

const ProductDetailScreen = ({route}) => {
  const {product} = route.params;
  return (
    <View style={{flex: 1, marginTop: 5, marginHorizontal: 10,}}>
      <Image source={{uri: product.image}} style={styles.img} />
      <View style={styles.products}>
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productCat}>{product.category}</Text>
        <Text style={styles.productDes}>{product.description}</Text>
        <Text style={styles.productPrice}>
          <Text style={{fontWeight: 'bold'}}>Price: ₹ </Text>
          {product.price}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'flex-start',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Rating:</Text>
          <AirbnbRating
            count={5}
            defaultRating={product.rating.rate}
            size={17}
            showRating={false}
            starContainerStyle={{alignSelf: 'flex-start'}}
          />
          <Text style={styles.prouductRate}>({product.rating.count})</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    resizeMode: 'stretch',
  },
  products: {
    flex: 1,
    marginVertical: 5,
  },
  productName: {
    color: 'black',
    textAlign: 'justify',
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  productCat: {
    color: '#BC8F8F',
    textAlign: 'justify',
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  productDes: {
    color: 'black',
    textAlign: 'justify',
    marginHorizontal: 5,
    marginVertical: 8,
    fontSize: 16,
  },
  productPrice: {
    color: 'black',
    fontStyle: 'italic',
    marginVertical: 5,
  },
  prouductRate: {
    color: '#EE82EE',
    fontStyle: 'italic',
  },
});
