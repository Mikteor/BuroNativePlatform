import React, { useEffect,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, } from 'react-native';

import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { allDepartments } from '../../redux/actions/department'
import CommonHeader from '../../components/common/header/commonHeader'


const AllDepartments = ({navigation}) => {
const dispatch = useDispatch()
const departments = useSelector(state => state.departments.departments)

useEffect(()=>{
  dispatch(allDepartments())

},[])
  return (
    
    <ScrollView style={styles.container}>
      <CommonHeader navigation={navigation}/>
  <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection='descending' style={{flex: 4,}}>Название</DataTable.Title>
          <DataTable.Title style={styles.smallHeadCell}>Дедлайн</DataTable.Title>
          <DataTable.Title style={styles.smallHeadCell}>Статус</DataTable.Title>
          <DataTable.Title style={styles.smallHeadCell}>Спринты</DataTable.Title>
        </DataTable.Header>
      
        {!departments? <Text>loading...</Text> : 
          departments.map((el,i)=>{
           
          return(
          <DataTable.Row key={'projeccts'+i} onPress={()=>projectPress(el.crypt)} >
            <DataTable.Cell style={{flex: 4,}}>{el.divname}</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>1</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>...</DataTable.Cell>
            <DataTable.Cell style={styles.smallCell} numeric>3</DataTable.Cell>
          </DataTable.Row>
          )
          
        })}
</DataTable>

    </ScrollView>
  );
}
export default AllDepartments

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8FAFB',
    },

  });

