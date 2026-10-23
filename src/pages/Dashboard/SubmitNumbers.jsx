// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Info, Check, Loader2, ScrollText, Send } from 'lucide-react';

// // UI Primitives
// import { Card } from '../../components/ui/Card';
// import { Button } from '../../components/ui/Button';
// import { Badge } from '../../components/ui/Badge';

// // Custom Page Widgets
// import { SubmissionPreview } from '../../components/widgets/SubmissionPreview';
// import { SubmissionSuccessModal } from '../../components/widgets/SubmissionSuccessModal';
// import { RecentSubmissionWidget } from '../../components/widgets/RecentSubmissionWidget';

// // Mock Data
// import {
//   initialRecentSubmission,
//   submissionGuidelines,
//   submissionNoticeRules,
// } from '../../data/submitNumbersData';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 16 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: 'easeOut' },
//   },
// };

// export const SubmitNumbers = () => {
//   const navigate = useNavigate();

//   // Form State
//   const [numbers, setNumbers] = useState(['', '', '', '']);
//   const [errors, setErrors] = useState(['', '', '', '']);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [recentSubmission, setRecentSubmission] = useState(initialRecentSubmission);

//   // Input Change Handler
//   const handleInputChange = (index, value) => {
//     // Sanitize input: digits only
//     const digitsOnly = value.replace(/\D/g, '').slice(0, 2);

//     const newNumbers = [...numbers];
//     newNumbers[index] = digitsOnly;
//     setNumbers(newNumbers);

//     // Clear individual field error
//     const newErrors = [...errors];
//     newErrors[index] = '';
//     setErrors(newErrors);

//     // Auto-focus next field if 2 digits are entered
//     if (digitsOnly.length === 2 && index < 3) {
//       const nextInput = document.getElementById(`number-input-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   // Form Validation & Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let hasError = false;
//     const newErrors = ['', '', '', ''];

//     numbers.forEach((num, idx) => {
//       if (!num || num.trim() === '') {
//         newErrors[idx] = 'Required';
//         hasError = true;
//       }
//     });

//     if (hasError) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsSubmitting(true);

//     // Simulated API latency
//     setTimeout(() => {
//       const submittedSequence = numbers.map((n) => parseInt(n, 10));

//       setRecentSubmission({
//         id: `sub-${Math.floor(1000 + Math.random() * 9000)}`,
//         numbers: submittedSequence,
//         status: 'Pending Review',
//         submittedAt: 'August 3, 2026',
//       });

//       setIsSubmitting(false);
//       setIsModalOpen(true);
//     }, 1200);
//   };

//   const handleResetForm = () => {
//     setNumbers(['', '', '', '']);
//     setErrors(['', '', '', '']);
//     setIsModalOpen(false);
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-6 max-w-6xl mx-auto"
//     >
//       {/* Section 1: Page Header */}
//       <motion.div variants={itemVariants}>
//         <div className="border-l-4 border-l-gold-500 pl-4 py-1">
//           <h1 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
//             Submit Your Numbers
//           </h1>
//           <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
//             Enter the four numbers exactly as received. Your submission will be reviewed and you will receive a notification once guidance is available.
//           </p>
//         </div>
//       </motion.div>

//       {/* Main 2-Column Responsive Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
//         {/* Left Column: Form & Info (2 Cols wide on Desktop) */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Section 2: Important Information Card */}
//           <motion.div variants={itemVariants}>
//             <Card className="border-gold-500/30 bg-gold-500/5">
//               <div className="flex items-center gap-3 pb-3 border-b border-gold-500/15 mb-3">
//                 <div className="p-2 rounded-xl bg-gold-500/10 text-gold-400">
//                   <Info className="w-5 h-5" />
//                 </div>
//                 <h3 className="text-sm font-serif font-bold text-gold-300 uppercase tracking-wider">
//                   Important Information
//                 </h3>
//               </div>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
//                 {submissionNoticeRules.map((rule, idx) => (
//                   <li key={idx} className="flex items-start gap-2">
//                     <span className="text-gold-400 font-bold">•</span>
//                     <span>{rule}</span>
//                   </li>
//                 ))}
//               </ul>
//             </Card>
//           </motion.div>

