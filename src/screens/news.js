import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'

import { useDispatch, useSelector } from 'react-redux';
import CommonHeader from '../components/common/header/commonHeader'
import { DataTable } from 'react-native-paper';
import { getNews } from '../redux/actions/news';

const Main = ({navigation, noHeader}) => {
  const dispatch = useDispatch()
  const news = useSelector(state=>state.news.news)

  const newsPress = (id) => {
  dispatch(getNews(id))
  navigation.navigate('oneNews')
  }

  return (
    

      <View style={styles.scrollView}>
        
      {!noHeader && <CommonHeader navigation={navigation}/>}


      {!news? <Text>loading news</Text> : news.map((el,i)=>{
        if(i<10){
          return(
          
          <DataTable.Row style={styles.tableRow} key={'projj'+i} onPress={()=>newsPress(el._id)} >
            <DataTable.Cell style={{flex: 2,}}>{el.title}</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>
              {/* <View style={styles.projType}>
                <Text style={{color: '#CA9E4D',}}>объявление</Text>
              </View> */}
            </DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>{el.postDate.slice(0,10).split('-').reverse().join('.')}</DataTable.Cell>
          </DataTable.Row>
        )
        }
        
      })}

     



    </View>
  );
}
export default Main

const styles = StyleSheet.create({
 
  });

