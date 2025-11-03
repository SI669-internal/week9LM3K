
import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [
      { text: 'Get costume', key: Date.now() },
      { text: 'Get candy', key: Date.now() + 1}
    ],
  },
  
  reducers: {
    addItem: (state, action) => {
      const newListItem = {
        text: action.payload,
        key: Date.now() + Math.random()
      };

      state.value = [
        ...state.value,
        newListItem
      ];
    },
    updateItem: (state, action) => {
      const {item, inputText} = action.payload
      const newItem = {
        text: inputText,
        key: item.key
      };

      state.value = state.value.map(
        elem => elem.key === newItem.key ? newItem : elem
      )
    },
    deleteItem: (state, action) => {
      const itemId = action.payload.key
      state.value = state.value.filter(elem=>elem.key !== itemId);
    },
  },
})

export const { addItem, updateItem, deleteItem } = todoSlice.actions
export default todoSlice.reducer