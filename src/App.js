import { useEffect, useState } from "react"
import {get, getOwn} from "./api"
import validateIp from "./utils"
import Map from "./comps/Map"
import Item from "./comps/Item"

const dataInitState = {
	ip: '',
	loc: '',
	tzone: '',
	isp: ''
}

function App() {
	let [coord, setCoord] = useState([0, 0])
	let [name, setName] = useState('')
	let [text, setText] = useState('')
	let [otherData, setOtherData] = useState(dataInitState)

	const handleChange = (evt) => {
		setText(evt.target.value.trim())
	}

	const setData = async (data) => {
		const locData = data['location']
		const lat = locData['lat']
		const long = locData['lng']
		const loc =  `${locData['region']}, ${locData['city']} ${locData['postalCode']}`

		console.log(locData)
		setCoord([lat, long])
		setName(data['as']['name'])
		setOtherData({
			ip: data['ip'],
			loc: loc,
			tzone: locData['timezone'],
			isp: data['as']['name']
		})
	}

	const searchClicked = async () => {
		if (!validateIp(text)) {
			alert(`The given ip '${text}' not invalid`)
			return
		}
		setData(await get(text))
	}

	useEffect(async () => setData(await getOwn()), [])

	return ( 
		<main>
			<div className="input-wrapper">
				<p>IP Address Tracker</p>
				<input type="text" onChange={handleChange} placeholder="Search for any IP address or domain" />
				<button onClick={searchClicked}>test</button>
			</div>

			<div className="info">
				<Item label="IP ADRESS" content={otherData.ip} />
				<Item label="LOCATION" content={otherData.loc} />
				<Item label="TIMEZONE" content={otherData.tzone} />
				<Item label="ISP" content={otherData.isp} />
			</div>
			<Map coord={coord} name={name} />
			<button>Full screen icon</button>
		</main>
	)
}

export default App;
