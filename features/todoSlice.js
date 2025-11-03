
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const addItemThunk = createAsyncThunk(
  'todothunks/addItem',
  async (todoText) => {
    const newListItem = {
      text: todoText,
      key: Date.now() + Math.random()
    };
    // We can assemble the new list item, but we can't update the redux state here.
    // This becomes action.payload 👇
    return newListItem
  }
);

export const deleteItemThunk = createAsyncThunk(
  'todofirebase/deleteItem',
  async (todo) => {
    return todo
  }
);

export const updateItemThunk = createAsyncThunk(
  'todofirebase/updateItem',
  async ({item, inputText}) => {
      const newItem = {
        text: inputText,
        key: item.key
      };
      return newItem;
  }
)

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [
      { text: 'Get costume', key: Date.now() },
      { text: 'Get candy', key: Date.now() + 1}
    ],
  },
  
  reducers: {
  },

  extraReducers: (builder) => {
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