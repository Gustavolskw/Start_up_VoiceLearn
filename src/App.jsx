import React, { useState } from 'react';
import { 
  Calendar, 
  Car, 
  Users, 
  MapPin, 
  Clock, 
  Star, 
  Plus, 
  Search,
  Filter,
  Edit,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  Home,
  Settings
} from 'lucide-react';

const JECaronaApp = () => {
  const [currentScreen, setCurrentScreen] = useState('rides');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTeam, setSelectedTeam] = useState('ambos');

  // Mock data
  const user = {
    name: 'João Silva',
    photo: '/api/placeholder/50/50',
    rating: 4.8,
    totalRides: 23
  };

  const upcomingGames = [
    {
      id: 1,
      team: 'JEC',
      opponent: 'Chapecoense',
      date: '2025-06-01',
      time: '16:00',
      location: 'Arena Joinville',
      type: 'Casa'
    },
    {
      id: 2,
      team: 'Krona',
      opponent: 'ACBF',
      date: '2025-06-03',
      time: '20:00',
      location: 'Centreventos',
      type: 'Casa'
    },
    {
      id: 3,
      team: 'JEC',
      opponent: 'Avaí',
      date: '2025-06-08',
      time: '19:30',
      location: 'Ressacada',
      type: 'Fora'
    }
  ];

  const activeRides = {
    asDriver: [
      {
        id: 1,
        game: 'JEC x Chapecoense',
        date: '2025-06-01',
        passengers: 2,
        maxPassengers: 3,
        status: 'confirmada'
      }
    ],
    asPassenger: [
      {
        id: 2,
        game: 'Krona x ACBF',
        date: '2025-06-03',
        driver: 'Maria Santos',
        status: 'pendente'
      }
    ]
  };

  const myRides = [
    {
      id: 1,
      game: 'JEC x Chapecoense',
      date: '2025-06-01',
      time: '16:00',
      role: 'motorista',
      passengers: 2,
      maxPassengers: 3,
      status: 'confirmada'
    },
    {
      id: 2,
      game: 'Krona x ACBF',
      date: '2025-06-03',
      time: '20:00',
      role: 'passageiro',
      driver: 'Maria Santos',
      status: 'pendente'
    },
    {
      id: 3,
      game: 'JEC x Avaí',
      date: '2025-05-15',
      time: '19:30',
      role: 'motorista',
      passengers: 3,
      maxPassengers: 3,
      status: 'finalizada'
    }
  ];

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-red-600 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-white text-red-600 p-2 rounded-full">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold">JECarona</h1>
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
            onClick={() => setCurrentScreen('calendar')}
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              currentScreen === 'calendar' ? 'bg-red-700' : 'hover:bg-red-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calendário</span>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('rides')}
            className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              currentScreen === 'rides' ? 'bg-red-700' : 'hover:bg-red-700'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Minhas Caronas</span>
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

  // Dashboard Screen
  const DashboardScreen = () => (
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
            <h2 className="text-2xl font-bold">Bem-vindo, {user.name}!</h2>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{user.rating}</span>
              </div>
              <span>•</span>
              <span>{user.totalRides} caronas realizadas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximos Jogos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-red-600" />
              Próximos Jogos
            </h3>
            
            <div className="space-y-4">
              {upcomingGames.map(game => (
                <div key={game.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">
                        {game.team} x {game.opponent}
                      </h4>
                      <div className="flex items-center space-x-4 text-gray-600 text-sm mt-1">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(game.date).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {game.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {game.location}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      game.type === 'Casa' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-black text-white'
                    }`}>
                      {game.type}
                    </span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center justify-center">
                      <Car className="w-4 h-4 mr-2" />
                      Oferecer Carona
                    </button>
                    <button className="flex-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center justify-center">
                      <Search className="w-4 h-4 mr-2" />
                      Buscar Carona
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Caronas Ativas */}
        <div className="space-y-4">
          {/* Como Motorista */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Car className="w-5 h-5 mr-2 text-red-600" />
              Como Motorista
            </h3>
            
            {activeRides.asDriver.length > 0 ? (
              <div className="space-y-3">
                {activeRides.asDriver.map(ride => (
                  <div key={ride.id} className="border rounded-lg p-3">
                    <h4 className="font-medium">{ride.game}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(ride.date).toLocaleDateString('pt-BR')}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {ride.passengers}/{ride.maxPassengers}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        ride.status === 'confirmada' 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {ride.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Nenhuma carona ativa como motorista</p>
            )}
          </div>

          {/* Como Passageiro */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-black" />
              Como Passageiro
            </h3>
            
            {activeRides.asPassenger.length > 0 ? (
              <div className="space-y-3">
                {activeRides.asPassenger.map(ride => (
                  <div key={ride.id} className="border rounded-lg p-3">
                    <h4 className="font-medium">{ride.game}</h4>
                    <p className="text-sm text-gray-600">
                      Motorista: {ride.driver}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(ride.date).toLocaleDateString('pt-BR')}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${
                      ride.status === 'confirmada' 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ride.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Nenhuma carona ativa como passageiro</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Calendar Screen
  const CalendarScreen = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const getDaysInMonth = (month, year) => {
      return new Date(year, month + 1, 0).getDate();
    };
    
    const getFirstDayOfMonth = (month, year) => {
      return new Date(year, month, 1).getDay();
    };
    
    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentMonth, currentYear);
      const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
      const days = [];
      
      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="p-2"></div>);
      }
      
      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasGame = upcomingGames.some(game => game.date === dateString);
        
        days.push(
          <div key={day} className={`p-2 border rounded cursor-pointer hover:bg-gray-50 ${
            hasGame ? 'bg-red-100 border-red-300' : ''
          }`}>
            <span className="text-sm font-medium">{day}</span>
            {hasGame && (
              <div className="w-2 h-2 bg-red-500 rounded-full mt-1"></div>
            )}
          </div>
        );
      }
      
      return days;
    };

    const filteredGames = upcomingGames.filter(game => {
      if (selectedTeam === 'ambos') return true;
      return game.team.toLowerCase() === selectedTeam.toLowerCase();
    });

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-red-600" />
              Calendário de Jogos
            </h2>
            
            <div className="flex items-center space-x-4">
              <select 
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="ambos">Ambos os times</option>
                <option value="jec">JEC</option>
                <option value="krona">Krona</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {new Date(currentYear, currentMonth).toLocaleDateString('pt-BR', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h3>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </div>

            {/* Games List */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Próximos Jogos</h3>
              <div className="space-y-3">
                {filteredGames.map(game => (
                  <div key={game.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{game.team} x {game.opponent}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        game.type === 'Casa' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-black text-white'
                      }`}>
                        {game.type}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(game.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {game.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {game.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // My Rides Screen
  const MyRidesScreen = () => {
    const [activeTab, setActiveTab] = useState('motorista');

    const driverRides = myRides.filter(ride => ride.role === 'motorista');
    const passengerRides = myRides.filter(ride => ride.role === 'passageiro');

    const getStatusColor = (status) => {
      switch (status) {
        case 'confirmada':
          return 'bg-red-100 text-red-800';
        case 'pendente':
          return 'bg-yellow-100 text-yellow-800';
        case 'cancelada':
          return 'bg-gray-100 text-gray-800';
        case 'finalizada':
          return 'bg-black text-white';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Car className="w-6 h-6 mr-2 text-red-600" />
            Minhas Caronas
          </h2>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setActiveTab('motorista')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'motorista'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Como Motorista
            </button>
            <button
              onClick={() => setActiveTab('passageiro')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'passageiro'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Como Passageiro
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {activeTab === 'motorista' ? (
              driverRides.length > 0 ? (
                driverRides.map(ride => (
                  <div key={ride.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{ride.game}</h3>
                        <div className="flex items-center space-x-4 text-gray-600 text-sm mt-1">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(ride.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {ride.time}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {ride.passengers}/{ride.maxPassengers} passageiros
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ride.status)}`}>
                          {ride.status}
                        </span>
                        
                        {ride.status !== 'finalizada' && (
                          <div className="flex space-x-2">
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-black hover:bg-gray-50 rounded-lg transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Car className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Você ainda não ofereceu nenhuma carona</p>
                </div>
              )
            ) : (
              passengerRides.length > 0 ? (
                passengerRides.map(ride => (
                  <div key={ride.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{ride.game}</h3>
                        <div className="flex items-center space-x-4 text-gray-600 text-sm mt-1">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(ride.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {ride.time}
                          </span>
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            Motorista: {ride.driver}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ride.status)}`}>
                          {ride.status}
                        </span>
                        
                        {ride.status !== 'finalizada' && (
                          <button className="p-2 text-black hover:bg-gray-50 rounded-lg transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Você ainda não solicitou nenhuma carona</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {currentScreen === 'dashboard' && <DashboardScreen />}
      {currentScreen === 'calendar' && <CalendarScreen />}
      {currentScreen === 'rides' && <MyRidesScreen />}
    </div>
  );
};

export default JECaronaApp;