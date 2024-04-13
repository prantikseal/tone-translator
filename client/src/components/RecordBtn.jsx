import { useState } from 'react'
import Popup from './Popup'
import { AiTwotoneAudio } from "react-icons/ai";
import vmsg from 'vmsg';

const RecordBtn = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [recorder, setRecorder] = useState(null);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const initializeRecorder = async () => {
        try {
            const newRecorder = new vmsg.Recorder({
                wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
            });
            await newRecorder.initAudio();
            await newRecorder.initWorker();
            setRecorder(newRecorder);
        } catch (error) {
            console.error("Error initializing recorder:", error);
        }
    };

    const startRecording = async () => {
        try {
            if (recorder) {
                recorder.startRecording();
                setIsRecording(true);
            } else {
                await initializeRecorder();
                recorder.startRecording();
                setIsRecording(true);
            }
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    const stopRecording = async () => {
        try {
            if (recorder) {
                const blob = await recorder.stopRecording();
                setAudioBlob(blob);
                setIsRecording(false);
            }
        } catch (error) {
            console.error("Error stopping recording:", error);
        }
    };

    const handleUseRecording = () => {
        // Handle the use of recorded audio here, for example, you can save it to state or send it to a server
        console.log("Recording used:", audioBlob);
        // Reset states if needed
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
                        You can also use the voice styles we provided if you don{'\''}t want to create your own.
                    </p>
                </div>
            </Popup>
        </>
    )
}

export default RecordBtn
