import { BrowserRouter, Routes, Route } from "react-router-dom"

import Menu from "./navigation/Menu"
import TextUpload from "./routes/TextUpload"
import Graphs from "./routes/Graphs"
/* import Texts from "./routes/Texts" */

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="" element={<Menu />}>
					<Route path="/" element={<TextUpload />} />
					<Route path="graphs" element={<Graphs />} />
					{/* <Route path="texts" element={<Texts />} /> */}

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
	)
}
