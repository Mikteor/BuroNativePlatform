import React, { useState, useEffect } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { StyleSheet, Text, View, Image, TextInput, RefreshControl  } from 'react-native';
import {  Button, ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'

// import  storage  from '../../components/localStorage/storage';
// import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView, ImageBackground } from 'react-native';
import { loadUser } from '../../redux/actions/auth';
import { allNews } from '../../redux/actions/news';
import { findDepartment } from '../../redux/actions/department';
import { likedProposes } from '../../redux/actions/office';
import { allProjects, selectedProject } from '../../redux/actions/projects';
import MyProjects from '../../components/main/myProjects'
import {url} from '../../components/utils/axios'
import CommonHeader from '../../components/common/header/commonHeader'
import { clearOpenedUser } from '../../redux/actions/user';
import Loadscreen from '../../components/common/loadingScreen'


const TeamMateProfile = ({navigation,}) => {
  const dispatch = useDispatch()
const user = useSelector(state=>state.users.user)

const [refreshing, setRefreshing] = React.useState(false);
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadAll()
    wait(2000).then(() => setRefreshing(false));
  }, []);

useEffect(()=>{
  // return dispatch(clearOpenedUser())
},[])

if(!user){
  return(
    <Loadscreen />
  )
}

  return (
    
<ScrollView  style={styles.container} 
        
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
          stickyHeaderIndices={[0]}
          >
     <CommonHeader navigation={navigation} title='Профиль сотрудника' />
      
        <View style={{backgroundColor: 'white'}}>
            <View style={{height: 100, backgroundColor: 'black',}}>
                <ImageBackground  source={user? {uri: `${url+user.avatar}`} : require('../../../assets/ava.jpeg')} style={styles.avaBG} blurRadius={5} />
            </View>  
            <View style={styles.profileTop}>
              <Image source={user? {uri: `${url+user.avatar}`} : require('../../../assets/ava.jpeg')} style={styles.avatar}/>
              <Text style={styles.name}>{user? user.fullname :'Имя Фамилия'}</Text>
              <Text style={styles.pos}>{user? user.position : 'Должность'}</Text>
            </View>
        </View>

        <View>
              <View style={styles.flexTop}>
                {user && user.partition.map((el,i)=>{
                  return(
                    <View key={'flexs'+i} style={styles.flexItem}>
                      <Text style={{color: '#7296FB'}}>{el}</Text>
                    </View>
                  )
                })}
              </View>

          
            
                  <MyProjects navigation={navigation} projects={user && user.projects}/> 
        
        </View>
</ScrollView>
  );
}
export default TeamMateProfile

const styles = StyleSheet.create({
    container: {
      flex: 1,
    backgroundColor: '#fff',

      // alignItems: 'center',
      // justifyContent: 'center',
    },
    avaBG : {
      flex: 1,
      resizeMode: "cover",
      paddingLeft: 10,
    },
    profileTop: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: -95,
      // backgroundColor: 'red',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    pos: {
      color: 'grey',
    },
    flexTop:{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 15,
    },
    flexItem: {
      paddingHorizontal: 25,
      paddingVertical: 3,
      backgroundColor: '#F1F5FF',
      borderRadius: 7,
      marginHorizontal: 10,
      marginVertical: 5,
    },
    scrollView:{
      backgroundColor: '#F8FAFB',
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginTop: 35,
    },
    tableRow: {
      backgroundColor: 'white',
      marginVertical: 2,
      padding: 0,
    },
    projType: {
      backgroundColor: '#F2ECE1',
      borderRadius: 4,
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: 'white',
      marginHorizontal: 10,
      borderRadius: 13,
      paddingRight: 8,
      paddingLeft: 20,
      paddingVertical: 8,
    },
    newsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 50,
      marginBottom: 30,
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      marginHorizontal: 15,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#DDDDDD',
      marginBottom: 5,
      paddingBottom: 3,
    },
    projectFlex: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    projTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 50,
    },
  });

  const btnStyles = StyleSheet.create({
    container: {
      marginVertical: 20,
      backgroundColor: '#F8FAFB',
      borderWidth: 0,
      borderRadius: 8,
      
    },

    selectedButton: {
      backgroundColor: '#3F496C',
      // marginHorizontal: 10,
      borderRadius: 8,

    },
    text: {
      fontSize:14,
      color: 'grey'
    },
    selectedText: {
      color: 'white',
    },
    innerBorders: {
      width: 0,
    },
    btn: {
      // marginHorizontal: 10,
    }
    
  });


 