import { useState } from "react";
import SliderPopup from "./SliderPopup";

const ViewResultsBtn = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSlidingComponent = () => {
        setIsOpen(prevIsOpen => !prevIsOpen); // Toggling isOpen based on previous state
    };

    return (
        <>
            <button
                onClick={toggleSlidingComponent}
                className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-colors flex justify-center items-center"
            >
                View Results
            </button>
            <SliderPopup isOpen={isOpen} onClose={toggleSlidingComponent}>
                <h2>Your Voice Results</h2>
                <p>The AudioBox model is a generative flow matching model that involves random sampling...</p>
                {/* Add any additional content as needed */}
            </SliderPopup>
        </>
    );
}

export default ViewResultsBtn;
