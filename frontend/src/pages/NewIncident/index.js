import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const history = useHistory();
    const ngoId = localStorage.getItem('ngoId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleCreateIncident(e) {
        e.preventDefault();

        const data = {title, description, value};

        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ngoId
                }
            });
            history.push('/profile');
        } catch (err) {
            alert('Something went wrong, try again!');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt=""/>
                    <h1>New incident</h1>
                    <p>Give as many details as possible about the incident in order to find the perfect hero!</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Home
                    </Link>
                </section>
                <form onSubmit={handleCreateIncident}>
                    <input
                        type="text"
                        placeholder="Incident title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    <input
                        placeholder="Amount ($)"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Create</button>

                </form>
            </div>
        </div>
    );
}