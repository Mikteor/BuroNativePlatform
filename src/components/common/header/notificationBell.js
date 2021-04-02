import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {  Badge } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native';
import { clearNotifs } from '../../../redux/actions/notifications';

const NotificationBell = ({navigation}) => {

    const dispatch = useDispatch()
    const counter = useSelector(state => state.notifications.notificationCounter)
    const notifs = useSelector(state => state.notifications.notifications)

const [visible, setvis] = useState(false)

const close = () => {
    setvis(false)
    dispatch(clearNotifs())
}

  return (
    
   <View>
       <View style={{width:34, height: 34}}>
            <Icon name='bell-outline' color='black' size ={34} style={{ width: 34, }} onPress={()=>setvis(true)} />
            {counter>0&&<Badge value={counter} status="error" onPress={()=>setvis(true)} containerStyle={{ position: 'absolute', top: 1, right: -1 }} />}
       </View>


        <Modal 
            isVisible={visible}
            animationIn='bounceInDown'
            animationOut='bounceOutUp'
            animationInTiming={1000}
            animationOutTiming={1000}
            onBackdropPress={()=>close()}
            style={{padding:0,margin: 0, marginBottom:300}}
            // propagateSwipe={false}        
        >
            <ScrollView style={{flex: 1, padding:50, backgroundColor: 'white'}}>
                
                {notifs.map((el,i)=>{
                    return(
                        <View key={'notification'+i} style={styles.noteCard}>
                            <Image source={require('../../../../assets/ava.jpeg')} width={40} height={40} style={styles.image}/>
                            <View>
                                <Text style={styles.title}>Title</Text>
                                <Text style={styles.text}>text text text text text text text text text text text text text text text </Text>
                            </View>
                            
                        </View>
                    )
                })}
                
            </ScrollView>
        </Modal>
   </View>
    


  );
}
export default NotificationBell



const styles = StyleSheet.create({
    noteCard: {
        flexDirection:'row'
    },
    image:{
        width:60, 
        height: 60, 
        marginRight:15,
    },
    title: {
        fontSize:20, 
        fontWeight:'bold'
    },
    text:{

    }
  });
