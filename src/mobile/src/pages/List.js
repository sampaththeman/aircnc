import React, { useState, useEffect } from 'react'

import socketio from 'socket.io-client'
import serverConfig from '../config/serverConfig'

import { 
  SafeAreaView,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  Alert 
} from 'react-native'

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List({ navigation }) {
  const [techs, setTechs] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio(serverConfig.URL, {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
      })
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim())
      setTechs(techsArray)
    })
  }, [])

  function handleLogout() {
    AsyncStorage.setItem('user', '').then(() => { navigation.navigate('Login')})
  }

  return (
    <SafeAreaView style={StyleSheet.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo}/>
      </TouchableOpacity>

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
})
