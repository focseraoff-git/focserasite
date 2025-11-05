export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white border rounded-xl p-6 text-center shadow-sm">
      <div className="w-14 h-14 mx-auto mb-4 bg-blue-600 text-white rounded-full flex items-center justify-center">
        <Icon size={28} />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
