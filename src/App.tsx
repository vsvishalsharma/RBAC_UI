import { useState } from 'react'; 
import { Header } from './components/Header'; 
import { UserTable } from './components/UserTable'; 
import { RoleTable } from './components/RoleTable'; 
import { Analytics } from './components/Analytics'; 
import { Users, ShieldCheck } from 'lucide-react'; 
import UserRolePieChart from './components/Chart'; 
 
function App() { 
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users'); 
 
  return ( 
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200"> 
      <Header /> 
       
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
        <Analytics /> 
         
        <div className="mb-8"> 
          <div className="sm:hidden"> 
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value as 'users' | 'roles')} 
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 sm:text-sm transition-colors duration-200" 
            > 
              <option value="users">Users</option> 
              <option value="roles">Roles</option> 
            </select> 
          </div> 
          <div className="hidden sm:block"> 
            <div className="border-b border-gray-200 dark:border-gray-700"> 
              <nav className="-mb-px flex space-x-8" aria-label="Tabs"> 
                <button 
                  onClick={() => setActiveTab('users')} 
                  className={`${ 
                    activeTab === 'users' 
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300' 
                  } flex whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm items-center transition-colors duration-200`} 
                > 
                  <Users className="mr-2 h-5 w-5" /> 
                  Users 
                </button> 
                <button 
                  onClick={() => setActiveTab('roles')} 
                  className={`${ 
                    activeTab === 'roles' 
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300' 
                  } flex whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm items-center transition-colors duration-200`} 
                > 
                  <ShieldCheck className="mr-2 h-5 w-5" /> 
                  Roles 
                </button> 
              </nav> 
            </div> 
          </div> 
        </div> 
 
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activeTab === 'users' ? (
          <div className="lg:col-span-2">
            <UserTable />
          </div>
        ) : (
          <div className="lg:col-span-2">
            <RoleTable />
          </div>
        )}
        <div className='flex justify-center items-center'>
          <UserRolePieChart />
        </div>
      </div>

      </main> 
    </div> 
  ); 
} 
 
export default App;