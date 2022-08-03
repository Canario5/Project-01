import DataGen from "./DataGen"

export default function typeStats(resData) {
	if (!resData?.length > 0) return

	const allTypes = resData
		.flatMap((item) => (item.entities ? item.entities : false))
		.flatMap((entita) => (entita.type ? entita.type : false))
		.filter((type) => type)

	const obj = {}
	allTypes?.forEach((type) => {
		obj[type] ? obj[type]++ : (obj[type] = 1)
	})

	const sortedTypes = Object.entries(obj).sort((a, b) => b[1] - a[1])

	const topTypes = sortedTypes.slice(0, 10)
	// const topTypesCount = topTypes.reduce((acc, cur) => (acc = acc + cur[1]), 0)

	const restOfTypesCount = sortedTypes
		.slice(10)
		?.reduce((acc, cur) => (acc = acc + cur[1]), 0)

	const outputTop = topTypes.map((item) => new DataGen(item[0], item[1]))

	return { data01: [...outputTop, new DataGen("Other", restOfTypesCount)] }
}
