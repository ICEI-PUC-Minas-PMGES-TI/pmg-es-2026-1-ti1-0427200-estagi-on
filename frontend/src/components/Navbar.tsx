import React from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Título */}
          <div className="flex-shrink-0 font-bold text-2xl tracking-wider">
            <a href="/" className="hover:text-blue-200 transition-colors">
              EstagiON
            </a>
          </div>

          {/* Links de Navegação (Desktop) */}
          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="/mural"
              className="hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
            >
              Mural de Vagas
            </a>
            <a
              href="/sobre"
              className="hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
            >
              Sobre
            </a>
          </div>

          {/* Ações / Login */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/login"
              className="font-medium hover:text-blue-200 transition-colors"
            >
              Entrar
            </a>
            <a
              href="/cadastro"
              className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors shadow-sm"
            >
              Criar Conta
            </a>
          </div>

          {/* Botão Sanduíche para Mobile */}
          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-blue-200 focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
