import { Routes, Route, Link } from "react-router-dom"

import { useState } from "react"
import reactLogo from "./assets/react.svg"
import "./App.css"
/* import { Button } from "react-bootstrap" */
import Button from "react-bootstrap/Button"

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

export default function App() {
	const [count, setCount] = useState(0)

	const data = [
		{ name: "Page A", uv: 400, pv: 2400, amt: 2400 },
		{ name: "Page B", uv: 210, pv: 1000, amt: 2400 },
		{ name: "Page c", uv: 325, pv: 2400, amt: 2400 },
	]

	const renderLineChart = (
		<LineChart
			width={800}
			height={300}
			data={data}
			margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
		>
			<Line type="monotone" dataKey="uv" stroke="#8884d8" />
			<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
		</LineChart>
	)

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="about" element={<About />} />
			</Routes>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src="/vite.svg" className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
			<Button variant="primary">Primary</Button>{" "}
			<Button variant="secondary">Secondary</Button>{" "}
			<Button variant="success">Success</Button> <Button variant="warning">Warning</Button>{" "}
			<Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{" "}
			<Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{" "}
			<Button variant="link">Link</Button>
			{renderLineChart}
		</div>
	)
}

/* export default App */

function Home() {
	return (
		<>
			<main>
				<h2>Welcome to the homepage!</h2>
				<p>You can do this, I believe in you.</p>
			</main>
			<nav>
				<Link to="/about">About</Link>
			</nav>
		</>
	)
}

function About() {
	return (
		<>
			<main>
				<h2>Who are we?</h2>
				<p>That feels like an existential question, don't you think?</p>
			</main>
			<nav>
				<Link to="/">Home</Link>
			</nav>
		</>
	)
}
