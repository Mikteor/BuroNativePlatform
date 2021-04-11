import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput, RefreshControl } from 'react-native';
import {  Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { deletePropose, likedProposes, likePropose } from '../redux/actions/office';
import CommonTitle from '../components/common/titles'
import Loading from '../components/common/loadingScreen'
import TabHeader from '../components/common/header/tabHeader'
import ProposeRow from '../components/office/proposeRow'

const Profile = ({navigation}) => {
const dispatch = useDispatch()
const liked = useSelector(state => state.office.likedProposes)
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
          />}
          stickyHeaderIndices={[0]}
          >
      <TabHeader navigation={navigation} title={'Офис'} />

    <CommonTitle icon='puzzle-plus' title='Предложения' />
    <View>
      {!liked? <Text>Предложений пока нет</Text> : 
        liked.map((el,i)=>{
          const likeTrue = user && el.likes.some(el => el.user == user._id)
        return(
            <ProposeRow key={'proposrss'+i} propose={el} likePress={()=>likeButton(el._id)} likeTrue={likeTrue} />
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

