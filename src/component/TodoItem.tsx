import React, { FC } from 'react'
import { ITodos } from '../models/ITodos';
import '../styles/TodoItem.css'

interface TodoItemProps {
    todo: ITodos;
    remove: (todo: ITodos) => void;
    update: (todo: ITodos) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, remove, update }) => {

    const handleRemoveTodo = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(todo)
    }

    const handleUpdateTodo = (event: React.MouseEvent) => {
        const title = prompt() || ''
        update({ ...todo, title })
    }

    const handleCompletedTodo = (event: React.MouseEvent) => {
        event.stopPropagation()
        const status = !todo.completed;
        update({ ...todo, completed: status })
    }

    const priority = todo.priority

    return (
        <div className='TodoItem'>
            <div className='priority'
                style={{
                    borderColor: priority === 3 ? 'red' :
                        priority === 2 ? 'yellow' :
                            priority === 1 ? 'green' : 'grey'
                }}
            />
            <div className='text'>
                <span>
                    {todo.title}.
                </span>
                <div onClick={handleCompletedTodo}>
                    {todo.completed ? '✔️' : '\u274C'}
                </div>
            </div>
            <button className='btn_update' onClick={handleUpdateTodo}>Change</button>
            <button className='btn_delete' onClick={handleRemoveTodo}>Dellete</button>
        </div>
    )
}

export default TodoItem;
