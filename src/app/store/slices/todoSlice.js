import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: null,
  loading: false,
};

const todoSlice = createSlice({
  name: "todos",
  loading: false,
  initialState: initialState,
  reducers: {
    todosRequested(state) {
      state.loading = true;
    },
    getAllTodos(state, action) {
      state.entities = action.payload;
      state.loading = false;
    },
    getTodo(state, action) {
      state.entities = action.payload;
      state.loading = false;
    },
  },
});

export const { todosRequested, getAllTodos, getTodo } = todoSlice.actions;

export function fetchTodos() {
  return async function (dispatch) {
    dispatch(todosRequested());
    try {
      const content = await getAllTodos().then((data) => data);
      dispatch(getAllTodos(content));
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

export const getAllList = () => (state) => state.todos.entities;
export const getTodosIsLoading = () => (state) => state.todos.loading;

export default todoSlice.reducer;
