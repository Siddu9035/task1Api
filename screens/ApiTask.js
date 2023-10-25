import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {AirbnbRating} from 'react-native-ratings';

const ApiTask = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState(false);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [unfilteredProducts, setUnfilteredProducts] = useState([]);

  /////////doing pagination statically not dynamically//////
  const getData = () => {
    setLoading(true);
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    axios
      .get('https://fakestoreapi.com/products')
      .then(res => {
        setLoading(false);
        const newData = res.data.slice(startIndex, endIndex);

        if (newData.length > 0) {
          setProducts([...products, ...newData]);
          setPage(page + 1);
        }
        //check if all products are loaded
        if (res.data.length <= endIndex) {
          setAllProductsLoaded(true);
        }

        setUnfilteredProducts(res.data);
        console.log('Fetched', res.data);
      })
      .catch(error => {
        console.log('Error', error);
        setLoading(false);
      });
  };
  // const getData = async () => {
  //   setLoading(true);
  //   const itemsPerPage = 5;
  //   const startIndex = (page - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;

  //   try {
  //     const response = await axios.get('https://fakestoreapi.com/products');
  //     setLoading(false);

  //     const newData = response.data.slice(startIndex, endIndex);

  //     if (newData.length > 0) {
  //       setProducts([...products, ...newData]);
  //       setPage(page + 1);
  //     }

  //     if (response.data.length <= endIndex) {
  //       setAllProductsLoaded(true);
  //     }

  //     console.log('Fetched', newData);
  //   } catch (error) {
  //     console.log('Error', error);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    getData();
  }, []);

  const renderProductItem = ({item}) => (
    <Pressable
      style={styles.productItem}
      onPress={() =>
        navigation.navigate('ProductDetailScreen', {product: item})
      }>
      <View style={styles.products}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productName}>{item.category}</Text>
        <Text style={styles.productPrice}>Price: ₹ {item.price}</Text>
        <Text style={{color: 'black'}}>Rating:</Text>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <AirbnbRating
            count={5}
            defaultRating={item.rating.rate}
            size={17}
            showRating={false}
            starContainerStyle={{alignSelf: 'flex-start'}}
          />
          <Text style={styles.prouductRate}>({item.rating.count})</Text>
        </View>
      </View>
      <Image source={{uri: item.image}} style={styles.img} />
    </Pressable>
  );

  const handleSort = sortOption => {
    setSelectedSort(sortOption);

    let tempList = [...products];
    switch (sortOption) {
      case 'rating':
        tempList.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'reviews':
        tempList.sort((a, b) => b.rating.count - a.rating.count);
        break;
      case 'sort':
        tempList.sort((a, b) => (a.title > b.title ? 1 : -1));
        break;
      case 'price':
        tempList.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setProducts(tempList);
  };

  const handleReset = () => {
    setSelectedSort(false); // Reset selected sort option
    setProducts([...unfilteredProducts]);
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        renderItem={renderProductItem}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => {
          return (
            <>
              <View style={{flex: 1, backgroundColor: 'white'}}>
                <Text style={styles.title}>Products</Text>
                {allProductsLoaded && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      marginVertical: 9,
                      marginHorizontal: 15,
                    }}>
                    <Pressable
                      style={[
                        styles.allButton,
                        selectedSort === false && styles.selectedbutton,
                      ]}
                      onPress={handleReset}>
                      <Text
                        style={[
                          styles.allText,
                          selectedSort === false && styles.selectedText,
                        ]}>
                        All
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.ratingButton,
                        selectedSort === 'rating' && styles.selectedbutton,
                      ]}
                      onPress={() => handleSort('rating')}>
                      <Text
                        style={[
                          styles.buttonText,
                          selectedSort === 'rating' && styles.selectedText,
                        ]}>
                        Rating
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.ReviewsButton,
                        selectedSort === 'reviews' && styles.selectedbutton,
                      ]}
                      onPress={() => handleSort('reviews')}>
                      <Text
                        style={[
                          styles.buttonText,
                          selectedSort === 'reviews' && styles.selectedText,
                        ]}>
                        Reviews
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.sortButton,
                        selectedSort === 'sort' && styles.selectedbutton,
                      ]}
                      onPress={() => handleSort('sort')}>
                      <Text
                        style={[
                          styles.buttonText,
                          selectedSort === 'sort' && styles.selectedText,
                        ]}>
                        sort
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.priceButton,
                        selectedSort === 'price' && styles.selectedbutton,
                      ]}
                      onPress={() => handleSort('price')}>
                      <Text
                        style={[
                          styles.buttonText,
                          selectedSort === 'price' && styles.selectedText,
                        ]}>
                        price
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </>
          );
        }}
        onEndReached={() => {
          getData();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          return (
            <>
              {loading && (
                <View>
                  <ActivityIndicator size={18} color={'black'} />
                </View>
              )}
            </>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'green',
  },
  productItem: {
    padding: 20,
    height: 260,
    elevation: 8,
    marginBottom: 5,
    marginHorizontal: 10,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  productPrice: {
    fontSize: 14,
    color: 'black',
  },
  products: {
    flex: 1,
    paddingLeft: 5,
    textAlignVertical: 'top',
  },
  img: {
    width: '42%',
    height: 220,
    resizeMode: 'stretch',
  },
  prouductRate: {
    color: 'black',
  },
  allButton: {
    borderWidth: 1,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    borderColor: '#D8BFD8',
    marginHorizontal: 4,
  },
  ratingButton: {
    borderWidth: 1,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    borderColor: '#D8BFD8',
    marginHorizontal: 4,
  },
  ReviewsButton: {
    borderWidth: 1,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    borderColor: '#D8BFD8',
    marginHorizontal: 4,
  },
  sortButton: {
    borderWidth: 1,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    borderColor: '#D8BFD8',
    marginHorizontal: 4,
  },
  priceButton: {
    borderWidth: 1,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    borderColor: '#D8BFD8',
    marginHorizontal: 4,
  },
  selectedbutton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: '#4682B4',
  },
  selectedText: {
    color: 'white',
  },
  allText: {
    color: '#4682B4',
  },
});

export default ApiTask;
