import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { Link, useParams } from 'react-router-dom';
import '../css/EditDB.css'


function EditDB() {
  const { cityName } = useParams();
  const [temperatureData, setTemperatureData] = useState({});
  const [editData, setEditData] = useState({});
  const [timestampToUpdate, setTimestampToUpdate] = useState(null);
  const [newTimestamp, setNewTimestamp] = useState("");
  const [newTemp, setNewTemp] = useState("");
  const [newRH, setNewRH] = useState("");
  const [newWG, setNewWG] = useState("");
  const [newWS, setNewWS] = useState("");
  const [newWD, setNewWD] = useState("");
  const [newRain, setNewRain] = useState("");
  const [newHour, setNewHour] = useState(""); 


  const fetchTemperatureData = async () => {
    try {
      const response = await fetch(`http://localhost:3003/api/cities/${cityName}`);
      if (!response.ok) {
        throw new Error('Error loading, server side');
      }
      const data = await response.json();
      setTemperatureData(data);
    } catch (error) {
      console.error('Error loading, server side:', error);
    }
  };

  useEffect(() => {
    fetchTemperatureData();
  }, [cityName]);

  const handleEdit = (time) => {
    const tempData = temperatureData[time];
    setEditData(tempData);
    setTimestampToUpdate(time);
  };

  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:3003/api/cities/${cityName}/${timestampToUpdate}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
      setEditData({});
      setTimestampToUpdate(null);
      fetchTemperatureData();
    } catch (error) {
      console.error('Error loading, server side:', error);
    }
  };

  const handleDelete = async (time) => {
    try {
      await fetch(`http://localhost:3003/api/cities/${cityName}/${time}`, {
        method: 'DELETE',
      });
      // Fetch updated data after deletion
      fetchTemperatureData();
    } catch (error) {
      console.error('Error loading, server side:', error);
    }
  };

  const handleAdd = async () => {
    const timestamp = newTimestamp + "T" + newHour + ":00";
    try {
      await fetch(`http://localhost:3003/api/cities/${cityName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [timestamp]: {
            temp: Number(newTemp),
            rh: Number(newRH),
            wg: Number(newWG),
            ws: Number(newWS),
            wd: Number(newWD),
            rain: Number(newRain),
          },
        }),
      });
      setNewTimestamp("");
      setNewHour("");
      setNewTemp("");
      setNewRH("");
      setNewWG("");
      setNewWS("");
      setNewWD("");
      setNewRain("");
      fetchTemperatureData();
    } catch (error) {
      console.error('Error loading, server side:', error);
    }
  };

  return (
    <div className='temp'>
      <div>
        {Object.entries(temperatureData).map(([time, tempData]) => (
          <div key={time}>
            <p>Time: {time}</p>
            <p>Temperature: {tempData.temp}</p>
            <p>RH: {tempData.rh}</p>
            <p>WG: {tempData.wg}</p>
            <p>WS: {tempData.ws}</p>
            <p>WD: {tempData.wd}</p>
            <p>Rain: {tempData.rain}</p>
            {timestampToUpdate === time ? (
              <>
                <input
                  type="number"
                  value={editData.temp || ""}
                  onChange={(e) => setEditData({ ...editData, temp: e.target.value })}
                />
                <input
                  type="number"
                  value={editData.rh || ""}
                  onChange={(e) => setEditData({ ...editData, rh: e.target.value })}
                />
                <input
                  type="number"
                  value={editData.wg || ""}
                  onChange={(e) => setEditData({ ...editData, wg: e.target.value })}
                />
                <input
                  type="number"
                  value={editData.ws || ""}
                  onChange={(e) => setEditData({ ...editData, ws: e.target.value })}
                />
                <input
                  type="number"
                  value={editData.wd || ""}
                  onChange={(e) => setEditData({ ...editData, wd: e.target.value })}
                />
                <input
                  type="number"
                  value={editData.rain || ""}
                  onChange={(e) => setEditData({ ...editData, rain: e.target.value })}
                />
                <button onClick={handleUpdate}>Update</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEdit(time)}>Edit</button>
                <button onClick={() => handleDelete(time)}>Delete</button>
              </>
            )}
            <hr />
          </div>
        ))}
      </div>

      <div>
        
        <h2>Add New Data</h2>
        <div>
        <input
          type="date"
          value={newTimestamp}
          onChange={(e) => setNewTimestamp(e.target.value)}
        />
          <input
            type="time"
            value={newHour}
            onChange={(e) => setNewHour(e.target.value)}
          />
        </div>
        <input
          type="number"
          placeholder="Temperature"
          value={newTemp}
          onChange={(e) => setNewTemp(e.target.value)}
        />
        <input
          type="number"
          placeholder="RH"
          value={newRH}
          onChange={(e) => setNewRH(e.target.value)}
        />
        <input
          type="number"
          placeholder="WG"
          value={newWG}
          onChange={(e) => setNewWG(e.target.value)}
        />
        <input
          type="number"
          placeholder="WS"
          value={newWS}
          onChange={(e) => setNewWS(e.target.value)}
        />
        <input
          type="number"
          placeholder="WD"
          value={newWD}
          onChange={(e) => setNewWD(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rain"
          value={newRain}
          onChange={(e) => setNewRain(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <Link key={cityName} to={`/select/${cityName}`}> <BackButton></BackButton></Link>

    </div>
  );
}

export default EditDB;
