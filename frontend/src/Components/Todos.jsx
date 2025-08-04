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

            <div className="container mx-aut dark:bg-gray-300 max-w-full min-h-screen">

                <h1 className="text-4xl text-orange-400 text-center py-4">Todos</h1>

                <form className='border-2 p-4 text-center w-4/5 mx-auto rounded flex flex-col md:w-1/2'>
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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-4/5 mx-auto mt-4">
                    {
                        todos?.map((todo, index) => {
                            let { id, title, content, isCompleted, createdAt, updatedAt } = todo;
                            return (
                                <section key={id} className='border-2 m-2 p-4 rounded-md dark:bg-gray-200'>
                                    {/* <h2 className="font-bold text-3xl text-emerald-400">{id}</h2> */}
                                    <h2 className={`text-2xl font-bold ${isCompleted && "line-through"}`}>{title}</h2>

                                    <p className={`text-lg ${isCompleted && "line-through"}`}>{content}</p>
                                    {/* 
                                    <h3>
                                        {isCompleted ? "true" : "false"}
                                        <input type="checkbox" name="task" id="task" checked={isCompleted} onChange={() => handleCheckBox(id)} />
                                    </h3> */}



                                    <p className='text-sm text-slate-600'>Created : {new Date(createdAt).toLocaleString("en-IN", { timeZone: 'Asia/Kolkata' })}</p>

                                    <p className='text-sm text-slate-600'>Updated : {new Date(updatedAt).toLocaleString("en-IN", { timeZone: 'Asia/Kolkata' })}</p>

                                    <button type="button" onClick={() => handleUpdateTodo(todo)} className={`${isCompleted ? "bg-black" : "bg-blue-500 hover:bg-blue-600"} px-2 py-1 rounded text-white  cursor-pointer mr-2`} disabled={isCompleted}>Update</button>

                                    <button type="button" onClick={() => deleteTodo(id)} className={`${isCompleted ? "bg-black" : "bg-red-500 hover:bg-red-600"} px-2 py-1 rounded text-white  cursor-pointer my-2`} disabled={isCompleted}>Delete</button>

                                    <br />
                                    <div className="inline-flex items-center">
                                        <label className="flex items-center cursor-pointer relative">
                                            <input type="checkbox" name="task" id="task" checked={isCompleted} onChange={() => handleCheckBox(id)} className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-800 checked:bg-slate-800 checked:border-slate-800" />
                                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                </svg>
                                            </span>
                                        </label>
                                    </div>
                                    <p className='inline-flex ml-1 align-text-bottom'>{isCompleted ? "Task Completed" : "Task Incomplete"}</p>
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
