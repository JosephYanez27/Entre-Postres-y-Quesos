import { API_URL } from "../config/api.config.js";

export async function obtenerMenu() {
    const response = await fetch(`${API_URL}menu/completo`);
    return await response.json();
}