import { Target, Eye } from 'lucide-react';

interface MissionVisionProps {
  missionTitle: string;
  missionDesc: string;
  visionTitle: string;
  visionDesc: string;
}

const MissionVision = ({ missionTitle, missionDesc, visionTitle, visionDesc }: MissionVisionProps) => {
  return (
    <section id="mission-vision" className="py-16 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Mission Card */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border-t-8 border-[#1E3A8A] shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-[#1E3A8A]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">{missionTitle}</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
              {missionDesc}
            </p>
          </div>
          
          {/* Vision Card */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border-t-8 border-[#EBA525] shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#EBA525]/10 flex items-center justify-center">
                <Eye className="w-8 h-8 text-[#EBA525]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">{visionTitle}</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
              {visionDesc}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;
