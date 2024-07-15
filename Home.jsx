import React from 'react';
import { Link } from 'react-router-dom';

const teams = [
    { name: 'Mercedes', logo: 'mercedes.png' },
    { name: 'Red Bull', logo: 'redbull.webp' },
    { name: 'Ferrari', logo: 'ferrari.png' },
    { name: 'Mclaren', logo: 'mclaren.png'},
    { name: 'Aston Martin', logo: 'aston martin.webp'},
    { name: 'Haas', logo: 'haas.png'},
    { name: 'Williams', logo: 'williams.webp'},
    { name: 'Alpine', logo: 'alpine.png'},
    { name: 'Visa Cash App', logo: 'visa.png'},
    { name: 'Stake F1 Team Kick Sauber', logo: 'stake.png'}
    
];

function Home() {
    return (
        <div className="home">
            <h1>F1 Teams</h1>
            <div className="teams">
                {teams.map((team) => (
                    <div key={team.name} className="team">
                        <Link to={`/team/${team.name.toLowerCase()}`}>
                            <img src={team.logo} alt={`${team.name} Logo`} />
                            <h2>{team.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;