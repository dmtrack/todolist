import { createSlice } from "@reduxjs/toolkit";
import config from "../../../app/config.json";
import axios from "axios";
const URL = config.apiEndpoint;

const initialState = {
  entities: [],
  loading: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    todosRequested(state) {
      state.loading = true;
    },
    getAllTodos(state, action) {
      state.entities = action.payload;
      state.loading = false;
    },
    addTodo(state, action) {
      state.entities.push({
        id: new Date().toISOString(),
        name: action.payload.name,
        description: action.payload.description,
        completed: false,
      });
      state.loading = false;
    },
    removeTodo(state, action) {
      state.entities = state.entities.filter(
        (todo) => todo.id !== action.payload
      );
    },
    toggleTodo: (state, action) => {
      const toggledTodo = state.entities.find(
        (todo) => todo.id === action.payload
      );
      toggledTodo.completed = !toggledTodo.completed;
    },
  },
});

export const { todosRequested, getAllTodos, addTodo, removeTodo, toggleTodo } =
  todoSlice.actions;

export function fetchTodos() {
  return async function (dispatch) {
    dispatch(todosRequested());
    try {
      const content = await axios.get(URL).then((data) => data);
      dispatch(getAllTodos(content.data));
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function handleRemoveTodo(id) {
  return async function (dispatch) {
    try {
      console.log(id);
      dispatch(removeTodo(id));
    } catch (error) {
      console.log(error.message);
    }
  };
}

// export function fetchTodo(id) {
//   return async function (dispatch) {
//     dispatch(todosRequested);
//     try {
//       const content = await getTodoById(id).then((data) => data.meals[0]);
//       dispatch(getTodos(content));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// }

export default todoSlice.reducer;
