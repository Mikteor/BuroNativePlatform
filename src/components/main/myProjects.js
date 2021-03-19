import React, { useState, useEffect } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { StyleSheet, Text, View, Image, TextInput, RefreshControl  } from 'react-native';
import {  Button, ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'


import { DataTable } from 'react-native-paper';
import { loadUser } from '../../redux/actions/auth';
import { allNews } from '../../redux/actions/news';
import { findDepartment } from '../../redux/actions/department';
import { likedProposes } from '../../redux/actions/office';
import { allProjects, selectedProject } from '../../redux/actions/projects';



const Main = ({navigation, projects}) => {
const dispatch = useDispatch()

console.log(projects)
const projectPress = (crypt) => {
  console.log('1')
  dispatch(selectedProject(crypt))
  navigation.navigate('project')
  // navigation.push('projects')
  // navigation.push('project')
}


return (
    

<View style={styles.scrollView}>


{!projects? <Text>loading projects</Text> : projects.map((el,i)=>{
 const now = new Date()
 const finish = new Date(el.dateFinish)
 const left = (finish.getTime() - now.getTime()) / (1000*60*60*24)
 const days = Math.floor(left)

    return(
 
      <View style={styles.tableRow} key={'projj'+i}>
        <View style={styles.circle}>
            <Icon name='circle' color='green' size={10}/>
        </View>
        <View style={styles.projMain} onTouchEnd={()=>projectPress(el.crypt)} >
            <View style={styles.topLine}>
              <Text style={styles.title}>{el.title}</Text>
              <Text style={styles.daysLeft}>{days} {days<2?'день': days<5? 'дня': 'дней'}</Text>
            </View>
            <Text style={styles.description} numberOfLines={2}>{el.about}</Text>
            <View style={styles.types}>
              <View style={styles.projType}>
                <Text style={{color: '#CA9E4D',}}>архитектура</Text>
              </View>
            </View>
        </View>
      </View>
      )

})}
</View> 
  );
}
export default Main

const styles = StyleSheet.create({


    scrollView:{

      
    },
    tableRow: {
      backgroundColor: 'white',
      marginVertical: 2,
      padding: 0,
      marginHorizontal: 10,
      flexDirection: 'row',
    },
    topLine: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    circle: {
      margin: 10,
      marginTop: 19,
    },
    projMain: {
      borderBottomWidth: 0.5,
      marginRight: 35,
      paddingVertical: 10,
    },
    title: {
      fontWeight: '700',
      fontSize: 19,
      marginBottom: 8,
    },
    daysLeft:{
      color: 'gray'
    },
    description: {
      marginBottom: 8,
    },
    types: {
      flexDirection: 'row',
    },
    projType: {
      backgroundColor: '#F2ECE1',
      borderRadius: 4,
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    

  });

