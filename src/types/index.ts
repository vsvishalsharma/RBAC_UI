export type Permission = 'read' | 'write' | 'delete' | 'manage_users' | 'manage_roles';

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: 'active' | 'inactive';
  avatar: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface RBACStore {
  users: User[];
  roles: Role[];
  selectedUser: User | null;
  selectedRole: Role | null;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, 'id'>) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  setSelectedUser: (user: User | null) => void;
  setSelectedRole: (role: Role | null) => void;
}