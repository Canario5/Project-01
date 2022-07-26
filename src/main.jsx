import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
//import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Texts from "./routes/Texts"
import Graphs from "./routes/Graphs"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="texts" element={<Texts />} />
					<Route path="graphs" element={<Graphs />} />
					<Route
						path="*"
						element={
							<main style={{ padding: "1rem" }}>
								<p>There's nothing here!</p>
							</main>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)
