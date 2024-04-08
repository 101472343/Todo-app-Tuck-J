import React, { useState, useEffect } from 'react';
import "./App.css";

function App() {
	const [todo, setTodo] = useState([]);
	const [userID, setUserID] = useState(1);
	const [fetching, setFetching] = useState(false);
  const handleChange = (e) => {
    setUserID(e.target.value);
  };
  
	useEffect(() => {
		setFetching(true);
		console.log("test");
		fetch(`https://dummyjson.com/todos/user/${userID}`)
			.then((res) => res.json())
			.then((data) => {
				setTodo(data.todos);
				setFetching(false);
			});
	}, [userID]);

	return (
		<section>
			<header>
				<h1>Todos</h1>
			</header>
			<div>
				<label htmlFor="user">Please select an user</label>
				<select id="user" onChange={handleChange}>
					<option value="1">Arthur</option>
					<option value="2">Sarah</option>
					<option value="3">Max</option>
				</select>
			</div>
			<main>
				{fetching ? (
					<p>Loading Data</p>
				) : (
					<ul>
						{todo.map((task) => {
							return <li key={task.id}>{task.todo}</li>;
						})}
					</ul>
				)}
			</main>
		</section>
	);
}

export default App;