import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoList from './components/TodoList';


TodoFeature.propTypes = {

};

function TodoFeature(props) {

    const initTodoList = [
        {
            id: 1,
            title: 'JS',
            status: 'new',
        },

        {
            id: 2,
            title: 'ReactJS',
            status: 'completed',
        },

        {
            id: 3,
            title: 'CSS',
            status: 'new',
        },
    ]

    const [todoList, setTodoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState('all');


    const handleTodoClick = (todo, idx) => {
        console.log(todo);
        const newTodoList = [...todoList];

        newTodoList[idx] = {
            ...newTodoList[idx],
            status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
        };

        setTodoList(newTodoList)

    }

    const handleShowAllClick = () => {
        setFilteredStatus('all');
    };
    const handlleShowCompletedClick = () => {

        setFilteredStatus('completed');
    };
    const handleShowNewClick = () => {
        setFilteredStatus('new');
    };

    const renderedTodoList = todoList.filter(todo => filteredStatus === 'all' || todo.status === filteredStatus);



    return (
        <div>
            <h3>TODOLIST</h3>
            <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
            <button onClick={handleShowAllClick}>Show All</button>
            <button onClick={handlleShowCompletedClick}>Show Completed</button>
            <button onClick={handleShowNewClick}>Show New </button>
        </div>
    );
}

export default TodoFeature;