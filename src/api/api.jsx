export default async function getData(formData) {
	try {
		const myHeaders = new Headers()
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
		myHeaders.append(
			"X-TextRazor-Key",
			"cc2876fc88ae2890241698873d8701611336d5155c2f61783b96c51c"
		)

		const urlencoded = new URLSearchParams()
		urlencoded.append("text", formData)
		urlencoded.append("extractors", "entities")

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: urlencoded,
			redirect: "follow",
		}

		const res = await fetch("/api/", requestOptions)

		if (res.status === 413)
			console.log(`The request was too large (Up to 200kb may be processed per request).`)
		if (!res.ok) throw new Error(`This is an HTTP error: ${res.status}`)

		console.log(res)

		const returnedData = await res.json()

		/* const matchDates = new Map(
				data.dates.map((day) => {
					const matchesPerDay = { home: [], away: [] }
					day.games.forEach((gamePlayed) => {
						matchesPerDay.home = [...matchesPerDay.home, gamePlayed.teams.home.team.id]
						matchesPerDay.away = [...matchesPerDay.away, gamePlayed.teams.away.team.id]
					})

					return [day.date, matchesPerDay]
				})
			) */

		/* localStorage.setItem("schedule", JSON.stringify([...matchDates])) */

		return returnedData
	} catch (err) {
		console.log(err)
	}
}
