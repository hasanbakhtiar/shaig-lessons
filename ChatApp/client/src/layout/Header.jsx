import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">Chat App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active"  to="/">Messages</Link>
                            </li>
                       
                        </ul>
                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Header