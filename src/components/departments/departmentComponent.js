import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,  Image, } from 'react-native';
import { ListItem, } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import {url} from '../utils/axios'
import CommonTitle from '../common/titles'
import ProjectItem from '../main/myProjects'

const DepartmentComponent = ({navigation, department}) => {

const [departmentProjects, setDepProjects] = useState([])


const getDepartmentProjects = () => {
  if(department){
    if(department.members){
      let allProjs = department.members.map((el,i)=>{
                            return el.projects
                            })
// console.log('allProjs',allProjs) создает массив с подмассивами проектов пользователей
      let inOneArr = [].concat.apply([], allProjs)
// console.log('inOneArr', inOneArr) объеденяет подмассивы в единый массив
      for (let i=0; i<inOneArr.length;){
        if(inOneArr.some((item,index)=>item._id===inOneArr[i]._id && index>i)){
          inOneArr.splice(i,1)
          i=0
          // console.log('i=0') если нашел такой-же проект - удаляет текущий, начинает поиск заново
        } else {
          i+=1
          // console.log('i+=1') если не нашел (проект уникальный) - переходит к следующему

        }
      }
// console.log('inOneArr2', inOneArr)  

      setDepProjects(inOneArr)
    }
  }
}

useEffect(()=>{
    getDepartmentProjects()
},[department])


  return (

  <View style={styles.scrollView}>
        
        <CommonTitle icon='account-group-outline' title={`Команда отдела "${department && department.divname}"`} />
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
                    onPress={()=>navigation.navigate( 'teamMateProfile', {user: el} )}
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
          {!department? <Text>loading</Text> : 
          departmentProjects.length==0? <Text>У отдела пока нет проектов</Text> : 
          <ProjectItem navigation={navigation} projects={departmentProjects} />}
  </View>
      
  );
}
export default DepartmentComponent

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

