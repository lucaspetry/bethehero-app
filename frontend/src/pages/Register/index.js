import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            name, email, whatsapp, city, state
        };

        try {
            const response = await api.post('ngos', data);
            alert(`Your access ID: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Something went wrong, try again!');
        }

    };

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt=""/>
                    <h1>Sign up</h1>
                    <p>Create your profile, sign in, and help people help your NGO.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        I already have a profile
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="NGO name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="State"
                            style={{ width: 100 }}
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Create</button>

                </form>
            </div>
        </div>
    );
}