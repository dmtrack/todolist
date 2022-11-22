import { createSlice } from "@reduxjs/toolkit";
import { firebaseConfig } from "../../../firebase";

import httpService from "../../../httpService";
import dayjs from "dayjs";
const URL = firebaseConfig.databaseURL;

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
      console.log(action.payload, "payload");
      state.entities.push({
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        finishDate: action.payload.finishDate,
        url: action.payload.url,
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
      const { data } = await httpService.get(`${URL}todos`);
      dispatch(getAllTodos(data));
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function handleRemoveTodo(id) {
  return async function (dispatch) {
    try {
      dispatch(removeTodo(id));
      await httpService.delete(`${URL}todos/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function handleAddTodo(data, url) {
  return async function (dispatch) {
    try {
      data.url = url;
      data.finishDate = dayjs(data.finishDate).format("DD.MM.YY");
      await dispatch(addTodo(data));
      await httpService.put(`${URL}todos/${data.id}`, data);
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function handleFinishTodo(data) {
  return async function (dispatch) {
    try {
      dispatch(toggleTodo(data.id));
      data.completed = !data.completed;
      await httpService.put(`${URL}todos/${data.id}`, data);
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default todoSlice.reducer;
