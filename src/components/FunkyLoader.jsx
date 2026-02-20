function FunkyLoader (){
  return (
    <>
    <div className="flex items-center flex-col justify-center min-h-[200px] w-full bg-transparent">
      <div className="relative">
        <div className="absolute top-2 left-2 w-16 h-16 bg-black rounded-xl"></div>
        
        <div className="relative w-16 h-16 bg-yellow-300 border-4 border-black rounded-xl flex items-center justify-center animate-spin">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>
        
      </div>
            <h2 className="font-sans mt-2">We are loading chats please wait...</h2>

    </div>
</>
  );
};

export default FunkyLoader;