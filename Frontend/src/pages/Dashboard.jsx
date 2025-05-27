import Sidebar from '../components/Shared/Sidebar';
import Navbar from '../components/Shared/Sidebar';
import StatsCard from '../components/Dashboard/StatsCard';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatsCard 
              title="Total Agents" 
              value="24" 
              icon={<UsersIcon className="h-6 w-6 text-blue-500" />} 
              color="blue"
            />
            <StatsCard 
              title="Lists Uploaded" 
              value="128" 
              icon={<DocumentIcon className="h-6 w-6 text-green-500" />} 
              color="green"
            />
            <StatsCard 
              title="Active Tasks" 
              value="15" 
              icon={<ClipboardIcon className="h-6 w-6 text-orange-500" />} 
              color="orange"
            />
          </div>
          
          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h2>
            {/* Activity items would go here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;