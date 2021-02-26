import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import {  Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { likedProposes, likePropose } from '../redux/actions/office';


const Profile = ({navigation}) => {
const dispatch = useDispatch()
const liked = useSelector(state => state.office.likedProposes)
const dated = useSelector(state => state.office.dateProposes)
const loaded = useSelector(state => state.office.loaded)
const reload = useSelector(state => state.office.reload)
const user = useSelector(state => state.auth.user)


const likeButton =(id) =>{
  dispatch(likePropose(id))
  // dispatch(likedProposes())
}
useEffect(()=>{
  dispatch(likedProposes())
},[reload])

const proposes = [1,2,3,4,5]

  return (
    
    <View style={styles.container}>

      <View style={styles.title}>
          <Icon name='puzzle-plus' color='#7C7C7C' size={24}/>
          <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Предложения</Text>
      </View>

    <ScrollView>
      {!liked? <Text>Предложений пока нет</Text> : 
        liked.map((el,i)=>{
          const likeTrue =  el.likes.some(el => el.user == user._id)
        return(
            <View key={'proposrss'+i} style={styles.proposeCard}>
              <View style={styles.propCardFlex}>
                  <Text>{el.user.fullname}</Text>
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
    </ScrollView>
     

    </View>
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

