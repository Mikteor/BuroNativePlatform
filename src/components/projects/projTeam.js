import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, ImageBackground, StatusBar, Button } from 'react-native';
import {  DataTable } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import TouchableScale from 'react-native-touchable-scale';
import {url} from '../utils/axios'
import { getProject, joinTeam } from '../../redux/actions/projects';
import { useDispatch } from 'react-redux';

const Project = ({team, crypt, user}) => {
const dispatch = useDispatch()
const userInTeam = team && team.some(el=> el.user._id==user._id)
  const flexs = ['OB', 'AP',]

const joinTeamFunc = () => {
 crypt && dispatch(joinTeam(crypt))
 dispatch(getProject(crypt))
}

  return (
    
 
<View style={{flex:1, }}>
  
      <ScrollView style={teamStyle.scrollView}>
      {!userInTeam && <Button title='Вступить в команду' onPress={()=>joinTeamFunc()} />}
      {userInTeam && <Button title='Выйти из команды' onPress={()=>joinTeamFunc()} />}
        {team.map((el,i)=>{
            return(
              <View
                style={teamStyle.card}
                key={'team'+i}  
                // containerStyle={styles.buttContainer}
                // Component={TouchableScale}
                // friction={90} //
                // tension={100} // These props are passed to the parent component (here TouchableScale)
                // activeScale={0.95} //
                >
                    <Image source={el.avatar? {uri: `${url+el.user.avatar}`} : require('../../../assets/ava.jpeg')} style={teamStyle.avatar}/>
          
                            <View>
                                <Text style={teamStyle.name}>{el.user.fullname}</Text>
                                <Text style={teamStyle.pos}>{el.position}</Text>
                                <View style={teamStyle.flex}>
                                    {flexs.map((el,i)=>{
                                        return(
                                        <View key={'flexs'+i} style={teamStyle.projType}>
                                            <Text style={{color: '#CA9E4D',}}>{el}</Text>
                                        </View>
                                        )
                           
                                    })}
                                </View>
                            </View>
                            <View style={teamStyle.contactsContainer}>
                                <Text style={teamStyle.contacts}>+00000000000</Text>
                                <Text style={teamStyle.contacts}>rocket</Text>
                            </View>
              </View>
            )
        })}
        
      </ScrollView>
      
  </View>

  


  );
}
export default Project



  const teamStyle = StyleSheet.create({
    scrollView:{
        paddingHorizontal: 15,
      },
      card: {
        marginVertical: 4,
        flexDirection: "row",
        alignItems: 'center',
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 7,

        
      },
      avatar: {
        width: 55,
        height: 55,
        borderRadius: 100,
        marginRight: 20,
      },
      flexTexts: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'space-between',

      },
      flex: {
        display: 'flex',
        flexDirection: 'row',

      },
      projType: {
        backgroundColor: '#F2ECE1',
        borderRadius: 4,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      contacts: {
        textAlign: 'right',
        marginLeft: 'auto',
        fontSize: 12,
      },
      contactsContainer: {
          marginBottom: 'auto',
          marginLeft: 'auto',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
      },
      name: {
        fontSize: 17,
      },
      pos: {
        fontSize: 13,
        marginBottom: 4,
      },
   
  });
  const modelStyle = StyleSheet.create({
   
  });
  const infoStyle = StyleSheet.create({
   
  });





