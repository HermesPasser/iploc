import { useEffect, useState } from "react"
import {get, getOwn} from "./api"
import validateIp from "./utils"
import Map from "./comps/Map"

function App() {
	let [coord, setCoord] = useState([0, 0])
	let [name, setName] = useState('')
	let [text, setText] = useState('')

	const handleChange = (evt) => {
		setText(evt.target.value.trim())
	}

	const setData = async (data) => {
		const lat = data['location']['lat']
		const long = data['location']['lng']

		setCoord([lat, long])
		setName(data['as']['name'])
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
				<div>
					<p>IP ADRESS</p>
					<p>none</p>
				</div>
				<div>
					<p>LOCATION</p>
					<p>none</p>
				</div>
				<div>
					<p>TIMEZONE</p>
					<p>none</p>
				</div>
				<div>
					<p>ISP</p>
					<p>none</p>
				</div>

			</div>
			<Map coord={coord} name={name} />
			<button>Full screen icon</button>
		</main>
	)
}

export default App;
