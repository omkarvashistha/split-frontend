import React from "react";
import './Overlay.css';

const Overlay = ({isOpen,onClose,children}) => {
    return(
        <>
            {isOpen && (
                <div className="overlay">
                    <div className="overlay_background" onClick={onClose}/>
                    <div className="overlay_container">
                        <div className="overlay_controls">
                            <button
                                className="overlay__close"
                                type="button"
                                onClick={onClose}
                            />
                        </div>
                        {children}
                    </div>                    
                </div>
            )}
        </>
    )
}

export default Overlay;