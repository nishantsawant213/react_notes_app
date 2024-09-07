import React from "react";
import noDataImage from '../../assets/no-data.jpg';
const EmptyCard = ({imgSrc, message}) => {
    return (<>
        <div className="flex flex-col items-center justify-content mt-20">
            <img src={noDataImage}  alt="No notes"  className="w-[500px] "/>
            <p className="w-1/2 textx-sm font-medium text-slate-700 text-center leading-7 mt-5">
            Start creating your first note! Click the 'Add' button to jot down your thougths, ideas, and reminders. Let's get started
            </p>
        </div>
    </>)
}

export default EmptyCard