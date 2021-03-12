import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput,  Modal } from 'react-native';
import { ListItem, Divider, Overlay, Button } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Alert } from 'react-native';
import { ScrollView } from 'react-native';
import { allUsers } from '../../redux/actions/user'
import {url} from '../../components/utils/axios'
import CommonHeader from '../../components/header/commonHeader'

const BuroTeam = ({navigation}) => {
const dispatch = useDispatch()
const team = useSelector(state => state.users.users)

useEffect(()=>{
  dispatch(allUsers('name', true))
},[])
useEffect(()=>{
  // console.log(team)
},[team])
  return (
    
   <ScrollView style={styles.scrollView}>
     <CommonHeader navigation={navigation} />
        {!team? <Text>loading members</Text> : team.map((el,i)=>{
            return(
              <ListItem
                style={{marginVertical: 2,}}
                key={'teamBuro'+i}  
                // containerStyle={styles.buttContainer}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                >
                    <Image source={el.avatar? {uri: `${url+el.avatar}`} : require('../../../assets/ava.jpeg')} style={styles.avatar}/>
                    <ListItem.Content>
                      <ListItem.Title>{el.fullname}</ListItem.Title>
                      <ListItem.Subtitle>{el.position}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
              </ListItem>
            )
        })}
      </ScrollView>

  );
}
export default BuroTeam

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3F496C',
    },
    profileFlex: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: 10,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 100,
      marginRight: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      width: 200,
      // backgroundColor: 'red'
    },

  });

