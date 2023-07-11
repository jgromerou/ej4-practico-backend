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

export const consultaColor = async (id) => {
  try {
    const respuesta = await fetch(URLColores + '/' + id);
    const color = await respuesta.json();
    return color;
  } catch (error) {
    console.log(error);
  }
};

export const editarColor = async (color, id) => {
  try {
    const respuesta = await fetch(URLColores + '/' + id, {
      method: 'PUT',
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

export const borrarTarea = async (id) => {
  try {
    const respuesta = await fetch(`${URLColores}/${id}`, {
      method: 'DELETE',
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
