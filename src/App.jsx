import { useState } from "react";
import {
  MessageSquare,
  Upload,
  File,
  User,
  Bot,
  Send,
  BookOpen,
  Star,
  Crown,
  BookMarked,
  Clock,
  ChevronRight,
  Mic,
  ThumbsUp,
} from "lucide-react";

export default function VoiceLearnApp() {
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userRank, setUserRank] = useState("Básico"); // For demo purposes

  // Sample library books (now as recommendations)
  const libraryBooks = [
    {
      id: 1,
      title: "História do Brasil: Era Vargas",
      author: "Boris Fausto",
      cover: "/api/placeholder/120/180",
      category: "História",
      relevance: 95,
      recommendation:
        "Recomendado com base no seu interesse em história política",
    },
    {
      id: 2,
      title: "Brasil: Uma Biografia",
      author: "Lilia M. Schwarcz e Heloisa M. Starling",
      cover: "/api/placeholder/120/180",
      category: "História",
      relevance: 88,
      recommendation: "Complementa seus estudos sobre a Era Vargas",
    },
    {
      id: 3,
      title: "Física Quântica para Iniciantes",
      author: "Carlos Eduardo Aguiar",
      cover: "/api/placeholder/120/180",
      category: "Física",
      relevance: 92,
      recommendation: "Baseado na sua conversa sobre dualidade onda-partícula",
    },
    {
      id: 4,
      title:
        "O Universo Elegante: Supercordas, Dimensões Ocultas e a Busca da Teoria Final",
      author: "Brian Greene",
      cover: "/api/placeholder/120/180",
      category: "Física",
      relevance: 85,
      recommendation: "Amplia conhecimentos sobre física quântica",
    },
    {
      id: 5,
      title: "Mecânica Quântica: Experiência, Dualidade e Paradoxos",
      author: "João Pedro Costa",
      cover: "/api/placeholder/120/180",
      category: "Física",
      relevance: 97,
      recommendation: "Altamente relevante para seus estudos atuais",
    },
  ];

  // Sample categories for library
  const categories = [
    "Todos",
    "História",
    "Física",
    "Matemática",
    "Literatura",
  ];
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Sample conversations for demonstration
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "História do Brasil",
      messages: [
        {
          sender: "user",
          content: "Quero estudar sobre a Era Vargas no Brasil.",
          time: "14:30",
        },
        {
          sender: "bot",
          content:
            "Claro! A Era Vargas foi um período da história do Brasil entre 1930 e 1945, quando Getúlio Vargas governou o país. Vamos começar com os principais acontecimentos?",
          time: "14:31",
        },
        {
          sender: "user",
          content: "Sim, quais foram os períodos principais?",
          time: "14:32",
        },
        {
          sender: "bot",
          content:
            "A Era Vargas pode ser dividida em três fases principais:\n\n1. Governo Provisório (1930-1934)\n2. Governo Constitucional (1934-1937)\n3. Estado Novo (1937-1945)\n\nQual dessas fases você gostaria de explorar primeiro?",
          time: "14:33",
        },
      ],
    },
    {
      id: 2,
      title: "Física Quântica",
      messages: [
        {
          sender: "user",
          content:
            "Acabei de enviar um PDF sobre dualidade onda-partícula. Pode me explicar esse conceito?",
          time: "10:15",
        },
        {
          sender: "bot",
          content:
            "Analisei seu PDF sobre dualidade onda-partícula. Este é um conceito fundamental da física quântica que sugere que todas as partículas exibem propriedades tanto de ondas quanto de partículas.\n\nO experimento da dupla fenda de Young demonstra isso claramente: elétrons passando por duas fendas criam um padrão de interferência (comportamento de onda), mas são detectados como partículas individuais.",
          time: "10:16",
        },
        {
          sender: "user",
          content:
            "Como isso se relaciona com o princípio da incerteza de Heisenberg?",
          time: "10:18",
        },
        {
          sender: "bot",
          content:
            "Excelente pergunta! O princípio da incerteza de Heisenberg está diretamente relacionado à dualidade onda-partícula.\n\nQuando uma partícula se comporta como onda, sua posição se torna difusa. Quando medimos sua posição precisamente, perturbamos seu estado ondulatório. Isso cria uma relação fundamental: quanto mais precisamente conhecemos a posição de uma partícula, menos precisamente podemos conhecer seu momento (ou velocidade), e vice-versa.\n\nVamos fazer um quiz sobre isso?",
          time: "10:20",
        },
      ],
    },
  ]);

  const [currentChatId, setCurrentChatId] = useState(1);
  const currentChat = conversations.find((chat) => chat.id === currentChatId);

  // Function to create a new conversation
  const createNewConversation = () => {
    const now = new Date();
    const timeString = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const newConversation = {
      id: conversations.length + 1,
      title: "Nova Conversa",
      messages: [
        {
          sender: "bot",
          content:
            "Olá! Sou o assistente de aprendizado VoiceLearn. Como posso ajudar você hoje? Você pode começar enviando um arquivo para estudarmos juntos ou me contando sobre qual tema você gostaria de aprender.",
          time: timeString,
        },
      ],
    };

    setConversations([...conversations, newConversation]);
    setCurrentChatId(newConversation.id);
  };

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (!message.trim()) return;

    const now = new Date();
    const timeString = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const newMessage = {
      sender: "user",
      content: message,
      time: timeString,
    };

    // Create a bot response (in a real app, this would come from your AI)
    const botResponse = {
      sender: "bot",
      content:
        "Recebi sua mensagem! Em uma versão completa, eu responderia com conteúdo educacional relevante baseado no contexto da nossa conversa.",
      time: timeString,
    };

    // Find the current conversation and update its messages
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === currentChatId) {
        // If it's a new conversation with default title, update the title based on first message
        let updatedTitle = conv.title;
        if (updatedTitle === "Nova Conversa") {
          updatedTitle =
            message.length > 20 ? message.substring(0, 20) + "..." : message;
        }

        return {
          ...conv,
          title: updatedTitle,
          messages: [...conv.messages, newMessage, botResponse],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setMessage("");
  };

  // Handle audio recording
  const toggleRecording = () => {
    if (isRecording) {
      // In a real app, you would stop recording and process the audio here
      stopRecording();
    } else {
      // In a real app, you would start recording here
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  // Function to start recording audio (placeholder)
  const startRecording = () => {
    // This would be implemented with the Web Audio API in a real application
    console.log("Started recording audio");
    // You'd request microphone permissions here
  };

  // Function to stop recording and process audio (placeholder)
  const stopRecording = () => {
    // This would be implemented with the Web Audio API in a real application
    console.log("Stopped recording audio");

    // Simulate processing and sending the audio message
    const now = new Date();
    const timeString = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const audioMessage = {
      sender: "user",
      content: "[Mensagem de áudio]",
      time: timeString,
      isAudio: true,
    };

    // Create a bot response
    const botResponse = {
      sender: "bot",
      content:
        "Recebi seu áudio! Em uma versão completa, eu transcreveria o conteúdo e responderia com informações educacionais relevantes.",
      time: timeString,
    };

    // Update conversations
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === currentChatId) {
        return {
          ...conv,
          messages: [...conv.messages, audioMessage, botResponse],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
  };

  // Filter books by category
  const filteredBooks =
    activeCategory === "Todos"
      ? libraryBooks
      : libraryBooks.filter((book) => book.category === activeCategory);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-xl font-bold">VoiceLearn</h1>
          </div>
          <div className="flex items-center space-x-2">
            {userRank === "Básico" ? (
              <Star className="h-5 w-5 text-yellow-300" />
            ) : (
              <Crown className="h-5 w-5 text-yellow-300" />
            )}
            <span className="text-sm">{userRank}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md flex flex-col">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 p-4 text-center ${
                activeTab === "chat"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("chat")}
            >
              <MessageSquare className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm">Chats</span>
            </button>
            <button
              className={`flex-1 p-4 text-center ${
                activeTab === "library"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("library")}
            >
              <BookOpen className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm">Biblioteca</span>
            </button>
          </div>

          {/* Chat List */}
          {activeTab === "chat" && (
            <div className="flex-1 overflow-y-auto p-2">
              {conversations.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-100 ${
                    currentChatId === chat.id ? "bg-blue-100" : ""
                  }`}
                  onClick={() => setCurrentChatId(chat.id)}
                >
                  <h3 className="font-medium text-gray-800">{chat.title}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.messages[chat.messages.length - 1].content.substring(
                      0,
                      40
                    )}
                    ...
                  </p>
                </div>
              ))}

              <div
                className="p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center"
                onClick={createNewConversation}
              >
                <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">Nova conversa</span>
              </div>
            </div>
          )}

          {/* Library Categories */}
          {activeTab === "library" && (
            <div className="flex-1 flex flex-col">
              <div className="p-2 border-b">
                <div className="flex flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1 rounded-full text-xs mr-2 mb-2 ${
                        activeCategory === category
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Library Books - Now as Recommendations */}
              <div className="flex-1 overflow-y-auto p-4">
                {filteredBooks.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredBooks.map((book) => (
                      <div
                        key={book.id}
                        className="flex bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="w-24 h-32 bg-gray-200 flex-shrink-0">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-blue-600">
                              {book.category}
                            </span>
                            <span className="flex items-center text-sm text-green-600">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {book.relevance}% relevante
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-800 mt-1">
                            {book.title}
                          </h3>
                          <p className="text-xs text-gray-600">{book.author}</p>

                          {/* Recommendation reason */}
                          <p className="mt-2 text-xs text-gray-500 italic">
                            {book.recommendation}
                          </p>

                          <div className="mt-3 flex justify-end">
                            <button className="text-xs text-white bg-blue-600 px-3 py-1 rounded-full flex items-center">
                              Explorar <ChevronRight className="h-3 w-3 ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center mt-4">
                    Nenhum livro encontrado para esta categoria.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {activeTab === "chat" ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-white shadow-sm">
                <h2 className="font-semibold text-gray-800">
                  {currentChat?.title}
                </h2>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                {currentChat?.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-4 flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-3/4 rounded-lg p-3 ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {msg.sender === "user" ? (
                          <User className="h-4 w-4 mr-2" />
                        ) : (
                          <Bot className="h-4 w-4 mr-2" />
                        )}
                        <span className="text-xs opacity-75">{msg.time}</span>
                      </div>
                      <p className="whitespace-pre-line">
                        {msg.isAudio ? (
                          <span className="flex items-center">
                            <Mic className="h-4 w-4 mr-2" />
                            {msg.content}
                          </span>
                        ) : (
                          msg.content
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* File Upload Area */}
              {showFileUpload && (
                <div className="p-4 bg-blue-50 border-t border-blue-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-blue-800">
                      Enviar arquivo
                    </h3>
                    <button
                      className="text-blue-500 text-sm"
                      onClick={() => setShowFileUpload(false)}
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="mt-2 border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                    <p className="text-blue-600 font-medium mb-1">
                      Arraste arquivos ou clique para enviar
                    </p>
                    <p className="text-xs text-blue-500">
                      PDF, imagens ou áudio (até 20MB)
                    </p>

                    <div className="mt-4">
                      <button className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm">
                        Escolher arquivo
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 mr-2"
                    onClick={() => setShowFileUpload(!showFileUpload)}
                  >
                    <File className="h-5 w-5" />
                  </button>

                  <div className="flex-1 relative">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-full py-2 px-4 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Digite sua mensagem..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex">
                      {/* Botão de gravação de áudio */}
                      <button
                        className={`p-1 mr-1 rounded-full ${
                          isRecording
                            ? "text-red-500 bg-red-100"
                            : "text-blue-500 hover:bg-gray-100"
                        }`}
                        onClick={toggleRecording}
                        title={isRecording ? "Parar gravação" : "Gravar áudio"}
                      >
                        <Mic className="h-5 w-5" />
                      </button>
                      {/* Botão de envio */}
                      <button
                        className="p-1 text-blue-500 hover:bg-gray-100 rounded-full"
                        onClick={handleSendMessage}
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Library main view when library tab is active
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Recomendações para você
                </h2>
                <p className="text-gray-600">
                  Material educacional selecionado com base nos seus interesses
                  e conversas.
                </p>
              </div>

              {/* Featured Book */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-5 text-white mb-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src="/api/placeholder/140/200"
                      alt="Livro em destaque"
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-blue-100 text-sm font-medium">
                      Recomendação principal
                    </span>
                    <h3 className="text-xl font-bold mt-1">
                      Inteligência Artificial: Uma Abordagem Moderna
                    </h3>
                    <p className="text-blue-100 mt-1">
                      Stuart Russell & Peter Norvig
                    </p>
                    <p className="mt-3 text-sm text-blue-50">
                      Uma introdução abrangente aos conceitos e aplicações de
                      IA, perfeito para complementar seus estudos sobre
                      tecnologias educacionais.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-blue-100 text-sm mr-3 flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        99% relevante
                      </span>
                      <button className="bg-white text-blue-600 py-2 px-4 rounded-md text-sm font-medium">
                        Explorar conteúdo
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalized Recommendations */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Recomendações personalizadas
                  </h3>
                  <a className="text-sm text-blue-600">Ver todas</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {libraryBooks
                    .sort((a, b) => b.relevance - a.relevance)
                    .slice(0, 3)
                    .map((book) => (
                      <div
                        key={book.id}
                        className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="flex">
                          <div className="w-16 h-24 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={book.cover}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <span className="text-xs text-blue-600">
                                {book.category}
                              </span>
                              <span className="text-xs text-green-600 flex items-center">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {book.relevance}%
                              </span>
                            </div>
                            <h4 className="font-medium text-gray-800 line-clamp-2">
                              {book.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {book.author}
                            </p>
                            <button className="mt-2 text-xs text-blue-600 px-2 py-1 rounded border border-blue-200 hover:bg-blue-50">
                              Ver detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Browse by Category */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Navegue por categoria
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories
                    .filter((cat) => cat !== "Todos")
                    .map((category) => (
                      <div
                        key={category}
                        className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow text-center"
                        onClick={() => setActiveCategory(category)}
                      >
                        <BookMarked className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                        <h4 className="font-medium text-gray-800">
                          {category}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {
                            libraryBooks.filter(
                              (book) => book.category === category
                            ).length
                          }{" "}
                          livros
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
