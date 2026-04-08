import { obtenerMenu } from "./services/menu.service.js";
import { renderCategorias } from "./components/categoria.component.js";

async function init() {
    const data = await obtenerMenu();
    renderCategorias(data.categorias);
}

init();