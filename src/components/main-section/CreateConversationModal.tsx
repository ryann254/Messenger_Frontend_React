import UploadImage from '@assets/upload-image.png';

const CreateConversationModal = () => {
  return (
    <dialog id='my_modal_3' className='modal relative'>
      <div className='modal-box w-full h-[55%] max-h-full absolute bottom-0 rounded-b-none p-0'>
        <div className='p-6'>
          <h3 className='text-lg text-center tracking-wide font-bold'>
            Create a Conversation
          </h3>
          <p className='py-3 text-center text-black/[.5] text-sm'>
            Your conversation is where you and your team hang out. Make yours
            and start talking
          </p>
          <div className='flex flex-col items-center justify-center mt-6 mb-4 cursor-pointer'>
            <img src={UploadImage} alt='Upload' />
            <span className='text-sm font-bold text-[#0B5FAE] mt-3'>
              Upload image
            </span>
          </div>
          <div className='flex flex-col mb-2'>
            <label
              htmlFor='serverName'
              className='text-sm text-black/[.5] font-bold my-2'
            >
              Conversation Name
            </label>
            <input
              type='text'
              className='input focus:border-none focus:outline-none text-sm input-bordered border-[#D8E0E8] w-full bg-[#F1F5F9]'
              id='serverName'
              placeholder='Eg. Zoro fan club'
            />
          </div>
          <span className='text-[13px] text-black/[.5]'>
            By creating a conversation, you agree to the{' '}
            <span className='text-[#0B5FAE] font-bold'>
              Community Guildelines
            </span>
          </span>
        </div>
        <div className='flex justify-between items-center text-sm bg-[#0B5FAE]/[.1] py-4 px-6'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='bg-transparent font-bold'>Close</button>
          </form>
          <button className='bg-[#0B5FAE] rounded-lg text-white p-2.5'>
            Create Conversation
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CreateConversationModal;
