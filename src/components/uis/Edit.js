import React from "react";

export default function Edit (props) {

    return (
        <div className="window window--add">
            <div // Clost btn
                className="sm-btn sm-btn--close"
                onClick={() => console.log("placeholder")}
                type="button"
            > 
                x
            </div>
            <form id="editForm">
                <div className="window__input-container">
                    <h3 className="window__label--name" htmlFor="recipeName">
                        Placeholder
                    </h3>
                </div>
            </form>
        </div>
    );
};