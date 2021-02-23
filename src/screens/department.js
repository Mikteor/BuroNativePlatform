import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import {Button, ListItem, Icon} from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';


const Main = ({}) => {


  return (
    
    <View style={styles.container}>

<Text style={styles.title}>Отдел</Text>

<ListItem  
// containerStyle={styles.buttContainer}
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          >
              <Image source={require('../../assets/ava.jpeg')} style={styles.avatar}/>

              <ListItem.Content>
                <ListItem.Title>Mitya putovitenko</ListItem.Title>
                <ListItem.Subtitle>Mitya putovitenko</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
          </ListItem>

<View style={styles.card}>
            <View style={styles.profileFlex}>
                <Image source={require('../../assets/ava.jpeg')} style={styles.avatar}/>
                <View>
                    <Text style={styles.name}>Mitya Pustovitenko</Text>
                    <Text style={styles.pos}>mobile developer</Text>
                </View>
            </View>
            <Button title='Профиль' containerStyle={styles.btnProf}/>
        </View>
        <Text style={styles.title}>Проекты отдела</Text>

        <View style={styles.card}>
          <Text style={{textAlign: 'right'}}>активный</Text>
          <Text style={{textAlign: 'right'}}>7 дней</Text>
          <Text style={styles.projTitle} numberOfLines={1}>Название проекта</Text>
          <Text style={{marginRight: 50}}>Короткое описание проекта вот тут. Кто о чем куда где</Text>
          <View style={styles.projectFlex}>
            <Text>#smth</Text>
            <Button title='Подробнее' containerStyle={{width: 150,borderRadius: 13,}}/>
          </View>
          </View>

    </View>
  );
}
export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4C4C4',
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
      marginTop: 20,
    },
    newsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 50,
      marginBottom: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      borderBottomWidth: 1,
      marginHorizontal: 10,
      marginVertical: 20,
      paddingBottom: 10,
    },
    projectFlex: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    projTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 50,
    },

    profileFlex: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: 10,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 100,
      marginRight: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      width: 200,
      // backgroundColor: 'red'
    },
    btnProf: {
      borderRadius: 13,
      width: 150,
      marginLeft: 'auto',
    },
  });

