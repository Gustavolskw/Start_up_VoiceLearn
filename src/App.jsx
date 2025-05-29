import React, { useState } from 'react';
import { 
  BarChart3, 
  Download,
  Calendar,
  MapPin,
  Users,
  Home,
  Car,
  MessageCircle,
  Shield,
  FileText,
  PieChart
} from 'lucide-react';

const TorcidaSolidariaSimpleAnalytics = () => {
  const [currentScreen, setCurrentScreen] = useState('analytics');
  const [selectedGame, setSelectedGame] = useState(2);

  // Mock data
  const user = {
    name: 'João Silva',
    photo: '/api/placeholder/50/50',
    rating: 4.8,
    totalRides: 23
  };

  const games = [
    { id: 1, name: 'JEC x Chapecoense', date: '2025-06-01', type: 'JEC' },
    { id: 2, name: 'Krona x ACBF', date: '2025-06-03', type: 'Krona' },
    { id: 3, name: 'JEC x Avaí', date: '2025-06-08', type: 'JEC' },
    { id: 4, name: 'Krona x Carlos Barbosa', date: '2025-06-12', type: 'Krona' }
  ];

  const gameData = {
    1: {
      totalRides: 12,
      totalPassengers: 35,
      occupancyRate: 85,
      neighborhoods: [
        { name: 'Aventureiro', rides: 4, percentage: 33 },
        { name: 'Itaum', rides: 3, percentage: 25 },
        { name: 'América', rides: 2, percentage: 17 },
        { name: 'Bucarein', rides: 2, percentage: 17 },
        { name: 'Centro', rides: 1, percentage: 8 }
      ],
      ridesDetail: [
        { driver: 'João Silva', passengers: 3, neighborhood: 'Aventureiro' },
        { driver: 'Maria Santos', passengers: 2, neighborhood: 'Itaum' },
        { driver: 'Carlos Lima', passengers: 4, neighborhood: 'América' },
        { driver: 'Ana Costa', passengers: 3, neighborhood: 'Bucarein' }
      ]
    },
    2: {
      totalRides: 8,
      totalPassengers: 22,
      occupancyRate: 75,
      neighborhoods: [
        { name: 'Centro', rides: 3, percentage: 38 },
        { name: 'Aventureiro', rides: 2, percentage: 25 },
        { name: 'Itaum', rides: 2, percentage: 25 },
        { name: 'América', rides: 1, percentage: 12 }
      ],
      ridesDetail: [
        { driver: 'Pedro Costa', passengers: 3, neighborhood: 'Centro' },
        { driver: 'Fernanda Lima', passengers: 2, neighborhood: 'Aventureiro' },
        { driver: 'Lucas Santos', passengers: 4, neighborhood: 'Itaum' }
      ]
    }
  };

  const selectedGameData = selectedGame ? gameData[selectedGame] : null;

  // Export functions
  const exportCSV = () => {
    console.log('Exportando CSV para o jogo:', selectedGame);
    alert('Dados exportados em CSV!');
  };

  const exportPDF = () => {
    console.log('Exportando PDF para o jogo:', selectedGame);
    alert('Relatório PDF gerado!');
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
            onClick={() => setCurrentScreen('analytics')}
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              currentScreen === 'analytics' ? 'bg-red-700' : 'hover:bg-red-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Relatórios</span>
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

  // Analytics Screen
  const AnalyticsScreen = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-black text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BarChart3 className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold">Acompanhamento de Caronas</h2>
              <p className="text-red-100 mt-1">
                Estatísticas e dados das caronas por evento
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={exportCSV}
              disabled={!selectedGame}
              className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center disabled:opacity-50"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </button>
            <button 
              onClick={exportPDF}
              disabled={!selectedGame}
              className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center disabled:opacity-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Game Selector */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-red-600" />
          Seletor de Jogo
        </h3>
        
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="w-full md:w-auto border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Selecione um jogo para ver as estatísticas</option>
          {games.map(game => (
            <option key={game.id} value={game.id}>
              {game.name} - {new Date(game.date).toLocaleDateString('pt-BR')}
            </option>
          ))}
        </select>
      </div>

      {selectedGameData && (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-black text-white p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total de Caronas</p>
                  <p className="text-2xl font-bold">{selectedGameData.totalRides}</p>
                </div>
                <Car className="w-8 h-8 text-red-400" />
              </div>
            </div>
            
            <div className="bg-black text-white p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Passageiros</p>
                  <p className="text-2xl font-bold">{selectedGameData.totalPassengers}</p>
                </div>
                <Users className="w-8 h-8 text-red-400" />
              </div>
            </div>
            
            <div className="bg-black text-white p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Taxa de Ocupação</p>
                  <p className="text-2xl font-bold">{selectedGameData.occupancyRate}%</p>
                </div>
                <PieChart className="w-8 h-8 text-red-400" />
              </div>
            </div>
            
            <div className="bg-black text-white p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Média por Carona</p>
                  <p className="text-2xl font-bold">
                    {Math.round(selectedGameData.totalPassengers / selectedGameData.totalRides)}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Neighborhoods Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                Bairros Mais Ativos
              </h3>
              
              <div className="space-y-3">
                {selectedGameData.neighborhoods.map((neighborhood, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-20 text-sm font-medium text-gray-700">
                      {neighborhood.name}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-red-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${neighborhood.percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm font-bold text-gray-800">
                      {neighborhood.rides}
                    </div>
                    <div className="w-12 text-xs text-gray-600">
                      {neighborhood.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rides Detail */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-red-600" />
                Detalhes das Caronas
              </h3>
              
              <div className="space-y-3">
                {selectedGameData.ridesDetail.map((ride, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-800">{ride.driver}</h4>
                        <p className="text-sm text-gray-600">{ride.neighborhood}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{ride.passengers} passageiros</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {!selectedGameData && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Selecione um jogo
          </h3>
          <p className="text-gray-600">
            Escolha um jogo no seletor acima para ver as estatísticas das caronas
          </p>
        </div>
      )}
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <AnalyticsScreen />
    </div>
  );
};

export default TorcidaSolidariaSimpleAnalytics;