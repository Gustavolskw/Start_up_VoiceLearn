import React, { useState } from 'react';
import { 
  Shield, 
  Save,
  Calendar,
  MapPin,
  Clock,
  Home,
  Car,
  MessageCircle,
  ChevronLeft,
  Plus
} from 'lucide-react';

const TorcidaSolidariaSimpleAddGame = () => {
  const [currentScreen, setCurrentScreen] = useState('add-game');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    date: '',
    time: '',
    stadiumName: '',
    stadiumAddress: '',
    observations: ''
  });

  // Mock data
  const user = {
    name: 'João Silva',
    photo: '/api/placeholder/50/50',
    rating: 4.8,
    totalRides: 23
  };

  // Handle form changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // API: POST /admin/games
    console.log('Enviando dados para API:', formData);
    alert('Jogo cadastrado com sucesso!');
    
    // Reset form
    setFormData({
      name: '',
      type: '',
      date: '',
      time: '',
      stadiumName: '',
      stadiumAddress: '',
      observations: ''
    });
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
            onClick={() => setCurrentScreen('add-game')}
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              currentScreen === 'add-game' ? 'bg-red-700' : 'hover:bg-red-700'
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

  // Add Game Screen
  const AddGameScreen = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-black text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentScreen('admin-games')}
            className="bg-white text-red-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">Cadastrar Novo Jogo</h2>
            <p className="text-red-100 mt-1">
              Adicione um novo evento ao calendário
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-red-600" />
              Dados do Jogo
            </h3>
            
            <div className="space-y-4">
              {/* Nome do Jogo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Jogo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ex: JEC x Avaí"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="JEC">JEC Futebol</option>
                  <option value="Krona">JEC/Krona Futsal</option>
                </select>
              </div>

              {/* Data e Hora */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Estádio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Estádio
                </label>
                <input
                  type="text"
                  value={formData.stadiumName}
                  onChange={(e) => handleInputChange('stadiumName', e.target.value)}
                  placeholder="Ex: Arena Joinville"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Endereço */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  value={formData.stadiumAddress}
                  onChange={(e) => handleInputChange('stadiumAddress', e.target.value)}
                  placeholder="Endereço completo do estádio"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Observações */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={formData.observations}
                  onChange={(e) => handleInputChange('observations', e.target.value)}
                  rows="3"
                  placeholder="Informações adicionais (opcional)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Botão Salvar */}
              <button
                onClick={handleSubmit}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center font-medium"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Jogo
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <div className="bg-black text-white rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">Preview do Jogo</h3>
            
            {formData.name ? (
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">{formData.name}</h4>
                  {formData.type && (
                    <span className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
                      formData.type === 'JEC' ? 'bg-red-600' : 'bg-gray-600'
                    }`}>
                      {formData.type}
                    </span>
                  )}
                </div>
                
                {formData.date && (
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(formData.date).toLocaleDateString('pt-BR')}
                    {formData.time && (
                      <>
                        <Clock className="w-4 h-4 ml-4 mr-2" />
                        {formData.time}
                      </>
                    )}
                  </div>
                )}
                
                {formData.stadiumName && (
                  <div className="text-sm text-gray-300">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {formData.stadiumName}
                    </div>
                    {formData.stadiumAddress && (
                      <p className="text-xs mt-1 ml-6">{formData.stadiumAddress}</p>
                    )}
                  </div>
                )}
                
                {formData.observations && (
                  <div className="text-sm text-gray-300 border-t border-gray-600 pt-3 mt-3">
                    <p className="text-xs font-medium mb-1">Observações:</p>
                    <p>{formData.observations}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                Preencha os campos ao lado para ver o preview do jogo
              </p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-bold mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-red-600" />
              API Integration
            </h3>
            <div className="text-sm text-gray-600">
              <p className="font-medium">Endpoint:</p>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">POST /admin/games</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <AddGameScreen />
    </div>
  );
};

export default TorcidaSolidariaSimpleAddGame;