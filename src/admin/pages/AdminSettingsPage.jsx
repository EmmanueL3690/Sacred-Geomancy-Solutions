// import React, { useState } from 'react';
// import {
//   Settings,
//   Sliders,
//   Shield,
//   CreditCard,
//   Mail,
//   Save,
//   CheckCircle2,
//   AlertTriangle,
//   Lock,
//   Globe,
//   Bell,
//   Cpu
// } from 'lucide-react';
// import AdminPageHeader from '../components/ui/AdminPageHeader';

// export default function AdminSettingsPage() {
//   const [activeTab, setActiveTab] = useState('general');
//   const [isSaved, setIsSaved] = useState(false);

//   // Form State
//   const [generalConfig, setGeneralConfig] = useState({
//     appName: 'NumberConsult App',
//     supportEmail: 'support@example.com',
//     maintenanceMode: false,
//     allowRegistrations: true
//   });

//   const [pricingConfig, setPricingConfig] = useState({
//     standardConsultFee: '5000',
//     expressConsultFee: '12000',
//     currency: 'NGN (₦)'
//   });

//   // const [apiKeys, setApiKeys] = useState({
//   //   paystackPublicKey: 'pk_live_xxxxxxxxxxxxxxxxxxxxxxxx',
//   //   smtpHost: 'smtp.sendgrid.net',
//   //   smtpPort: '587'
//   // });

//   const handleSave = (e) => {
//     e.preventDefault();
//     setIsSaved(true);
//     setTimeout(() => setIsSaved(false), 3000);
//   };

//   const tabs = [
//     { id: 'general', label: 'General System', icon: Sliders },
//     { id: 'pricing', label: 'Consultation Fees', icon: CreditCard },
//     { id: 'security', label: 'Security & APIs', icon: Shield },
//     { id: 'notifications', label: 'Email & Gateways', icon: Mail }
//   ];

//   return (
//     <div className="space-y-6 pb-12">
//       {/* Page Header */}
//       <AdminPageHeader
//         title="System Settings"
//         description="Manage platform operational parameters, update default consultation rates, and configure API gateway keys."
//       />

//       {/* Settings Navigation Tabs */}
//       <div className="flex border-b border-neutral-800 space-x-1 overflow-x-auto">
//         {tabs.map((tab) => {
//           const Icon = tab.icon;
//           const isActive = activeTab === tab.id;
//           return (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-4 py-3 text-xs font-medium transition-colors border-b-2 whitespace-nowrap ${
//                 isActive
//                   ? 'border-amber-500 text-amber-400 bg-neutral-900/40'
//                   : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/20'
//               }`}
//             >
//               <Icon className="w-4 h-4" />
//               <span>{tab.label}</span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Save Notification Toast */}
//       {isSaved && (
//         <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-2 text-emerald-400 text-xs">
//           <CheckCircle2 className="w-4 h-4 shrink-0" />
//           <span>System configuration successfully updated and applied!</span>
//         </div>
//       )}

//       {/* Main Settings Form */}
//       <form onSubmit={handleSave} className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-6 space-y-6">
//         {/* General Settings Tab */}
//         {activeTab === 'general' && (
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2 border-b border-neutral-800 pb-3">
//               <Globe className="w-4 h-4 text-amber-500" />
//               General Platform Identity
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-neutral-400">Application Name</label>
//                 <input
//                   type="text"
//                   value={generalConfig.appName}
//                   onChange={(e) => setGeneralConfig({ ...generalConfig, appName: e.target.value })}
//                   className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-neutral-400">Support Email Contact</label>
//                 <input
//                   type="email"
//                   value={generalConfig.supportEmail}
//                   onChange={(e) => setGeneralConfig({ ...generalConfig, supportEmail: e.target.value })}
//                   className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
//                 />
//               </div>
//             </div>

