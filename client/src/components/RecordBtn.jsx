import { useState, useRef } from 'react'
import Popup from './Popup'
import { AiTwotoneAudio } from "react-icons/ai";


const RecordBtn = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setAudioBlob(null);
        }
    };

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                const chunks = [];

                mediaRecorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/wav' });
                    setAudioBlob(blob);
                };

                mediaRecorder.start();
                setIsRecording(true);
            })
            .catch(error => console.error('Error accessing microphone:', error));
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleUseRecording = () => {
        console.log("Recording used:", audioBlob);
        setIsOpen(false);
        setAudioBlob(null);
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

                    {isRecording ? (
                        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors" onClick={stopRecording}>
                            Stop Recording
                        </button>
                    ) : (
                        <button className={`bg-secondary text-white py-2 px-4 rounded-md hover:bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors flex justify-center items-center w-full ${audioBlob ? 'hidden' : 'block'
                            }`} onClick={startRecording}>
                            <AiTwotoneAudio className='inline-block mr-2' />
                            Record your Reading
                        </button>
                    )}

                    {audioBlob && (
                        <>
                            <div className="audio-record-section flex flex-col gap-2 rounded-md">
                                <audio controls src={URL.createObjectURL(audioBlob)} className='w-full mb-4'></audio>
                                <button className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors flex justify-center items-center w-full' onClick={handleUseRecording}>
                                    Use this Recording
                                </button>
                                <button className='bg-secondary text-white py-2 px-4 rounded-md hover:bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors flex justify-center items-center w-full mt-2' onClick={() => setAudioBlob(null)}>
                                    Record Again
                                </button>
                            </div>
                        </>
                    )}

                    <p className='text-sm text-gray-500 mt-2'>
                        You can also use the voice styles we provided if you don{`'`}t want to create your own.
                    </p>
                </div>
            </Popup>
        </>
    )
}

export default RecordBtn
