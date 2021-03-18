import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { StyleSheet, Text, View, ScrollView, Image, TextInput,RefreshControl } from 'react-native';
import {Button, ListItem, } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import { DataTable } from 'react-native-paper';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {url} from '../components/utils/axios'
import { loadUser } from '../redux/actions/auth';
import { findDepartment } from '../redux/actions/department';
import CommonTitle from '../components/common/titles'
import ProjectItem from '../components/main/myProjects'

const Main = ({navigation}) => {
const dispatch = useDispatch()
const user = useSelector(state=>state.auth.user)
const department = useSelector(state => state.departments.findDep)
const [departmentProjects, setDepProjects] = useState([])
const [refreshing, setRefreshing] = useState(false);

const team = [1,2,3,4,5,6,7,8,]
let projects = []

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  dispatch(loadUser())
  user && user.division && dispatch(findDepartment(user.division.divname))
  setTimeout(()=>{
    setRefreshing(false)
  },2000)
}, []);

useEffect(()=>{
  user && user.division && dispatch(findDepartment(user.division.divname))
},[user])

const getAllProjects = () => {
  if(department){
    if(department.members){
      let allProjs = department.members.map((el,i)=>{
                            return el.projects
                            })
      let inOneArr = [].concat.apply([], allProjs)

      for (let i=0; i<inOneArr.length; i=i){
        if(inOneArr.some((item,index)=>item._id===inOneArr[i]._id && index>i)){
          inOneArr.splice(i,1)
          i=0
        } else {
          i+=1
        }
      }

      setDepProjects(inOneArr)
    }
  }
}

useEffect(()=>{
//  department && console.log('dep',department)
    getAllProjects()
},[department])


  return (
    
  <ScrollView style={styles.container} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>

      
      <View style={styles.scrollView}>
        
        <CommonTitle icon='account-group-outline' title={`Команда отдела "${user && user.division && user.division.divname}"`} />
        {!department? <Text>loading department</Text> : 
        !department.members?  <Text>loading members</Text> : 
        department.members.map((el,i)=>{
            return(
              <ListItem
                style={{marginVertical: 2,}}
                key={'team'+i}  
                // containerStyle={styles.buttContainer}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                onPress={()=>navigation.navigate('Меню', { screen: 'teamMateProfile', params: {user: el} })}
                >
                    <Image source={{uri: `${url+el.avatar}`} || require('../../assets/ava.jpeg')} style={styles.avatar}/>
                    <ListItem.Content>
                      <ListItem.Title>{el.fullname}</ListItem.Title>
                      <ListItem.Subtitle>{el.position}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
              </ListItem>
            )
        })}
      

      
      <CommonTitle icon='account-group-outline' title='Проекты отдела' button={{title: 'Все проекты', onPress: ()=>navigation.navigate('Меню',{screen: 'projects'})}} />

      {!department? <Text>loading</Text> : 
      departmentProjects.length==0? <Text>У отдела пока нет проектов</Text> : 
      <ProjectItem navigation={navigation} projects={departmentProjects} />}
      </View>
      
        

    </ScrollView>
  );
}
export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  scrollView:{
    paddingHorizontal: 15,
  },
    card: {
      backgroundColor: 'white',
      marginHorizontal: 10,
      borderRadius: 13,
      paddingRight: 8,
      paddingLeft: 20,
      paddingVertical: 8,
      marginTop: 20,
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
      marginTop: 20,
    },
    tableRow: {
      backgroundColor: 'white',
      marginVertical: 2,
      padding: 0,
    },
    projType: {
      backgroundColor: '#F2ECE1',

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
    btnProf: {
      borderRadius: 13,
      width: 150,
      marginLeft: 'auto',
    },
  });

