import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, ImageBackground, StatusBar } from 'react-native';
import { DataTable } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons'

const Project = ({}) => {

  const [selectedButton, setButton] = useState(0)

  
  const buttons = ['Спринты', 'Команда','Модель','Информация']
  const sprints = [1,2,3,4,5,6,7,8]
  const history = [1,2,3,4,5,6,7,8]

  const btnGroup = (e) => {
    console.log(e)
    setButton(e)
  }

  return (
    
 

        <View style={sprintStyle.container}>
          <View style={sprintStyle.sprints}>
          <View style={{backgroundColor:'black', height:20,}}/>
            <ScrollView style={{marginTop:-20,}}>
          


      {sprints.map((el,i)=>{

        return(
            <View key={'sprints'+i} style={sprintStyle.card}>
              <View style={sprintStyle.topFlex}>
                <Text style={sprintStyle.title}>Спринт 20.02</Text>
                <Icon name='circle' color='green' size={14} style={sprintStyle.statusDot}/>
                <Text style={sprintStyle.status}>42%</Text>
              </View>
              <Text style={sprintStyle.description}>Короткое описание спринта</Text>
              <View style={sprintStyle.botFlex}>
                <View style={sprintStyle.type}>
                  <Text style={{color: '#CA9E4D',}}>архитектура</Text>
                </View>
                <Icon name='star-outline' size={24} color='black' />
              </View>
            </View>
        )
      })}
          </ScrollView>
          </View>
          <View style={sprintStyle.history}>
              <View style={sprintStyle.histTitle}>
                <Icon name='playlist-check' color='#7C7C7C' size={24}/>
                <Text style={{marginRight: 'auto',marginLeft: 10, color: '#7C7C7C'}}>История</Text>
                <ArrowIcon name='keyboard-arrow-down' color='#7C7C7C' size={24}/>
              </View>
            <ScrollView>
              <DataTable>
                    {history.map((el,i)=>{
                      return(
                        
                        <DataTable.Row style={sprintStyle.tableRow} key={'projj'+i} onPress={()=>navigation.navigate('project')} >
                          <DataTable.Cell style={{flex: 1,}}>Спринт 12.03</DataTable.Cell>
                          <DataTable.Cell  numeric>
                            <View style={sprintStyle.projType2}>
                              <Text style={{color: '#4D87CA',}}>общ.прост</Text>
                            </View>
                          </DataTable.Cell>
                          <DataTable.Cell  numeric>
                            <View style={sprintStyle.projType}>
                              <Text style={{color: '#CA9E4D',}}>архитектура</Text>
                            </View>
                          </DataTable.Cell>
                          <DataTable.Cell style={{flex: .3}} numeric>
                            <Icon name='circle' color='green' size={14}/>
                          </DataTable.Cell>
                        </DataTable.Row>
                      )
                      
                    })}
          </DataTable>
          </ScrollView>
          </View>
        </View>

  


  );
}
export default Project



  const sprintStyle = StyleSheet.create({
   container:{
    //  backgroundColor: 'red',
     flex:1
   },
   sprints:{
    // backgroundColor: 'green',
    flex: 1
    },
   card:{
    backgroundColor: 'white',
    elevation: 8,
    // marginVertical: 10,
    marginBottom:20,
    marginHorizontal: 40,
    borderRadius: 8,
    shadowColor: 'black',
    // marginTop: -20,
    paddingHorizontal:10,
    paddingVertical:5,
  },
  topFlex:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    marginLeft: 5,
    marginRight: 'auto',
  },
  botFlex:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title:{
    fontSize: 18,
  },
  status:{
    fontSize: 18,
  },
  description:{
    marginBottom: 8,
  },
  type:{
      backgroundColor: '#F2ECE1',
      borderRadius: 4,
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
  },

  history:{
    // backgroundColor: 'yellow',
    height: 250,
  },
  histTitle: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 5,
    paddingBottom: 3,
  },
  tableRow: {
    backgroundColor: 'white',
    marginVertical: 2,
    padding: 0,
  },
  projType: {
    backgroundColor: '#F2ECE1',
    borderRadius: 4,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projType2: {
    backgroundColor: '#E1E7F2',
    borderRadius: 4,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  });
  const teamStyle = StyleSheet.create({

  });
  const modelStyle = StyleSheet.create({
   
  });
  const infoStyle = StyleSheet.create({
   
  });