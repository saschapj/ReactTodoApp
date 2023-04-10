import { FaCheckCircle, FaTrash} from 'react-icons/fa';

const Todos = ({filter,todos,deleteTodo,completeTodo,todosCompleted}) => (

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
);

export default Todos;