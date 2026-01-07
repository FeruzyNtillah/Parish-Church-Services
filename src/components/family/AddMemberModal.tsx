import React, { useState } from 'react';
import { X, User, Users } from 'lucide-react';
import type { Member } from '../../types';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (memberData: Omit<Member, 'id'>) => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onAddMember
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    relation: '',
    baptismDate: '',
    communionDate: '',
    confirmationDate: '',
    maritalStatus: 'single' as 'single' | 'married',
    marriageDate: '',
    spouseName: '',
    phone: '',
    gender: ''
  });

  const [showMarriageDetails, setShowMarriageDetails] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'maritalStatus') {
      setShowMarriageDetails(value === 'married');
      if (value === 'single') {
        setFormData(prev => ({ ...prev, marriageDate: '', spouseName: '' }));
      }
    }
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName) {
      alert('First name and last name are required');
      return;
    }

    const memberData: Omit<Member, 'id'> = {
      fullName: `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim(),
      firstName: formData.firstName,
      middleName: formData.middleName || undefined,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth || undefined,
      relation: formData.relation || undefined,
      baptismDate: formData.baptismDate || undefined,
      communionDate: formData.communionDate || undefined,
      confirmationDate: formData.confirmationDate || undefined,
      maritalStatus: formData.maritalStatus,
      marriageDate: formData.maritalStatus === 'married' ? formData.marriageDate : undefined,
      spouseName: formData.maritalStatus === 'married' ? formData.spouseName : undefined,
      phone: formData.phone || undefined,
      gender: formData.gender || undefined
    };

    onAddMember(memberData);
    onClose();
    // Reset form
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      relation: '',
      baptismDate: '',
      communionDate: '',
      confirmationDate: '',
      maritalStatus: 'single',
      marriageDate: '',
      spouseName: '',
      phone: '',
      gender: ''
    });
    setShowMarriageDetails(false);
  };

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-60 p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Add Family Member</h4>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Close add member modal" title="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">First Name *</label>
              <input
                id="first-name"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter first name"
                required
              />
            </div>

            {/* Middle Name */}
            <div>
              <label htmlFor="middle-name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Middle Name</label>
              <input
                id="middle-name"
                type="text"
                value={formData.middleName}
                onChange={(e) => handleInputChange('middleName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter middle name (optional)"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Last Name *</label>
              <input
                id="last-name"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="date-of-birth" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
              <input
                id="date-of-birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Relation */}
            <div>
              <label htmlFor="relation" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Relation</label>
              <select
                id="relation"
                value={formData.relation}
                onChange={(e) => handleInputChange('relation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="">Select relation</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Grandfather">Grandfather</option>
                <option value="Grandmother">Grandmother</option>
                <option value="Uncle">Uncle</option>
                <option value="Aunt">Aunt</option>
                <option value="Cousin">Cousin</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Baptism Date */}
            <div>
              <label htmlFor="baptism-date" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Baptism Date</label>
              <input
                id="baptism-date"
                type="date"
                value={formData.baptismDate}
                onChange={(e) => handleInputChange('baptismDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Communion Date */}
            <div>
              <label htmlFor="communion-date" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Communion Date</label>
              <input
                id="communion-date"
                type="date"
                value={formData.communionDate}
                onChange={(e) => handleInputChange('communionDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Confirmation Date */}
            <div>
              <label htmlFor="confirmation-date" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Confirmation Date</label>
              <input
                id="confirmation-date"
                type="date"
                value={formData.confirmationDate}
                onChange={(e) => handleInputChange('confirmationDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter phone number"
              />
            </div>

            {/* Marital Status */}
            <div>
              <label htmlFor="marital-status" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Marital Status</label>
              <select
                id="marital-status"
                value={formData.maritalStatus}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            {/* Marriage Details - Only show if married */}
            {showMarriageDetails && (
              <>
                <div>
                  <label htmlFor="marriage-date" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Marriage Date</label>
                  <input
                    id="marriage-date"
                    type="date"
                    value={formData.marriageDate}
                    onChange={(e) => handleInputChange('marriageDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="spouse-name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Spouse Name</label>
                  <input
                    id="spouse-name"
                    type="text"
                    value={formData.spouseName}
                    onChange={(e) => handleInputChange('spouseName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter spouse name"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button 
              onClick={onClose} 
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Add Member
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMemberModal;
