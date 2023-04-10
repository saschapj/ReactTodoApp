import './App.css';
import { useEffect } from 'react';
import {React,useState} from 'react';
import { FaCheckCircle, FaTrash,FaFilter,FaSave} from 'react-icons/fa';
import SimpleStorage from "react-simple-storage";
import TodoForm from './TodoForm';
import FunctionButtons from './FunctionButtons';
import Todos from './Todos';

function App() {

  const [newTodo,setNewTodo] = useState('');
  const [todos,setTodos] = useState([]);
  const[todoId,setTodoId] = useState(0);
  const[todosCompleted,setTodosCompleted] = useState([]);
  const[filter,setFilter] = useState(false);

  const todoInputChange = (e) => {
    setNewTodo(e.target.value);
  }

  useEffect(()=>{
      let todosSaved = [];
      let todosDoneSaved = [];

    if(localStorage.getItem('todosSaved')) {
       todosSaved = JSON.parse(localStorage.getItem('todosSaved'));      
      setTodos(todosSaved);
      setTodoId(todosSaved.length+todosDoneSaved.length);
      console.log('load');      
      
    }
    if(localStorage.getItem('todosDoneSaved')) {
      todosDoneSaved = JSON.parse(localStorage.getItem('todosDoneSaved'));      
      setTodosCompleted(todosDoneSaved);
      setTodoId(todosSaved.length+todosDoneSaved.length);
    }
    
  },[]);

  const addTodo = () => {
    const todoToAdd = {
      id:todoId,
      completed:false,
      value:newTodo      
    }

    if(newTodo) {
      setTodos(todos=>[...todos,todoToAdd]);
    
    setTodoId(id=>id+=1);    
    setNewTodo('');
    console.log(localStorage.getItem('todosSaved'));

    
    }
  }

  const saveTodos = () => {
    
    localStorage.setItem('todosSaved',JSON.stringify(todos));
    localStorage.setItem('todosDoneSaved',JSON.stringify(todosCompleted));
    console.log('save: ');
    console.log(localStorage.getItem('todosSaved'));
  }

  const deleteTodo = (id) => { 
    console.log(id);
    const todosWithoutDeleted = todos.filter(todo=>todo.id!==id);    
    setTodos(todosWithoutDeleted);
    localStorage.clear();
    console.log(localStorage.getItem('todosSaved'));
    localStorage.setItem('todosSaved',JSON.stringify(todosWithoutDeleted));
    console.log(localStorage.getItem('todosSaved'));
  }

  const completeTodo = (id) => {
    const lastTodoCompleted = todos.filter(todo => todo.id==id);
    const todosWithoutCompleted = todos.filter(todo=> todo.id!==id);    
    lastTodoCompleted[0].completed=true;
    setTodosCompleted(todosCompleted.concat(lastTodoCompleted[0]));
    setTodos(todosWithoutCompleted);  
    console.log(todosCompleted)      
  }

  const filterForCompleted = () => {
    if(!filter) {
      setFilter(true);
    } else {
      setFilter(false);
    }
    
  }


  return (    
    <div className="App">
    
      
    <div className="gridWrapper">      
      <div className="wrapper">
        <TodoForm newTodo={newTodo} todoInputChange={todoInputChange} addTodo={addTodo}/>
        <Todos filter={filter} todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} todosCompleted={todosCompleted}/>

        <FunctionButtons filterForCompleted={filterForCompleted} saveTodos={saveTodos}/>
       
      </div>
    </div>
    </div>
  );



}

export default App;
