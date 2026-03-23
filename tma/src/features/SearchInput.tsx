import {useAppContext} from "@/app/providers/useAppContext.ts";

const SearchInput = () => {
  const {currentPage, searchQuery, setSearchQuery} = useAppContext();
  const searchVisible = currentPage === 3;

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
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ Р С”Р В»РЎР‹РЎвЂЎР ВµР Р†Р С•Р Вµ РЎРѓР В»Р С•Р Р†Р С•..."
          className="w-full rounded-2xl border border-blue-200 bg-white/90 backdrop-blur-md px-4 py-3 shadow-lg"
        />
      </div>
    </div>
  );
};

export default SearchInput;

