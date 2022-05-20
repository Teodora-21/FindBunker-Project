import react, { useState } from 'react';

function Modal({ setModalOn, setChoice }) {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');

    return (
        <div className='bg-zinc-900 opacity-90 fixed inset-0 z-50'>
            <div className='flex h-screen justify-center items-center'>
                <div className='flex-col justify-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl space-y-5'>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="bg-slate-400 rounded-md" />
                    </div>
                    <div>
                        <label>Capacity:</label>
                        <input type="text" value={capacity} onChange={e => setCapacity(e.target.value)} className="bg-slate-400 rounded-md" />
                    </div>
                    <button onClick={() => setModalOn(false)}>
                        Cancel
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Modal;