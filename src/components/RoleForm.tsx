import React, { useState } from 'react';
import { useRBACStore } from '../utlis/Store';
import { Role, Permission } from '../types';
import { ActionButton } from './ActionButton';
import { Save, X } from 'lucide-react';

interface RoleFormProps {
  role?: Role;
  onClose: () => void;
}

const availablePermissions: Permission[] = ['read', 'write', 'delete', 'manage_users', 'manage_roles'];

export const RoleForm: React.FC<RoleFormProps> = ({ role, onClose }) => {
  const { addRole, updateRole } = useRBACStore();
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || ['read']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      updateRole(role.id, formData);
    } else {
      addRole(formData);
    }
    onClose();
  };

  const togglePermission = (permission: Permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
        <div className="space-y-2">
          {availablePermissions.map((permission) => (
            <label key={permission} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.permissions.includes(permission)}
                onChange={() => togglePermission(permission)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
        <ActionButton icon={Save} label="Save" onClick={handleSubmit} />
        <ActionButton icon={X} label="Cancel" variant="secondary" onClick={onClose} />
      </div>
    </form>
  );
};