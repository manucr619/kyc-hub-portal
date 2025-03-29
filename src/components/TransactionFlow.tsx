
import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Transaction } from '@/types/kyc';
import { cn } from '@/lib/utils';

interface TransactionFlowProps {
  transaction: Transaction;
}

export const TransactionFlow = ({ transaction }: TransactionFlowProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'rejected':
        return 'bg-red-500';
      case 'flagged':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm font-medium">Originator</div>
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            🏦
          </div>
          <div className="text-sm">{transaction.originatorId}</div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-2">
          <div className={cn("h-2 flex-1", getStatusColor(transaction.status))} />
          <ArrowRight className="w-6 h-6 text-gray-400" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="text-sm font-medium">Beneficiary</div>
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            💳
          </div>
          <div className="text-sm">{transaction.beneficiaryId}</div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Reference</div>
          <div className="text-sm">{transaction.referenceNumber}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Amount</div>
          <div className="text-sm">{transaction.amount} {transaction.currency}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Status</div>
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            getStatusColor(transaction.status),
            "text-white"
          )}>
            {transaction.status}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Date</div>
          <div className="text-sm">{new Date(transaction.date).toLocaleDateString()}</div>
        </div>
      </div>
    </Card>
  );
};
