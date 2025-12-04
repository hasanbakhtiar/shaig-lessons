import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CurrentUserContext } from '../context/CurrentUser';

const Header = () => {
    const [user] = useContext(CurrentUserContext);
    return (
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
            <div class="container">
                <a class="navbar-brand" href="#">Chat App</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" to={"/"}>All Messages</Link>
                        </li>

                    </ul>
                    <div class="d-flex" >
                        <button class="btn btn-outline-warning">{user.fullname}</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header