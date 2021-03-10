import React, { useState, useEffect } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux'
import { StyleSheet, Text, View, Image, TextInput, RefreshControl  } from 'react-native';
import {  Button, ButtonGroup } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'

// import  storage  from '../../components/localStorage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native';
import Projects from './menu/projects/projects';
import { DataTable } from 'react-native-paper';
import { loadUser } from '../redux/actions/auth';
import { allNews } from '../redux/actions/news';
import { findDepartment } from '../redux/actions/department';
import { likedProposes } from '../redux/actions/office';
import { allProjects, selectedProject } from '../redux/actions/projects';
import News from './news'
import MyProjects from '../components/main/myProjects'
import {url} from '../components/utils/axios'


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
  navigation.navigate('projects')
  navigation.navigate('project')
}
// useEffect(()=>{
//   const now = new Date()
//   const finish = new Date(project.dateFinish)
//   const left = (finish.getTime() - now.getTime()) / (1000*60*60*24)
//   const days = Math.floor(left)
//  setDaysLeft(days)
// },[user])

  return (
    
<ScrollView  style={styles.container} 
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
          stickyHeaderIndices={[0]}
          >
      
        <View style={{backgroundColor: 'white'}}>
            <View style={{height: 100, backgroundColor: 'black',}}/>
  
            <View style={styles.profileTop}>
              <Image source={user? {uri: `${url+user.avatar}`} : require('../../assets/ava.jpeg')} style={styles.avatar}/>
              <Text style={styles.name}>{user? user.fullname :'Mitya Pustovitenko'}</Text>
              <Text style={styles.pos}>{user? user.position : 'position'}</Text>
            </View>
        </View>

        <View>
              <View style={styles.flexTop}>
                {flexs.map((el,i)=>{
                  return(
                    <View key={'flexs'+i} style={styles.flexItem}>
                      <Text style={{color: '#7296FB'}}>{el}</Text>
                    </View>
                  )
                })}
              </View>

              <ButtonGroup
                    onPress={(e)=>setButton(e)}
                    selectedIndex={selectedButton}
                    buttons={buttons}
                    containerStyle={btnStyles.container}
                    buttonStyle={btnStyles.btn}
                    selectedButtonStyle={btnStyles.selectedButton}
                    textStyle={btnStyles.text}
                    selectedTextStyle={btnStyles.selectedText}
                    innerBorderStyle={btnStyles.innerBorders}
                    />
              {selectedButton == 0? 
                  <MyProjects navigation={navigation} /> :
              selectedButton == 1 &&
                  <News noHeader /> 
              }

        </View>
</ScrollView>
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
      marginTop: 35,
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

  const btnStyles = StyleSheet.create({
    container: {
      marginVertical: 20,
      backgroundColor: '#F8FAFB',
      borderWidth: 0,
      borderRadius: 8,
      
    },

    selectedButton: {
      backgroundColor: '#3F496C',
      // marginHorizontal: 10,
      borderRadius: 8,

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
      // marginHorizontal: 10,
    }
    
  });


  
//  <View style={styles.scrollView}>

//       <View style={styles.title}>
//           <Icon name='playlist-check' color='#7C7C7C' size={24}/>
//           <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Новости</Text>
//           <Button title='Все новости' type='clear' onPress={()=>navigation.navigate('news')}
//                   titleStyle={{color: '#7C7C7C', fontSize: 14 }} 
//                   containerStyle={{height:30, justifyContent: 'center',}}
//                   icon={<ArrowIcon name='keyboard-arrow-right' color='#7C7C7C' size={18}/>}
//                   iconRight={true}
//                   />
          
//       </View>

//       <DataTable>
//       {!news? <Text>loading news</Text> : news.map((el,i)=>{
//         if (i<3){
//         return(
          
//           <DataTable.Row style={styles.tableRow} key={'projj'+i} onPress={()=>navigation.navigate('project')} >
//             <DataTable.Cell style={{flex: 2,}}>{el.title}</DataTable.Cell>
//             <DataTable.Cell style={styles.smallCell} numeric>
//               <View style={styles.projType}>
//                 <Text style={{color: '#CA9E4D',}}>объявление</Text>
//               </View>
//             </DataTable.Cell>
//             <DataTable.Cell style={styles.smallCell} numeric>{el.postDate.slice(0,10).split('-').reverse().join('.')}</DataTable.Cell>
//           </DataTable.Row>
//         )} 
        
//       })}
//       </DataTable> 

     




     


// </View>