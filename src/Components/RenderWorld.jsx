import { useEffect, useState } from "react";

import * as d3 from "d3";

const url = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

const RenderWorld = () => {
    const [countryData, setCountryData] = useState(null)

    useEffect(() => {
        d3.json(url).then(response => setCountryData(response))
    }, [])

    console.log(countryData)
    return (
        <>

        </>
    )
}

export default RenderWorld