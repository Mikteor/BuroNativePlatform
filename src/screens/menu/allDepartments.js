import React, { useEffect,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image } from 'react-native';

import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { allDepartments, clearDeps, findDepartment } from '../../redux/actions/department'
import CommonHeader from '../../components/common/header/commonHeader'
import CommonTitle from '../../components/common/titles'
import { round } from 'react-native-reanimated';
import {url} from '../../components/utils/axios'


const AllDepartments = ({navigation}) => {
const dispatch = useDispatch()
const departments = useSelector(state => state.departments.departments)
useEffect(()=>{
  dispatch(allDepartments())
},[])
const depPress = (divname) => {
  dispatch(findDepartment(divname))
  navigation.navigate('dep')
}


  return (
    
    <ScrollView style={styles.container}>
      <CommonHeader navigation={navigation} title='Все отделы'/>
      <CommonTitle title='Все отделы' icon='account-group-outline' />
      
        {!departments? <Text>loading...</Text> : 
          departments.map((el,i)=>{
           
          return(
          <View key={'deppartments'+i} style={styles.row} onTouchEnd={()=>depPress(el.divname)} >
              <Text style={styles.divname}>{el.divname}</Text>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                {el.members.map((el,i)=>{
                  if(i<3){
                    return(
                      <Image key={'depmembers'+i} source={{uri: `${url+el.avatar}`}} style={styles.avatar}/>
                    )
                  }})}
                  {el.members.length>3 && <Text style={{fontSize: 20}}>+</Text>}
              </View>

          </View>
          )
          
        })}

    </ScrollView>
  );
}
export default AllDepartments

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFB',
    },
    row: {
      flexDirection:'row',
      justifyContent:'space-between',
      marginHorizontal:15,
      paddingVertical:15,
      borderBottomWidth:0.5,
      borderBottomColor:'grey',
      alignItems:'center',
      paddingHorizontal:10,
    },
    divname:{
      fontSize:16,
      
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 100,
      marginLeft:-20,
    },
  });

