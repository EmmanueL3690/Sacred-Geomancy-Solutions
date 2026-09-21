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

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../lib/supabaseClient';

export const SubmitNumbers = () => {
  const [numbers, setNumbers] = useState(['', '', '', '']);
  const [errors, setErrors] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitError, setSubmitError] = useState('');

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
      throw new Error('You must be logged in to submit numbers.');
    }

    // 2. Save submission to Supabase
    const { data, error } = await supabase
      .from('submissions')
      .insert({
        user_id: user.id,
        number_1: parseInt(numbers[0]),
        number_2: parseInt(numbers[1]),
        number_3: parseInt(numbers[2]),
        number_4: parseInt(numbers[3]),
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

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
          Submit Numbers
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Enter your four numbers below for review.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-xs font-medium text-neutral-300">
            Enter your four numbers
          </label>

          {/* 4 Input Fields */}
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <input
                  id={`number-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={numbers[idx]}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  placeholder="00"
                  className={`w-full h-14 text-center font-serif font-bold text-xl rounded-xl bg-obsidian-950 border text-gold-300 placeholder-neutral-700 focus:outline-none transition-all shadow-inner ${
                    errors[idx]
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-gold-500/30 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/40'
                  }`}
                />
                {errors[idx] && (
                  <span className="text-[10px] text-red-400 text-center">
                    {errors[idx]}
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
            className="w-full py-3 text-sm font-serif font-bold justify-center"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT NUMBERS'}
          </Button>
        </form>
      </Card>
      {/* Submission Error */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4 border-red-500/30 bg-red-500/5">
              <p className="text-red-400 text-sm text-center">
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
          <Card className="p-5 border-gold-500/30 bg-gold-500/5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Submission saved successfully</span>
            </div>

            <div className="flex items-center justify-between text-xs border-t border-gold-500/10 pt-3">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Clock className="w-3.5 h-3.5" />
              <span>
                Status:{' '}
                <strong className="capitalize">
                  {submittedData.status}
                </strong>
              </span>
              </div>
              <div className="font-mono text-gold-300">
                [{submittedData.numbers.join(', ')}]
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default SubmitNumbers;