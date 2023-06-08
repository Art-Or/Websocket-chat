import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Body = ({ messages, socket, status }) => {
    const navigate = useNavigate();

    const handleLeave = () => {
        const logOutUser = localStorage.getItem("user");
        localStorage.removeItem("user");
        socket.emit("logOut", { logOutUser, socketID: socket.id });
        navigate("/");
    };

    return (
        <>
            <header className={styles.header}>
                <button className={styles.btn} onClick={handleLeave}>
                    Leave chat
                </button>
            </header>

            <div className={styles.container}>
                {messages.map((element) =>
                    element.name === localStorage.getItem("user") ? (
                        <div className={styles.chats} key={element.id}>
                            <p className={styles.senderName}>You</p>
                            <div className={styles.messageSender}>
                                <p>{element.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.chats} key={element.id}>
                            <p>{element.name}</p>
                            <div className={styles.messageRecipient}>
                                <p>{element.text}</p>
                            </div>
                        </div>
                    )
                )}

                <div className="styles.status">
                    <p>{status}</p>
                </div>
            </div>
        </>
    );
};

export default Body;
