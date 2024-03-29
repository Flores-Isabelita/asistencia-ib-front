import { useState, useEffect } from 'react';
import {API_URL} from '../config/constant';

const usePersonasPorTurno = () => {
  const [cantidadPersonasIBNoche, setCantidadPersonasIBNoche] = useState([]);
  const [cantidadPersonasIBDia, setCantidadPersonasIBDia] = useState([]);
  const [cantidadPersonasIBTarde, setCantidadPersonasIBTarde] = useState([]);
  const [cantidadPersonasIB2Noche, setCantidadPersonasIB2Noche] = useState([]);
  const [cantidadPersonasIB2Dia, setCantidadPersonasIB2Dia] = useState([]);
  const [cantidadPersonasIB2Tarde, setCantidadPersonasIB2Tarde] = useState([]);
  const [cantidadPersonas, setCantidadPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarCantidadPersonas = () => {
    fetch(`${API_URL}/personas/turno`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(res => {
          setCantidadPersonasIBNoche(res.ibt1 || 0);
          setCantidadPersonasIBDia(res.ibt2 || 0);
          setCantidadPersonasIBTarde(res.ibt3 || 0);
          setCantidadPersonasIB2Noche(res.ib2t1 || 0);
          setCantidadPersonasIB2Dia(res.ib2t2 || 0);
          setCantidadPersonasIB2Tarde(res.ib2t3 || 0);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    cargarCantidadPersonas();
  }, []);

  
  return { 
    cantidadPersonasIBNoche, 
    cantidadPersonasIBDia, 
    cantidadPersonasIBTarde,
    cantidadPersonasIB2Noche, 
    cantidadPersonasIB2Dia,
    cantidadPersonasIB2Tarde,
    loading
  };
};

export default usePersonasPorTurno;
