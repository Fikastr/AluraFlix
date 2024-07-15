import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const teamsData = {
    'mercedes': {
        drivers: [
            { name: 'Lewis Hamilton', image: 'Hamilton.jpg' },
            { name: 'George Russel', image: 'Russell.jpg' },
        ],
    },
    'red-bull': {
        drivers: [
            { name: 'Max Verstappen', image: 'Verstappen.jpg' },
            { name: 'Sergio Pérez', image: 'Perez.jpg' },
        ],
    },
    'ferrari': {
        drivers: [
            { name: 'Charles Leclerc', image: 'Leclerc.jpg' },
            { name: 'Carlos Sainz', image: 'Sainz.jpg' },
        ],
    },
    'mclaren': {
        drivers: [
            { name: 'Lando Norris', image: 'Norris.jpg' },
            { name: 'Oscar Piastri', image: 'Piastri.jpg' },
        ],
    },
    'aston-martin': {
        drivers: [
            { name: 'Fernando Alonso', image: 'Alonso.jpg' },
            { name: 'Lance Stroll', image: 'Stroll.jpg' },
        ],
    },
    'haas': {
        drivers: [
            { name: 'Nico Hulkenberg', image: 'Hulkenberg.jpg' },
            { name: 'Kevin Magnussen', image: 'Magnussen.jpg' },
        ],
    },
    'williams': {
        drivers: [
            { name: 'Logan Sargeant', image: 'Sargeant.jpg' },
            { name: 'Alexander Albon', image: 'Albon.jpg' },
        ],
    },
    'visa-cash-app': {
        drivers: [
            { name: 'Daniel Ricciardo', image: 'Ricciardo.jpg' },
            { name: 'Yuki Tsunoda', image: 'Tsunoda.jpg' },
        ],
    },
    'alpine': {
        drivers: [
            { name: 'Pierre Gasly', image: 'Gasly.jpg' },
            { name: 'Esteban Ocon', image: 'Ocon.jpg' },
        ],
    },
    'stake-f1-team-kick-sauber': {
        drivers: [
            { name: 'Zhou Guanyu', image: 'Zhou.jpg' },
            { name: 'Valtteri Bottas', image: 'Bottas.jpg' },
        ],
    },
};

function TeamDetails() {
    const { teamName } = useParams();
    const [videos, setVideos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const team = teamsData[teamName];

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);

        try {
            const response = await axios.post('/api/videos', formData);
            setVideos([...videos, response.data]);
        } catch (error) {
            console.error('Error uploading video', error);
        }
    };

    return (
        <div className={`team-details ${teamName}-border`}>
            <h1>{teamName.charAt(0).toUpperCase() + teamName.slice(1)}</h1>
            <div className="drivers">
                {team.drivers.map((driver) => (
                    <div key={driver.name} className="driver">
                        <img src={driver.image} alt={driver.name} />
                        <h2>{driver.name}</h2>
                    </div>
                ))}
            </div>
            <div className="video-list">
                <ul>
                    {videos.map((video) => (
                        <li key={video.id}>{video.title}</li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Nombre del video:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Video Title" />

                <label>Descripción del video:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Video Description"></textarea>

                <label>Archivo del video:</label>
                <input type="file" onChange={handleFileChange} accept="video/*" />

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default TeamDetails;
