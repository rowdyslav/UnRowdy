const SwipeHint = ({show}: { show: boolean }) => {
    if (!show) return null;
  
    return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-fade-in">
        <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full text-white flex items-center gap-2">
            Свайпни вверх
       </div>
    </div>
  );
}

export default SwipeHint;