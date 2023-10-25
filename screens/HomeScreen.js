import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center',}}>
      <Text style={styles.headerText}>Tasks</Text>
      <Pressable style={styles.productButton} onPress={() => navigation.navigate('ApiTask')}>
        <Text style={styles.productText}>Products</Text>
      </Pressable>
      <Pressable style={styles.postalButton} onPress={() => navigation.navigate('Postal')}>
        <Text style={styles.postaltext}>Postal</Text>
      </Pressable>
      <Pressable style={styles.postalButton} onPress={() => navigation.navigate('TestPayment')}>
        <Text style={styles.postaltext}>Test Payment</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    headerText: {
        color: 'black',
        fontSize: 25,
        marginTop: 20,
        fontStyle: 'italic',
    },
    productButton: {
        width: '85%',
        height: 60,
        backgroundColor: '#7FFFD4',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 15,
    },
    productText: {
        color: '#5F9EA0',
        fontSize: 18,
    },
    postalButton: {
        width: '85%',
        height: 60,
        backgroundColor: '#B0C4DE',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 15,
    },
    postaltext: {
        color: '#F5F5F5',
        fontSize: 18,
    },
})