import React, { useState, useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface Equipment {
  name: string;
  price: number;        // preço como número para facilitar formatação
  description: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const userName = 'UserName'; // substitua por valor real se quiser

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          console.error('Token não encontrado. Faça login.');
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:3000/api/product', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEquipments(data);
        } else {
          console.error('Erro ao carregar equipamentos:', response.status);
          if (response.status === 401) {
            Cookies.remove('token');
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      }
    };

    fetchEquipments();
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <div className="home-page">
      <nav id="home-bar">
        <div id="brand">BRAND</div>

        <div id="options">
          <button>Home</button>
          <button>Users</button>
          <button>FAQ</button>
          <button onClick={handleLogout}>SAIR</button>
        </div>

        <div id="user-info">
          <button>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6858/6858485.png"
              alt="User Icon"
            />
          </button>
          <span>{userName}</span>
        </div>
      </nav>

      <div className="home-content">
        <table className="zebra-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {equipments.length > 0 ? (
              equipments.map((equipment, index) => (
                <tr key={index}>
                  <td>{equipment.name}</td>
                  <td>{equipment.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td>{equipment.description || 'Sem descrição'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Nenhum equipamento encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
