import React, { useState } from 'react';
import { 
  User,
  Camera,
  Save,
  Star,
  Calendar,
  Home,
  Car,
  MessageCircle,
  Settings,
  Bell,
  Lock,
  History,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const TorcidaSolidariaSimpleProfile = () => {
  const [currentScreen, setCurrentScreen] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(47) 99999-9999',
    neighborhood: 'Aventureiro',
    accountType: 'premium',
    notifications: true,
    privacy: false
  });

  // Mock data
  const user = {
    name: 'João Silva',
    photo: '/api/placeholder/100/100',
    rating: 4.8,
    totalRides: 23,
    memberSince: '2024-01-15'
  };

  const rideHistory = [
    {
      id: 1,
      game: 'JEC x Criciúma',
      date: '2025-05-25',
      role: 'motorista',
      rating: 5,
      participants: 3
    },
    {
      id: 2,
      game: 'Krona x ACBF',
      date: '2025-05-20',
      role: 'passageiro',
      rating: 4,
      driver: 'Maria Santos'
    },
    {
      id: 3,
      game: 'JEC x Avaí',
      date: '2025-05-15',
      role: 'motorista',
      rating: 5,
      participants: 2
    },
    {
      id: 4,
      game: 'JEC x Figueirense',
      date: '2025-05-10',
      role: 'passageiro',
      rating: 4,
      driver: 'Carlos Lima'
    },
    {
      id: 5,
      game: 'Krona x Atlantico',
      date: '2025-05-05',
      role: 'motorista',
      rating: 5,
      participants: 4
    }
  ];

  // Handle form changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSave = () => {
    console.log('Salvando dados do perfil:', formData);
    alert('Perfil atualizado com sucesso!');
  };

  // Handle photo upload
  const handlePhotoUpload = () => {
    alert('Funcionalidade de upload de foto será implementada!');
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
            onClick={() => setCurrentScreen('profile')}
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              currentScreen === 'profile' ? 'bg-red-700' : 'hover:bg-red-700'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Perfil</span>
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

  // Profile Screen
  const ProfileScreen = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-black text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <img 
            src={user.photo} 
            alt={user.name}
            className="w-16 h-16 rounded-full border-4 border-white"
          />
          <div>
            <h2 className="text-2xl font-bold">Meu Perfil</h2>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{user.rating}</span>
              </div>
              <span>•</span>
              <span>{user.totalRides} caronas</span>
              <span>•</span>
              <span>Membro desde {new Date(user.memberSince).getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-red-600" />
              Dados Pessoais
            </h3>
            
            <div className="space-y-4">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bairro
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Conta
                </label>
                <select
                  value={formData.accountType}
                  onChange={(e) => handleInputChange('accountType', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="basica">Básica</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              {/* Settings */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Receber notificações</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={formData.notifications}
                        onChange={(e) => handleInputChange('notifications', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Perfil privado</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={formData.privacy}
                        onChange={(e) => handleInputChange('privacy', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center font-medium"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Photo */}
          <div className="bg-black text-white rounded-lg p-6 text-center">
            <div className="relative inline-block mb-4">
              <img 
                src={user.photo} 
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-white"
              />
              <button 
                onClick={handlePhotoUpload}
                className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="font-bold text-lg mb-1">{user.name}</h3>
            <p className="text-gray-300 capitalize">{formData.accountType}</p>
            
            <div className="flex items-center justify-center space-x-1 mt-3">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{user.rating}</span>
              <span className="text-gray-300 text-sm ml-2">({user.totalRides} caronas)</span>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-bold mb-4 flex items-center">
              <Car className="w-5 h-5 mr-2 text-red-600" />
              Estatísticas
            </h3>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-bold text-lg text-red-600">15</div>
                <div className="text-xs text-gray-600">Como Motorista</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-bold text-lg text-red-600">8</div>
                <div className="text-xs text-gray-600">Como Passageiro</div>
              </div>
            </div>
          </div>

          {/* Recent History */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-bold mb-4 flex items-center">
              <History className="w-5 h-5 mr-2 text-red-600" />
              Histórico Recente
            </h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {rideHistory.slice(0, 5).map(ride => (
                <div key={ride.id} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm">{ride.game}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{ride.rating}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-2">
                    {new Date(ride.date).toLocaleDateString('pt-BR')}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      ride.role === 'motorista' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {ride.role}
                    </span>
                    {ride.role === 'motorista' && (
                      <span className="text-xs text-gray-600">
                        {ride.participants} passageiros
                      </span>
                    )}
                  </div>
                </div>
              ))}
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
      <ProfileScreen />
    </div>
  );
};

export default TorcidaSolidariaSimpleProfile;