import { useState } from 'react'
import Popup from './Popup'
import { AiTwotoneAudio } from "react-icons/ai";


const RecordBtn = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <button onClick={togglePopup} className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors flex justify-center items-center">
                Record
                <AiTwotoneAudio className="inline-block ml-2" />
            </button>
            <Popup isOpen={isOpen} onClose={togglePopup} title={'Voice Registration'}>
                <p>To register your own voice, click Record and read the following prompt</p>

                <div className="box rounded-md bg-gray-300 p-4 mt-4 flex flex-col gap-5">
                        <div className="random-prompt-box bg-white p-4 rounded-md">
                            <p>The audio engineer carefully adjusted the sound levels to ensure clear speech and music generation during the live performance.</p>
                        </div>

                        <button className='bg-secondary  text-white py-2 px-4 rounded-md hover:bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors flex justify-center items-center w-full'>
                            <AiTwotoneAudio className='inline-block mr-2' />
                            Record your Reading
                        </button>

                        <p className='text-sm text-gray-500 mt-2'>
                        You can also use the voice styles we provided if you don{`'`}t want to create your own.
                        </p>
                </div>
            </Popup>
        </>
    )
}

export default RecordBtn