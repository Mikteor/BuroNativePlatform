import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, ImageBackground, StatusBar,  } from 'react-native';
import {  DataTable } from 'react-native-paper';
import { ListItem, Button } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import TouchableScale from 'react-native-touchable-scale';
import {url} from '../utils/axios'
import { getProject, joinTeam } from '../../redux/actions/projects';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/auth';
import { getUser } from '../../redux/actions/user';
import JoinModal from '../../components/projects/joinTeamModal';

const Project = ({navigation, team, crypt, user}) => {
const dispatch = useDispatch()
const userInTeam = team && team.some(el=> el.user._id==user._id)
  const [join, setJoin] = useState('')
  const [role, setRole] = useState('')
  const [task, setTask] = useState('')

const joinTeamFunc = () => {
  console.log('tik')
 crypt && dispatch(joinTeam(crypt, role, task))
  setRole('')
  setTask('')
  setJoin(false)
}
const teamClick =(id) => {
  dispatch(getUser(id))
  navigation.navigate( 'teamMateProfile' )
}

  return (
    
 
<View style={{flex:1, }}>
  
      <ScrollView style={teamStyle.scrollView}>
      {!userInTeam && <Button title='Вступить в команду' type='clear' onPress={()=>setJoin(true)} />}
      {userInTeam && <Button title='Выйти из команды' type='clear' onPress={()=>joinTeamFunc()} />}
        {team && team.map((el,i)=>{
          console.log(el)
            return(
              <View
                style={teamStyle.card}
                key={'team'+i}  
                onTouchEnd={()=>teamClick(el.user._id)}
                // containerStyle={styles.buttContainer}
                // Component={TouchableScale}
                // friction={90} //
                // tension={100} // These props are passed to the parent component (here TouchableScale)
                // activeScale={0.95} //
                >
                    <Image source={el.user.avatar? {uri: `${url+el.user.avatar}`} : require('../../../assets/ava.jpeg')} style={teamStyle.avatar}/>
          
                            <View style={{flex:1}}>
                                <Text style={teamStyle.name}>{el.user.fullname}</Text>
                                <Text style={teamStyle.pos}>{el.position}</Text>
                                <View style={teamStyle.flex}>
                                    
                                        <View style={teamStyle.projType}>
                                            <Text style={{color: '#CA9E4D',}}>{el.task}</Text>
                                        </View>
                                        {/* <View style={teamStyle.projType}>
                                            <Text style={{color: '#CA9E4D',}}>{el}</Text>
                                        </View> */}
                                        
                                </View>
                            </View>
                            {/* <View style={teamStyle.contactsContainer}>
                                <Text style={teamStyle.contacts}>{el.user.phone && el.user.phone}</Text>
                                <Text style={teamStyle.contacts}>{el.user.rocketname}</Text>
                            </View> */}
              </View>
            )
        })}
        
      </ScrollView>
      
      <JoinModal 
          visible={join} 
          confirm={()=>joinTeamFunc()}
          role={role}
          task={task}
          reject={()=>setJoin(false)}
          closeModal={()=>setJoin(false)}
          changeRole={(text)=>setRole(text)}
          changeTask={(text)=>setTask(text)}
          />
  </View>

  


  );
}
export default Project



  const teamStyle = StyleSheet.create({
    scrollView:{
      backgroundColor: 'white',
    },
      card: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        
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
        marginLeft: 'auto'
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






