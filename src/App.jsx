import React, { useState } from 'react';
import { 
  AlertTriangle,
  Star,
  Send,
  Calendar,
  User,
  Home,
  Car,
  MessageCircle,
  Clock,
  MapPin
} from 'lucide-react';

const TorcidaSolidariaSimpleFeedback = () => {
  const [currentScreen, setCurrentScreen] = useState('feedback');
  const [formData, setFormData] = useState({
    type: '',
    reportedUser: '',
    game: '',
    rating: 0,
    reason: '',
    description: ''
  });

  // Mock data
  const user = {
    name: 'João Silva',
    photo: '/api/placeholder/50/50',
    rating: 4.8,
    totalRides: 23
  };

  const recentRides = [
    {
      id: 1,
      game: 'JEC x Chapecoense',
      date: '2025-05-28',
      driver: 'Carlos Lima',
      passengers: ['Maria Santos', 'Pedro Costa'],
      role: 'passageiro'
    },
    {
      id: 2,
      game: 'Krona x ACBF',
      date: '2025-05-25',
      driver: 'João Silva',
      passengers: ['Ana Oliveira', 'Lucas Santos'],
      role: 'motorista'
    },
    {
      id: 3,
      game: 'JEC x Avaí',
      date: '2025-05-20',
      driver: 'Fernanda Silva',
      passengers: ['Roberto Alves'],
      role: 'passageiro'
    }
  ];

  const reasonOptions = [
    'Chegou atrasado',
    'Cancelou em cima da hora',
    'Não compareceu',
    'Comportamento inadequado',
    'Dirigiu de forma perigosa',
    'Foi desrespeitoso',
    'Cobrou dinheiro pela carona',
    'Outros'
  ];

  // Handle form changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle ride selection
  const handleSelectRide = (ride) => {
    const isDriver = ride.role === 'motorista';
    setFormData(prev => ({
      ...prev,
      game: ride.game,
      reportedUser: isDriver ? ride.passengers[0] : ride.driver,
      type: isDriver ? 'passageiro' : 'motorista'
    }));
  };

  // Handle star rating
  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.reportedUser || !formData.game || !formData.reason) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    console.log('Enviando feedback:', formData);
    alert('Feedback enviado com sucesso! Nossa equipe irá analisar em breve.');
    
    // Reset form
    setFormData({
      type: '',
      reportedUser: '',
      game: '',
      rating: 0,
      reason: '',
      description: ''
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
            onClick={() => setCurrentScreen('feedback')}
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              currentScreen === 'feedback' ? 'bg-red-700' : 'hover:bg-red-700'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Feedback</span>
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

  // Feedback Screen
  const FeedbackScreen = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-black text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <AlertTriangle className="w-12 h-12" />
          <div>
            <h2 className="text-2xl font-bold">Cadastrar Feedback</h2>
            <p className="text-red-100 mt-1">
              Avalie ou denuncie um motorista ou passageiro
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-red-600" />
              Dados do Feedback
            </h3>
            
            <div className="space-y-4">
              {/* Game and User */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jogo
                  </label>
                  <input
                    type="text"
                    value={formData.game}
                    onChange={(e) => handleInputChange('game', e.target.value)}
                    placeholder="Nome do jogo"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usuário
                  </label>
                  <input
                    type="text"
                    value={formData.reportedUser}
                    onChange={(e) => handleInputChange('reportedUser', e.target.value)}
                    placeholder="Nome do usuário"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Usuário
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="motorista">Motorista</option>
                  <option value="passageiro">Passageiro</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avaliação
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className={`p-1 transition-colors ${
                        star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <Star className={`w-6 h-6 ${star <= formData.rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Clique nas estrelas para avaliar (1-5)
                </p>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivo
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecione o motivo</option>
                  {reasonOptions.map((reason, index) => (
                    <option key={index} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição Detalhada
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="4"
                  placeholder="Descreva o que aconteceu durante a carona..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center font-medium"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Recent Rides */}
        <div className="space-y-4">
          <div className="bg-black text-white rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">Preenchimento Rápido</h3>
            <p className="text-gray-300 text-sm mb-4">
              Clique em uma carona recente para preencher automaticamente
            </p>
            
            <div className="space-y-3">
              {recentRides.map((ride) => (
                <button
                  key={ride.id}
                  onClick={() => handleSelectRide(ride)}
                  className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="font-medium">{ride.game}</div>
                  <div className="text-sm text-gray-300 mt-1">
                    <div className="flex items-center mb-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(ride.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {ride.role === 'motorista' ? 'Você dirigiu' : `Motorista: ${ride.driver}`}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {formData.game && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                Preview do Feedback
              </h3>
              
              <div className="space-y-2 text-sm">
                <div><strong>Jogo:</strong> {formData.game}</div>
                <div><strong>Usuário:</strong> {formData.reportedUser}</div>
                {formData.type && <div><strong>Tipo:</strong> {formData.type}</div>}
                {formData.rating > 0 && (
                  <div className="flex items-center">
                    <strong className="mr-2">Avaliação:</strong>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${
                            star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                )}
                {formData.reason && <div><strong>Motivo:</strong> {formData.reason}</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <FeedbackScreen />
    </div>
  );
};

export default TorcidaSolidariaSimpleFeedback;