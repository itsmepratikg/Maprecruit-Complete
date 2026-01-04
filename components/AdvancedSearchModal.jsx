
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const AdvancedSearchModal = ({ isOpen, onClose, initialKeywords, onSearch }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    keywords: initialKeywords || '',
    location: '', radius: '30', radiusUnit: 'Miles',
    excludeViewed: false, excludeSimilar: false, booleanSearch: false,
    candidateName: '', dateCreated: '', dateUpdated: '',
    candidateType: '', employmentStatus: '', availability: '',
    profileTags: '', folders: '', campaigns: '', source: '', lastActivity: '', excludeKeywords: '', excludeSource: '',
    jobTitle: '', excludeJobTitle: '', company: '', excludeCompany: '',
    includeSkills: '', excludeSkills: '',
    desiredPayFrom: '', desiredPayTo: '', desiredPayPeriod: 'Per Hour', desiredPayCurrency: 'USD',
    minPayFrom: '', minPayTo: '', minPayPeriod: 'Per Hour', minPayCurrency: 'USD',
    currPayFrom: '', currPayTo: '', currPayPeriod: 'Per Hour', currPayCurrency: 'USD',
    experienceFrom: '', experienceTo: '', experiencePeriod: 'Years',
    degree: '', specialization: '', school: ''
  });

  const [keywordChips, setKeywordChips] = useState(initialKeywords ? initialKeywords.split(' ') : []);

  useEffect(() => {
    if (isOpen && initialKeywords) {
      setFormData((prev) => ({ ...prev, keywords: initialKeywords }));
      setKeywordChips(initialKeywords.split(' ').filter(k => k.trim() !== ''));
    }
  }, [isOpen, initialKeywords]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter' && formData.keywords.trim()) {
      e.preventDefault();
      setKeywordChips([...keywordChips, formData.keywords.trim()]);
      setFormData((prev) => ({ ...prev, keywords: '' }));
    }
  };

  const removeChip = (chip) => {
    setKeywordChips(keywordChips.filter(c => c !== chip));
  };

  const handleApply = () => {
    onSearch({ ...formData, keywords: keywordChips.join(' ') });
    onClose();
  };

  const handleClear = () => {
    setFormData({
      keywords: '', location: '', radius: '30', radiusUnit: 'Miles', excludeViewed: false, excludeSimilar: false, booleanSearch: false,
      candidateName: '', dateCreated: '', dateUpdated: '', candidateType: '', employmentStatus: '', availability: '',
      profileTags: '', folders: '', campaigns: '', source: '', lastActivity: '', excludeKeywords: '', excludeSource: '',
      jobTitle: '', excludeJobTitle: '', company: '', excludeCompany: '', includeSkills: '', excludeSkills: '',
      desiredPayFrom: '', desiredPayTo: '', desiredPayPeriod: 'Per Hour', desiredPayCurrency: 'USD',
      minPayFrom: '', minPayTo: '', minPayPeriod: 'Per Hour', minPayCurrency: 'USD',
      currPayFrom: '', currPayTo: '', currPayPeriod: 'Per Hour', currPayCurrency: 'USD',
      experienceFrom: '', experienceTo: '', experiencePeriod: 'Years', degree: '', specialization: '', school: ''
    });
    setKeywordChips([]);
  };

  const renderInput = (label, name, placeholder = "") => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <input className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2.5 focus:border-green-500 focus:ring- dark:focus:ring-2 focus:ring- dark:focus:ring-green-100 outline-none transition-all bg-white"
      />
    </div>
  );

  const renderSelect = (label, name, options = []) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <select className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2.5 focus:border-green-500 outline-none bg-white"
      >
        <option value="">Select</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  const renderRangeGroup = (title, namePrefix, periods = ['Per Hour', 'Per Year']) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-500 dark:text-slate-400 block">{title}</label>
      <div className="grid grid-cols-4 gap-2">
        <input className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" name={`${namePrefix}From`} value={formData[`${namePrefix}From`]} onChange={handleChange} placeholder="From" className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-2.5 focus:border-green-500 outline-none bg-white" />
        <input className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" name={`${namePrefix}To`} value={formData[`${namePrefix}To`]} onChange={handleChange} placeholder="To" className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-2.5 focus:border-green-500 outline-none bg-white" />
        <select className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" name={`${namePrefix}Period`} value={formData[`${namePrefix}Period`]} onChange={handleChange} className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-1 py-2.5 focus:border-green-500 bg-white dark:bg-slate-700">
          {periods.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        {namePrefix.includes('Pay') && (
          <select className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" name={`${namePrefix}Currency`} value={formData[`${namePrefix}Currency`]} onChange={handleChange} className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-1 py-2.5 focus:border-green-500 bg-white dark:bg-slate-700">
            <option>USD</option><option>EUR</option>
          </select>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-700 rounded-xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-slate-700 dark:border-slate-700 flex justify-between items-center bg-gray-50/80">
          <h2 className="text-xl font-bold text-gray-800">Advanced Search</h2>
          <div className="flex gap-2">
            <button onClick={handleClear} className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors">Clear</button>
            <button onClick={handleApply} className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors shadow-sm">Search</button>
            <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600 dark:text-slate-300 p-1 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-700 dark:bg-slate-700 rounded-full"><X size={20} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200 bg-white dark:bg-slate-700 space-y-8">
          <section>
            <h3 className="text-sm font-bold text-gray-900 bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-lg mb-4 inline-block">General</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">Keywords</label>
                <input className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  onKeyDown={handleKeywordKeyDown}
                  placeholder="Type & Enter..."
                  className="w-full text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2.5 focus:border-green-500 outline-none bg-white"
                />
                <div className="flex flex-wrap gap-2 mt-1 min-h-[24px]">
                  {keywordChips.map(chip => (
                    <span key={chip} className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                      {chip} <button onClick={() => removeChip(chip)}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500">Location</label>
                <div className="flex gap-2">
                  <input className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" name="location" value={formData.location} onChange={handleChange} placeholder="Enter Location" className="flex-1 text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2.5 focus:border-green-500 outline-none bg-white" />
                  <div className="flex items-center gap-1 w-32">
                    <input className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" type="number" name="radius" value={formData.radius} onChange={handleChange} className="w-12 text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-1 py-2.5 outline-none text-center bg-white" />
                    <select className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" name="radiusUnit" value={formData.radiusUnit} onChange={handleChange} className="text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-1 py-2.5 bg-white dark:bg-slate-700"><option>Miles</option></select>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-6">
                {["Exclude Viewed Profiles", "Exclude Similar Skills", "Boolean Search"].map(label => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer text-xs text-gray-600"><input className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" type="checkbox" className="rounded border-gray-300 text-green-600 bg-white" />{label}</label>
                ))}
              </div>

              {renderInput("Candidate Name", "candidateName")}
              <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Profile Created Date</label><input className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" type="date" name="dateCreated" onChange={handleChange} className="w-full text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2.5 outline-none bg-white" /></div>
              <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Profile Updated Date</label><input className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" type="date" name="dateUpdated" onChange={handleChange} className="w-full text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2.5 outline-none bg-white" /></div>

              {renderSelect("Candidate Type", "candidateType", ["W2", "C2C", "Full Time"])}
              {renderSelect("Employment Status", "employmentStatus", ["Employed", "Unemployed"])}
              {renderSelect("Availability", "availability", ["Immediate", "2 Weeks", "1 Month"])}

              {renderSelect("Profile Tags", "profileTags", [])}
              {renderSelect("Folders", "folders", [])}
              {renderSelect("Campaigns", "campaigns", [])}

              {renderSelect("Exclude Profile Tags", "profileTags", [])}
              {renderSelect("Exclude Folders", "folders", [])}
              {renderSelect("Exclude Campaigns", "campaigns", [])}

              {renderInput("Source", "source")}
              <div className="space-y-1.5"><label className="text-xs font-medium text-gray-500">Last Activity</label><input className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600" type="date" name="lastActivity" onChange={handleChange} className="w-full text-sm border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2.5 outline-none bg-white" /></div>
              {renderInput("Exclude Keywords", "excludeKeywords")}
              {renderInput("Exclude Source", "excludeSource")}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-gray-900 bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-lg mb-4 inline-block">Professional Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {renderInput("Candidate Job Title", "jobTitle")}
              {renderInput("Exclude Job Title", "excludeJobTitle")}
              {renderInput("Company", "company")}
              {renderInput("Exclude Company", "excludeCompany")}
              {renderInput("Include Skills", "includeSkills")}
              {renderInput("Exclude Skills", "excludeSkills")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {renderRangeGroup("Desired Pay Rate", "desiredPay")}
              {renderRangeGroup("Minimum Pay Rate", "minPay")}
              {renderRangeGroup("Current Pay Rate", "currPay")}
              {renderRangeGroup("Experience", "experience", ['Years', 'Months'])}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-gray-900 bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-lg mb-4 inline-block">Qualifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {renderInput("Degree", "degree")}
              {renderInput("Specialization", "specialization")}
              {renderInput("School", "school")}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
