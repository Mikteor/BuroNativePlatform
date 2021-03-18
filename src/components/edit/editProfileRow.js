import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyleSheet,  View, Button , Text} from 'react-native';

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonHeader from '../common/header/commonHeader'

const EditRow = ({content, placehold,onChangeT}) => {

const [edit, setEdit] = useState(false)


  return (
    <View>
          {!edit?
          <View style={styles.textContainer}>
              <Text style={styles.texts} >
                {content}
              </Text> 
              <Icon name='pencil-outline' size={24} color='black' onPress={()=>setEdit(true)} style={styles.icons} />
          </View> :
          <View style={styles.inputContainer}>
              <Input
                placeholder={placehold}
                onChangeText={onChangeT}
                // leftIcon={<Icon name="account" size={24} color="black" />}
              />
              <Icon name='cancel' size={24} color='black' onPress={()=>setEdit(false)} style={styles.icons} />
          </View> 
          }
     
      
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    
  },
  titles:{
    marginVertical: 15,
    fontSize: 18,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: .7,
    height: 49,
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight:14,
    justifyContent: 'center',
    // alignItems: 'center'
    height: 49,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    // paddingVertical: 5,
  },
  texts: {
    fontSize: 24,
    marginVertical: 'auto',
  },

  icons: {
    alignSelf: 'center',
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,

  },
 

});



export default EditRow
