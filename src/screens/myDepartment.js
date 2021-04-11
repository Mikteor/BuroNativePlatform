import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { StyleSheet, Text, View, ScrollView, Image, TextInput,RefreshControl } from 'react-native';

import { loadUser } from '../redux/actions/auth';

import DepartmentComponent from '../components/departments/departmentComponent'
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
      {user && !user.division ? 
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center',paddingTop: 100}}>
        <Text>Вы не вступили ни в один отдел</Text>
      </View> :
        <DepartmentComponent navigation={navigation} department={department} />
      }
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

