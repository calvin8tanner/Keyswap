import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface MonthlyProfitCalculatorProps {
  propertyPrice: number;
  annualRevenue: number;
  propertyType?: string;
}

export function MonthlyProfitCalculator({ 
  propertyPrice, 
  annualRevenue,
  propertyType = 'Single Family'
}: MonthlyProfitCalculatorProps) {
  const [downPaymentAmount, setDownPaymentAmount] = useState(propertyPrice * 0.2);
  const [inputValue, setInputValue] = useState((propertyPrice * 0.2).toFixed(0));
  
  // Helper function to format numbers with max 2 decimals and commas
  const formatNumber = (num: number, maxDecimals: number = 2): string => {
    if (Number.isInteger(num)) {
      return num.toLocaleString('en-US');
    }
    const fixed = num.toFixed(maxDecimals);
    const cleaned = fixed.replace(/\.?0+$/, '');
    return parseFloat(cleaned).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals
    });
  };

  // Constants
  const INTEREST_RATE = 7.0; // Current mortgage rate in percent
  const LOAN_TERM_YEARS = 30;
  const MONTHS_PER_YEAR = 12;

  // Handle down payment input change
  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setInputValue(value);
    
    const numericValue = parseFloat(value) || 0;
    // Clamp between 0 and property price
    const clampedValue = Math.min(Math.max(numericValue, 0), propertyPrice);
    setDownPaymentAmount(clampedValue);
  };

  // Calculate loan details
  const downPayment = downPaymentAmount;
  const downPaymentPercent = (downPayment / propertyPrice) * 100;
  const loanAmount = propertyPrice - downPayment;
  const monthlyInterestRate = (INTEREST_RATE / 100) / MONTHS_PER_YEAR;
  const numberOfPayments = LOAN_TERM_YEARS * MONTHS_PER_YEAR;

  // Monthly mortgage payment formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
  const monthlyMortgage = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  // Estimate other monthly costs
  // Property taxes: ~1.2% of property value annually (varies by location)
  const monthlyPropertyTax = (propertyPrice * 0.012) / MONTHS_PER_YEAR;
  
  // Insurance: ~$100/month per $100K of property value (short-term rental insurance is higher)
  const monthlyInsurance = (propertyPrice / 100000) * 100;
  
  // Property management fees: 15% of revenue (if not self-managed)
  const monthlyManagementFees = (annualRevenue / MONTHS_PER_YEAR) * 0.15; // 15% average

  // Monthly revenue
  const monthlyRevenue = annualRevenue / MONTHS_PER_YEAR;

  // Calculate monthly profit
  const totalMonthlyExpenses = monthlyMortgage + monthlyPropertyTax + monthlyInsurance + 
                               monthlyManagementFees;
  const monthlyProfit = monthlyRevenue - totalMonthlyExpenses;
  const annualProfit = monthlyProfit * MONTHS_PER_YEAR;

  // Calculate ROI on down payment
  const cashOnCashReturn = (annualProfit / downPayment) * 100;

  const isProfit = monthlyProfit > 0;

  return (
    <Card className="border-2 border-tan bg-tan-lighter">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-black flex items-center justify-between">
          <span>Monthly Profit Calculator</span>
          <div className={`flex items-center gap-1 ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
            {isProfit ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="text-lg">
              ${formatNumber(Math.abs(monthlyProfit), 0)}/mo
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Down Payment Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-black" htmlFor="down-payment-input">Down Payment</label>
            <span className="text-sm text-black">
              {formatNumber(downPaymentPercent, 1)}% of price
            </span>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black">$</span>
            <Input
              id="down-payment-input"
              type="text"
              value={inputValue}
              onChange={handleDownPaymentChange}
              className="pl-7 bg-white border-border text-black"
              placeholder="Enter down payment amount"
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            <span className="text-black">Enter amount between $0 and ${formatNumber(propertyPrice, 0)}</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-black">Monthly Revenue</span>
            <span className="text-sm text-green-600">
              +${formatNumber(monthlyRevenue, 0)}
            </span>
          </div>
        </div>

        {/* Expenses Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Mortgage ({INTEREST_RATE}%, 30yr)</span>
            <span className="text-red-600">-${formatNumber(monthlyMortgage, 0)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Property Tax</span>
            <span className="text-red-600">-${formatNumber(monthlyPropertyTax, 0)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Insurance</span>
            <span className="text-red-600">-${formatNumber(monthlyInsurance, 0)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Management (15%)</span>
            <span className="text-red-600">-${formatNumber(monthlyManagementFees, 0)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="pt-3 border-t-2 border-forest-green">
          <div className="flex justify-between items-center mb-2">
            <span className="text-black">Net Monthly Profit</span>
            <span className={`text-lg ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
              ${formatNumber(monthlyProfit, 0)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Annual Profit</span>
            <span className={isProfit ? 'text-green-600' : 'text-red-600'}>
              ${formatNumber(annualProfit, 0)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm pt-2 border-t border-border mt-2">
            <span className="text-muted-foreground">Cash-on-Cash Return</span>
            <span className={`${cashOnCashReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatNumber(cashOnCashReturn, 1)}%
            </span>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-tan p-2 rounded text-xs text-muted-foreground">
          <p className="text-black">
            * Estimates based on {INTEREST_RATE}% interest rate. Actual costs may vary. 
            Management fees assume property manager (~15%). Self-managed properties will have higher profits.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}