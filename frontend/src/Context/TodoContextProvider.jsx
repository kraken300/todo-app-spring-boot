import { useContext, useEffect, useState } from "react";
import { TodoContext } from "./TodoContext"
import { toast } from "react-toastify";

export const TodoContextProvider = ({ children }) => {

    let [todos, setTodos] = useState(null);

    // let [message, setMessage] = useState("");

    useEffect(() => {
        let fetchData = async () => {
            try {
                let response = await fetch("http://localhost:8080/todo/getall");

                if (response.ok) {
                    let data = await response.json();
                    console.log(data);
                    setTodos(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const addTodo = async (newTodo) => {
        try {
            let response = await fetch("http://localhost:8080/todo/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo)
            });

            if (response.ok) {
                let data = await response.json();
                console.log(data);
                let addedTodo = [...todos, data.todo];
                setTodos(addedTodo);
                // setMessage(data.message);
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateTodo = async (updatedTodo) => {

        let { id, title, content, isCompleted } = updatedTodo;

        try {
            let response = await fetch(`http://localhost:8080/todo/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, content, isCompleted })
            });

            if (response.ok) {
                let data = await response.json();
                let addedTodo = todos.map((todo) => (todo.id === data.todo.id) ? data.todo : todo);
                setTodos(addedTodo);
                // setMessage(data.message);
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTodo = async (id) => {
        try {
            let response = await fetch(`http://localhost:8080/todo/delete/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                let data = await response.json();
                let addedTodo = todos.filter((todo) => todo.id != id);
                setTodos(addedTodo);
                // setMessage(data.message);
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckBox = async (id) => {
        try {
            let response = await fetch(`http://localhost:8080/todo/updateCheck/${id}`, {
                method: "PUT"
            });

            if(response.ok){
                let data = await response.json();
                   let addedTodo = todos.map((todo) => (todo.id === data.todo.id) ? data.todo : todo);
                setTodos(addedTodo);
                // setMessage(data.message);
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const value = { todos, setTodos, addTodo, updateTodo, deleteTodo, handleCheckBox };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodoContext = () => {
    return useContext(TodoContext);
}