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

export const agregarColor = async (color) => {
  try {
    const respuesta = await fetch(URLColores, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(color),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
