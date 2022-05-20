import react, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function Modal({ setModalOn, setChoice }) {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');

    return (
        <div className='bg-zinc-900 opacity-[95%] fixed inset-0 z-50'>
            <div className='flex h-screen justify-center items-center'>
                <div className='bg-white py-12 px-24 border-4 border-sky-500 rounded-xl space-y-5'>
                    <button onClick={() => setModalOn(false)}>
                        <div className='absolute top-[33%] right-[37%] scale-150 bg-gray-400 hover:bg-red-600 duration-200 rounded-md h-4'>
                            {<AiOutlineClose color />}
                        </div>
                    </button>
                    <div className='flex-col justify-center space-y-5'>
                        <div>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="placeholder-gray-700 bg-slate-400 rounded-md font-bold" placeholder="Bunker Name" />
                        </div>
                        <div>
                            <input type="text" value={capacity} onChange={e => setCapacity(e.target.value)} className="placeholder-gray-700 bg-slate-400 rounded-md font-bold"  placeholder="Capacity"  />
                        </div>
                        <div>
                            <input type="text" value={capacity} onChange={e => setCapacity(e.target.value)} className="placeholder-gray-700 bg-slate-400 rounded-md font-bold"  placeholder="Capacity"  />
                        </div>
                        <div className='flex items-center justify-center pt-5'>
                            <button onClick={() => setModalOn(false)} className='bg-custom_fade_green rounded-md scale-125 h-8 w-32 hover:bg-green-600 duration-300'>
                                Add bunker
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Modal;