import DataGen from "./DataGen"

export default function textStats() {
	function getEntitiesCountPerString(resData) {
		return resData.map((item) => (item.entities ? item.entities.length : 0))
	}

	function wordStats(resData) {
		if (!resData?.length > 0) return

		const entitiesCountPerString = getEntitiesCountPerString(resData)
		const entitiesCount = entitiesCountPerString.reduce((acc, cur) => acc + cur, 0)

		const mergedStrings = resData
			.map((item) => item.origText)
			.join(", ")
			.replace(/[^a-zA-Z]+[\s\s]+/g, "")
			.split(" ")

		const a1 = new DataGen(
			"Words not identified as entity",
			mergedStrings.length - entitiesCount
		)
		const a2 = new DataGen("Entities detected", entitiesCount)
		const b = new DataGen("Words analyzed", mergedStrings.length)

		return { data01: [a1, a2], data02: [b] }
	}

	function stringStats(resData) {
		if (!resData?.length > 0) return

		const entitiesCountPerString = getEntitiesCountPerString(resData)
		const stringsWithEntities = entitiesCountPerString.reduce(
			(acc, cur) => (cur ? acc + 1 : acc),
			0
		)

		const stringsCount = resData?.length ?? 0

		const a1 = new DataGen("Texts without entity", stringsCount - stringsWithEntities)
		const a2 = new DataGen("Texts containing entity", stringsWithEntities)
		const b = new DataGen("Texts analyzed", stringsCount)

		return { data01: [a1, a2], data02: [b] }
	}

	return { wordStats, stringStats }
}
