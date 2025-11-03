
import {configureStore} from "@reduxjs/toolkit";
import todos from "../features/todoSlice";

export default configureStore({
  reducer: {
    todos
  },
})