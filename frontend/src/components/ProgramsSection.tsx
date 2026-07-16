

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Globe, MessageSquare, Languages, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

type BackendProgram = {
  id: number;
  title: string;
  description: string;
  path: string;
  iconName: string;
  colorClass: string;
};

const defaultPrograms: BackendProgram[] = [
  {
    id: 1,
    title: 'Khmer General Education',
    description: 'A comprehensive national curriculum recognized by the Ministry of Education, Youth and Sport.',
    path: '/programs/kge',
    iconName: 'book-open',
    colorClass: 'bg-blue-50/70 text-blue-600 border border-blue-100/50',
  },
  {
    id: 2,
    title: 'Integrated English Program (IEP)',
    description: 'An advanced dual-curriculum blending Cambodian national standards with international English proficiency.',
    path: '/programs/iep',
    iconName: 'globe',
    colorClass: 'bg-amber-50/70 text-amber-500 border border-amber-100/50',
  },
  {
    id: 3,
    title: 'General English Program (GEP)',
    description: 'Dedicated English language instruction focused on listening, speaking, reading, and writing skills.',
    path: '/programs/gep',
    iconName: 'message-square',
    colorClass: 'bg-emerald-50/70 text-emerald-600 border border-emerald-100/50',
  },
  {
    id: 4,
    title: 'Chinese Language Program',
    description: 'Standardized Chinese language courses equipping students for international opportunities.',
    path: '/programs/chinese',
    iconName: 'languages',
    colorClass: 'bg-red-50/70 text-[#9A2220] border border-red-100/50',
  },
];

const ProgramsSection = () => {
  const [programs, setPrograms] = useState<BackendProgram[]>(defaultPrograms);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/programs`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch programs');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPrograms(data);
        }
      })
      .catch(err => {
        console.warn('Fallback to default programs:', err);
      });
  }, []);

  const resolveIcon = (name: string) => {
    switch (name) {
      case 'globe':
        return Globe;
      case 'message-square':
        return MessageSquare;
      case 'languages':
        return Languages;
      case 'book-open':
      default:
        return BookOpen;
    }
  };

  return (
    <section className="py-20 bg-gray-50/40 border-y border-gray-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#9A2220]">
            Explore Our Programs
          </h2>
          <div className="w-16 h-1 bg-[#EBA525] mx-auto rounded-full mt-3"></div>
          <p className="max-w-2xl mx-auto mt-5 text-gray-500 text-sm md:text-[15px] font-sans leading-relaxed">
            Choose from a wide variety of academic programs tailored to foster intellectual growth, cultural appreciation, and global readiness.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {programs.map((program, index) => {
            const IconComponent = resolveIcon(program.iconName);
            return (
              <Link
                key={index}
                to={program.path}
                className="relative bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start text-left cursor-pointer"
              >
                {/* Decorative background shape in top right corner */}
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-2xl pointer-events-none">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gray-50 rounded-full transition-all duration-300 group-hover:bg-[#9A2220]/5 group-hover:scale-110"></div>
                </div>

                {/* Arrow Icon in Top Right */}
                <div className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#9A2220] group-hover:border-[#9A2220]/30 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)] z-10">
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>

                {/* Program Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${program.colorClass} mb-6 transition-transform duration-300 group-hover:scale-105`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-800 mb-3 group-hover:text-[#9A2220] transition-colors leading-tight">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm md:text-[14px] leading-relaxed font-sans pr-4">
                  {program.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
