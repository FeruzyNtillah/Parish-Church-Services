import React from 'react';
import { X } from 'lucide-react';

// Parish list from dashboard
const parishes = [
  { id: 1, name: "Parokia ya Bikira Maria Mama wa Rozari Takatifu - Makongo Juu" },
  { id: 2, name: "Parokia ya Mt. Petro - Oysterbay" },
  { id: 3, name: "Parokia ya Mt. Martin wa Porres - Mwananyamala" },
  { id: 4, name: "Parokia ya Mt. Anna - Hananasif" },
  { id: 5, name: "Parokia ya Mt. Kolbe - Kijitonyama" },
  { id: 6, name: "Parokia ya Mt. Martha - Mikocheni" },
  { id: 7, name: "Parokia ya Bikira Maria Mama wa Huruma - Mbezi Beach (Mt. Gaspar)" },
  { id: 8, name: "Parokia ya Mt. Michael - Kawe" },
  { id: 9, name: "Parokia ya Bikira Maria Mama wa Mwokozi - Sinza" },
  { id: 10, name: "Parokia ya Mt. Petro - Chuo Kikuu (St. Augustine)" }
];

// Common provinces in Tanzania
const provinces = [
  "Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", 
  "Katavi", "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", 
  "Mbeya", "Morogoro", "Mtwara", "Mwanza", "Njombe", "Pwani", 
  "Rukwa", "Ruvuma", "Shinyanga", "Simiyu", "Singida", "Tabora", "Tanga"
];

interface AddFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyName: string;
  onFamilyNameChange: (name: string) => void;
  selectedParish: number;
  onParishChange: (parishId: number) => void;
  selectedProvince: string;
  onProvinceChange: (province: string) => void;
  jummuiya: string;
  onJummuiyaChange: (jummuiya: string) => void;
  dateJoined: string;
  onDateJoinedChange: (date: string) => void;
  onSave: () => void;
}

const AddFamilyModal: React.FC<AddFamilyModalProps> = ({
  isOpen,
  onClose,
  familyName,
  onFamilyNameChange,
  selectedParish,
  onParishChange,
  selectedProvince,
  onProvinceChange,
  jummuiya,
  onJummuiyaChange,
  dateJoined,
  onDateJoinedChange,
  onSave
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center z-60">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Family</h3>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Close add family modal" title="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {/* Family Name */}
            <div>
              <label htmlFor="family-name-input" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Family Name</label>
              <input
                id="family-name-input"
                value={familyName}
                onChange={(e) => onFamilyNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g. Mwakalinga Family"
              />
            </div>

            {/* Parish */}
            <div>
              <label htmlFor="parish-select" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Parish</label>
              <select
                id="parish-select"
                value={selectedParish}
                onChange={(e) => onParishChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                {parishes.map((parish) => (
                  <option key={parish.id} value={parish.id}>
                    {parish.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Province */}
            <div>
              <label htmlFor="province-select" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Province</label>
              <select
                id="province-select"
                value={selectedProvince}
                onChange={(e) => onProvinceChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            {/* Jummuiya */}
            <div>
              <label htmlFor="jummuiya-input" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Jummuiya</label>
              <input
                id="jummuiya-input"
                value={jummuiya}
                onChange={(e) => onJummuiyaChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g. St. Joseph Jummuiya"
              />
            </div>

            {/* Date Joined */}
            <div>
              <label htmlFor="date-joined-input" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date Joined</label>
              <input
                id="date-joined-input"
                type="date"
                value={dateJoined}
                onChange={(e) => onDateJoinedChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">Cancel</button>
            <button onClick={onSave} className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors">Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFamilyModal;
