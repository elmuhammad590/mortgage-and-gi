import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const MortgageCalculator = () => {
  const [formData, setFormData] = useState({
    amount: '',
    term: '',
    rate: '',
    type: '' 
  });
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const handleChange = (e) => {
    const { name, value, type } = e.target;  
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleRadioChange = (type) => {
    if (errors.type) setErrors(prev => ({ ...prev, type: '' }));
    setFormData(prev => ({ ...prev, type }));
  };
  const clearAll = () => {
    setFormData({ amount: '', term: '', rate: '', type: '' });
    setResults(null);
    setErrors({});
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.amount) newErrors.amount = "This field is required";
    if (!formData.term) newErrors.term = "This field is required";
    if (!formData.rate) newErrors.rate = "This field is required";
    if (!formData.type) newErrors.type = "Please select a mortgage type";
    return newErrors;
  };

  const calculate = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const principal = parseFloat(formData.amount);
    const years = parseFloat(formData.term);
    const rate = parseFloat(formData.rate);
    const months = years * 12;
    const monthlyRate = (rate / 100) / 12;

    let monthlyPayment = 0;
    let totalRepayment = 0;

    if (formData.type === 'repayment') {
      monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      totalRepayment = monthlyPayment * months;
    } else {
      monthlyPayment = principal * monthlyRate;
      totalRepayment = (monthlyPayment * months) + principal; 
    }
    setResults({
      monthly: monthlyPayment,
      total: totalRepayment
    });
  };

 
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-900">
      
    
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
       
        <div className="p-8 md:w-1/2">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Mortgage Calculator</h1>
            <button 
              onClick={clearAll}
              className="text-slate-500 underline text-sm hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-sm"
            >
              Clear All
            </button>
          </header>

          <form onSubmit={calculate} noValidate>
            
            
            <div className="mb-6 relative">
              <label htmlFor="amount" className="block text-slate-500 font-medium mb-2 text-sm">Mortgage Amount</label>
              <div className={`flex items-center border rounded-md overflow-hidden transition-colors ${errors.amount ? 'border-red-500' : 'border-slate-300 focus-within:border-lime-500 focus-within:ring-1 focus-within:ring-lime-500'}`}>
                <div className={`px-4 py-3 font-bold ${errors.amount ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>£</div>
                <input 
                  type="number" 
                  id="amount" 
                  name="amount" 
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 outline-none font-bold text-slate-900"
                />
              </div>
              {errors.amount && <p className="text-red-500 text-xs mt-2">{errors.amount}</p>}
            </div>

            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              
              
              <div className="flex-1">
                <label htmlFor="term" className="block text-slate-500 font-medium mb-2 text-sm">Mortgage Term</label>
                <div className={`flex items-center border rounded-md overflow-hidden transition-colors ${errors.term ? 'border-red-500' : 'border-slate-300 focus-within:border-lime-500 focus-within:ring-1 focus-within:ring-lime-500'}`}>
                  <input 
                    type="number" 
                    id="term" 
                    name="term" 
                    value={formData.term}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none font-bold text-slate-900"
                  />
                  <div className={`px-4 py-3 font-bold text-sm ${errors.term ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>years</div>
                </div>
                {errors.term && <p className="text-red-500 text-xs mt-2">{errors.term}</p>}
              </div>

            
              <div className="flex-1">
                <label htmlFor="rate" className="block text-slate-500 font-medium mb-2 text-sm">Interest Rate</label>
                <div className={`flex items-center border rounded-md overflow-hidden transition-colors ${errors.rate ? 'border-red-500' : 'border-slate-300 focus-within:border-lime-500 focus-within:ring-1 focus-within:ring-lime-500'}`}>
                  <input 
                    type="number" 
                    id="rate" 
                    name="rate" 
                    value={formData.rate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none font-bold text-slate-900"
                    step="0.01"
                  />
                  <div className={`px-4 py-3 font-bold text-sm ${errors.rate ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>%</div>
                </div>
                {errors.rate && <p className="text-red-500 text-xs mt-2">{errors.rate}</p>}
              </div>
            </div>

           
            <div className="mb-8">
              <label className="block text-slate-500 font-medium mb-2 text-sm">Mortgage Type</label>
              
              <div className="space-y-3">
               
                <label 
                  className={`flex items-center p-3 border rounded-md cursor-pointer transition-all hover:border-lime-500 ${formData.type === 'repayment' ? 'border-lime-500 bg-lime-50/50' : 'border-slate-300'}`}
                >
                  <input 
                    type="radio" 
                    name="type" 
                    value="repayment" 
                    checked={formData.type === 'repayment'} 
                    onChange={() => handleRadioChange('repayment')}
                    className="w-4 h-4 text-lime-500 focus:ring-lime-500 border-slate-300"
                  />
                  <span className="ml-3 font-bold text-slate-900">Repayment</span>
                </label>

                <label 
                  className={`flex items-center p-3 border rounded-md cursor-pointer transition-all hover:border-lime-500 ${formData.type === 'interest-only' ? 'border-lime-500 bg-lime-50/50' : 'border-slate-300'}`}
                >
                  <input 
                    type="radio" 
                    name="type" 
                    value="interest-only" 
                    checked={formData.type === 'interest-only'}
                    onChange={() => handleRadioChange('interest-only')} 
                    className="w-4 h-4 text-lime-500 focus:ring-lime-500 border-slate-300"
                  />
                  <span className="ml-3 font-bold text-slate-900">Interest Only</span>
                </label>
              </div>
              {errors.type && <p className="text-red-500 text-xs mt-2">{errors.type}</p>}
            </div>

           
            <button 
              type="submit"
              className="w-full md:w-auto bg-[#d8db2f] hover:bg-[#c9cc2a] text-slate-900 font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-colors focus:outline-none focus:ring-4 focus:ring-lime-200"
            >
              <Calculator size={24} />
              Calculate Repayments
            </button>
          </form>
        </div>

        
        <div className="bg-slate-900 md:w-1/2 p-8 md:rounded-bl-[5rem] flex flex-col">
          {results ? (
            
            <div className="h-full flex flex-col justify-center animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold text-white mb-4">Your results</h2>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Your results are shown below based on the information you provided. 
                To adjust the results, edit the form and click "Calculate Repayments" again.
              </p>

              <div className="bg-black/25 border-t-4 border-[#d8db2f] rounded-lg p-6 shadow-lg">
                <div className="mb-8 pb-8 border-b border-slate-700/50">
                  <p className="text-slate-400 text-sm mb-2">Your monthly repayments</p>
                  <p className="text-5xl font-bold text-[#d8db2f] tracking-tight">
                    {formatCurrency(results.monthly)}
                  </p>
                </div>
                
                <div>
                  <p className="text-slate-400 text-sm mb-2">Total you'll repay over the term</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(results.total)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="mb-6">
                <img 
                  src="https://assets.codepen.io/t-1/empty-illustration.svg" 
                  alt="Results empty"
                  className="w-32 h-32 opacity-75 mx-auto"
                
                  onError={(e) => e.target.style.display = 'none'} 
                />
              
                <Calculator size={64} className="text-[#d8db2f] mx-auto opacity-50" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Results shown here</h2>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">
                Complete the form and click "calculate repayments" to see what your monthly repayments would be.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
export default MortgageCalculator;
