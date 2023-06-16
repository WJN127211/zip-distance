import React, {useState,useEffect} from "react";
import axios from "axios";


const ZipDistance = ()=>{
    const[zipCode,setzipCode] = useState('');
    const[zipCode2,setzipCode2] = useState('');
    //const[cityData,setcityData]=useState('');
    const[cityDistance,setCityDistance]=useState('');

   
        const handleSubmit=async(event)=>{
            event.preventDefault();
            try {
                const response = await axios.get(`https://zip-api.eu/api/v1/distance/US-${zipCode}/US-${zipCode2}/mi`);
                console.log(response);
                setCityDistance(response.data);
                console.log(cityDistance);
            } catch (error) {
                console.log(error);
            }
        }
        
    

    return(
        <div className="zipSearch">
            <form onSubmit={handleSubmit}>
                <label>
                    Please Enter First Zip Code:
                    <input type="text" value={zipCode} onChange={(e)=>setzipCode(e.target.value)}/>
                </label>
                <br />
                <label>
                    Please Enter Second Zip Code:
                    <input type="text" value={zipCode2} onChange={(e)=>setzipCode2(e.target.value)}/>
                </label>
                <br />
                <input type="submit" value="submit"/>
            </form>
            <h1>Distance Between The Two ZipCode:</h1>
            <p>{cityDistance.distance} Miles</p>
        </div>

    );

};

export default ZipDistance;