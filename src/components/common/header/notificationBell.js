import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {  Badge, Button } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native';
import { clearNotifs, notifClick } from '../../../redux/actions/notifications';
import * as RootNavigation from '../../../../RootNavigation';
import {url} from '../../utils/axios'
import { getNews } from '../../../redux/actions/news';
import { getSprint } from '../../../redux/actions/projects';

const NotificationBell = ({navigation}) => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const notifs = user.notifications.filter(el=>el.data.read==false)
    const notifHistory = user.notifications.filter(el=>el.data.read==true)

    // console.log('user',user.notifications)
const [visible, setvis] = useState(false)




const close = () => {
    setvis(false)
    setTimeout(() => {
        // dispatch(clearNotifs())
    }, 1000);
    
}
const notifPress = (id, news_id, sprint_id) => {
    id!=0 && dispatch(notifClick(id))
    // console.log('notif', id, news_id, sprint_id)
    if (news_id){
        dispatch(getNews(news_id))
        setTimeout(() => {
            RootNavigation.navigate('Главная',{screen: 'oneNews'})
        }, 800);
    } else if (sprint_id){
        dispatch(getSprint(sprint_id))
        setTimeout(() => {
            RootNavigation.navigate('Главная',{screen: 'openSprint', params: {historyScreen: false}})
        }, 800);
    }
    
    setvis(false)
}

const clear = () => {
    const notifIds = notifs.map(el=>el.data.id)
    dispatch(clearNotifs(notifIds))
}


  return (
    
   <View>
       <View style={{width:34, height: 34}}>
            <Icon name='bell-outline' color='white' size={34} style={{ width: 34,}} onPress={()=>setvis(true)} />
            {notifs.length>0 && 
            <Badge value={notifs.length} status="error" onPress={()=>setvis(true)} containerStyle={{ position: 'absolute', top: 1, right: -1 }} />
            }
       </View>


        <Modal 
            isVisible={visible}
            animationIn='bounceInDown'
            animationOut='bounceOutUp'
            animationInTiming={850}
            animationOutTiming={850}
            onBackdropPress={()=>close()}
            style={{padding:0,margin: 0,}}
            // propagateSwipe={false}        
        >
            <View style={{flex: 1, padding:20, backgroundColor: 'white'}}>
                <Button title='Закрыть' type='clear' buttonStyle={{alignSelf: 'flex-end', marginBottom:30, }} onPress={()=>close()} />
                <ScrollView >
                    <View style={styles.groupTitle}>
                        <Text style={{fontSize: 18, color: 'grey',}}>{notifs.length>0? 'Уведомления' : 'Новых уведомлений нет'}</Text>
                        <Button title='Очистить' type='clear' buttonStyle={{height: 20,}} titleStyle={{color:'grey'}} onPress={()=>clear()} />
                    </View>
                    
                    {notifs.map((el,i)=>{
                        const date = new Date(Number(el.data.date))
                        const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря',]
                        const day = date.getDate()
                        const month = months[date.getMonth()]
                        return(
                            <View key={'notification'+i} style={styles.noteCard} onTouchEnd={()=>notifPress(el.data.id, el.data.news_id, el.data.sprint_id)}>
                                <Icon name='newspaper' size={15} color='black' style={styles.icon} />
                                <View style={{flex:1}}>
                                    <View style={{flexDirection:'row', justifyContent: 'space-between', marginBottom:8,}}>
                                      <Text style={styles.date}>{el.notification.title}</Text>  
                                      <Text style={styles.date}>{day+' '+month}</Text>  
                                    </View>
                                    <View style={{flexDirection:'row',}}>
                                       <Text numberOfLines={1} style={styles.title}>{el.notification.body}</Text> 
                                       <Image source={{uri: `${url+el.data.avatar}`}} width={40} height={40} style={styles.image}/>
                                        <Text>{el.data.fullname}</Text>
                                    </View>
                                    
                                </View>
                                
                            </View>
                        )
                    }).reverse()}
                    <Text style={{fontSize: 18, color: 'grey', marginVertical:15,}}>История</Text>
                    {notifHistory.map((el,i)=>{
                        const date = new Date(Number(el.data.date))
                        const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря',]
                        const day = date.getDate()
                        const month = months[date.getMonth()]
                        return(
                            <View key={'notification'+i} style={styles.noteCard} onTouchEnd={()=>notifPress(0, el.data.news_id, el.data.sprint_id)}>
                                <Icon name='newspaper' size={15} color='black' style={styles.icon} />
                                <View style={{flex:1}}>
                                    <View style={{flexDirection:'row', justifyContent: 'space-between', marginBottom:8,}}>
                                      <Text style={styles.date}>{el.notification.title}</Text>  
                                      <Text style={styles.date}>{day+' '+month}</Text>  
                                    </View>
                                    <View style={{flexDirection:'row',}}>
                                       <Text numberOfLines={1} style={styles.title}>{el.notification.body}</Text> 
                                       <Image source={{uri: `${url+el.data.avatar}`}} width={40} height={40} style={styles.image}/>
                                        <Text>{el.data.fullname}</Text>
                                    </View>
                                    
                                </View>
                                
                            </View>
                        )
                    }).reverse()} 
                    
                </ScrollView>
            </View>
            
        </Modal>
   </View>
    


  );
}
export default NotificationBell



const styles = StyleSheet.create({
    noteCard: {
        paddingTop: 15,
        flexDirection:'row',
        alignItems: 'flex-end',
        borderBottomWidth: 0.5,
        paddingBottom: 5,        
    },
    groupTitle: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
        marginBottom: 15,
        alignItems: 'flex-end',
    },
    icon: {
        marginRight:10,
        alignSelf: 'flex-start',
        marginTop: 2,
    },
    image:{
        width:20, 
        height: 20, 
        marginRight:5,
        borderRadius: 100
    },
    title: {
        fontSize:17, 
        fontWeight:'bold',
        marginRight:10,
        flex:1,
    },
    text:{

    },
    date: {
        color: 'grey',
    },
  });
