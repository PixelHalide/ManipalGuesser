'use client'

interface BoardSelectProps {
  onSelect: (type: 'overall' | 'weekly') => void;
  isSelected: 'overall' | 'weekly';
}
const BoardSelect = ({ onSelect, isSelected }: BoardSelectProps) => {

  return (
  <div className='py-3 px-5 bg-gray-800/50 rounded-lg flex gap-2 w-fit mb-8 text-sm mx-auto'>
    <button
      className={`py-2 px-4 rounded ${
        isSelected === 'overall'
          ? 'bg-blue-400/20 text-blue-400 border border-blue-400/60'
          : 'bg-gray-200 text-gray-800'
      }`}
      onClick={() => onSelect('overall')}
    >
      Overall
    </button>
    <button
      className={`py-2 px-4 rounded ${
        isSelected === 'weekly'
          ? 'bg-green-400/30 text-green-400 border border-green-400/60'
          : 'bg-gray-200 text-gray-800'
      }`}
      onClick={() => onSelect('weekly')}
    >
      Weekly
    </button>
  </div>
  )
}

export default BoardSelect
