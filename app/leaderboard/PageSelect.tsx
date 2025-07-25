interface PageSelectProps {
    currentPage: number;
    totalPlayers: number;
    onPageChange: (page: number) => void;
}

const PageSelect = ({ currentPage, totalPlayers, onPageChange }: PageSelectProps) => {
    const lowerCount = (currentPage - 1) * 10 + 1;
    const upperCount = Math.min(currentPage * 10, totalPlayers);
    const lastPage = Math.ceil(totalPlayers / 10);

  return (
    <div className="flex space-x-1 mt-8 mx-auto align-middle justify-between px-10 text-slate-600 dark:text-neutral-200">
        <div>
            Showing <strong className="text-slate-800 dark:text-neutral-200">{lowerCount}</strong> to <strong className="text-slate-800 dark:text-neutral-200">{upperCount}</strong> of <strong className="text-slate-800 dark:text-neutral-200">{totalPlayers}</strong> players
        </div>
        <div className="flex items-center gap-8">
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" />
                </svg>
            </button>

            <p className="text-slate-600 dark:text-neutral-200">
                Page <strong className="text-slate-800 dark:text-neutral-200">{currentPage}</strong> of&nbsp;<strong className="text-slate-800 dark:text-neutral-200">{lastPage}</strong>
            </p>

            <button disabled={lowerCount+10 > totalPlayers} onClick={() => onPageChange(currentPage + 1)} className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"  />
                </svg>
            </button>
        </div>
    </div>
  )
}

export default PageSelect