//             <div className="pt-2 space-y-3">
//               <label className="flex items-center gap-3 cursor-pointer p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
//                 <input
//                   type="checkbox"
//                   checked={generalConfig.maintenanceMode}
//                   onChange={(e) => setGeneralConfig({ ...generalConfig, maintenanceMode: e.target.checked })}
//                   className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500/20 bg-neutral-900"
//                 />
//                 <div>
//                   <div className="text-xs font-medium text-neutral-200">System Maintenance Mode</div>
//                   <div className="text-[11px] text-neutral-500">Temporarily restrict public consultations while performing updates.</div>
//                 </div>
//               </label>

//               <label className="flex items-center gap-3 cursor-pointer p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
//                 <input
//                   type="checkbox"
//                   checked={generalConfig.allowRegistrations}
//                   onChange={(e) => setGeneralConfig({ ...generalConfig, allowRegistrations: e.target.checked })}
//                   className="rounded border-neutral-700 text-amber-500 focus:ring-amber-500/20 bg-neutral-900"
//                 />
//                 <div>
//                   <div className="text-xs font-medium text-neutral-200">Allow New User Signups</div>
//                   <div className="text-[11px] text-neutral-500">Enable new customer account creation on the registration portal.</div>
//                 </div>
//               </label>
//             </div>
//           </div>
//         )}

//         {/* Pricing Tab */}
//         {activeTab === 'pricing' && (
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2 border-b border-neutral-800 pb-3">
//               <CreditCard className="w-4 h-4 text-amber-500" />
//               Consultation Rates & Currency
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-neutral-400">Standard Consultation Rate</label>
//                 <input
//                   type="number"
//                   value={pricingConfig.standardConsultFee}
//                   onChange={(e) => setPricingConfig({ ...pricingConfig, standardConsultFee: e.target.value })}
//                   className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-neutral-400">Express Priority Rate</label>
//                 <input
//                   type="number"
//                   value={pricingConfig.expressConsultFee}
//                   onChange={(e) => setPricingConfig({ ...pricingConfig, expressConsultFee: e.target.value })}
//                   className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-neutral-400">Base Currency Display</label>
//                 <input
//                   type="text"
//                   disabled
//                   value={pricingConfig.currency}
//                   className="w-full bg-neutral-950/50 border border-neutral-800/80 rounded-lg p-2.5 text-xs text-neutral-500 cursor-not-allowed"
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Security Tab */}
//         {activeTab === 'security' && (
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2 border-b border-neutral-800 pb-3">
//               <Lock className="w-4 h-4 text-amber-500" />
//               API Gateways & Secret Keys
//             </h3>

//             <div className="space-y-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-neutral-400">Paystack Public Key</label>
//                 <input
//                   type="text"
//                   value={apiKeys.paystackPublicKey}
//                   onChange={(e) => setApiKeys({ ...apiKeys, paystackPublicKey: e.target.value })}
//                   className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 font-mono text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-neutral-400">Paystack Secret Key</label>
//                 <input
//                   type="password"
//                   value={apiKeys.paystackSecretKey}
//                   onChange={(e) => setApiKeys({ ...apiKeys, paystackSecretKey: e.target.value })}
//                   className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 font-mono text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Notifications Config Tab */}
//         {activeTab === 'notifications' && (
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2 border-b border-neutral-800 pb-3">
//               <Mail className="w-4 h-4 text-amber-500" />
//               SMTP Email Relay Configuration
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-neutral-400">SMTP Host Server</label>
//                 <input
//                   type="text"
//                   value={apiKeys.smtpHost}
//                   onChange={(e) => setApiKeys({ ...apiKeys, smtpHost: e.target.value })}
//                   className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-neutral-400">SMTP Server Port</label>
//                 <input
//                   type="text"
//                   value={apiKeys.smtpPort}
//                   onChange={(e) => setApiKeys({ ...apiKeys, smtpPort: e.target.value })}
//                   className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Action Controls */}
//         <div className="pt-4 border-t border-neutral-800 flex justify-end">
//           <button
//             type="submit"
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-colors shadow-md shadow-amber-500/10"
//           >
//             <Save className="w-4 h-4" />
//             <span>Save Changes</span>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }