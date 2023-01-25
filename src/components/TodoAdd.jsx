import { useState } from "react";
import {useForm} from '../functions/useForm'
import { getRandomIntInclusive } from "../functions/getRandomInt";



export const TodoAdd = ({ onNewTodo }) => {

  const { description, onInputChange, onResetForm} = useForm({
    description: '',
  });

/* Evento para manejar el formulario */
  const onFormSubmit = ( event ) => {
    event.preventDefault();

    if ( description.length <= 1) return;

    const newTodo = {
        id: getRandomIntInclusive(0,100) + 1,
        done:false,
        description: description,
    }

    onNewTodo(newTodo);
    onResetForm();

}

  return (
    <form onSubmit={ onFormSubmit }>
      <input 
        type="text" 
        placeholder='Agregar tarea' 
        className='form-control' 
        name='description'
        value={ description }
        onChange={ onInputChange }
      />
    <button type='submit' className='btn btn-outline-primary-mt-1'>Agregar</button>
    {/* Fin TodoAdd*/}
    </form>
  )
}
