// import React, { useState, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

// // UI Primitives & Widgets
// import { Card } from '../../components/ui/Card';
// import { Button } from '../../components/ui/Button';
// import { Badge } from '../../components/ui/Badge';
// import { StatCard } from '../../components/widgets/StatCard';
// import { SubmissionStatusBadge } from '../../components/widgets/SubmissionStatusBadge';
// import { HistoryFilterBar } from '../../components/widgets/HistoryFilterBar';
// import { SubmissionDetailsModal } from '../../components/widgets/SubmissionDetailsModal';
// import { EmptyHistoryState } from '../../components/widgets/EmptyHistoryState';

// // Data
// import { historyStatsData, mockSubmissions } from '../../data/submissionHistory';

// const ITEMS_PER_PAGE = 4;

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

// export const SubmissionHistory = () => {
//   const navigate = useNavigate();

//   // Filter & Search State
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [selectedSort, setSelectedSort] = useState('Newest First');

//   // Modal & Pagination State
//   const [activeSubmission, setActiveSubmission] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Filter & Sort Logic
//   const filteredSubmissions = useMemo(() => {
//     return mockSubmissions
//       .filter((sub) => {
//         // Status Filter
//         if (selectedStatus !== 'All' && sub.status !== selectedStatus) {
//           return false;
//         }
//         // Search Query (matches numbers sequence or ID)
//         if (searchQuery.trim() !== '') {
//           const joinedNumbers = sub.numbers.join('');
//           const query = searchQuery.replace(/\D/g, '');
//           return joinedNumbers.includes(query) || sub.id.toLowerCase().includes(searchQuery.toLowerCase());
//         }
//         return true;
//       })
//       .sort((a, b) => {
//         if (selectedSort === 'Oldest First') {
//           return a.id.localeCompare(b.id);
//         }
//         return b.id.localeCompare(a.id); // Newest First
//       });
//   }, [searchQuery, selectedStatus, selectedSort]);

//   // Pagination Logic
//   const totalPages = Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE) || 1;
//   const paginatedSubmissions = useMemo(() => {
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredSubmissions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
//   }, [filteredSubmissions, currentPage]);

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-6 max-w-6xl mx-auto"
//     >
//       {/* Section 1: Hero Header */}
//       <motion.div variants={itemVariants}>
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-gold-500 pl-4 py-1">
//           <div>
//             <div className="flex items-center gap-3">
//               <h1 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
//                 Submission History
//               </h1>
//               <Badge variant="gold" className="text-xs">
//                 Total: {mockSubmissions.length}
//               </Badge>
//             </div>
//             <p className="text-sm text-neutral-400 mt-1">
//               View all your previous number submissions and track their review status.
//             </p>
//           </div>
//           <Button
//             variant="primary"
//             size="md"
//             onClick={() => navigate('/app/submit')}
//             className="self-start sm:self-center"
//           >
//             New Submission
//           </Button>
//         </div>
//       </motion.div>

//       {/* Section 2: Statistics Cards */}
//       <motion.div
//         variants={itemVariants}
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
//       >
//         {historyStatsData.map((stat) => (
//           <StatCard
//             key={stat.id}
//             title={stat.title}
//             value={stat.value}
//             icon={stat.icon}
//           />
//         ))}
//       </motion.div>

//       {/* Section 3: Search & Filters Toolbar */}
//       <motion.div variants={itemVariants}>
//         <HistoryFilterBar
//           searchQuery={searchQuery}
//           onSearchChange={(val) => {
//             setSearchQuery(val);
//             setCurrentPage(1);
//           }}
//           selectedStatus={selectedStatus}
//           onStatusChange={(val) => {
//             setSelectedStatus(val);
//             setCurrentPage(1);
//           }}
//           selectedSort={selectedSort}
//           onSortChange={(val) => setSelectedSort(val)}
//         />
//       </motion.div>

//       {/* Section 4: Submissions List or Empty State */}
//       <motion.div variants={itemVariants} className="space-y-4">
//         {filteredSubmissions.length === 0 ? (
//           <EmptyHistoryState onSubmitFirst={() => navigate('/app/submit')} />
//         ) : (
//           <AnimatePresence mode="wait">
//             <div className="space-y-3">
//               {paginatedSubmissions.map((submission) => (
//                 <Card
//                   key={submission.id}
//                   className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:border-gold-500/50"
//                 >
//                   {/* Four-Digit Sequence */}
//                   <div className="flex items-center gap-2.5">
//                     {submission.numbers.map((num, idx) => (
//                       <React.Fragment key={idx}>
//                         <div className="w-10 h-11 sm:w-12 sm:h-12 rounded-xl bg-obsidian-950 border border-gold-500/30 flex items-center justify-center font-serif font-bold text-lg text-gold-300 shadow-inner">
//                           {num}
//                         </div>
//                         {idx < 3 && (
//                           <span className="text-gold-500/40 font-serif">•</span>
//                         )}
//                       </React.Fragment>
//                     ))}
//                   </div>

