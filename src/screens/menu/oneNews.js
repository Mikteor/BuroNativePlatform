import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image,  } from 'react-native';
import { ScrollView } from 'react-native';
import CommonHeader from '../../components/common/header/commonHeader'
import {url} from '../../components/utils/axios'
import Loading from '../../components/common/loadingScreen'
import { clearOpenedNews } from '../../redux/actions/news';

const OneNews = ({navigation}) => {
const dispatch = useDispatch()
const news = useSelector(state => state.news.getNews)
const [date, setDate] = useState('')
useEffect(()=>{
    if(news && news.postDate){
        const date = new Date(news.postDate) 
        const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря',]
        const day = date.getDate()
        const month = months[date.getMonth()]
        setDate(day+' '+month)
    }
},[news])

if(!news){
    return(
      <Loading/>
    ) 
  }
  return (
<View style={styles.container}>

      
    <CommonHeader navigation={navigation} title='Новость' clearState={()=>dispatch(clearOpenedNews())} />
    
    <ScrollView style={styles.scrollView}>

        <Text style={styles.date}>{date}</Text>
        <View style={{flexDirection:'row',justifyContent: 'flex-end'}}>
            {<Image source={{uri: `${url+news.author.avatar}`}} style={styles.avatar}/>}
            <Text>{news.author.fullname}</Text>
        </View>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.text}>{news.text}</Text>


    </ScrollView>
</View>
  );
}
export default OneNews

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    avatar:{
        width:20, 
        height: 20, 
        marginRight:5,
        borderRadius: 100
    },
    date:{
        textAlign: 'right',
        color: 'grey',
    },
    title: {
        fontSize:24,
        fontWeight:'bold',
        marginVertical: 15,
        marginRight: 100,
    },
    text:{

    },

  });

