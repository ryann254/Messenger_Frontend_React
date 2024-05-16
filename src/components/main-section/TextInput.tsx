const TextInput = () => {
  return (
    <div className='flex px-6 py-4'>
      <div className='h-14 w-14 mr-4 rounded-full border border-black/[.2] flex justify-center items-center cursor-pointer'>
        <i className='fa-solid fa-plus text-black/[.4] !font-normal text-3xl'></i>
      </div>
      <input
        type='text'
        className='w-[85%] px-4 py-2 border border-black/[.1] rounded-md focus:outline-none'
        placeholder='Message...'
      />
      <i className='fa-solid fa-paper-plane text-lg absolute bottom-[1.5%] right-[9%] cursor-pointer text-sky-600'></i>
    </div>
  );
};

export default TextInput;
