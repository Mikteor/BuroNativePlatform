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
import DepartmentComponent from '../components/departments/departmentComponent'



const Main = ({navigation}) => {
const dispatch = useDispatch()
const user = useSelector(state=>state.auth.user)
const department = useSelector(state => state.departments.findDep)
const [refreshing, setRefreshing] = useState(false);

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




  return (
    
  <ScrollView style={styles.container} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
      <DepartmentComponent navigation={navigation} department={department} />
  </ScrollView>
  );
}
export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  
  });