//           {/* Section 3 & 4: Submission Form */}
//           <motion.div variants={itemVariants}>
//             <Card>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="flex items-center justify-between pb-3 border-b border-gold-500/10">
//                   <h3 className="text-base font-serif font-bold text-gold-300">
//                     Numerical Entry
//                   </h3>
//                   <Badge variant="gold" className="text-[10px]">
//                     4 Digits Required
//                   </Badge>
//                 </div>

//                 {/* Four Number Inputs */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
//                   {[0, 1, 2, 3].map((idx) => (
//                     <div key={idx} className="flex flex-col gap-1.5">
//                       <label
//                         htmlFor={`number-input-${idx}`}
//                         className="text-xs font-medium text-neutral-300 text-center"
//                       >
//                         Number {idx + 1}
//                       </label>
//                       <input
//                         id={`number-input-${idx}`}
//                         type="text"
//                         inputMode="numeric"
//                         maxLength={2}
//                         value={numbers[idx]}
//                         onChange={(e) => handleInputChange(idx, e.target.value)}
//                         placeholder="00"
//                         className={`w-full h-16 sm:h-20 text-center font-serif font-bold text-2xl sm:text-3xl rounded-2xl bg-obsidian-950 border text-gold-300 placeholder-neutral-700 focus:outline-none transition-all shadow-inner ${
//                           errors[idx]
//                             ? 'border-red-500/60 focus:border-red-500'
//                             : 'border-gold-500/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/40'
//                         }`}
//                       />
//                       {errors[idx] && (
//                         <span className="text-[10px] text-red-400 text-center font-medium">
//                           {errors[idx]}
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Live Sequence Preview */}
//                 <SubmissionPreview numbers={numbers} />

//                 {/* Submit Action */}
//                 <Button
//                   type="submit"
//                   variant="primary"
//                   size="lg"
//                   disabled={isSubmitting}
//                   className="w-full justify-center text-base py-4 font-serif font-bold shadow-gold-500/20 shadow-lg cursor-pointer"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin mr-2" />
//                       Processing Submission...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-5 h-5 mr-2" />
//                       Submit Numbers
//                     </>
//                   )}
//                 </Button>
//               </form>
//             </Card>
//           </motion.div>
//         </div>

//         {/* Right Column: Recent Submission & Guidelines */}
//         <div className="space-y-6">
//           {/* Section 6: Recent Submission Card */}
//           <motion.div variants={itemVariants}>
//             <RecentSubmissionWidget
//               numbers={recentSubmission.numbers}
//               submittedDate={recentSubmission.submittedAt}
//               status={recentSubmission.status}
//               onViewHistory={() => navigate('/app/history')}
//             />
//           </motion.div>

//           {/* Section 7: Guidelines Card */}
//           <motion.div variants={itemVariants}>
//             <Card className="space-y-4">
//               <div className="flex items-center gap-2 pb-3 border-b border-gold-500/10">
//                 <ScrollText className="w-4 h-4 text-gold-400" />
//                 <h3 className="text-sm font-serif font-bold text-gold-300 uppercase tracking-wider">
//                   Submission Guidelines
//                 </h3>
//               </div>
//               <ul className="space-y-3 text-xs text-neutral-300">
//                 {submissionGuidelines.map((guideline, idx) => (
//                   <li key={idx} className="flex items-start gap-2.5">
//                     <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
//                     <span className="leading-relaxed">{guideline}</span>
//                   </li>
//                 ))}
//               </ul>
//             </Card>
//           </motion.div>
//         </div>
//       </div>

