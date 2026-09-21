import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

// Unsplash high-resolution background images
const inspirationSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    title: 'Clarity & Peace',
    quote: '"Every obstacle carries within it the seed of an equal or greater opportunity. Trust the process."',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
    title: 'Inner Harmony',
    quote: '"Peace comes from within. Do not seek it without. Align your energy daily."',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80',
    title: 'Focus & Direction',
    quote: '"Your direction is more important than your speed. Stay true to your path."',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    fetchUserDataAndSubmissions();
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % inspirationSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const fetchUserDataAndSubmissions = async () => {
    try {
      setLoading(true);
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      if (!currentUser) {
        navigate('/login');
        return;
      }

      setUser(currentUser);

      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setSubmissions(data || []);
    } catch (err) {
      console.error('Error fetching data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % inspirationSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + inspirationSlides.length) % inspirationSlides.length);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* 1. Real-Time Welcome Banner */}
      <div className="bg-neutral-900 border border-neutral-800 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
            {getGreeting()}, {user?.email ? user.email.split('@')[0] : 'User'}! 👋
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Welcome back to your dashboard.
          </p>
        </div>
        <button
          onClick={() => navigate('/app/submit')}
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 text-sm"
        >
          + New Submission
        </button>
      </div>

      {/* 2. Daily Inspiration Unsplash Image Slideshow */}
      <div className="relative overflow-hidden bg-neutral-900 text-white rounded-2xl h-64 sm:h-72 shadow-xl border border-amber-500/30 group">
        {inspirationSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 p-6 sm:p-8 flex flex-col justify-end">
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-amber-300 bg-black/40 px-3 py-1 rounded-full w-max mb-2 border border-amber-500/20">
                ✨ Daily Inspiration
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-base italic text-neutral-200 mt-1 max-w-2xl leading-relaxed">
                {slide.quote}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
        >
          ❯
        </button>

        <div className="absolute bottom-3 right-6 flex space-x-2">
          {inspirationSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentSlide ? 'bg-amber-400 w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. Real Submission History */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-md text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-amber-400">Submission History</h3>
            <p className="text-xs text-neutral-400">Your recent activity</p>
          </div>
          <button 
            onClick={() => navigate('/app/history')}
            className="text-xs bg-neutral-800 hover:bg-neutral-700 text-amber-400 px-3 py-2 rounded-lg transition-colors border border-neutral-700 font-medium"
          >
            View Full History
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-neutral-400 text-sm animate-pulse">
            Fetching your submissions...
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-10 text-neutral-400 text-sm bg-neutral-800/40 rounded-xl border border-dashed border-neutral-700/60 p-6">
            <p className="text-base text-neutral-300 font-semibold mb-1">No submissions found</p>
            <p className="text-xs text-neutral-400 mb-4">You have not created any submissions yet.</p>
            <button
              onClick={() => navigate('/app/submit')}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-4 py-2 rounded-lg text-xs border border-amber-500/40 font-semibold transition-all"
            >
              + Make Your First Submission
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {submissions.map((item) => {
              // Formats submission content cleanly using word labels instead of raw array dumps
              let displayLabel = 'NUM';

              if (Array.isArray(item.numbers) && item.numbers.length > 0) {
                displayLabel = `NUM: ${item.numbers.join(', ')}`;
              } else if (item.numbers) {
                displayLabel = `NUM: ${item.numbers}`;
              }

              return (
                <div 
                  key={item.id}
                  className="bg-neutral-800/80 border border-neutral-700/50 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-amber-500/30"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400">Submission:</span>
                      <span className="font-mono font-bold text-amber-300 tracking-wide">
                        {displayLabel}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      Submitted: {item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }) : 'Recent'}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full border font-medium ${
                    item.status?.toLowerCase() === 'finished' || item.status?.toLowerCase() === 'completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {item.status || 'Finished'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}