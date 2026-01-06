import { consultarApi } from './api/api';
import { useEffect, useState } from 'react';
import Modal from './components/modal';
import type { UserType } from './types';

function App() {
  const [users, setUsers] = useState<UserType[]>([]); //especifiqué con el generic que es un array de UserType
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null); //estado de usuario seleccionado para el modal, especifiqué el tipo de dato con un generic
  const [searchBar, setSearchBar] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await consultarApi();
        setUsers(data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchBar.toLowerCase())
  ); //comprobación para filtrar usuarios según escrito en la search bar. pongo todo en minúsculas para evitar problemas de comparación


  return (
    <>
      <header className='p-20 bg-blue-900'>
        <h1 className="text-5xl font-bold text-center text-gray-300">Listado de usuarios</h1>
      </header>
      <main className="p-4">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar usuario por nombre"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)} //actualizo el estado de searchBar al escribir nuevos caracteres
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => ( // en vez de usar users, utilizo filteredUsers para mostrar solo los que coinciden con la búsqueda
            <div key={user.id} className="border p-4 rounded shadow-md flex flex-col items-center justify-between bg-gray-300 cursor-pointer hover:bg-gray-400 transition-colors" 
            onClick={() => setSelectedUser(user)} //selecciono el usuario al hacer click en su tarjeta
            >
              <h2 className="font-bold text-lg mb-2">{user.name}</h2>
              <p className="text-gray-900 mb-1">{user.email}</p>
              <p className="text-gray-500">{user.address.city}</p>
            </div>
          ))}
        </div>
        
      </main>
      <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </>
  )

}

export default App
