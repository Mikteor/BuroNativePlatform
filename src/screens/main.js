import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { StyleSheet, Text, View, Image, RefreshControl  } from 'react-native';
import { ButtonGroup } from 'react-native-elements'

import { ScrollView, ImageBackground } from 'react-native';
import { loadUser } from '../redux/actions/auth';
import { allNews } from '../redux/actions/news';
import { findDepartment } from '../redux/actions/department';
import { likedProposes } from '../redux/actions/office';
import { allProjects } from '../redux/actions/projects';
import News from './news'
import MyProjects from '../components/main/myProjects'
import {url} from '../components/utils/axios'


const Main = ({navigation}) => {
const dispatch = useDispatch()
const user = useSelector(state=>state.auth.user)
const buttons = ['Проекты','Новости']
console.log('auth Projects',user && user.projects)
const [selectedButton, setButton] = useState(0)
const [refreshing, setRefreshing] = useState(false);

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
}

useEffect(()=>{
  user && loadAll()
},[])


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
            <View style={{height: 120,}}>
                <ImageBackground  source={user? {uri: `${url+user.avatar}`} : require('../../assets/ava.jpeg')} style={styles.avaBG} blurRadius={50} />
            </View>  
            <View style={styles.profileTop}>
              <Image source={user? {uri: `${url+user.avatar}`} : require('../../assets/ava.jpeg')} style={styles.avatar}/>
              <Text style={styles.name}>{user? user.fullname :'Имя Фамилия'}</Text>
              <Text style={styles.pos}>{user? user.position : 'Должность'}</Text>
            </View>
        </View>

        <View>
              <View style={styles.flexTop}>
                {user && user.partition.map((el,i)=>{
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
                  <MyProjects navigation={navigation} projects={user && user.projects} /> :
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
    },
    avaBG : {
      flex: 1,
      resizeMode: "cover",
      paddingLeft: 10,
    },
    profileTop: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: -120,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 100,
    },
    name: {
      fontSize: 24,
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
    }
    
  });

