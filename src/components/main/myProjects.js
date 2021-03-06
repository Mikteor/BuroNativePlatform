import React, { useState, useEffect } from 'react';
import {useDispatch, } from 'react-redux'
import { StyleSheet, Text, View,  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { selectedProject } from '../../redux/actions/projects';



const ProjectComponent = ({navigation, projects}) => {
const dispatch = useDispatch()

const projectPress = (crypt) => {
  dispatch(selectedProject(crypt))
  navigation.navigate('project')

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
        <View style={styles.projMain} onTouchEnd={()=>projectPress(el.crypt)}>
            <View style={styles.topLine}>
              <Text style={styles.title} numberOfLines={1}>{el.title}</Text>
              <Text style={styles.daysLeft}>{days} {days<2?'день': days<5? 'дня': 'дней'}</Text>
            </View>
            <Text style={styles.description} numberOfLines={2}>{el.about && el.about}</Text>
            <View style={styles.types}>
              {el.type && 
              <View style={ {...styles.projType,  backgroundColor: '#F2ECE1'}}>
                <Text style={{color: '#CA894D',}}>{el.type}</Text>
              </View>}
              {el.stage&&
              <View style={{...styles.projType, backgroundColor: '#E1E7F2'}}>
                <Text style={{color: '#4D87CA',}}>{el.stage}</Text>
              </View>}
            </View>
        </View>
      </View>
      )

})}
</View> 
  );
}
export default ProjectComponent

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
      flex:1,
      borderBottomWidth: 0.5,
      marginRight: 5,
      paddingVertical: 10,
    },
    title: {
      flex:1,
      fontWeight: '700',
      fontSize: 19,
      marginBottom: 8,
      marginRight:5,
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
      borderRadius: 4,
      paddingHorizontal: 5,
      marginRight:8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    

  });

