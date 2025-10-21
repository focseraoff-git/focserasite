import React from 'react';

type Props = {
  title?: string;
  subtitle?: string;
  details?: React.ReactNode;
  onClose: () => void;
};

export default function FancyModal({ title = 'Thank you!', subtitle = 'We received your inquiry.', details = null, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 border-2 border-[#0052CC] overflow-hidden">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          </div>
        </div>

        <div className="mt-4 text-gray-700 prose max-w-none">
          {details}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
            <div className="font-bold text-lg text-[#0052CC]">1</div>
            <div className="text-sm text-gray-700">Confirmation Email</div>
            <div className="text-xs text-gray-500">Sent shortly</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
            <div className="font-bold text-lg text-[#0052CC]">2</div>
            <div className="text-sm text-gray-700">Team Contact</div>
            <div className="text-xs text-gray-500">Within 24 hours</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
            <div className="font-bold text-lg text-[#0052CC]">3</div>
            <div className="text-sm text-gray-700">Finalization</div>
            <div className="text-xs text-gray-500">Pricing & schedule</div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 rounded-xl bg-[#0052CC] text-white font-semibold">Close</button>
        </div>
      </div>
    </div>
  );
}
