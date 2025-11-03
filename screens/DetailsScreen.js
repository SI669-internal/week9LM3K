import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from '@rneui/base';
import { useDispatch } from 'react-redux';

import { addItemThunk, updateItemThunk } from "../features/todoSlice";

function DetailsScreen({navigation, route}) {

  const { item } = route.params;

  const dispatch = useDispatch();
  const [inputText, setInputText] = useState(item.text);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder='New Item'
          value={inputText}
          onChangeText={(text)=>setInputText(text)}
          style={styles.inputStyle}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Cancel'
          onPress={()=>{
            navigation.navigate('Home');
          }}
        />
        <Button
          title='Save'
          onPress={()=>{
            if (item.key === -1) {
              dispatch(addItemThunk(inputText)); 
            } else {
              dispatch(updateItemThunk({item, inputText})); 
            }
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: '20%'
  }, 
  inputContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  }
});

export default DetailsScreen;