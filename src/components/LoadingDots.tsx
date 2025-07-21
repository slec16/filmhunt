const LoadingDots = () => {
  return (
    <div className="flex items-center justify-center space-x-2 h-16">
        
      <div className="w-3 h-3 bg-orange-500 rounded-full animate-[bounce_1s_infinite_0ms]"></div>
      <div className="w-3 h-3 bg-orange-500 rounded-full animate-[bounce_1s_infinite_150ms]"></div>
      <div className="w-3 h-3 bg-orange-500 rounded-full animate-[bounce_1s_infinite_300ms]"></div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingDots