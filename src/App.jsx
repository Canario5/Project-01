import { useState, useRef, useEffect } from "react"
import { Outlet } from "react-router-dom"

import AppRouter from "./AppRouter"

import "./App.css"

export default function App() {
	return (
		<div className="App">
			<AppRouter />
		</div>
	)
}
