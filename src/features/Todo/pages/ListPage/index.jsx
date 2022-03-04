import queryString from 'query-string';
import React, { useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useEffect, useMemo } from 'react/cjs/react.development';
import TodoList from '../../components/TodoList';



ListPage.propTypes = {

};

function ListPage(props) {

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

    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [todoList, setTodoList] = useState(initTodoList);
    const [filteredStatus, setFilteredStatus] = useState(() => {
        const params = queryString.parse(location.search);

        return params.status || 'all'
    });

 
    useEffect(() => {
        const params = queryString.parse(location.search);

        setFilteredStatus(params.status || 'all'); 
    }, [location.search])

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
        // setFilteredStatus('all');
        const queryParams = { status: 'all'};

        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams), 
        }
        )
    };
    const handlleShowCompletedClick = () => {
        // setFilteredStatus('completed');

        const queryParams = { status: 'completed'};

        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams), 
        }
        )
    };
    const handleShowNewClick = () => {
        // setFilteredStatus('new');

        const queryParams = { status: 'new'};

        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams), 
        }
        )
    };

    const renderedTodoList = useMemo(() => { 
        return todoList.filter(todo => filteredStatus === 'all' || todo.status === filteredStatus)
        }, [todoList, filteredStatus])



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

export default ListPage;