import React from 'react';
import { useRBACStore } from '../utlis/Store';
import { Users, Shield, Lock, AlertTriangle } from 'lucide-react';

export const Analytics: React.FC = () => {
  const { users, roles } = useRBACStore();

  const analytics = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    inactiveUsers: users.filter(u => u.status === 'inactive').length,
    totalRoles: roles.length,
    avgPermissions: Math.round(roles.reduce((acc, role) => acc + role.permissions.length, 0) / roles.length),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <Users className="h-6 w-6 text-blue-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="text-lg font-semibold text-gray-900">{analytics.totalUsers}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-green-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Active Users</p>
            <p className="text-lg font-semibold text-gray-900">{analytics.activeUsers}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-red-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">InActive Users</p>
            <p className="text-lg font-semibold text-gray-900">{analytics.inactiveUsers}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <Lock className="h-6 w-6 text-purple-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">Total Roles</p>
            <p className="text-lg font-semibold text-gray-900">{analytics.totalRoles}</p>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};