import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, ImageBackground, StatusBar, RefreshControl, Modal } from 'react-native';
import {  Button, ButtonGroup } from 'react-native-elements'
import { DataTable, FAB } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import SprintPage from '../../../components/projects/sprints'
import TeamPage from '../../../components/projects/projTeam'
import Info from '../../../components/projects/info'
import Model from '../../../components/projects/model'
import History from '../../../components/projects/history'
import { useDispatch, useSelector } from 'react-redux';
import { clearOpenedProject, getProject } from '../../../redux/actions/projects'
import CreateNewSprint from '../../../components/projects/createNewSprint'
import Loadscreen from '../../../components/common/loadingScreen'

const Project = ({navigation}) => {
  const dispatch = useDispatch()
  const project = useSelector(state => state.projects.project)
  const cryptProject = useSelector(state => state.projects.selectedProject)
  const user = useSelector(state => state.auth.user)
  const [selectedButton, setButton] = useState(0)
  const [plusOpen, setPlusOpen] = useState(false)
  const [newSprint, setNewSprint] = useState(false)

  
  const buttons = ['Спринты', 'Команда','Модель','Информация', 'История']



  const [refreshing, setRefreshing] = React.useState(false);
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getProject(cryptProject))
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const btnGroup = (e) => {
    // console.log('project',project)
    // console.log('sprints',project.sprints)
    // console.log(e)
    setButton(e)
  }

  useEffect(()=>{
    // console.log('cryptProject',cryptProject)
    dispatch(getProject(cryptProject))
  },[cryptProject])

  const backHandler = ()=> {
   navigation.goBack() 
  }
useEffect(()=>{
  return dispatch(clearOpenedProject())
},[])

if (!project) {
  return(
  <Loadscreen />
  )
} 

  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                stickyHeaderIndices={[0]}
                >
        <View style={styles.picture}>
            <ImageBackground source={require('../../../../assets/mria.png')} style={styles.bg}>
              <View style={styles.darkenes}>
                <View style={styles.header}>
                    <Icon name='arrow-left' size={30} color={'white'} onPress={()=>backHandler()} />
                    <Icon name='circle' size={24} color={'white'} onPress={()=>navigation.pop()} />
                </View>
                <Text style={styles.title}>{project.title}</Text>
                <ScrollView horizontal={true} >
                    <ButtonGroup
                          onPress={(e)=>btnGroup(e)}
                          selectedIndex={selectedButton}
                          buttons={buttons}
                          containerStyle={btnStyles.container}
                          buttonStyle={btnStyles.btn}
                          selectedButtonStyle={btnStyles.selectedButton}
                          textStyle={btnStyles.text}
                          selectedTextStyle={btnStyles.selectedText}
                          innerBorderStyle={btnStyles.innerBorders}
                          />
                </ScrollView>
                
              </View>
              
            </ImageBackground>
        </View>


      {selectedButton==0? <SprintPage  project={project} navigation={navigation}/> : 
       selectedButton==1? <TeamPage navigation={navigation} team={project.team2} crypt={cryptProject} user={user}/> :
       selectedButton==2? <Model /> :
       selectedButton==3? <Info project={project} user={user} /> :
       selectedButton==4 && <History project={project} navigation={navigation}/>}
      
    

    </ScrollView>
    {selectedButton==0 &&
            <FAB
              style={styles.fab}
              color='white'
              icon="plus"
              onPress={() => setPlusOpen(!plusOpen)}
              // onPress={() => navigation.navigate('createSprint')}
            />}

  <Modal
        animationType="slide"
        transparent={true}
        visible={plusOpen}
        onRequestClose={()=>setPlusOpen(false)} 
      
      >
        <View style={styles.modalCont} onTouchEnd={()=>setPlusOpen(false)}>
          <View style={styles.modalCard}>
            <View style={styles.modalBtn}>
              <Text style={styles.modalBtnText} onPress={()=>setNewSprint(true)}>Спринт</Text>
            </View>
          </View>
        </View>
  </Modal>

    <CreateNewSprint navigation={navigation} visible={newSprint} closeModal={()=>setNewSprint(false)} project={project} />
</View>
 
  );
}
export default Project

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      // '#F8FAFB'
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    picture:{
      height:172,
      
    },
    bg: {
      flex: 1,
    resizeMode: "cover",
    },
    darkenes:{
      flex:1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    header: {
      width: '100%',
      paddingHorizontal: 20,
      paddingTop: 10,
      marginBottom: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      color: 'white',
      fontSize: 24,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor:'#3F496C'
    },
    modalCont: {
      flex:1,
      backgroundColor: 'transparent',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    modalCard: {
  
      marginBottom: 145,
      marginRight: 16,
    },
    modalBtn:{
      alignSelf: 'flex-end',
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: 10,
      marginBottom: 10,
  
    },
    modalBtnText: {
      color: 'white',
      fontSize: 20,
    },
  });


  const btnStyles = StyleSheet.create({
    container: {
      marginVertical: 20,
      backgroundColor: 'transparent',
      borderWidth: 0,
      
      
    },

    selectedButton: {
      backgroundColor: 'transparent',
      marginHorizontal: 10,
    },
    text: {
      fontSize:14,
      color: 'grey'
    },
    selectedText: {
      color: 'white',
    },
    innerBorders: {
      width: 0,
    },
    btn: {
      marginHorizontal: 10,
    }
    
  });

