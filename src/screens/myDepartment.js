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
import { findDepartment, myDepartment } from '../redux/actions/department';
import CommonTitle from '../components/common/titles'
import ProjectItem from '../components/main/myProjects'
import DepartmentComponent from '../components/departments/departmentComponent'
import Loading from '../components/common/loadingScreen';
import TabHeader from '../components/common/header/tabHeader'


const Main = ({navigation}) => {
const dispatch = useDispatch()
const user = useSelector(state=>state.auth.user)
const department = useSelector(state => state.departments.myDepartment)
const [refreshing, setRefreshing] = useState(false);

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  dispatch(loadUser())
  
  setTimeout(()=>{
    setRefreshing(false)
  },2000)
}, []);

useEffect(()=>{
  user && user.division && dispatch(myDepartment(user.division.divname))
},[user])

if(user && !user.division){
  return(
  <ScrollView style={styles.container} 
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}
      stickyHeaderIndices={[0]}
      >
  <TabHeader navigation={navigation} title={'Мой отдел'} />
  <View style={{flex:1, justifyContent: 'center', alignItems: 'center',paddingTop: 100}}>
    <Text>Вы не вступили ни в один отдел</Text>
  </View>
</ScrollView>)
}
if(!user || !department){
  !user && dispatch(loadUser())
  !department && user && dispatch(myDepartment(user.division.divname))
  return(
    <Loading />
  )
}

  return (
    
  <ScrollView style={styles.container} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
          stickyHeaderIndices={[0]}
          >
      <TabHeader navigation={navigation} title={'Мой отдел'} />
      <DepartmentComponent navigation={navigation} department={department} />
  </ScrollView>
  );
}
export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
  });

