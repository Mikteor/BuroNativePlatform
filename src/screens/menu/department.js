import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { StyleSheet, Text, View, ScrollView, Image, TextInput,RefreshControl } from 'react-native';

import { loadUser } from '../../redux/actions/auth';
import { findDepartment } from '../../redux/actions/department';

import DepartmentComponent from '../../components/departments/departmentComponent'
import CommonHeader from '../../components/common/header/commonHeader'



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





  return (
    
  <ScrollView style={styles.container} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
      <CommonHeader navigation={navigation} title={'Отдел "'+department.divname+'"'}/>
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

