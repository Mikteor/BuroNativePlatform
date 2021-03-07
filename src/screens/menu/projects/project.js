import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, ImageBackground, StatusBar } from 'react-native';
import {  Button, ButtonGroup } from 'react-native-elements'
import { DataTable } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'
import SprintPage from '../../../components/projects/sprints'
import TeamPage from '../../../components/projects/projTeam'
import Info from '../../../components/projects/info'
import Model from '../../../components/projects/model'
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../../../redux/actions/projects'

const Project = ({navigation}) => {
  const dispatch = useDispatch()
  const project = useSelector(state => state.projects.project)
  const cryptProject = useSelector(state => state.projects.selectedProject)
  const user = useSelector(state => state.auth.user)
  const [selectedButton, setButton] = useState(0)

  
  const buttons = ['Спринты', 'Команда','Модель','Информация']
  const sprints = [1,2,3,4,5,6,7,8]
  const history = [1,2,3,4,5,6,7,8]

  const btnGroup = (e) => {
    console.log('project',project)
    console.log('sprints',project.sprints)
    console.log(e)
    setButton(e)
  }

  useEffect(()=>{
    console.log('cryptProject',cryptProject)
    dispatch(getProject(cryptProject))
  },[cryptProject])

if (!project) {
  return(
  <View style={{flex: 1,justifyContent:'center', alignContent: 'center'}}>
    <Text style={{textAlign: 'center'}}>loading...</Text>
  </View>
  )
} 

  return (
    
    <View style={styles.container}>
        <View style={styles.picture}>
            <ImageBackground source={require('../../../../assets/mria.png')} style={styles.bg}>
              <View style={styles.darkenes}>
                <Text style={styles.title}>{project.title}</Text>
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
              </View>
              
            </ImageBackground>
        </View>


      {selectedButton==0? <SprintPage  project={project} navigation={navigation}/> : 
       selectedButton==1? <TeamPage team={project.team2} crypt={cryptProject} user={user}/> :
       selectedButton==2? <Model /> :
       selectedButton==3 && <Info project={project} /> }
      
    

    </View>
  );
}
export default Project

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFB',
      // '#F8FAFB'
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    picture:{
      height:150,
      
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
    title: {
      color: 'white',
      fontSize: 24,
    },
  });


  const btnStyles = StyleSheet.create({
    container: {
      marginVertical: 20,
      backgroundColor: 'transparent',
      borderWidth: 0,
      
    },

    selectedButton: {
      backgroundColor: 'transparent'
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
    }
    
  });


  const sprintStyle = StyleSheet.create({
   container:{
    //  backgroundColor: 'red',
     flex:1
   },
   sprints:{
    // backgroundColor: 'green',
    flex: 1
    },
   card:{
    backgroundColor: 'white',
    elevation: 8,
    // marginVertical: 10,
    marginBottom:20,
    marginHorizontal: 40,
    borderRadius: 8,
    shadowColor: 'black',
    // marginTop: -20,
    paddingHorizontal:10,
    paddingVertical:5,
  },
  topFlex:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    marginLeft: 5,
    marginRight: 'auto',
  },
  botFlex:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title:{
    fontSize: 18,
  },
  status:{
    fontSize: 18,
  },
  description:{
    marginBottom: 8,
  },
  type:{
      backgroundColor: '#F2ECE1',
      borderRadius: 4,
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
  },

  history:{
    // backgroundColor: 'yellow',
    height: 250,
  },
  histTitle: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 5,
    paddingBottom: 3,
  },
  tableRow: {
    backgroundColor: 'white',
    marginVertical: 2,
    padding: 0,
  },
  projType: {
    backgroundColor: '#F2ECE1',
    borderRadius: 4,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projType2: {
    backgroundColor: '#E1E7F2',
    borderRadius: 4,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  });
  const teamStyle = StyleSheet.create({

  });
  const modelStyle = StyleSheet.create({
   
  });
  const infoStyle = StyleSheet.create({
   
  });