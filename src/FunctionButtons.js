
import {FaFilter,FaSave} from 'react-icons/fa';

const FunctionButtons = ({filterForCompleted,saveTodos}) => (
    <>
        <button className="buttonFilterTodo" onClick={filterForCompleted}>erledigte anzeigen<FaFilter/></button>
        <button className="buttonSaveTodo" onClick={saveTodos}>Todos speichern<FaSave/></button>
    </>
);

export default FunctionButtons;