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



const Main = ({navigation}) => {
const dispatch = useDispatch()
const user = useSelector(state=>state.auth.user)
const news = useSelector(state=>state.news.news)
const department = useSelector(state => state.departments.findDep)
const liked = useSelector(state => state.office.likedProposes)

const flexs = ['OB', 'AP', 'ПП','ПП','ПП']
const projects = useSelector(state=> state.projects.projects)
const [daysLeft, setDaysLeft] = useState(35)
const [selectedButton, setButton] = useState(0)

const buttons = ['Проекты','Новости']


const [refreshing, setRefreshing] = React.useState(false);
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadAll()
    wait(2000).then(() => setRefreshing(false));
  }, []);

const loadAll = () => {

  dispatch(loadUser())
  dispatch(allNews())
  user && user.division && dispatch(findDepartment(user.division.divname))
  dispatch(likedProposes())
  dispatch(allProjects())
  // console.log('reloading')

}

useEffect(()=>{
  loadAll()
},[])

const projectPress = (crypt) => {
  dispatch(selectedProject(crypt))
  navigation.navigate('Меню')
  navigation.push('projects')
  navigation.push('project')
}
// useEffect(()=>{
//   const now = new Date()
//   const finish = new Date(project.dateFinish)
//   const left = (finish.getTime() - now.getTime()) / (1000*60*60*24)
//   const days = Math.floor(left)
//  setDaysLeft(days)
// },[user])

  return (
    

<View style={styles.scrollView}>
 {/* <View style={styles.title}>
 <Icon name='playlist-check' color='#7C7C7C' size={24}/>
 <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Мои проекты</Text>
 <Button title='Все проекты' type='clear' 
         titleStyle={{color: '#7C7C7C', fontSize: 14 }} 
         containerStyle={{height:30, justifyContent: 'center',}}
         icon={<ArrowIcon name='keyboard-arrow-right' color='#7C7C7C' size={18}/>}
         iconRight={true}
         onPress={()=>navigation.navigate('Меню', { screen: 'projects' })}
         />
</View> */}

<DataTable>
{user && (!user.projects? <Text>loading projects</Text> : user.projects.map((el,i)=>{
return(
 
 <DataTable.Row style={styles.tableRow} key={'projj'+i} onPress={()=>projectPress(el.crypt)} >
   <DataTable.Cell style={{flex: 1,}}>{el.title}</DataTable.Cell>
   <DataTable.Cell style={styles.smallCell} numeric>{daysLeft} {daysLeft<1?'день': daysLeft<5? 'дня': 'дней'}</DataTable.Cell>
   <DataTable.Cell style={styles.smallCell} numeric>
     <View style={styles.projType}>
       <Text style={{color: '#CA9E4D',}}>архитектура</Text>
     </View>
   </DataTable.Cell>
   <DataTable.Cell style={{flex: .3}} numeric>
     <Icon name='circle' color='green' size={14}/>
   </DataTable.Cell>
 </DataTable.Row>
)

}))}
</DataTable>
</View> 
  );
}
export default Main

const styles = StyleSheet.create({
    container: {
      flex: 1,
    backgroundColor: '#fff',

      // alignItems: 'center',
      // justifyContent: 'center',
    },

    profileTop: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: -60,
      // backgroundColor: 'red',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    pos: {
      color: 'grey',
    },
    flexTop:{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 15,
    },
    flexItem: {
      paddingHorizontal: 25,
      paddingVertical: 3,
      backgroundColor: '#F1F5FF',
      borderRadius: 7,
      marginHorizontal: 10,
      marginVertical: 5,
    },
    scrollView:{
      backgroundColor: '#F8FAFB',
      paddingVertical: 10,
      paddingHorizontal: 15,
      
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
    card: {
      backgroundColor: 'white',
      marginHorizontal: 10,
      borderRadius: 13,
      paddingRight: 8,
      paddingLeft: 20,
      paddingVertical: 8,
    },
    newsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 50,
      marginBottom: 30,
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      marginHorizontal: 15,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#DDDDDD',
      marginBottom: 5,
      paddingBottom: 3,
    },
    projectFlex: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    projTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 50,
    },
  });

