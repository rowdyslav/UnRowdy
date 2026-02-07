type SearchInputProps = {
  currPage: number,
  setKeywords: (value: string) => void,
  keywords: string
}

const SearchInput = ({currPage, setKeywords, keywords}: SearchInputProps) => {
  const searchVisible = currPage === 1

  return (
    <div
      aria-hidden={!searchVisible}
      className={`
            fixed left-0 w-full px-4 z-50 pointer-events-auto duration-400 ease-out
            ${searchVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}
            motion-reduce:transition-none
          `}
      style={{bottom: 16}}
    >
      <div className="mx-auto max-w-3xl">
        <input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Введите ключевое слово..."
          className="w-full rounded-2xl border border-blue-200 bg-white/90 backdrop-blur-md px-4 py-3 shadow-lg"
        />
      </div>
    </div>
  );
};

export default SearchInput;