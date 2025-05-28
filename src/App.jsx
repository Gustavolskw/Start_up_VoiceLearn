import React, { useState } from 'react';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  MapPin,
  Clock,
  Home,
  Car,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

const TorcidaSolidariaSimpleGamesList = () => {
  const [currentScreen, setCurrentScreen] = useState('games-list');
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  // Mock data
  const user = {
    name: 'João Silva',
    photo: '/api/placeholder/50/50',
    rating: 4.8,
    totalRides: 23
  };

  const games = [
    {
      id: 1,
      name: 'JEC x Chapecoense',
      type: 'JEC',
      date: '2025-06-01',
      time: '16:00',
      location: 'Arena Joinville',
      address: 'Rua Albano Schmidt, 3333 - Joinville/SC',
      status: 'ativo'
    },
    {
      id: 2,
      name: 'Krona x ACBF',
      type: 'Krona',
      date: '2025-06-03',
      time: '20:00',
      location: 'Centreventos',
      address: 'Rua XV de Novembro, 777 - Joinville/SC',
      status: 'ativo'
    },
    {
      id: 3,
      name: 'JEC x Avaí',
      type: 'JEC',
      date: '2025-06-08',
      time: '19:30',
      location: 'Ressacada',
      address: 'Florianópolis - SC',
      status: 'inativo'
    },
    {
      id: 4,
      name: 'Krona x Carlos Barbosa',
      type: 'Krona',
      date: '2025-06-12',
      time: '21:00',
      location: 'Centreventos',
      address: 'Rua XV de Novembro, 777 - Joinville/SC',
      status: 'ativo'
    },
    {
      id: 5,
      name: 'JEC x Figueirense',
      type: 'JEC',
      date: '2025-06-15',
      time: '15:30',
      location: 'Arena Joinville',
      address: 'Rua Albano Schmidt, 3333 - Joinville/SC',
      status: 'ativo'
    }
  ];

  const stats = {
    total: games.length,
    active: games.filter(g => g.status === 'ativo').length,
    inactive: games.filter(g => g.status === 'inativo').length
  };

  // Handle actions
  const handleEdit = (gameId) => {
    console.log('API: PATCH /admin/games/' + gameId);
    alert('Abrindo tela de edição do jogo...');
  };

  const handleToggleStatus = (gameId, currentStatus) => {
    const newStatus = currentStatus === 'ativo' ? 'inativo' : 'ativo';
    console.log(`API: PATCH /admin/games/${gameId} - Status: ${newStatus}`);
    alert(`Jogo ${newStatus === 'ativo' ? 'ativado' : 'desativado'} com sucesso!`);
  };

  const handleDelete = (gameId) => {
    console.log('API: DELETE /admin/games/' + gameId);
    alert('Jogo excluído com sucesso!');
    setShowDeleteModal(null);
  };

  const handleNewGame = () => {
    setCurrentScreen('add-game');
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-red-600 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-white text-red-600 p-2 rounded-full">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold">Torcida Solidária</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              currentScreen === 'dashboard' ? 'bg-red-700' : 'hover:bg-red-700'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('chat')}
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              currentScreen === 'chat' ? 'bg-red-700' : 'hover:bg-red-700'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat</span>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('games-list')}
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              currentScreen === 'games-list' ? 'bg-red-700' : 'hover:bg-red-700'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Administração</span>
          </button>
          
          <div className="flex items-center space-x-2 ml-6">
            <img 
              src={user.photo} 
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <span className="text-sm">{user.name}</span>
          </div>
        </div>
      </div>
    </nav>
  );

  // Delete Modal
  const DeleteModal = ({ game }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
          <h3 className="text-lg font-bold text-gray-800">Confirmar Exclusão</h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          Tem certeza que deseja excluir o jogo <strong>"{game.name}"</strong>?
        </p>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowDeleteModal(null)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={() => handleDelete(game.id)}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );

  // Games List Screen
  const GamesListScreen = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-black text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold">Lista de Jogos</h2>
              <p className="text-red-100 mt-1">
                Gerencie todos os eventos esportivos cadastrados
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleNewGame}
            className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Jogo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Total de Jogos</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-red-400" />
          </div>
        </div>
        
        <div className="bg-black text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Jogos Ativos</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
            <Eye className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-black text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Jogos Inativos</p>
              <p className="text-2xl font-bold">{stats.inactive}</p>
            </div>
            <EyeOff className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-red-600" />
          Eventos Cadastrados
        </h3>

        {/* API Info */}
        <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
          <strong>APIs:</strong> GET /admin/games • PATCH /admin/games/{"{id}"} • DELETE /admin/games/{"{id}"}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="border border-gray-300 px-4 py-3 text-left">Nome do Evento</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Tipo</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Data e Hora</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Local</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr key={game.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    {game.name}
                  </td>
                  
                  <td className="border border-gray-300 px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      game.type === 'JEC' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {game.type}
                    </span>
                  </td>
                  
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(game.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center mt-1 text-gray-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {game.time}
                      </div>
                    </div>
                  </td>
                  
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="text-sm">
                      <div className="font-medium">{game.location}</div>
                      <div className="text-gray-600 text-xs mt-1 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {game.address}
                      </div>
                    </div>
                  </td>
                  
                  <td className="border border-gray-300 px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      game.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {game.status === 'ativo' ? '🟢 Ativo' : '🔴 Inativo'}
                    </span>
                  </td>
                  
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="flex space-x-2 justify-center">
                      <button 
                        onClick={() => handleEdit(game.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button 
                        onClick={() => handleToggleStatus(game.id, game.status)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title={game.status === 'ativo' ? 'Desativar' : 'Ativar'}
                      >
                        {game.status === 'ativo' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      
                      <button 
                        onClick={() => setShowDeleteModal(game)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && <DeleteModal game={showDeleteModal} />}
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <GamesListScreen />
    </div>
  );
};

export default TorcidaSolidariaSimpleGamesList;