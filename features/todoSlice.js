
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { firebaseConfig } from "../Secrets";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query,
  doc, getDocs, updateDoc, addDoc, deleteDoc,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const getTodosThunk = createAsyncThunk(
 'todofirebase/getItems',
  async () => {
    const initList = [];
    const collRef = collection(db, 'todos');
    const q = query(collRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((docSnapshot)=>{
      const todo = docSnapshot.data();
      todo.key = docSnapshot.id;
      initList.push(todo);
    });
    return initList;
  }
);

export const addItemThunk = createAsyncThunk(
  'todothunks/addItem',
  async (todoText) => {
    const todoCollRef = collection(db, 'todos');
    const todoSnap = await addDoc(todoCollRef, {text: todoText});
    return {key: todoSnap.id, text: todoText};
  }
);

export const deleteItemThunk = createAsyncThunk(
  'todofirebase/deleteItem',
  async (todo) => {
    const docToDelete = doc(db, 'todos', todo.key);
    await deleteDoc(docToDelete);
    return todo;
  }
);

export const updateItemThunk = createAsyncThunk(
  'todofirebase/updateItem',
  async ({item, inputText}) => {
      const docToUpdate = doc(db, 'todos', item.key);
      await updateDoc(docToUpdate, {text: inputText});
      return {...item, text: inputText};
  }
)

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [],
  },
  
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(getTodosThunk.fulfilled, (state, action) => {
      state.value = action.payload
    });
    builder.addCase(addItemThunk.fulfilled, (state, action) => {
      state.value = [
        ...state.value, 
        action.payload
      ]
    });
    builder.addCase(deleteItemThunk.fulfilled, (state, action) => {
      const itemId = action.payload.key
      state.value = state.value.filter(elem=>elem.key !== itemId);
    });
    builder.addCase(updateItemThunk.fulfilled, (state, action) => {
      const newItem = action.payload;
      state.value = state.value.map(
        elem => elem.key === newItem.key ? newItem : elem
      );
    });
  }
})
export default todoSlice.reducer