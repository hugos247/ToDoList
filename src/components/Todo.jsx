import { useReducer, useState, useEffect } from "react";
import { todoReducer } from "../functions/todo-reducer";
import { TodoList } from "./TodoList";
import { TodoAdd } from "./TodoAdd";
import { useForm } from "../functions/useForm";
import { getRandomIntInclusive } from "../functions/getRandomInt";




const Todo = () => {

    const initialState = [{
         id: getRandomIntInclusive(0,100) + 200,
         description: 'do something',
         done: false
     }];


    const { description, onInputChange, onResetForm} = useForm({
        description: '',
    });

    /*Persistencia de datos en en localStorage */
    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    /*Use Reducer */
    const [todos, dispatch] = useReducer( todoReducer ,initialState, init );
    /*Fin use Reducer */


    useEffect( () => {
        localStorage.setItem( 'todos', JSON.stringify( todos ) )
    }, [todos])

    /*Fin de Persistencia de datos en en localStorage */


    

    /* Crear */
    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch( action );
    }
    /*Fin crear */

    /* Eliminar */
    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        })
    }

    /* Fin eliminar */

    /* Tachar */
    const handleToggleTodo = ( id ) => {
        console.log( { id } );
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        })
    }
    /* Fin Tachar */
  return (
    <>
    <h1> Lista de tareas </h1>
    <hr />

    <div className="row">
        <div className="col-7">
            <TodoList 
                todos= { todos } 
                onDeleteTodo= { handleDeleteTodo }
                onToggleTodo = { handleToggleTodo }
            />
        </div>
    </div>


    <div className="col-5">
        <h4>Agregar TODO</h4>
        <hr />
        <TodoAdd 
            onNewTodo={ handleNewTodo } 
        />

    </div>

</>
  )
}

export default Todo