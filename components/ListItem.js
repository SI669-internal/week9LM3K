
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { deleteItem } from '../features/todoSlice';



function ListItem(props) {

  const { item, navigation} = props;
  const dispatch = useDispatch();


  return (
    <View style={styles.listItemContainer}>
      <View style={styles.li1}>
        <Text style={styles.listItemText}>{item.text}</Text>
      </View>
      <TouchableOpacity 
        style={styles.li2}
        onPress={()=>{
          navigation.navigate('Details', { 
            item: item 
          });
        }}  
      >
        <MaterialIcons name="edit" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.li3}
        onPress={()=>{
          console.log('deleting item', item);
          dispatch(deleteItem(item));
        }}  
      >
        <MaterialIcons 
          name="delete"
          color="black"
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: '1%',
  },
  li1: {
    flex: 0.8, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '3%'
  },
  li2: {
    flex: 0.2,
    backgroundColor: 'white'
  },
  li3: {
    flex: 0.1,
    backgroundColor: 'white'
  },
  listItemText: {
    fontSize: 24
  },
});

export default ListItem;