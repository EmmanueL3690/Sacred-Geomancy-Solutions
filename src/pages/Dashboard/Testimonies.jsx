import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

// Components & Widgets
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/widgets/StatCard';
import { FeaturedTestimony } from '../../components/widgets/FeaturedTestimony';
import { TestimonyCard } from '../../components/widgets/TestimonyCard1';
import { SubmitTestimonyForm } from '../../components/widgets/SubmitTestimonyForm';
import { TestimonyDetailsModal, TestimonySuccessModal } from '../../components/widgets/TestimonyModal';
import { EmptyTestimonyState } from '../../components/widgets/EmptyTestimonyState';

// Data
import { testimonyStatsData, featuredTestimonyData, mockTestimonies } from '../../data/testimonies1';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export const Testimonies = () => {
  const navigate = useNavigate();

  // State
  const [testimoniesList, setTestimoniesList] = useState(mockTestimonies);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'my'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest');

  // Modals
  const [activeTestimonyModal, setActiveTestimonyModal] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Filtered Testimonies
  const filteredTestimonies = useMemo(() => {
    return testimoniesList
      .filter((item) => {
        // Tab filter
        if (activeTab === 'my' && !item.isUserSubmitted) return false;

        // Status filter
        if (selectedStatus !== 'All' && item.status !== selectedStatus) return false;

        // Search filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          return (
            item.title.toLowerCase().includes(q) ||
            item.message.toLowerCase().includes(q) ||
            item.name.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'Oldest') {
          return a.id.localeCompare(b.id);
        }
        return b.id.localeCompare(a.id); // Newest
      });
  }, [testimoniesList, activeTab, searchQuery, selectedStatus, selectedSort]);

  const userTestimoniesCount = useMemo(() => {
    return testimoniesList.filter((t) => t.isUserSubmitted).length;
  }, [testimoniesList]);

  // Handle Form Submission
  const handleTestimonySubmitted = (newTestimony) => {
    setTestimoniesList((prev) => [newTestimony, ...prev]);
    setShowSuccessModal(true);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Section 1: Hero Header */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-gold-500 pl-4 py-1">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
                Testimonies
              </h1>
              <Badge variant="gold" className="text-xs">
                Approved: 128
              </Badge>
            </div>
            <p className="text-sm text-neutral-400 mt-1">
              Read inspiring stories from our community and share your own experience after receiving guidance.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section 2: Statistics Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {testimonyStatsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.id === 'stat-my-testimonies' ? String(userTestimoniesCount) : stat.value}
            icon={stat.icon}
          />
        ))}
      </motion.div>

      {/* Section 3: Featured Testimony */}
      <motion.div variants={itemVariants}>
        <FeaturedTestimony
          quote={featuredTestimonyData.quote}
          name={featuredTestimonyData.name}
          memberSince={featuredTestimonyData.memberSince}
          rating={featuredTestimonyData.rating}
        />
      </motion.div>

      {/* Grid Layout: Main List vs Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Testimonies List Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs & Toolbar Filter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between p-4 rounded-2xl bg-obsidian-900 border border-gold-500/20 backdrop-blur-md">
              {/* Tab Toggle */}
              <div className="flex p-1 rounded-xl bg-obsidian-950 border border-gold-500/20 self-start sm:self-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-gold-500 text-obsidian-950 shadow-md'
                      : 'text-neutral-400 hover:text-gold-300'
                  }`}
                >
                  All Community
                </button>
                <button
                  onClick={() => setActiveTab('my')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'my'
                      ? 'bg-gold-500 text-obsidian-950 shadow-md'
                      : 'text-neutral-400 hover:text-gold-300'
                  }`}
                >
                  My Testimonies ({userTestimoniesCount})
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stories..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-obsidian-950 border border-gold-500/20 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none"
                  />
                </div>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="py-1.5 px-2.5 rounded-lg bg-obsidian-950 border border-gold-500/20 text-xs text-neutral-200 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Section 4 & 6: Testimonies Grid / List */}
          <motion.div variants={itemVariants}>
            {filteredTestimonies.length === 0 ? (
              <EmptyTestimonyState
                onShareFirst={() => {
                  const formElement = document.getElementById('testimony-title');
                  if (formElement) formElement.focus();
                }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredTestimonies.map((testimony) => (
                  <TestimonyCard
                    key={testimony.id}
                    testimony={testimony}
                    onReadMore={(item) => setActiveTestimonyModal(item)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Section 5: Submit Form Sidebar Column (1 Col) */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <SubmitTestimonyForm onSubmitSuccess={handleTestimonySubmitted} />
        </motion.div>
      </div>

      {/* Details Modal */}
      <TestimonyDetailsModal
        isOpen={Boolean(activeTestimonyModal)}
        onClose={() => setActiveTestimonyModal(null)}
        testimony={activeTestimonyModal}
      />

      {/* Success Modal */}
      <TestimonySuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onViewMyTestimonies={() => {
          setShowSuccessModal(false);
          setActiveTab('my');
        }}
        onBackDashboard={() => {
          setShowSuccessModal(false);
          navigate('/app');
        }}
      />
    </motion.div>
  );
};

export default Testimonies;