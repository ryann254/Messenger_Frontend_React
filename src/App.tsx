function App() {
  return (
    <>
      <div id='chat'></div>
      <div className='container mt-4 mb-2 xl:w-[70%] mx-auto px-4 xl:px-0 grid grid-cols-5 gap-4'>
        <div className='col-span-1 rounded-md h-11 border border-[#007bff]'>
          <input
            type='text'
            className='w-full px-4 py-2 h-full bg-transparent border-none outline-none'
          />
        </div>
        <div className='col-span-3 rounded-md h-11 border border-[#007bff]'>
          <input
            type='text'
            className='w-full px-4 py-2 h-full bg-transparent border-none outline-none'
          />
        </div>
        <div className='col-span-1 rounded-md h-11 border bg-[#007bff]'>
          <button className='w-full h-full cursor-pointer text-white'>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
