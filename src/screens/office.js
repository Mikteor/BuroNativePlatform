import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput, RefreshControl } from 'react-native';
import {  Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { deletePropose, likedProposes, likePropose } from '../redux/actions/office';
import CommonTitle from '../components/common/titles'
import Loading from '../components/common/loadingScreen'

const Profile = ({navigation}) => {
const dispatch = useDispatch()
const liked = useSelector(state => state.office.likedProposes)
const dated = useSelector(state => state.office.dateProposes)
const loaded = useSelector(state => state.office.loaded)
const reload = useSelector(state => state.office.reload)
const user = useSelector(state => state.auth.user)

const [refreshing, setRefreshing] = useState(false);


const likeButton =(id) =>{
  dispatch(likePropose(id))
}

const onRefresh = React.useCallback(() => {
  setRefreshing(true);
  dispatch(likedProposes())
  setTimeout(()=>{
    setRefreshing(false)
  },2000)
}, []);

const proposes = [1,2,3,4,5]

if(!user || !liked){
  return(
    <Loading />
  )
}
  return (
    
    <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>

    <CommonTitle icon='puzzle-plus' title='Предложения' />


    <View>
      {!liked? <Text>Предложений пока нет</Text> : 
        liked.map((el,i)=>{
          const likeTrue = user && el.likes.some(el => el.user == user._id)
        return(
            <View key={'proposrss'+i} style={styles.proposeCard}>
              <View style={styles.propCardFlex}>
                  <Text>{el.user && el.user.fullname}</Text>
                  <Text>{el.date.slice(5,10).split('-').reverse().join('.')}</Text>
              </View>
              <Text style={{fontWeight: 'bold',marginVertical: 5, fontSize: 15}}>{el.title}</Text>
              <Text>{el.text}</Text>
              <View style={styles.propCardFlex}>
                <Text>{el.likeCount} людям нравится</Text>
                <Icon onPress={()=>likeButton(el._id)} name={likeTrue?'heart': 'heart-outline'} color={likeTrue?'red': '#7C7C7C'} size={24}/>
              </View>
            </View>
        )
      })}
    </View>
     

    </ScrollView>
  );
}
export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
    // alignItems: 'center',
    // justifyContent: 'center',
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
    marginTop: 30,
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

