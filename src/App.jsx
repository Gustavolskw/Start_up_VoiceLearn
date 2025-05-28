import React, { useState } from 'react';
import { 
  Car,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  LogIn
} from 'lucide-react';

const JECaronaLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle form changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call: POST /auth/login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('API Call: POST /auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      // Mock response based on email to simulate different user types
      const userType = formData.email.includes('admin') ? 'admin' : 'user';
      
      if (userType === 'admin') {
        alert('Login realizado! Redirecionando para Painel de Moderação...');
        console.log('Redirecionando para: /admin/dashboard');
      } else {
        alert('Login realizado! Redirecionando para Dashboard...');
        console.log('Redirecionando para: /dashboard');
      }
      
    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({ general: 'Erro ao fazer login. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="text-red-600">JE</span>
            <span className="text-black">Carona</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Conectando torcedores de Joinville
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-red-600 text-sm">{errors.general}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="seu@email.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua senha"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Entrar
                </>
              )}
            </button>

            {/* Register Button */}
            <button
              onClick={() => alert('Tela de cadastro será implementada!')}
              className="w-full bg-white text-red-600 py-3 px-4 rounded-lg border-2 border-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center"
            >
              <Car className="w-5 h-5 mr-2" />
              Criar Conta
            </button>

            {/* Demo Credentials */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Credenciais de Teste:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Usuário comum:</span>
                  <span className="font-mono">user@jecarona.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Administrador:</span>
                  <span className="font-mono">admin@jecarona.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Senha:</span>
                  <span className="font-mono">123456</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Conectando torcedores do JEC e Krona através de caronas solidárias
          </p>
          <div className="flex items-center justify-center mt-2 text-gray-500">
            <Car className="w-4 h-4 mr-1" />
            <span className="text-xs">Joinville - SC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JECaronaLogin;