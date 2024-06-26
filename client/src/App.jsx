import RecordBtn from './components/RecordBtn';
import { FaArrowRight } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import ViewResultsBtn from './components/ViewResultsBtn';

function App() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-col gap-4 mt-10">
        <h1 className="text-center text-4xl font-bold text-primary">Tone Translator</h1>
        <p className="text-center text-secondary mx-8 font-medium">
          Generate speech in the style of your voice using our AI models
        </p>
        <div className="bg-white shadow-2xl p-14 rounded-3xl mx-4 lg:mx-80">
          <h3 className="text-secondary text-lg font-semibold">Record Your Voice</h3>
          <p className="text-secondary text-sm font-normal">
            Record your own voice or use a sample recording. The AI model will use this to generate speech in the style of this reference vocal style.
          </p>
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <RecordBtn />
            <button className=" hover:underline text-secondary hover:text-primary transition-colors">Use Sample Recording</button>
          </div>
          <h3 className="text-secondary text-lg font-semibold mt-6">Text To Speak</h3>
          <p className="text-secondary text-sm font-normal">
            Add a short paragraph and the AI model will speak aloud the text.
          </p>
          <textarea className="w-full border border-gray-300 rounded-md p-2 mt-2" placeholder="Enter text here" rows="4"></textarea>
          <div className="notification-area flex w-full justify-between flex-col-reverse lg:flex-row">
            <p className="text-xs text-gray-500 mt-1">keep it under 200 words</p>
            <button className=" text-secondary hover:text-primary transition-colors">

              Try an example
              <FaShuffle className="inline-block ml-2" />
            </button>
          </div>
          <div className="flex gap-4 mt-4 w-full justify-between flex-col lg:flex-row">
            <button className="bg-secondary hover:bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors flex justify-center items-center">Generate
              <FaArrowRight className="inline-block ml-2" />
            </button>
            <ViewResultsBtn />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;