import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput, RefreshControl } from 'react-native';
import {  Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TouchableScale from 'react-native-touchable-scale';

const DepartmentComponent = ({likePress,propose,likeTrue}) => {
const dispatch = useDispatch()
const [like, setLike] = useState(likeTrue)
const likeButton = () => {
setLike(!like)
likePress()
}

  return (
  <View style={styles.scrollView}>
            <View  style={styles.proposeCard}>
              <View style={styles.propCardFlex}>
                  <Text>{propose.user && propose.user.fullname}</Text>
                  <Text>{propose.date.slice(5,10).split('-').reverse().join('.')}</Text>
              </View>
              <Text style={{fontWeight: 'bold',marginVertical: 5, fontSize: 15}}>{propose.title}</Text>
              <Text>{propose.text}</Text>
              <View style={styles.propCardFlex}>
                <Text>{propose.likeCount} людям нравится</Text>
                <Icon onPress={()=>likeButton()} name={like?'heart': 'heart-outline'} color={like?'red': '#7C7C7C'} size={24}/>
              </View>
            </View>
  </View>
      
  );
}
export default DepartmentComponent

const styles = StyleSheet.create({

  scrollView:{
    // paddingHorizontal: 15,
  },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 100,
      marginRight: 20,
    },
    btnProf: {
      borderRadius: 13,
      width: 150,
      marginLeft: 'auto',
    },
    proposeCard: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 3,
        borderRadius: 8,
      },
      propCardFlex: {
        display:'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }
  });

