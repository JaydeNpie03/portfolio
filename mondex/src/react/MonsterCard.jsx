
// React import is used for CardContext, do not remove!
import React, {useContext, useRef } from 'react';

import MonsterInfo from './MonsterInfo.jsx';
import CardContext from './CardContext.jsx';	

export default function MonsterCard({ image, icon, nameEn=null, 
                                    nameJp=null, species=null, desc=null, 
                                    monElement=null, blights=null, resist=null, 
                                    weak_el=null, weak_at=null, bgm=null}) {

	const aRef = useRef(null);
	const onImageClick = useContext(CardContext);	// CardContext is defined and passed from Journal.jsx, which is the parent of this component
	
	function handleMouseEnter() {
		aRef.current?.pause();
	};
	
	function handleMouseLeave() {
		aRef.current?.play();
	};

	function generateInfo() {
		return(
			<MonsterInfo 
				visible={true}
				img={image}
				nameEn={nameEn}
				nameJp={nameJp}
				species={species}
				desc={desc}
				monElement={monElement}
				blights={blights}
				resist={resist}
				weak_el={weak_el ? weak_el[0] : null}
				weak_at={weak_at ? weak_at[0] : null}
				bgm={null}
			/>
		)
	}
	
	return (
			<div className="card monster-card-small m-3" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => onImageClick(generateInfo())}>
				<div className="card-body">
					<img className="card-img-top" src={icon}></img>
				</div>
			</div>
	);
	
}