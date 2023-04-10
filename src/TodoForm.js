import {FaPlusCircle} from 'react-icons/fa';

const TodoForm = ({newTodo,todoInputChange,addTodo}) => (


    <div className="newTodoInput">
          <input value={newTodo} onChange={todoInputChange} type="text" placeholder='todo'/>
          <button className="buttonAddTodo" onClick={addTodo}><FaPlusCircle/></button>
    </div>    
    
    
);

export default TodoForm;