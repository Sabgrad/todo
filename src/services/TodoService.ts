import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import { ITodos } from '../models/ITodos';
import { ITodosCategories } from '../models/ITodosCategories';


export const todoApi = createApi({
    reducerPath: 'todoAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Todo'],
    endpoints: (build) => ({
        fetchAllTodos: build.query<ITodos[], number>({
            query: (limit: number) => ({
                url: '/todos',
                params: {
                    _limit: limit,
                }
            }),
            providesTags: result => ['Todo']
        }),
        createTodo: build.mutation<ITodos, ITodos>({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        updateTodo: build.mutation<ITodos, ITodos>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTodo: build.mutation<ITodos, ITodos>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todo']
        }),
        fetchTodosByCategoty: build.query<ITodos[], string>({
            query: (category: string) => ({
                url: '/todos',
                params: {
                    category: category
                }
            }),
            providesTags: result => ['Todo']
        })
    })
})

export const todoCategoriesApi = createApi({
    reducerPath: 'todoCategoriesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['TodoCategories'],
    endpoints: (build) => ({
        fetchAllCategories: build.query<ITodosCategories[], number>({
            query: (limit: number) => ({
                url: '/todosCategories',
            }),
            providesTags: result => ['TodoCategories']
        }),
        createProject: build.mutation<ITodosCategories, ITodosCategories>({
            query: (category) => ({
                url: '/todosCategories',
                method: 'POST',
                body: category
            }),
            invalidatesTags: ['TodoCategories']
        })
    })
})