export const StatusBox: React.FC<{ icon: React.ReactNode, count: number, label: string, iconColor: string }> = ({ icon, count, label, iconColor }) => (
  <div className="p-4 bg-white rounded-lg shadow flex items-center space-x-4">
    <div className={`p-4 rounded-full bg-gray-100 ${iconColor}`}>
      <div>{icon}</div>
    </div>
    <div>
      <p className="md:text-3xl font-semibold">{count}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  </div>
);
