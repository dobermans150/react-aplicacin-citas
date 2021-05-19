import React, { useState, useEffect, Fragment } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  /* cargar citas de localstorage como state inicial */
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));

  if (!citasIniciales) {
    citasIniciales = [];
  }

  /* useState retorna 2 funciones */
  /* El state actual = this.state; */
  /* Funcion que actualiza el state this.setState() */

  const [citas, guardarCitas] = useState(citasIniciales);

  /* Agregar las nuevas citar al state */

  const crearCita = cita => {
    /* Tomar una copia del state y agregar el nuevo cliente */

    const nuevaCitas = [...citas, cita];

    /* almacenamos en el state */
    guardarCitas(nuevaCitas);
    console.log(nuevaCitas);
  };

  /* Elimina las citas del State */

  const eliminarCita = index => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    guardarCitas(nuevasCitas);
  };

  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));

    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  /* cargar condicionalmente un titulo */
  /* object.keys(array); lo que hace es devolver las osiciones de cada elemento de un objeto o array */
  const titulo =
    Object.keys(citas).length === 0
      ? "No hay Citas"
      : "Admnistrar las Citas aqui";
  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index) => (
              <Cita
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
