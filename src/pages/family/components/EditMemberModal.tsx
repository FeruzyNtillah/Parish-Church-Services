import React, { useState, useEffect } from 'react';
import { X, User, Users } from 'lucide-react';
import type { Member } from '../../../types';

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateMember: (memberData: Partial<Member>) => void;
  member: Member | null;
}

const EditMemberModal: React.FC<EditMemberModalProps> = ({
  isOpen,
  onClose,
  onUpdateMember,
  member
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    relation: '',
    baptismDate: '',
    communionDate: '',
    confirmationDate: '',
    maritalStatus: 'single' as 'single' | 'married',
    marriageDate: '',
    spouseName: '',
    phone: ''
  });

  const [showMarriageDetails, setShowMarriageDetails] = useState(false);

  // Initialize form when member changes
  useEffect(() => {
    if (member) {
      setFormData({
        firstName: member.first_name || '',
        middleName: member.middle_name || '',
        lastName: member.last_name || '',
        dateOfBirth: member.date_of_birth || '',
        gender: member.gender || '',
        relation: member.relation || '',
        baptismDate: member.baptism_date || '',
        communionDate: member.communion_date || '',
        confirmationDate: member.confirmation_date || '',
        maritalStatus: member.is_married ? 'married' : 'single',
        marriageDate: member.marriage_date || '',
        spouseName: member.spouse || '',
        phone: ''
      });
      setShowMarriageDetails(member.is_married || false);
    }
  }, [member]);

  if (!isOpen || !member) return null;

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

    const memberData: Partial<Member> = {
      first_name: formData.firstName,
      middle_name: formData.middleName || undefined,
      last_name: formData.lastName,
      date_of_birth: formData.dateOfBirth || undefined,
      gender: formData.gender || undefined,
      relation: formData.relation || undefined,
      baptism_date: formData.baptismDate || undefined,
      communion_date: formData.communionDate || undefined,
      confirmation_date: formData.confirmationDate || undefined,
      is_married: formData.maritalStatus === 'married',
      marriage_date: formData.maritalStatus === 'married' ? formData.marriageDate : undefined,
      spouse: formData.maritalStatus === 'married' ? formData.spouseName : undefined,
    };

    onUpdateMember(memberData);
    onClose();
  };

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Family Member</h4>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Close edit member modal" title="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="edit-first-name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">First Name *</label>
              <input
                id="edit-first-name"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter first name"
                required
              />
            </div>

            {/* Middle Name */}
            <div>
              <label htmlFor="edit-middle-name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Middle Name</label>
              <input
                id="edit-middle-name"
                type="text"
                value={formData.middleName}
                onChange={(e) => handleInputChange('middleName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter middle name (optional)"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="edit-last-name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Last Name *</label>
              <input
                id="edit-last-name"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="edit-date-of-birth" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
              <input
                id="edit-date-of-birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="edit-gender" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
              <select
                id="edit-gender"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Relation */}
            <div>
              <label htmlFor="edit-relation" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Relation</label>
              <select
                id="edit-relation"
                value={formData.relation}
                onChange={(e) => handleInputChange('relation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

            {/* Baptism Date */}
            <div>
              <label htmlFor="edit-baptism-date" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Baptism Date</label>
              <input
                id="edit-baptism-date"
                type="date"
                value={formData.baptismDate}
                onChange={(e) => handleInputChange('baptismDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Communion Date */}
            <div>
              <label htmlFor="edit-communion-date" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Communion Date</label>
              <input
                id="edit-communion-date"
                type="date"
                value={formData.communionDate}
                onChange={(e) => handleInputChange('communionDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Confirmation Date */}
            <div>
              <label htmlFor="edit-confirmation-date" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Confirmation Date</label>
              <input
                id="edit-confirmation-date"
                type="date"
                value={formData.confirmationDate}
                onChange={(e) => handleInputChange('confirmationDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Marital Status */}
            <div>
              <label htmlFor="edit-marital-status" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Marital Status</label>
              <select
                id="edit-marital-status"
                value={formData.maritalStatus}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            {/* Marriage Details - Only show if married */}
            {showMarriageDetails && (
              <>
                <div>
                  <label htmlFor="edit-marriage-date" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Marriage Date</label>
                  <input
                    id="edit-marriage-date"
                    type="date"
                    value={formData.marriageDate}
                    onChange={(e) => handleInputChange('marriageDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="edit-spouse-name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Spouse Name</label>
                  <input
                    id="edit-spouse-name"
                    type="text"
                    value={formData.spouseName}
                    onChange={(e) => handleInputChange('spouseName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Update Member
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMemberModal;
