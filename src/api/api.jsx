export default async function getData(rawData) {
	try {
		var myHeaders = new Headers()
		myHeaders.append(
			"X-TextRazor-Key",
			"cc2876fc88ae2890241698873d8701611336d5155c2f61783b96c51c"
		)
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

		var urlencoded = new URLSearchParams()
		urlencoded.append(
			"text",
			"Spain's stricken Bankia expects to sell off its vast portfolio of industrial holdings that includes a stake in the parent company of British Airways and Iberia."
		)
		urlencoded.append("extractors", "entities")

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: urlencoded,
			redirect: "follow",
		}

		const res = await fetch("https://api.textrazor.com", requestOptions)
		/* .then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error)) */

		/* const res = await fetch("http://api.textrazor.com", {
			method: "POST",
			// mode: "no-cors",
			body: JSON.stringify({
				extractors: "entities",
				//	apiKey: "cc2876fc88ae2890241698873d8701611336d5155c2f61783b96c51c",
				text: "Spain's stricken Bankia expects to sell off its vast portfolio of industrial holdings that includes a stake in the parent company of British Airways and Iberia.",
				// text: rawData,
			}),
			headers: {
				//"Accept-encoding": "gzip",
				Host: "localhost:5173",
				"X-TextRazor-Key": "cc2876fc88ae2890241698873d8701611336d5155c2f61783b96c51c",
				"Content-type": "application/x-www-form-urlencoded", //application/x-www-form-urlencoded "application/json; charset=UTF-8"
			},
			redirect: "follow",
			//referrer: "http://api.textrazor.com",
		}) */

		if (res.status === 413)
			console.log(`The request was too large (Up to 200kb may be processed per request).`)
		if (!res.ok) throw new Error(`This is an HTTP error: ${res.status}`) // Není třeba v async try?

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
		console.log(err.message)
	}
}
