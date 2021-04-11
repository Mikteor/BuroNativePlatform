import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,  Image, } from 'react-native';
import { ListItem, } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import {url} from '../utils/axios'
import CommonTitle from '../common/titles'
import ProjectItem from '../main/myProjects'
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/user';
import Loadscreen from '../common/loadingScreen'

const DepartmentComponent = ({navigation, department}) => {
const dispatch = useDispatch()
const [departmentProjects, setDepProjects] = useState(null)


const getDepartmentProjects = () => {
  if(department){
    if(department.members){
      let allProjs = department.members.map((el,i)=>{
                            return el.projects
                            })
      let inOneArr = [].concat.apply([], allProjs)
 
      let finalArr = []
      inOneArr.map((el,i)=>{
        if(!finalArr.some(item=> item._id==el._id)){
          finalArr.push(el)
        }
      })
      setDepProjects(finalArr)
    }
  }
}

useEffect(()=>{
    getDepartmentProjects()
},[department])



const teamClick =(id) => {
  dispatch(getUser(id))
  navigation.navigate( 'teamMateProfile' )
}

  return (
  <View style={styles.scrollView}>
        
        <CommonTitle icon='account-group-outline' title={`Команда отдела "${department && department.divname}"`} />
            {!department? <Loadscreen /> : 
            !department.members?  <Loadscreen reverse /> : 
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
                    onPress={()=>teamClick(el._id)}
                    >
                        <Image source={{uri: `${url+el.avatar}`} || require('../../../assets/ava.jpeg')} style={styles.avatar}/>
                        <ListItem.Content>
                          <ListItem.Title>{el.fullname}</ListItem.Title>
                          <ListItem.Subtitle>{el.position}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                  </ListItem>
                )
            })}


      <CommonTitle icon='account-group-outline' title='Проекты отдела' /*button={{title: 'Все проекты', onPress: ()=>navigation.navigate('Меню',{screen: 'projects'})}}*/ />
          {!departmentProjects? <Loadscreen reverse /> : 
          departmentProjects.length==0? <Text>У отдела пока нет проектов</Text> : 
          <ProjectItem navigation={navigation} projects={departmentProjects} />}
  </View>
      
  );
}
export default DepartmentComponent

const styles = StyleSheet.create({

  scrollView:{
    // paddingHorizontal: 15,
  },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 100,
      marginRight: 20,
    },
    btnProf: {
      borderRadius: 13,
      width: 150,
      marginLeft: 'auto',
    },
  });

