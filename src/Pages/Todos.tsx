import React, { Dispatch, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { todoApi, todoCategoriesApi } from '../services/TodoService';
import s from '../styles/Todos.module.css';
import TodoItem from '../component/TodoItem';
import { ITodos } from '../models/ITodos';
import Modal from '../component/UI/ModalWidnow/Modal';
import { currentCategorySlice } from '../store/reducers/CurrentCategotySlice';
import moment from 'moment';

const priorityOption = [
    { value: 0, title: 'Priority 1' },
    { value: 1, title: 'Priority 2' },
    { value: 2, title: 'Priority 3' },
    { value: 3, title: 'Priority 4' }
]

const Todos = () => {

    const [activeDropDown, setActiveDropDown] = useState<boolean>(false)
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [todoTitleCreate, setTodoTitleCreate] = useState<string>('')
    const [todoDescriptionCreate, setTodoDescriptionCreate] = useState<string>('')
    const [todoPriorityCreate, setTodoPriorityCreate] = useState<number | string>(0)

    const { currentCategory } = useAppSelector(state => state.currentCategotyReducer)
    const { changeCurrentCategory } = currentCategorySlice.actions;
    

    const { data: todos, error, isLoading } = currentCategory === "All" ?
        todoApi.useFetchAllTodosQuery(100) :
        todoApi.useFetchTodosByCategotyQuery(currentCategory);

    const [createTodo, { }] = todoApi.useCreateTodoMutation()
    const [updateTodo, { }] = todoApi.useUpdateTodoMutation()
    const [deleteTodo, { }] = todoApi.useDeleteTodoMutation()

    const handleCreateTodo = async () => {
        const title = todoTitleCreate;
        const completed = false;
        const category = currentCategory === "All" ? "Inbox" : currentCategory;
        const description = todoDescriptionCreate;
        const priority = +todoPriorityCreate;
        await createTodo({ title, completed, category, description, priority } as ITodos);
        setTodoTitleCreate('');
        setTodoDescriptionCreate('');
        setTodoPriorityCreate(0);
    }

    const handleRemoveTodo = (todo: ITodos) => {
        deleteTodo(todo)
    }

    const handleUpdateTodo = (todo: ITodos) => {
        updateTodo(todo)
    }

    const handleOpenModal = () => {
        setActiveModal(true)
    }

    const sortedTodos = useMemo(() => {
        const sortedTodos = todos?.slice()
        sortedTodos?.sort((a, b) => a.priority > b.priority ? -1 : 1)
        return sortedTodos
    }, [todos])

    return (
        <div className={s.Todos}>
            <button onClick={handleOpenModal}> + Add new todo</button>
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>Error</h1>}
            {sortedTodos && sortedTodos.map(todo =>
                <TodoItem remove={handleRemoveTodo} update={handleUpdateTodo} key={todo.id} todo={todo} />
            )}
            <Modal active={activeModal} setActive={setActiveModal}>
                <input onChange={(e) => setTodoTitleCreate(e.target.value)}
                    id='create-todo-title'
                    type='text' value={todoTitleCreate}
                    placeholder='Name'
                />
                <input onChange={(e) => setTodoDescriptionCreate(e.target.value)}
                    id='create-todo-description'
                    type='text' value={todoDescriptionCreate}
                    placeholder='Description'
                />
                <span>{currentCategory}</span>
                <select value={todoPriorityCreate} onChange={(e) => setTodoPriorityCreate(e.target.value)}>
                    {priorityOption.map(option =>
                        <option key={option.value} value={option.value}>{option.title}</option>
                    )}
                </select>
                <button onClick={handleCreateTodo}>Create a task</button>
            </Modal>
        </div>
    )
}

export default Todos;