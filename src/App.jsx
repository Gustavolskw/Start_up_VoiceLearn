import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle,
  Eye,
  UserX,
  X,
  Calendar,
  User,
  Home,
  Car,
  MessageCircle,
  Clock,
  Star,
  Filter
} from 'lucide-react';

const TorcidaSolidariaSimpleReports = () => {
  const [currentScreen, setCurrentScreen] = useState('reports');
  const [filterStatus, setFilterStatus] = useState('pendentes');

  // Mock data
  const user = {
    name: 'João Silva',
    photo: '/api/placeholder/50/50',
    rating: 4.8,
    totalRides: 23
  };

  const reports = [
    {
      id: 1,
      reportedUser: 'Carlos Lima',
      reportedBy: 'Maria Santos',
      reason: 'Chegou atrasado e foi mal educado',
      rideDate: '2025-05-28',
      game: 'JEC x Chapecoense',
      status: 'pendente',
      severity: 'media',
      details: 'Motorista chegou 30 minutos atrasado e não avisou. Durante a viagem foi grosseiro com os passageiros.'
    },
    {
      id: 2,
      reportedUser: 'Ana Oliveira',
      reportedBy: 'Pedro Costa',
      reason: 'Cancelou a carona em cima da hora',
      rideDate: '2025-05-25',
      game: 'Krona x ACBF',
      status: 'pendente',
      severity: 'baixa',
      details: 'Cancelou a carona 2 horas antes do jogo sem dar explicação adequada.'
    },
    {
      id: 3,
      reportedUser: 'Fernanda Silva',
      reportedBy: 'Lucas Santos',
      reason: 'Comportamento inadequado',
      rideDate: '2025-05-20',
      game: 'JEC x Avaí',
      status: 'resolvido',
      severity: 'alta',
      details: 'Usuário teve comportamento agressivo e desrespeitoso durante toda a viagem.'
    },
    {
      id: 4,
      reportedUser: 'Roberto Alves',
      reportedBy: 'Carla Mendes',
      reason: 'Não compareceu',
      rideDate: '2025-05-18',
      game: 'JEC x Criciúma',
      status: 'ignorado',
      severity: 'media',
      details: 'Combinamos a carona mas o motorista não apareceu no local combinado.'
    }
  ];

  const filteredReports = reports.filter(report => {
    if (filterStatus === 'ignorado') return true;
    return report.status === filterStatus;
  });

  // Handle actions
  const handleViewDetails = (reportId) => {
    console.log('Visualizando detalhes da denúncia:', reportId);
    alert('Abrindo detalhes da carona...');
  };

  const handleSuspendUser = (reportId) => {
    console.log('Suspendendo usuário da denúncia:', reportId);
    if (confirm('Tem certeza que deseja suspender temporariamente este usuário?')) {
      alert('Usuário suspenso por 7 dias!');
    }
  };

  const handleIgnoreReport = (reportId) => {
    console.log('Ignorando denúncia:', reportId);
    if (confirm('Tem certeza que deseja ignorar esta denúncia?')) {
      alert('Denúncia marcada como ignorada!');
    }
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
            onClick={() => setCurrentScreen('reports')}
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              currentScreen === 'reports' ? 'bg-red-700' : 'hover:bg-red-700'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Moderação</span>
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

  // Reports Screen
  const ReportsScreen = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-500 to-black text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <AlertTriangle className="w-12 h-12" />
          <div>
            <h2 className="text-2xl font-bold">Denúncias e Avaliações</h2>
            <p className="text-red-100 mt-1">
              Acompanhe e responda a denúncias entre usuários
            </p>
          </div>
        </div>
      </div>

      {/* Stats and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Total</p>
              <p className="text-2xl font-bold">{reports.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        
        <div className="bg-black text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Pendentes</p>
              <p className="text-2xl font-bold">{reports.filter(r => r.status === 'pendente').length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-black text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Resolvidos</p>
              <p className="text-2xl font-bold">{reports.filter(r => r.status === 'resolvido').length}</p>
            </div>
            <Shield className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
           
            <option value="pendente">Pendentes</option>
            <option value="resolvido">Resolvidos</option>
            <option value="ignorado">Ignorados</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
          Lista de Denúncias
        </h3>
        
        <div className="space-y-4">
          {filteredReports.map(report => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-800">
                      Usuário: {report.reportedUser}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      report.severity === 'alta' ? 'bg-red-100 text-red-800' :
                      report.severity === 'media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {report.severity === 'alta' ? '🔴 Alta' :
                       report.severity === 'media' ? '🟡 Média' : '🔵 Baixa'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      report.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                      report.status === 'resolvido' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>Denunciado por: {report.reportedBy}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Data: {new Date(report.rideDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-2" />
                      <span>Jogo: {report.game}</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="font-medium text-gray-800 mb-1">Motivo:</p>
                    <p className="text-gray-600">{report.reason}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="font-medium text-gray-800 mb-1">Detalhes:</p>
                    <p className="text-gray-600 text-sm">{report.details}</p>
                  </div>
                </div>
              </div>
              
              {report.status === 'pendente' && (
                <div className="flex space-x-3 pt-3 border-t">
                  <button
                    onClick={() => handleViewDetails(report.id)}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar Detalhes
                  </button>
                  
                  <button
                    onClick={() => handleSuspendUser(report.id)}
                    className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Suspender Temporariamente
                  </button>
                  
                  <button
                    onClick={() => handleIgnoreReport(report.id)}
                    className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Ignorar Denúncia
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Nenhuma denúncia encontrada
            </h3>
            <p className="text-gray-600">
              Não há denúncias com o status "{filterStatus}" no momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ReportsScreen />
    </div>
  );
};

export default TorcidaSolidariaSimpleReports;