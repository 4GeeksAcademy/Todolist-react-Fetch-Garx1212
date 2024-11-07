import React, { useState, useEffect } from "react";

const Home = () => {
    
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    function postTodo() {
        let nuevaTarea = {
            label: newTodo,
            is_done: false
        };
        console.log(nuevaTarea);
        console.log(typeof (nuevaTarea));
        fetch("https://playground.4geeks.com/todo/todos/Garx1212", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(nuevaTarea),
        })
            .then((respuesta) => {
                return respuesta.json();
            })
            .then((data) => {
                console.log(data);
                getTodo();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function deleteTodo(id) {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
        })
            .then((respuesta) => {
                if (respuesta.status === 204) {
                    getTodo();
                } else {
                    console.error("Error al eliminar la tarea");
                }
            })
            .catch((error) => console.error(error));
    }

    function createUser() {
        let user = {
            todos: []
        };
        fetch("https://playground.4geeks.com/todo/users/Garx1212", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then((respuesta) => {
                if (respuesta.status === 201) {
                    console.log("Usuario creado");
                    getTodo();
                } else {
                    console.error("Error al crear el usuario");
                }
            })
            .catch((error) => console.error(error));
    }

    function getTodo() {
        fetch("https://playground.4geeks.com/todo/users/Garx1212", {
            method: "GET"
        })
            .then((respuesta) => {
                if (respuesta.ok) {
                    return respuesta.json();
                } else {
                    throw new Error("Usuario no encontrado");
                }
            })
            .then((data) => {
                console.log(data);
                setTodos(data.todos || []);
            })
            .catch((error) => {
                console.error(error);
                createUser();
            });
    }

    useEffect(() => {
        getTodo();
    }, []);

    return (
        <div className="text-center container m-5">
            <h1 className="text-danger fw-light">Todos</h1>
            <input
                className="form-control"
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && newTodo.trim()) {
                        postTodo();
                        setNewTodo("");
                    }
                }}
            />
            <ul className="list-group">
                {todos.length > 0 ? (
                    todos.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between item-task">
                            {item.label}
                            <button className="btn btn-danger delete-button" onClick={() => deleteTodo(item.id)}>X</button>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No hay tareas</li>
                )}
                <li className="list-group-item d-flex justify-content-start text-black-50">{todos.length} Item left</li>
            </ul>
            <button className="btn btn-danger mt-3" onClick={() => setTodos([])}>Eliminar todas las tareas</button>
        </div>
    );
};

export default Home;
