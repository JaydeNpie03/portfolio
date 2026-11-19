
import React, { useState } from "react";
import CardContext from './CardContext.jsx';

// Holds journal background image and allows for the placement of MonsterCard React components on left of page, and MonsterInfo on right page
export default function MonsterCard({ children }) {
    const [displayedMonsterInfo, setDisplayedMonsterInfo] = useState(null);

    const handleClickCard = (monsterInfo) => {
        setDisplayedMonsterInfo(monsterInfo);
    };

    const modifiedChildren = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child;
        }

        return React.cloneElement(child, {
            onImageClick: handleClickCard 
        });
    });

	return (
        <div className="journal w-100 mx-auto overflow-hidden">

            {/* Journal background image */}
            <img src={`${import.meta.env.BASE_URL}images/journal.jpg`} className="position-absolute top-0 start-0 w-100 h-100 object-fit-contain"/>
            
            {/* Journal pages (React body) */}
            <div className="root row row-cols-2 paper-content position-absolute top-0 start-0 h-100 p-5 overflow-hidden" style={{ marginLeft: "18%", width: "70%" }}>

                {/* Allows for the passing of the handleClickCard function to child components */}
                <CardContext.Provider value={handleClickCard}>

                    {/* Journal left page, will contain MonsterCard React components */}
                    <div className="row row-cols-4 g-4 h-100">
                        {modifiedChildren}
                    </div>
                
                
                    {/* Journal right page TODO*/}
                    <div className="h-100">
                        {displayedMonsterInfo}
                    </div>
                </CardContext.Provider>
            </div>

        </div>
	);
	
}