import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Menu from "./navigation/Menu"
import TextUpload from "./routes/TextUpload"
import Graphs from "./routes/Graphs"
import Dashboard from "./routes/Dashboard"
/* import Texts from "./routes/Texts" */

export default function AppRouter() {
	const [responseText, setResponseText] = useState()
	return (
		<BrowserRouter>
			<Menu />
			<Routes>
				{/* prettier-ignore */}
				<Route path="/"	element={<TextUpload responseText={responseText} setResponseText={setResponseText} />}/>
				<Route path="graphs" element={<Graphs responseText={responseText} />} />
				<Route path="dashboard" element={<Dashboard responseText={responseText} />} />
				{/* <Route path="texts" element={<Texts />} /> */}

				<Route
					path="*"
					element={
						<main style={{ padding: "1rem" }}>
							<p>There's nothing here!</p>
						</main>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}
