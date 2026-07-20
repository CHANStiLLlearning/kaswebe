import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, BookOpen, Globe, Languages, MessageSquare,
  Clock, GraduationCap, Users, AlertCircle, Loader2
} from 'lucide-react';
import { programService } from '../../services/programService';
import type { Program } from '../../types';
import { stripStyles } from '../../utils';

// ─── Icon resolver (matches what ProgramsIndex uses) ─────────────────────────
const resolveIcon = (name: string, classes = 'w-10 h-10') => {
  switch (name) {
    case 'globe':          return <Globe className={classes} />;
    case 'message-square': return <MessageSquare className={classes} />;
    case 'languages':      return <Languages className={classes} />;
    case 'book-open':
    default:               return <BookOpen className={classes} />;
  }
};

// ─── Colour theme resolver ────────────────────────────────────────────────────
const resolveTheme = (colorClass: string) => {
  if (colorClass.includes('emerald'))              return { accent: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' };
  if (colorClass.includes('amber') || colorClass.includes('#EBA525')) return { accent: 'text-[#EBA525]', bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' };
  if (colorClass.includes('red'))                  return { accent: 'text-red-600',     bg: 'bg-red-50',    border: 'border-red-200',    badge: 'bg-red-100 text-red-700' };
  return { accent: 'text-[#1E3A8A]', bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-[#1E3A8A]' };
};

// ─── Component ────────────────────────────────────────────────────────────────
const ProgramDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const numericId = parseInt(id ?? '');
    if (isNaN(numericId)) {
      setError('Invalid program.');
      setLoading(false);
      return;
    }

    programService
      .getById(numericId)
      .then(setProgram)
      .catch(() => setError('Program not found or could not be loaded.'))
      .finally(() => setLoading(false));
  }, [id]);

  // ─── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin text-[#1E3A8A]" />
        <p className="text-sm font-medium">Loading program details…</p>
      </div>
    );
  }

  // ─── Error state ────────────────────────────────────────────────────────────
  if (error || !program) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Program Not Found</h2>
          <p className="text-gray-500 text-sm max-w-sm">{error || 'This program does not exist.'}</p>
        </div>
        <button
          onClick={() => navigate('/programs')}
          className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-[#172554] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Programs
        </button>
      </div>
    );
  }

  const theme = resolveTheme(program.colorClass ?? '');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero / Banner */}
      {program.image && (
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
              {program.title}
            </h1>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back link */}
        <Link
          to="/programs"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1E3A8A] mb-8 font-bold transition-all hover:-translate-x-1 text-sm group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Programs
        </Link>

        {/* Title (if no banner image) */}
        {!program.image && (
          <div className={`inline-flex items-center gap-4 mb-6 p-4 rounded-2xl ${theme.bg} ${theme.border} border`}>
            <span className={theme.accent}>
              {resolveIcon(program.iconName ?? 'book-open')}
            </span>
            <h1 className={`text-3xl md:text-4xl font-extrabold ${theme.accent}`}>
              {program.title}
            </h1>
          </div>
        )}

        {/* Meta badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${theme.badge}`}>
            <Clock className="w-3.5 h-3.5" />
            Age: {program.ageRange ?? '3 – 18 Years'}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">
            <GraduationCap className="w-3.5 h-3.5" />
            Grades: {program.gradeLevel ?? 'Nursery – Grade 12'}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
            <Users className="w-3.5 h-3.5" />
            Open Enrollment
          </span>
        </div>

        {/* Divider */}
        <div className={`w-16 h-1 rounded-full mb-8 ${theme.accent.replace('text-', 'bg-')}`} />

        {/* Description / Content */}
        <div
          className="prose prose-lg text-gray-600 max-w-none
            prose-headings:text-gray-800 prose-headings:font-semibold
            prose-strong:text-gray-800 prose-ul:pl-6 prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: stripStyles(program.description) }}
        />

        {/* CTA */}
        <div className={`mt-12 p-6 rounded-2xl ${theme.bg} ${theme.border} border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
          <div>
            <p className="font-bold text-gray-800">Interested in this program?</p>
            <p className="text-sm text-gray-500 mt-0.5">Reach out to our admissions team for more details.</p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#172554] text-white font-bold py-2.5 px-6 rounded-xl transition-colors text-sm"
          >
            Contact Admissions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
