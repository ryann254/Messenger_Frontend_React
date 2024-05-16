const ChannelInfo = () => {
  return (
    <div className='drawer drawer-end'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <label
          htmlFor='my-drawer-4'
          className='btn btn-square btn-ghost drawer-button'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-5 h-5 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
            ></path>
          </svg>
        </label>
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-4'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <div className='menu px-4 w-[86%] min-h-full bg-white'>
          {/* Channel Info content here */}
          <div className='flex'>
            <span className='text-xl font-semibold'>Channel Info</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;
