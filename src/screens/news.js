import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'

import { useSelector } from 'react-redux';
import CommonHeader from '../components/common/header/commonHeader'
import { DataTable } from 'react-native-paper';

const Main = ({navigation, noHeader}) => {
  const news = useSelector(state=>state.news.news)
  const [newsOpen, setNewsOpen] = useState({
    visible: false,
    el: null
  })



  return (
    

      <View style={styles.scrollView}>
        
      {!noHeader && <CommonHeader navigation={navigation}/>}

{/* 
      <View style={styles.title}>
           <Icon name='playlist-check' color='#7C7C7C' size={24}/>
           <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Новости</Text>
           <Button title='Все новости' type='clear' onPress={()=>navigation.navigate('news')}
                   titleStyle={{color: '#7C7C7C', fontSize: 14 }} 
                   containerStyle={{height:30, justifyContent: 'center',}}
                   icon={<ArrowIcon name='keyboard-arrow-right' color='#7C7C7C' size={18}/>}
                   iconRight={true}
                   /> 
        
       </View> */}


      {!news? <Text>loading news</Text> : news.map((el,i)=>{
        
        return(
          
          <DataTable.Row style={styles.tableRow} key={'projj'+i} onPress={()=>setNewsOpen({...newsOpen, visible: true, el: el,})} >
            <DataTable.Cell style={{flex: 2,}}>{el.title}</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>
              <View style={styles.projType}>
                <Text style={{color: '#CA9E4D',}}>объявление</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>{el.postDate.slice(0,10).split('-').reverse().join('.')}</DataTable.Cell>
          </DataTable.Row>
        )
        
      })}

      <Modal
        animationType="slide"
        transparent={true}
        visible={newsOpen.visible}
        onRequestClose={()=>setNewsOpen({...newsOpen, visible:false})} 
        
      >
        <View style={styles.modalCont}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{newsOpen.el && newsOpen.el.title}</Text>
            <Text style={styles.modalText}>{newsOpen.el && newsOpen.el.text}</Text>
            <View style={styles.modalBtns}>
              <Button type='clear' title='Закрыть' onPress={()=>setNewsOpen({...newsOpen, visible:false})} />
            </View>
            
          </View>
        </View>
      </Modal>
  



    </View>
  );
}
export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5FF',
    // alignItems: 'center',
    // justifyContent: 'center',
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


    modalCont: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalCard: {
      backgroundColor: 'white',
      width: 250,
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: 10,
    elevation: 5,

    },
    modalTitle: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20,
    },
    modalText: {
      color: 'black',

      fontSize: 20,
    },
    modalBtns:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
  });