//                   {/* Submission Meta Info */}
//                   <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-neutral-400">
//                     <div className="flex items-center gap-1.5">
//                       <Calendar className="w-3.5 h-3.5 text-gold-400 shrink-0" />
//                       <span>{submission.date}</span>
//                     </div>
//                     <div className="flex items-center gap-1.5">
//                       <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
//                       <span>{submission.time}</span>
//                     </div>
//                   </div>

//                   {/* Status & Details Action */}
//                   <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-gold-500/10">
//                     <SubmissionStatusBadge status={submission.status} />
//                     <Button
//                       variant="secondary"
//                       size="sm"
//                       onClick={() => setActiveSubmission(submission)}
//                       className="cursor-pointer"
//                     >
//                       View Details
//                     </Button>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </AnimatePresence>
//         )}
//       </motion.div>

//       {/* Section 7: Pagination Controls */}
//       {filteredSubmissions.length > ITEMS_PER_PAGE && (
//         <motion.div
//           variants={itemVariants}
//           className="flex items-center justify-between pt-4 border-t border-gold-500/10"
//         >
//           <span className="text-xs text-neutral-400">
//             Page <span className="text-gold-300 font-semibold">{currentPage}</span> of{' '}
//             <span className="text-gold-300 font-semibold">{totalPages}</span>
//           </span>

//           <div className="flex items-center gap-2">
//             <Button
//               variant="secondary"
//               size="sm"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               className="px-3"
//             >
//               <ChevronLeft className="w-4 h-4 mr-1" />
//               Previous
//             </Button>

//             <Button
//               variant="secondary"
//               size="sm"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               className="px-3"
//             >
//               Next
//               <ChevronRight className="w-4 h-4 ml-1" />
//             </Button>
//           </div>
//         </motion.div>
//       )}

//       {/* Section 5: Details Modal */}
//       <SubmissionDetailsModal
//         isOpen={Boolean(activeSubmission)}
//         onClose={() => setActiveSubmission(null)}
//         submission={activeSubmission}
//       />
//     </motion.div>
//   );
// };

// export default SubmissionHistory;

import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabaseClient';


export const SubmissionHistory = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchSubmissions = async () => {
  try {
    setLoading(true);
    setErrorMsg('');

    // Get currently logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('You must be logged in to view submissions.');
    }

    // Get ONLY this user's submissions
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('History error:', error);
      throw error;
    }

    setSubmissions(data || []);

  } catch (error) {
    console.error('FETCH HISTORY ERROR:', error);
    setErrorMsg(
      error.message || 'Failed to load submission history.'
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchSubmissions();
}, []);

  const getStatusDisplay = (status) => {
  switch (status) {
    case 'approved':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-full">
          <span>🟢</span> Approved
        </span>
      );

    case 'rejected':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-950/50 border border-red-500/30 px-2.5 py-1 rounded-full">
          <span>🔴</span> Rejected
        </span>
      );

    case 'pending':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2.5 py-1 rounded-full">
          <span>🟡</span> Pending
        </span>
      );
  }
};

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
          Submission History
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Track your previous number submissions and their status.
        </p>
      </div>
      <div className="space-y-4">

  {/* Loading */}
  {loading && (
    <Card className="p-6 text-center">
      <p className="text-neutral-400 text-sm">
        Loading your submissions...
      </p>
    </Card>
  )}

  {/* Error */}
  {errorMsg && (
    <Card className="p-6 text-center border-red-500/30">
      <p className="text-red-400 text-sm">
        {errorMsg}
      </p>
    </Card>
  )}

  {/* Empty State */}
  {!loading && !errorMsg && submissions.length === 0 && (
    <Card className="p-8 text-center">
      <p className="text-neutral-300 font-medium">
        No submissions yet
      </p>

      <p className="text-neutral-500 text-sm mt-2">
        Submit your four numbers to see them here.
      </p>
    </Card>
  )}

  {/* Submissions */}
  {!loading && submissions.map((item) => (
    <Card
      key={item.id}
      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >

      {/* 4 Numbers */}
      <div className="flex items-center gap-2">

        {[
          item.number_1,
          item.number_2,
          item.number_3,
          item.number_4,
        ].map((num, idx) => (

          <div
            key={idx}
            className="w-11 h-12 rounded-xl bg-obsidian-950 border border-gold-500/30 flex items-center justify-center font-serif font-bold text-lg text-gold-300 shadow-inner"
          >
            {String(num).padStart(2, '0')}
          </div>

        ))}

      </div>

      {/* Date and Status */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-gold-500/10 pt-3 sm:pt-0">

        <div className="text-xs">

          <p className="text-neutral-500 text-[10px]">
            Submitted:
          </p>

          <p className="text-neutral-300 font-medium">
            {new Date(item.created_at).toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}
          </p>

        </div>

        <div>
          {getStatusDisplay(item.status)}
        </div>

      </div>

    </Card>
  ))}

</div>
    </div>
  );
};

export default SubmissionHistory;