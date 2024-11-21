import React, { useState, useMemo } from 'react';
import { useRBACStore } from '../utlis/Store';
import { Edit2, Trash2, UserCheck, UserX, UserPlus, ArrowUpDown } from 'lucide-react';
import { Modal } from './Modal';
import { UserForm } from './UserForm';
import { ActionButton } from './ActionButton';
import { SearchBar } from './SearchBar';
import Fuse from 'fuse.js';

export const UserTable: React.FC = () => {
  const { users, roles, deleteUser, selectedUser, setSelectedUser } = useRBACStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: 'name' | 'email' | 'role' | 'status';
    direction: 'asc' | 'desc';
  }>({ key: 'name', direction: 'asc' });
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const fuse = new Fuse(users, {
    keys: ['name', 'email'],
    threshold: 0.3,
  });

  const getRoleName = (roleId: string): string => {
    return roles.find((role) => role.id === roleId)?.name || 'Unknown';
  };

  const sortedAndFilteredUsers = useMemo(() => {
    let filteredUsers = searchQuery
      ? fuse.search(searchQuery).map(result => result.item)
      : users;

    return [...filteredUsers].sort((a, b) => {
      let comparison = 0;
      switch (sortConfig.key) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'role':
          comparison = getRoleName(a.roleId).localeCompare(getRoleName(b.roleId));
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [users, searchQuery, sortConfig]);

  const handleSort = (key: typeof sortConfig.key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUsers(e.target.checked ? sortedAndFilteredUsers.map(u => u.id) : []);
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(current =>
      current.includes(userId)
        ? current.filter(id => id !== userId)
        : [...current, userId]
    );
  };

  const handleBulkDelete = () => {
    selectedUsers.forEach(deleteUser);
    setSelectedUsers([]);
  };

  return (
    <>
      <div className="mb-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Users</h2>
          <div className="flex space-x-2">
            {selectedUsers.length > 0 && (
              <ActionButton
                icon={Trash2}
                label={`Delete Selected (${selectedUsers.length})`}
                onClick={handleBulkDelete}
                variant="danger"
              />
            )}
            <ActionButton
              icon={UserPlus}
              label="Add User"
              onClick={() => setShowAddModal(true)}
            />
          </div>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search users by name or email..."
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === sortedAndFilteredUsers.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </th>
              {['User', 'Role', 'Status'].map((header, index) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(['name', 'role', 'status'][index] as typeof sortConfig.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAndFilteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {getRoleName(user.roleId)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.status === 'active' ? (
                    <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      <UserCheck className="w-4 h-4 mr-1" />
                      Active
                    </span>
                  ) : (
                    <span className="px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      <UserX className="w-4 h-4 mr-1" />
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
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
        title="Add New User"
      >
        <UserForm onClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal
        isOpen={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
        title="Edit User"
      >
        {selectedUser && (
          <UserForm user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
      </Modal>
    </>
  );
};