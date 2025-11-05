export default function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    yellow: "from-yellow-500 to-yellow-600",
    green: "from-green-500 to-green-600",
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border flex items-center gap-5">
      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colors[color]} flex items-center justify-center`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">{label}</div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
