import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black', fontSize: 40, fontStyle: 'italic',}}>Welcome</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})