//       {/* Section 5: Success Confirmation Modal */}
//       <SubmissionSuccessModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         submittedNumbers={recentSubmission.numbers}
//         onViewHistory={() => {
//           setIsModalOpen(false);
//           navigate('/app/history');
//         }}
//         onSubmitAnother={handleResetForm}
//       />
//     </motion.div>
//   );
// };

// export default SubmitNumbers;

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  Wind, 
  Brain, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Eye, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../lib/supabaseClient';

export const SubmitNumbers = () => {
  const [numbers, setNumbers] = useState(['', '', '', '']);
  const [errors, setErrors] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitError, setSubmitError] = useState('');

  // Video State
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleInputChange = (index, value) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 2);
    const newNumbers = [...numbers];
    newNumbers[index] = digitsOnly;
    setNumbers(newNumbers);

    const newErrors = [...errors];
    newErrors[index] = '';
    setErrors(newErrors);

    if (digitsOnly.length === 2 && index < 3) {
      const nextInput = document.getElementById(`number-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitError('');
    setSubmittedData(null);

    let hasError = false;
    const newErrors = ['', '', '', ''];

    // Validate inputs
    numbers.forEach((num, idx) => {
      if (!num || num.trim() === '') {
        newErrors[idx] = 'Required';
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Get currently logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('You must be logged in to submit numbers for divine consultation.');
      }

      // 2. Save submission to Supabase
      const { data, error } = await supabase
        .from('submissions')
        .insert({
          user_id: user.id,
          number_1: parseInt(numbers[0], 10),
          number_2: parseInt(numbers[1], 10),
          number_3: parseInt(numbers[2], 10),
          number_4: parseInt(numbers[3], 10),
        })
        .select()
        .single();

      if (error) {
        console.error('Submission error:', error);
        throw error;
      }

      // 3. Show success message
      setSubmittedData({
        id: data.id,
        numbers: [
          data.number_1,
          data.number_2,
          data.number_3,
          data.number_4,
        ],
        status: data.status,
      });

      // 4. Clear form
      setNumbers(['', '', '', '']);

    } catch (error) {
      console.error('SUBMISSION ERROR:', error);

      setSubmitError(
        error.message || 'Failed to submit numbers. Please try again.'
      );

    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      step: '01',
      title: 'Center Your Mind',
      description: 'Breathe in and out calmly. Clear your thoughts of daily noise.',
      icon: Wind,
      color: 'from-amber-500/20 to-yellow-500/10'
    },
    {
      step: '02',
      title: 'Intuitive Channeling',
      description: 'Pick 4 numbers, one after another, as they emerge naturally from your subconscious.',
      icon: Brain,
      color: 'from-gold-500/20 to-amber-600/10'
    },
    {
      step: '03',
      title: 'Submit for Guidance',
      description: 'Input your 4 sacred numbers below to unlock divine insight and geo-therapy alignment.',
      icon: Sparkles,
      color: 'from-emerald-500/20 to-teal-600/10'
    }
  ];

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-10 text-neutral-200">
      
      {/* Background Realm Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-gold-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="text-center space-y-3">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-xs tracking-widest uppercase font-mono"
        >
          <Eye className="w-3.5 h-3.5" /> Geo-Therapy & Divine Numerology
        </motion.div>
        
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-amber-500">
          Sacred Number Submission
        </h1>
        <p className="text-sm text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
          Follow the ancient preparation ritual before entering your numbers to receive clarity, guidance, and spiritual alignment.
        </p>
      </div>

      {/* Video Demonstration Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-1 sm:p-2 border-gold-500/30 bg-obsidian-900/80 backdrop-blur-md overflow-hidden shadow-2xl relative">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black/60 border border-gold-500/20 group">
            <video
              ref={videoRef}
              src="/videos/video1.mp4"
              className="w-full h-full object-cover"
              loop
              playsInline
              muted={isMuted}
              onEnded={() => setIsPlaying(false)}
            />
            
            {/* Custom Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-gold-300 bg-black/50 px-2 py-1 rounded border border-gold-500/30 backdrop-blur">
                  Demonstration Video
                </span>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/60 text-gold-300 border border-gold-500/30 hover:bg-gold-500/20 transition-all"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={toggleVideoPlay}
                    className="p-4 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/50 hover:scale-110 hover:bg-gold-500/30 backdrop-blur-md transition-all shadow-lg"
                  >
                    <Play className="w-8 h-8 fill-current ml-0.5" />
                  </button>
                </div>
              )}

              <div className="flex justify-between items-end">
                <div className="text-xs text-neutral-300 font-light">
                  Watch the ritual demonstration procedure
                </div>
                {isPlaying && (
                  <button
                    type="button"
                    onClick={toggleVideoPlay}
                    className="p-2 rounded-full bg-black/60 text-gold-300 border border-gold-500/30 hover:bg-gold-500/20 transition-all"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* How It Works - Step-by-Step Guidance */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <h2 className="text-xs uppercase tracking-widest text-gold-400 font-mono">
            How It Works • Guided Procedure
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className={`p-5 h-full border-gold-500/20 bg-gradient-to-b ${item.color} backdrop-blur-md relative overflow-hidden flex flex-col justify-between hover:border-gold-500/40 transition-all`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono text-gold-400/60 font-bold">
                        STEP {item.step}
                      </span>
                    </div>
                    <h3 className="font-serif font-semibold text-neutral-100 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Form Section */}
      <Card className="p-6 sm:p-8 border-gold-500/30 bg-obsidian-950/90 backdrop-blur-xl relative shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gold-500/15 pb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-gold-300">
              Input Your 4 Intuitive Numbers
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Enter each two-digit number into the channeled slots below.
            </p>
          </div>
          <ShieldCheck className="w-5 h-5 text-gold-400/60" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 4 Input Fields */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 text-center">
                  Number 0{idx + 1}
                </label>
                <input
                  id={`number-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={numbers[idx]}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  placeholder="00"
                  className={`w-full h-16 text-center font-serif font-bold text-2xl rounded-xl bg-black/60 border text-gold-300 placeholder-neutral-700 focus:outline-none transition-all shadow-inner ${
                    errors[idx]
                      ? 'border-red-500/60 focus:border-red-500 bg-red-950/10'
                      : 'border-gold-500/30 focus:border-gold-400 focus:ring-2 focus:ring-gold-500/30'
                  }`}
                />
                {errors[idx] && (
                  <span className="text-[10px] text-red-400 text-center flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors[idx]}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full py-3.5 text-sm font-serif font-bold justify-center bg-gradient-to-r from-gold-600 via-amber-500 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-obsidian-950 shadow-lg shadow-gold-500/10 transition-all border border-gold-300/30"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'TRANSMITTING SACRED NUMBERS...' : 'SUBMIT NUMBERS FOR REVIEW'}
          </Button>
        </form>

        {/* Submission Error */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4 border-red-500/30 bg-red-500/10 backdrop-blur">
              <p className="text-red-300 text-xs sm:text-sm text-center flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {submitError}
              </p>
            </Card>
          </motion.div>
        )}

        {/* Submission Feedback */}
        {submittedData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-5 border-emerald-500/40 bg-emerald-500/10 backdrop-blur space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-medium text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Sacred numbers submitted successfully!</span>
              </div>

              <div className="flex items-center justify-between text-xs border-t border-emerald-500/20 pt-3">
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    Status:{' '}
                    <strong className="capitalize text-emerald-200">
                      {submittedData.status}
                    </strong>
                  </span>
                </div>
                <div className="font-mono text-gold-300 text-sm font-bold bg-black/40 px-3 py-1 rounded border border-gold-500/20">
                  [{submittedData.numbers.join(', ')}]
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </Card>
    </div>
  );
};

export default SubmitNumbers;