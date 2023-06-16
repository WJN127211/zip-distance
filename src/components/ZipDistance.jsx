import React, {useState,useEffect} from "react";
import axios from "axios";


const ZipDistance = ()=>{
    const[zipCode,setzipCode] = useState('');
    const[zipCode2,setzipCode2] = useState('');
    //const[cityData,setcityData]=useState('');
    const[cityDistance,setCityDistance]=useState('');
    const[historyArray, setarray] = useState([]);
    const[units, setUnits] = useState('mi');

   
        const handleSubmit=async(event)=>{
            event.preventDefault();
            try {
                const response = await axios.get(`https://zip-api.eu/api/v1/distance/US-${zipCode}/US-${zipCode2}/${units}`);
                console.log(response);
                setCityDistance(response.data);
                console.log(cityDistance);
                setarray([...historyArray, response.data.distance + units]);
                console.log(historyArray);
            } catch (error) {
                console.log(error);
            }
        }

        const changeToKM=async(event)=>{
            setUnits('km'); 
        }
        const changeToMI=async(event)=>{
            setUnits('mi');
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
            <button className="buttonKM" onClick={changeToKM}>Change for KM</button>
            <button className="butttonMI" onClick={changeToMI}>Change for MI</button>
            <p>Press submit again after changing units</p>
            <h1>Distance Between The Two ZipCode:</h1>
            <p>{historyArray[historyArray.length-1]}</p>
            <div>
                <h1>History of Distances Between ZipCodes:</h1>
                {historyArray.map ( (zipHistory, index) => { return <p key={index}>{zipHistory} </p> })}
            </div>
        </div>

    );

};

export default ZipDistance;