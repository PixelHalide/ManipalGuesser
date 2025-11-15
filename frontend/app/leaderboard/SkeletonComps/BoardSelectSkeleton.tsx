interface BoardSelectProps {
  isSelected: 'total' | 'weekly';
}
const BoardSelect = ({ isSelected }: BoardSelectProps) => {

  return (
  <div className='py-3 px-5 bg-gray-800/50 rounded-lg flex gap-2 w-fit mb-8 text-sm mx-auto transition-all duration-300'>
    <button
      className={`py-2 px-4 rounded cursor-pointer ${
        isSelected === 'total'
          ? 'bg-blue-400/20 text-blue-400 border border-blue-400/60'
          : 'text-neutral-300 hover:text-neutral-50'
      }`}
    >
      Overall
    </button>
    <button
      className={`py-2 px-4 rounded cursor-pointer ${
        isSelected === 'weekly'
          ? 'bg-green-400/30 text-green-400 border border-green-400/60'
          : 'text-neutral-300 hover:text-neutral-50'
      }`}
    >
      Weekly
    </button>
  </div>
  )
}

export default BoardSelect
