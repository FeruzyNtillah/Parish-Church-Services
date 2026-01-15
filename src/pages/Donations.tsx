import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { donationsData } from '../data';
import type { Donation } from '../types';

type SortField = keyof Donation;
type SortOrder = 'asc' | 'desc';

interface SortHeaderProps {
  label: string;
  field: SortField;
  orderBy: SortField;
  onSort: (property: SortField) => void;
}

const SortHeader = ({
  label,
  field,
  orderBy,
  onSort,
}: SortHeaderProps) => (
  <button
    onClick={() => onSort(field)}
    className="flex items-center gap-2 font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
  >
    {label}
    <ArrowUpDown
      className={`w-4 h-4 ${
        orderBy === field ? 'text-emerald-600 dark:text-emerald-400' : ''
      }`}
    />
  </button>
);

const Donations = () => {
  const [orderBy, setOrderBy] = useState<SortField>('date');
  const [order, setOrder] = useState<SortOrder>('desc');

  const handleSort = (property: SortField) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sort function
  const sortedDonations = [...donationsData].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Donations</h1>
          <p className="text-muted-foreground">
            The following are the church donations and contributions from our
            community.
          </p>
        </div>

        {/* Table Container */}
        <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-emerald-600 dark:border-emerald-500 bg-emerald-500 dark:bg-emerald-600 text-black dark:text-slate-100">
                <th className="p-4 text-left">
                  <SortHeader
                    label="Donation ID"
                    field="id"
                    orderBy={orderBy}
                    onSort={handleSort}
                  />
                </th>
                <th className="p-4 text-left">
                  <SortHeader
                    label="Donor Name"
                    field="donorName"
                    orderBy={orderBy}
                    onSort={handleSort}
                  />
                </th>
                <th className="p-4 text-left">
                  <SortHeader
                    label="Amount"
                    field="amount"
                    orderBy={orderBy}
                    onSort={handleSort}
                  />
                </th>
                <th className="p-4 text-left">
                  <SortHeader
                    label="Date"
                    field="date"
                    orderBy={orderBy}
                    onSort={handleSort}
                  />
                </th>
                <th className="p-4 text-left">
                  <SortHeader
                    label="Payment Method"
                    field="paymentMethod"
                    orderBy={orderBy}
                    onSort={handleSort}
                  />
                </th>
                <th className="p-4 text-left">
                  <SortHeader
                    label="Purpose"
                    field="purpose"
                    orderBy={orderBy}
                    onSort={handleSort}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedDonations.map((donation, index) => (
                <tr
                  key={donation.id}
                  className={`border-b border-border transition-colors hover:bg-muted/50 ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/30'
                  }`}
                >
                  <td className="p-4 font-medium text-emerald-600 dark:text-emerald-400">
                    {donation.id}
                  </td>
                  <td className="p-4 text-foreground">
                    {donation.donorName}
                  </td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(donation.amount)}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(donation.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
                      {donation.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {donation.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedDonations.length === 0 && (
            <div className="flex items-center justify-center p-8">
              <p className="text-muted-foreground">No donations found</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Total Donations
            </p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(
                sortedDonations.reduce((sum, d) => sum + d.amount, 0)
              )}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Number of Donations
            </p>
            <p className="text-3xl font-bold text-foreground">
              {sortedDonations.length}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Average Donation
            </p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(
                sortedDonations.reduce((sum, d) => sum + d.amount, 0) /
                  sortedDonations.length || 0
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;
