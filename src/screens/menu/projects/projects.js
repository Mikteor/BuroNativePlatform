import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput, Button,RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { allProjects,  } from '../../../redux/actions/projects'
import CommonHeader from '../../../components/common/header/commonHeader'
import CommonTitle from '../../../components/common/titles'
import ProjectRow from '../../../components/main/myProjects'
const Projects = ({navigation}) => {

  const dispatch = useDispatch()

  const [refreshing, setRefreshing] = useState(false)


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      dispatch(allProjects())
      wait(2000).then(() => setRefreshing(false));
      
    }, []);
  
  const projects = useSelector(state=>state.projects.projects)
  


  return (
    
    <ScrollView style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
            stickyHeaderIndices={[0]}
            >
      <CommonHeader navigation={navigation} title='Все проекты' />
        <CommonTitle title='Текущие проекты' icon='home' />

            {!projects? <Text>Нет проектов</Text> : 
            <ProjectRow navigation={navigation} projects={projects.filter((project) => !project.status)} />  
            }

        <View style={{marginVertical: 30}}/>

        <CommonTitle title='Завершенные проекты' icon='home' /> 
            
            {!projects? <Text>Нет проектов</Text> : 
            <ProjectRow navigation={navigation} projects={projects.filter((project) => project.status)} />  
            }

    </ScrollView>
  );
}
export default Projects

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
 smallHeadCell: {
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,

 },
 smallCell: {
  alignContent: 'center',
  paddingHorizontal: 3,
  
},
title: {
  fontSize: 20,
  fontWeight: 'bold',
  borderBottomWidth: 1,
  marginHorizontal: 10,
  marginVertical: 10,
  paddingBottom: 10,
},

  });

