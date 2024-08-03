//import logo from './logo.svg';
import "./App.css";
import TodoList from "./componnts/TodoList";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";



const initialTodos = [
  {
    id: uuidv4(),
    title: "",
    isCompeted: false,
    details: "",
  },
  {
    id: uuidv4(),
    title: "",
    isCompeted: false,
    details: "",
  },
  {
    id: uuidv4(),
    title: "",
    isCompeted: false,
    details: "",
  },
];


function App() {

  const [todos, setTodos] = useState(initialTodos);
   
  //const [titleInput, setTitleInput] = useState("");
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:"rgb(207 181 232)",
        height:"100vh",
        width:"100wh",
      }}
    ><TodosContext.Provider value={{ todos ,setTodos}}>
         <TodoList />
    </TodosContext.Provider>
     
    </div>
  );
}

export default App;
