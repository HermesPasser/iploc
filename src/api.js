const KEY = ''
const API = `https://geo.ipify.org/api/v1?apiKey=${KEY}`
const MOCKING = false

async function _get(ip) {
    const response = await fetch(`${API}&ipAddress=${ip}`)
    if (!response)
        return null
    const data = response.json()
    return data
}

async function _getMock(ip) {
    return {"ip":"8.8.8.8","location":{"country":"US","region":"California","city":"Mountain View","lat":37.38605,"lng":-122.08385,"postalCode":"94035","timezone":"-07:00","geonameId":5375480},"domains":["0--9.ru","000180.top","00049ok.com","000xs.net","001998.com.he2.aqb.so"],"as":{"asn":15169,"name":"Google LLC","route":"8.8.8.0\/24","domain":"https:\/\/about.google\/intl\/en\/","type":"Content"},"isp":"Google LLC","proxy":{"proxy":false,"vpn":false,"tor":false}}
}

export default async function get(ip) {
    return MOCKING? await _getMock(ip) : await _get(ip)
}

 