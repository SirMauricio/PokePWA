import React, { useEffect, useState } from "react";
import "./Splash.css";

function Splash({ onFinish }) {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setVisible(false);
                if (onFinish) onFinish();
            }, 400);
        }, 2000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    if (!visible) return null;

    return (
        <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
            <img src="/icons/icon-512.png" alt="Logo" className="splash-logo" />
            <h1 className="splash-title">PokeAPI</h1>
        </div>
    );
}

export default Splash;
