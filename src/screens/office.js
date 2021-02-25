import React from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import {  Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const Profile = ({navigation}) => {

const proposes = [1,2,3,4,5]

  return (
    
    <View style={styles.container}>

      <View style={styles.title}>
          <Icon name='puzzle-plus' color='#7C7C7C' size={24}/>
          <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>Предложения</Text>
      </View>

    <ScrollView>
      {proposes.map((el,i)=>{

        return(
            <View key={'proposrss'+i} style={styles.proposeCard}>
              <View style={styles.propCardFlex}>
                  <Text>Имя фамилия</Text>
                  <Text>01.05</Text>
              </View>
              <Text style={{fontWeight: 'bold',marginVertical: 5, fontSize: 15}}>Предложение состоит в том чтоб все предложения отрисовывались тут как предложения</Text>
              <View style={styles.propCardFlex}>
                <Text>3 людям нравится</Text>
                <Icon name={i%2?'heart': 'heart-outline'} color={i%2?'red': '#7C7C7C'} size={24}/>
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

