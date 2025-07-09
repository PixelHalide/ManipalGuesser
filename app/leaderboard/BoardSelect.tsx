'use client'

interface BoardSelectProps {
  onSelect: (type: 'total' | 'weekly') => void;
  isSelected: 'total' | 'weekly';
}
const BoardSelect = ({ onSelect, isSelected }: BoardSelectProps) => {

  return (
  <div className='py-3 px-5 bg-neutral-300 dark:bg-gray-800/50 rounded-lg flex gap-2 w-fit mb-8 text-sm mx-auto transition-all duration-300'>
    <button
  className={`
    py-2 px-4 rounded cursor-pointer transition-colors duration-300
      ${isSelected === 'total'
        ? 'bg-blue-100 text-blue-700 border border-blue-300 dark:bg-blue-400/20 dark:text-blue-300 dark:border-blue-400/60 hover:text-blue-400'
      : 'text-gray-800 hover:text-black dark:text-neutral-300 dark:hover:text-neutral-50 hover:bg-gray-200 dark:hover:bg-gray-700/50'
      }`}
      onClick={() => onSelect('total')}
    >
      Overall
    </button>

    <button
      className={`py-2 px-4 rounded cursor-pointer ${
        isSelected === 'weekly'
          ? 'bg-green-100 text-green-700 border border-green-300 dark:bg-green-400/30 dark:text-green-400 dark:border-green-400/60 hover:text-green-500'
      : 'text-gray-800 hover:text-black dark:text-neutral-300 dark:hover:text-neutral-50 hover:bg-gray-200 hover:dark:bg-gray-700/50'
      }`}
      onClick={() => onSelect('weekly')}
    >
      Weekly
    </button>
  </div>
  )
}

export default BoardSelect
