import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Home = ({ socket }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("user", user);
        socket.emit("newUser", { user, socketID: socket.id });
        navigate("/chat");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <h2>Chat enter</h2>
            <label htmlFor="user"></label>
            <input
                id="user"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className={styles.userInput}
            />
            <button type="submit" className={styles.homeBtn}>
                Enter
            </button>
        </form>
    );
};

export default Home;
