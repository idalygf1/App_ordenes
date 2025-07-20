import React from 'react';
import { FiGrid } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white px-6 py-10">
      <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-md border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <FiGrid size={28} className="text-blue-400" />
          <h1 className="text-2xl font-bold text-white">Bienvenida al Dashboard</h1>
        </div>

        {/* Se removió la línea de introducción aquí */}

        {/* Tarjetas informativas */}
        
      </div>
    </div>
  );
};

export default Dashboard;
