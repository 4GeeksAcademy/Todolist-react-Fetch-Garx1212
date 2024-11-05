import React, { useState, useEffect } from "react";

const Home = () => {
	
	const [todos, setTodos] = useState([]) 
	const [newTodo, setNewTodo] = useState("") 


	
	function postTodo() {
		let nuevaTarea = {
			label: newTodo,
			is_done: false
		}
		console.log(nuevaTarea)
		console.log(typeof (nuevaTarea))
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
				getTodo()
			})
			.catch((error) => {
				return error
			})
	}


	function deleteTodo(id) {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
		})
			.then((respuesta) => {
				if (respuesta.status == 204) {
					getTodo()

				} else {
					console.error("Error al eliminar la tarea");
				}
			})
			.catch((error) => console.error(error));
	}


	
	function getTodo() {
		let listaTareas = {
			label: newTodo,
			isDone: false
		}
		console.log(listaTareas)
		console.log(typeof (listaTareas))
		fetch("https://playground.4geeks.com/todo/users/Garx1212", {
			method: "GET"


		})
			.then((respuesta) => {
				return respuesta.json()
			})
			.then((data) => {
				console.log(data);
				setTodos(data.todos || []);
			})
			.catch((error) => {
				return error;
			}

			)
	}

	
	function putTodo() {
		let listaTareas = {
			label: newTodo,
			isDone: false
		}
		console.log(listaTareas)
		console.log(typeof (listaTareas))
		fetch("", {
			method: "PUT",
			body: JOSN.stringify(),
			headers: {
				"Content-Type": "aplication/json"
			}

		})
			.then((respuesta) => {
				console.log(respuesta.ok); 
				console.log(respuesta.status); 
				console.log(respuesta.text); 
				return respuesta.json();  
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				return error;
			}

			)
	}

	useEffect(() => {
		getTodo()
	},
		[]
	)


	
	return (
		<div className="text-center container m-5">

    <h1 className="text-danger fw-light">Todos</h1>

    <input className="form-control" placeholder="What needs to be done?"
        value={newTodo}
        onChange={(e) => {
            setNewTodo(e.target.value);
        }}
        onKeyDown={(e) => {
            if (e.key === "Enter" && newTodo.trim()) {
                postTodo();  
                setNewTodo("");
            }
        }}
    />

    <ul className="list-group">
        {todos.length > 0 ? todos.map((item, index) => {
            return (
                <li key={index} className="list-group-item d-flex justify-content-between">
                    {item.label}
                    <button className="btn btn-danger ms-auto delete" onClick={() => deleteTodo(item.id)}>X</button>
                </li>
            )
        }) :
            <li className="list-group-item">No hay tareas</li>
        }
        <li className="list-group-item d-flex justify-content-start text-black-50">{todos.length} Item left</li>
    </ul>

</div>

	);
};

export default Home;