import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ArrowUpRight,
  User,
  Calendar
} from 'lucide-react';
import AdminPageHeader from '../components/ui/AdminPageHeader';
import AdminStatCard from '../components/ui/AdminStatCard';
import StatusBadge from '../components/ui/StatusBadge';
import { SearchInput, FilterDropdown } from '../components/ui/FilterControls';
import AdminTable from '../components/ui/AdminTable';

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');

  // Mock payment transaction dataset
  const [transactions, setTransactions] = useState([
    {
      id: 'txn_1001',
      reference: 'PAY-8921-X3',
      userName: 'Adebayo Adeleke',
      userEmail: 'adebayo.a@example.com',
      amount: '₦5,000',
      rawAmount: 5000,
      purpose: 'Standard Consultation',
      gateway: 'Paystack',
      method: 'Card',
      status: 'Successful',
      date: '19 Aug 2026, 11:30'
    },
    {
      id: 'txn_1002',
      reference: 'PAY-8922-X4',
      userName: 'Chioma Okafor',
      userEmail: 'chioma.okafor@example.com',
      amount: '₦12,000',
      rawAmount: 12000,
      purpose: 'Express Consultation',
      gateway: 'Paystack',
      method: 'Bank Transfer',
      status: 'Successful',
      date: '18 Aug 2026, 16:45'
    },
    {
      id: 'txn_1003',
      reference: 'PAY-8923-X5',
      userName: 'Ibrahim Danfulani',
      userEmail: 'i.danfulani@example.ng',
      amount: '₦5,000',
      rawAmount: 5000,
      purpose: 'Standard Consultation',
      gateway: 'Paystack',
      method: 'Card',
      status: 'Pending',
      date: '18 Aug 2026, 14:10'
    },
    {
      id: 'txn_1004',
      reference: 'PAY-8924-X6',
      userName: 'Grace Ekanem',
      userEmail: 'grace.ekanem@example.com',
      amount: '₦5,000',
      rawAmount: 5000,
      purpose: 'Standard Consultation',
      gateway: 'Paystack',
      method: 'Card',
      status: 'Successful',
      date: '17 Aug 2026, 09:20'
    },
    {
      id: 'txn_1005',
      reference: 'PAY-8925-X7',
      userName: 'Samuel Chukwu',
      userEmail: 'samuel.c@example.com',
      amount: '₦12,000',
      rawAmount: 12000,
      purpose: 'Express Consultation',
      gateway: 'Paystack',
      method: 'Card',
      status: 'Refunded',
      date: '15 Aug 2026, 18:05'
    }
  ]);

  // Filtering logic
  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.purpose.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? txn.status === statusFilter : true;
    const matchesMethod = methodFilter ? txn.method === methodFilter : true;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalRevenue = transactions
    .filter((t) => t.status === 'Successful')
    .reduce((acc, curr) => acc + curr.rawAmount, 0);

  const tableHeaders = [
    { label: 'Transaction Ref' },
    { label: 'Customer' },
    { label: 'Service / Purpose' },
    { label: 'Amount' },
    { label: 'Method' },
    { label: 'Date' },
    { label: 'Status' },
    { label: 'Actions', align: 'right' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header with Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AdminPageHeader
          title="Payments & Revenue"
          description="Track incoming consultation fees, inspect transaction references, and review revenue reports."
        />
        <button
          onClick={() => alert('Exporting financial report CSV...')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors self-start sm:self-auto border border-neutral-700/60"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV Report</span>
        </button>
      </div>

      {/* Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Revenue"
          value={`₦${totalRevenue.toLocaleString()}`}
          subtext="Processed successfully"
          icon={DollarSign}
          trend="+18.4%"
          trendType="positive"
        />
        <AdminStatCard
          label="Successful Payments"
          value={transactions.filter((t) => t.status === 'Successful').length.toString()}
          subtext="Completed checkouts"
          icon={CheckCircle2}
          trendType="positive"
        />
        <AdminStatCard
          label="Pending Transactions"
          value={transactions.filter((t) => t.status === 'Pending').length.toString()}
          subtext="Awaiting gateway confirmation"
          icon={Clock}
          trendType="warning"
        />
        <AdminStatCard
          label="Refunds Processed"
          value={transactions.filter((t) => t.status === 'Refunded').length.toString()}
          subtext="Reversed orders"
          icon={RefreshCw}
          trendType="neutral"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search reference, customer name, email, or service..."
        />
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <FilterDropdown
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'Successful', value: 'Successful' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Refunded', value: 'Refunded' },
              { label: 'Failed', value: 'Failed' }
            ]}
          />
          <FilterDropdown
            label="Method"
            value={methodFilter}
            onChange={setMethodFilter}
            options={[
              { label: 'Card', value: 'Card' },
              { label: 'Bank Transfer', value: 'Bank Transfer' }
            ]}
          />
        </div>
      </div>

      {/* Transactions Table */}
      <AdminTable
        headers={tableHeaders}
        isEmpty={filteredTransactions.length === 0}
        emptyTitle="No transactions found"
        emptyDescription="Try clearing your search terms or selecting a different payment status filter."
        pagination={{
          from: 1,
          to: filteredTransactions.length,
          total: filteredTransactions.length,
          hasPrev: false,
          hasNext: false
        }}
      >
        {filteredTransactions.map((txn) => (
          <tr key={txn.id} className="hover:bg-neutral-800/30 transition-colors">
            {/* Reference */}
            <td className="py-3.5 px-4 font-mono text-xs font-semibold text-amber-400 whitespace-nowrap">
              {txn.reference}
            </td>

            {/* Customer */}
            <td className="py-3.5 px-4">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <div>
                  <div className="font-medium text-neutral-200 text-xs">{txn.userName}</div>
                  <div className="text-[10px] text-neutral-500 font-mono">{txn.userEmail}</div>
                </div>
              </div>
            </td>

            {/* Service / Purpose */}
            <td className="py-3.5 px-4 text-xs text-neutral-300">
              {txn.purpose}
            </td>

            {/* Amount */}
            <td className="py-3.5 px-4 font-mono font-semibold text-xs text-neutral-200 whitespace-nowrap">
              {txn.amount}
            </td>

            {/* Payment Method */}
            <td className="py-3.5 px-4 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-800 text-[11px] text-neutral-300">
                <CreditCard className="w-3 h-3 text-neutral-500" />
                {txn.method}
              </span>
            </td>

            {/* Date */}
            <td className="py-3.5 px-4 text-neutral-400 text-[11px] whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{txn.date}</span>
              </div>
            </td>

            {/* Status */}
            <td className="py-3.5 px-4">
              <StatusBadge status={txn.status} />
            </td>

            {/* Actions */}
            <td className="py-3.5 px-4 text-right">
              <button
                onClick={() => alert(`Receipt details for ${txn.reference}`)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors inline-flex items-center gap-1 text-[11px] font-medium"
                title="View Receipt Details"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Receipt</span>
              </button>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}