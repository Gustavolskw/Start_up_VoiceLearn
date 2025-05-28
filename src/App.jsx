import React, { useState } from 'react';
import { 
  MessageCircle, 
  Calendar,
  Clock,
  Send,
  Check,
  Star,
  Home,
  Car,
  Users,
  MapPin,
  Search,
  Bell
} from 'lucide-react';

const TorcidaSolidariaChatApp = () => {
  const [currentScreen, setCurrentScreen] = useState('chat');
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const user = {
    name: 'João Silva',
    photo: '/api/placeholder/50/50',
    rating: 4.8,
    totalRides: 23
  };

  const chats = [
    {
      id: 1,
      name: 'Maria Santos',
      game: 'JEC x Chapecoense',
      gameDate: '2025-06-01',
      gameTime: '16:00',
      lastMessage: 'Vamos nos encontrar às 15h no posto Ipiranga?',
      time: '14:30',
      unread: 2,
      status: 'pendente',
      avatar: '/api/placeholder/40/40',
      rating: 4.9,
      neighborhood: 'Itaum'
    },
    {
      id: 2,
      name: 'Carlos Lima',
      game: 'Krona x ACBF',
      gameDate: '2025-06-03',
      gameTime: '20:00',
      lastMessage: 'Carona confirmada! Nos vemos domingo 👍',
      time: '12:15',
      unread: 0,
      status: 'confirmada',
      avatar: '/api/placeholder/40/40',
      rating: 4.6,
      neighborhood: 'América'
    },
    {
      id: 3,
      name: 'Ana Oliveira',
      game: 'JEC x Avaí',
      gameDate: '2025-06-08',
      gameTime: '19:30',
      lastMessage: 'Infelizmente preciso cancelar, desculpa...',
      time: 'Ontem',
      unread: 1,
      status: 'cancelada',
      avatar: '/api/placeholder/40/40',
      rating: 5.0,
      neighborhood: 'Bucarein'
    },
    {
      id: 4,
      name: 'Pedro Costa',
      game: 'JEC x Chapecoense',
      gameDate: '2025-06-01',
      gameTime: '16:00',
      lastMessage: 'Ainda tem vaga? Sou do centro da cidade',
      time: '10:15',
      unread: 0,
      status: 'negociando',
      avatar: '/api/placeholder/40/40',
      rating: 4.7,
      neighborhood: 'Centro'
    }
  ];

  const messages = [
    { id: 1, sender: 'other', text: 'Oi! Vi que você ofereceu carona para o jogo do JEC domingo', time: '14:20' },
    { id: 2, sender: 'me', text: 'Oi Maria! Sim, ainda tenho 2 vagas disponíveis no carro', time: '14:22' },
    { id: 3, sender: 'other', text: 'Que legal! Sou do Itaum, fica no seu caminho?', time: '14:25' },
    { id: 4, sender: 'me', text: 'Fica sim! Passo bem ali. Posso te buscar no posto Ipiranga da Rua das Palmeiras', time: '14:27' },
    { id: 5, sender: 'other', text: 'Perfeito! Que horas você quer se encontrar?', time: '14:28' },
    { id: 6, sender: 'me', text: 'Que tal às 15h? Assim chegamos com bastante tempo no estádio', time: '14:29' },
    { id: 7, sender: 'other', text: 'Vamos nos encontrar às 15h no posto Ipiranga?', time: '14:30' }
  ];

  const activeChats = {
    pending: chats.filter(chat => chat.status === 'pendente').length,
    confirmed: chats.filter(chat => chat.status === 'confirmada').length,
    total: chats.length
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
            {activeChats.pending > 0 && (
              <span className="bg-yellow-400 text-red-800 text-xs rounded-full px-2 py-1">
                {activeChats.pending}
              </span>
            )}
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

  // Chat Screen
  const ChatScreen = () => (
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
            <h2 className="text-2xl font-bold">Central de Conversas</h2>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{activeChats.total} conversas ativas</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Bell className="w-4 h-4" />
                <span>{activeChats.pending} pendentes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-red-600" />
              Minhas Conversas
            </h3>
            
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar conversas..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {chats.map(chat => (
                <div 
                  key={chat.id} 
                  onClick={() => setSelectedChat(chat)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedChat?.id === chat.id 
                      ? 'border-red-500 bg-red-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <img 
                      src={chat.avatar} 
                      alt={chat.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 truncate">{chat.name}</h4>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{chat.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-xs text-gray-600">{chat.neighborhood}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 font-medium mb-2">{chat.game}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(chat.gameDate).toLocaleDateString('pt-BR')}</span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{chat.gameTime}</span>
                      </div>
                      
                      <p className="text-sm text-gray-500 truncate mb-3">{chat.lastMessage}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          chat.status === 'confirmada' ? 'bg-green-100 text-green-800' :
                          chat.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                          chat.status === 'negociando' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {chat.status === 'confirmada' ? '✅ Confirmada' :
                           chat.status === 'pendente' ? '⏳ Pendente' :
                           chat.status === 'negociando' ? '💬 Negociando' :
                           '❌ Cancelada'}
                        </span>
                        {chat.unread > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg h-96 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-black text-white rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={selectedChat.avatar} 
                        alt={selectedChat.name}
                        className="w-12 h-12 rounded-full border-2 border-white"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{selectedChat.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{selectedChat.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{selectedChat.neighborhood}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mt-1">{selectedChat.game}</p>
                      </div>
                    </div>
                    
                    {selectedChat.status === 'pendente' && (
                      <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center font-medium">
                        <Check className="w-5 h-5 mr-2" />
                        Confirmar Carona
                      </button>
                    )}
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map(message => (
                    <div key={message.id} className={`flex ${
                      message.sender === 'me' ? 'justify-end' : 'justify-start'
                    }`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.sender === 'me' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-white text-gray-800 border shadow-sm'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'me' ? 'text-red-100' : 'text-gray-500'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white rounded-b-lg">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          // Aqui seria a integração com API: POST /chat/{ride_id}
                          console.log('Enviando mensagem:', newMessage);
                          setNewMessage('');
                        }
                      }}
                    />
                    <button 
                      onClick={() => {
                        // Aqui seria a integração com API: POST /chat/{ride_id}
                        console.log('Enviando mensagem:', newMessage);
                        setNewMessage('');
                      }}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center font-medium"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Pressione Enter para enviar • API: GET/POST /chat/{selectedChat.id}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500 max-w-sm">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Selecione uma conversa</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Escolha uma conversa ao lado para começar a trocar mensagens com outros torcedores 
                    e organizar suas caronas.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Conversas Ativas</p>
              <p className="text-2xl font-bold">{activeChats.total}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>
        
        <div className="bg-black text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Caronas Pendentes</p>
              <p className="text-2xl font-bold">{activeChats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-black text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Caronas Confirmadas</p>
              <p className="text-2xl font-bold">{activeChats.confirmed}</p>
            </div>
            <Check className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ChatScreen />
    </div>
  );
};

export default TorcidaSolidariaChatApp;