import { useState, useNavigate } from 'react'

function useSesion() {
    const [sesion, setSesion] = useState(false);
    const nav = useNavigate();
    if (sesion) {
        return nav("/porfile");
    } else {
        return nav("/login");
    }

    return {
        sesion,
        setSesion
    }
}