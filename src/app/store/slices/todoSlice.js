import { createSlice } from "@reduxjs/toolkit";
import config from "../../../app/config.json";

import httpService from "../../../httpService";
import dayjs from "dayjs";
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
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        finishDate: action.payload.finishDate,
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
      const { data } = await httpService.delete(`${URL}todos/${id}`);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function handleAddTodo(data) {
  return async function (dispatch) {
    try {
      data.finishDate = dayjs(data.finishDate).format("DD.MM.YY");
      const newObj = { ...data, id: Date.now(), completed: false };
      dispatch(addTodo(newObj));
      const content = await httpService.put(`${URL}todos/${newObj.id}`, newObj);
      console.log(content);
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function handleFinishTodo(data) {
  return async function (dispatch) {
    try {
      dispatch(toggleTodo(data.id));
      console.log(data, "data");
      data.completed = !data.completed;
      const content = await httpService.put(`${URL}todos/${data.id}`, data);
    } catch (error) {
      console.log(error.message);
    }
  };
}

export default todoSlice.reducer;
