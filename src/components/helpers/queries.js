const URLColores = import.meta.env.VITE_API_COLORES;

export const obtenerListaColores = async () => {
  try {
    const respuesta = await fetch(URLColores);
    const listaColores = await respuesta.json();
    return listaColores;
  } catch (error) {
    console.log(error);
  }
};
