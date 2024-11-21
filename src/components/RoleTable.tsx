import React, { useState } from 'react';
import { useRBACStore } from '../utlis/Store';
import { Edit2, Trash2, Shield, ShieldPlus } from 'lucide-react';
import { Modal } from './Modal';
import { RoleForm } from './RoleForm';
import { ActionButton } from './ActionButton';

export const RoleTable: React.FC = () => {
  const { roles, deleteRole, selectedRole, setSelectedRole } = useRBACStore();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Roles</h2>
        <ActionButton
          icon={ShieldPlus}
          label="Add Role"
          onClick={() => setShowAddModal(true)}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{role.name}</div>
                      <div className="text-sm text-gray-500">{role.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800"
                      >
                        {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedRole(role)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Role"
      >
        <RoleForm onClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        isOpen={selectedRole !== null}
        onClose={() => setSelectedRole(null)}
        title="Edit Role"
      >
        {selectedRole && (
          <RoleForm role={selectedRole} onClose={() => setSelectedRole(null)} />
        )}
      </Modal>
    </>
  );
};