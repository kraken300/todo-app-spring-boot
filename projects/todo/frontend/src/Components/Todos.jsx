import React, { useEffect, useState } from 'react';
import { useTodoContext } from '../Context/TodoContextProvider';

const Todos = () => {

    let { todos, addTodo, message, updateTodo, deleteTodo, handleCheckBox } = useTodoContext();

    let [input, setInput] = useState({
        title: "",
        content: "",
        isCompleted: false
    });

    let [isUpdateTodo, setIsUpdateTodo] = useState(false);

    let handleChange = (e) => {
        let { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        addTodo(input);
        setInput({
            title: "",
            content: "",
            isCompleted: false
        });
    }

    let handleUpdateTodo = (todo) => {
        // console.log(todo);
        setInput({
            id: todo.id,
            title: todo.title,
            content: todo.content,
            isCompleted: todo.isCompleted
        });
        setIsUpdateTodo(true);
    }

    let handleUpdate = (e) => {
        e.preventDefault();
        updateTodo(input);
        setInput({
            title: "",
            content: "",
            isCompleted: false
        });
        setIsUpdateTodo(false);
    }
    // console.log(input);

    return (
        <>
            <h3>{message && message}</h3>
            <h1 className="text-4xl text-orange-400 text-center my-4">Todos</h1>

            <div className="container mx-auto">

                <form className='border-2 p-4 text-center w-4/5 mx-auto rounded flex  flex-col md:w-1/2'>
                    <input type="text" name="title" id="title" placeholder='Enter title' value={input.title} onChange={handleChange} className='border rounded w-full p-1' required /> <br />

                    <input type="text" name="content" id="content" placeholder='Enter content' value={input.content} onChange={handleChange} className='border rounded w-full p-1' required /> <br />

                    {
                        isUpdateTodo ?
                            (
                                <button type="submit" className='bg-blue-500 p-2 rounded text-white hover:bg-blue-600 cursor-pointer' onClick={handleUpdate}>Update Todo</button>
                            ) :
                            (
                                <button type="submit" className='bg-emerald-500 p-2 rounded text-white hover:bg-emerald-600 cursor-pointer' onClick={handleSubmit}>Add Todo</button>
                            )
                    }


                </form>

                <div className="grid grid-cols-2 md:grid-cols-4">
                    {
                        todos?.map((todo, index) => {
                            let { id, title, content, isCompleted, createdAt, updatedAt } = todo;
                            return (
                                <section key={id} className='border-2 m-2 p-4 rounded-md'>
                                    <h2 className="font-bold text-3xl text-emerald-400">{id}</h2>
                                    <h2 className="text-2xl font-bold">{title}</h2>
                                    <h3>{content}</h3>
                                    <h3>
                                        {isCompleted ? "true" : "false"}
                                        <input type="checkbox" name="task" id="task" checked={isCompleted} onChange={() => handleCheckBox(id)} />
                                    </h3>
                                    <h3>{createdAt}</h3>
                                    <h3>{updatedAt}</h3>
                                    <button type="button" onClick={() => handleUpdateTodo(todo)} className='bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-600 cursor-pointer'>Update</button>

                                    <button type="button" onClick={() => deleteTodo(id)} className='bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 cursor-pointer'>Delete</button>
                                </section>
                            )
                        })
                    }
                </div>
            </div >
        </>
    )
}

export default Todos;
