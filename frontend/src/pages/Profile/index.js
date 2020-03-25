import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ngoName = localStorage.getItem('ngoName');
    const ngoId = localStorage.getItem('ngoId');

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ngoId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ngoId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ngoId
                }
            });

            setIncidents(incidents.filter(incident => incident.id != id));
        } catch (err) {
            alert('Something went wrong, try again!');
        }
    };

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt=""/>
                <span>Welcome, {ngoName}</span>
                <Link className="button" to="/incidents/new">New incident</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Registered incidents</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>INCIDENT:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>Value:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>   
                ))}
            </ul>

        </div>
    )
}