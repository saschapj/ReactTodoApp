import './App.css';
import { useEffect } from 'react';
import {React,useState} from 'react';
import { FaCheckCircle, FaTrash,FaPlusCircle,FaFilter,FaSave} from 'react-icons/fa';
import SimpleStorage from "react-simple-storage";

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
        <div className="newTodoInput">
          <input value={newTodo} onChange={todoInputChange} type="text" placeholder='todo'/>
          <button className="buttonAddTodo" onClick={addTodo}><FaPlusCircle/></button>
        </div>        
        <div className="todos">          

        {!filter? <ul className="allTodos">      
              {todos.map(todo=><li key={todo.id}><span className="todoName">{todo.value}</span> <span className="buttonWrapper"><button className="buttonDelete" onClick={() => {deleteTodo(todo.id)}}><FaTrash/></button>
              <button className={todo.completed ? "buttonCompleted": "buttonComplete"} onClick={() => {completeTodo(todo.id)}}><FaCheckCircle/></button></span></li>)}
        </ul> :

         <ul className="compeltedTodos">      
              {todosCompleted.map(todo=><li key={todo.id}><span className="todoName">{todo.value}</span> <span className="buttonWrapper"><button className="buttonDelete" onClick={() => {deleteTodo(todo.id)}}><FaTrash/></button>
              <button className={todo.completed ? "buttonCompleted": "buttonComplete"} onClick={() => {completeTodo(todo.id)}}><FaCheckCircle/></button></span></li>)}
        </ul> }

          
        </div>
        <button className="buttonFilterTodo" onClick={filterForCompleted}>erledigte anzeigen<FaFilter/></button>
        <button className="buttonSaveTodo" onClick={saveTodos}>Todos speichern<FaSave/></button>
        
       
      </div>
    </div>
    </div>
  );



}

export default App;
