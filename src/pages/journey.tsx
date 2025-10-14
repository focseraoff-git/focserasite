import { Rocket, Flag, Users, Award, Milestone } from 'lucide-react';

// Helper component for individual timeline items
const TimelineItem = ({ year, title, description, icon, isLeft }) => (
  <div className={`relative w-full md:w-1/2 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'} mb-12`}>
    <div className="absolute top-0 w-px h-full bg-blue-200 left-0 md:left-1/2 md:-translate-x-1/2"></div>
    <div className="absolute top-0 left-0 md:left-1/2 w-8 h-8 bg-[#0052CC] rounded-full flex items-center justify-center -translate-x-1/2">
      <div className="text-white">{icon}</div>
    </div>
    <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ml-8 md:ml-0">
      <p className="text-lg font-bold text-[#0052CC] mb-2">{year}</p>
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function Journey() {
  const journeyData = [
    {
      year: '2020',
      title: 'The Spark of an Idea',
      description: 'Focsera was born from a shared vision to integrate creativity and technology, aiming to provide innovative digital solutions across various media.',
      icon: <Rocket size={18} />
    },
    {
      year: '2021',
      title: 'Official Launch & First Division',
      description: 'We officially launched with our first division, Focsera Studios, focusing on high-quality video production and creative content.',
      icon: <Flag size={18} />
    },
    {
      year: '2022',
      title: 'Expanding Our Horizons',
      description: 'Introduced Focsera Web and Focsera Events, expanding our service offerings to include web development and comprehensive event management.',
      icon: <Users size={18} />
    },
    {
      year: '2023',
      title: 'Recognition and Growth',
      description: 'Received our first industry award for innovation in digital media. Our team grew to over 50 talented professionals dedicated to excellence.',
      icon: <Award size={18} />
    },
    {
      year: '2024',
      title: 'Future Forward',
      description: 'Launched Focsera Skill and Product Services, solidifying our commitment to empowering individuals and businesses with cutting-edge tools and training.',
      icon: <Milestone size={18} />
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Our Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From a simple idea to a multi-divisional powerhouse. Follow our story of growth, innovation, and passion.
          </p>
          <div className="w-24 h-1.5 bg-[#0052CC] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {/* The vertical line for the timeline on medium and up screens */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-blue-200 -translate-x-1/2"></div>
          
          <div className="flex flex-col md:flex-row flex-wrap items-center">
            {journeyData.map((item, index) => (
              <div key={index} className="w-full flex md:justify-center">
                {/* On MD screens, odd items are pushed to the left, even to the right */}
                {index % 2 === 0 ? (
                  <TimelineItem {...item} isLeft={true} />
                ) : (
                  <div className="w-full md:w-1/2"></div> // Spacer for left side
                )}
                 {index % 2 !== 0 ? (
                  <TimelineItem {...item} isLeft={false} />
                ) : (
                  <div className="w-full md:w-1/2"></div> // Spacer for right side
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
