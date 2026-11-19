// Bootstrap is imported using a @import statement in index.css to reference the npm package
import {useRef } from 'react';
import YoutubePlayer from './YoutubePlayer';
// Would be called with <MonsterCard img="link" nameEn="name" ...... monElements={{ el1: "fire" }, {el2: "ice"}} ...... etc. />


export default function MonsterCard({ visible=false, img=null, nameEn=null, 
                                    nameJp=null, species=null, desc=null, 
                                    monElement=null, blights=null, resist=null, 
                                    weak_el=null, weak_at=null, bgm=null }) 
{

	const aRef = useRef(null);
	
	function handleMouseEnter() {
		aRef.current?.pause();
	};
	
	function handleMouseLeave() {
		aRef.current?.play();
	};
		
	function generateYoutubeEmbed(url) {
		const videoUrl = new URL(url);
		
		return videoUrl.searchParams.get("v");
	}
	
    if (!visible) {
		return null;
	} else {
        return (
            <div className="card monster-card-large" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="card-body">
                    <img className="card-img-top" src={img}></img>
                
                    {nameEn != null && <h3 className="card-title text-dark">{nameEn}</h3>}
                    {nameJp != null && <h5 className="card-subtitle text-body-secondary">{nameJp}</h5>}
                    
                    {species != null && <div className="d-flex justify-content-center">
                        <h6 className="text-dark">Species:&nbsp;&nbsp;</h6> 
                        <p className="card-text">{species}</p>
                    </div>}
                    
                    {desc != null && <div className="d-flex justify-content-center">
                        <h6 className="text-dark">Description:&nbsp;&nbsp;</h6> 
                        <p className="card-text text-dark">{desc}</p>
                    </div>}
                    
                    {monElement != null && <div className="d-flex justify-content-center">
                        <h6 className="text-dark">Primary Element:&nbsp;&nbsp;</h6> 
                        <p className="card-text text-dark">{monElement}</p>
                    </div>}

                    {blights != null && <div className="d-flex justify-content-center">
                        <h6 className="text-dark">Blight(s) Inflicted:&nbsp;&nbsp;</h6> 
                        <ul className="card-text text-dark">
                            {/* {blights.map(b => (<li key={b.name}>{b.name}</li>))} */}
                            <li>TBD</li>
                        </ul>
                    </div>}

                    {resist != null && <div className="d-flex justify-content-center">
                        <h6 className="text-dark">Resistances/Immunities:&nbsp;&nbsp;</h6> 
                        <ul className="card-text text-dark">
                            {/* {resist.map(r => (<li key={r.element}>{r.element}</li>))} */}
                            <li>TBD</li>
                        </ul>
                    </div>}

                    {weak_el != null && <div className="d-flex justify-content-center">
                        <h6 className="text-dark">Elemental Weakness:&nbsp;&nbsp;</h6> 
                        <ul className="card-text text-dark">
                            <li>Fire: {weak_el.fire}</li>
                            <li>Ice: {weak_el.ice}</li>
                            <li>Water: {weak_el.water}</li>
                            <li>Lightning: {weak_el.thunder}</li>
                            <li>Dragon: {weak_el.dragon}</li>
                        </ul>
                    </div>}

                    {weak_at != null && <div className="d-flex justify-content-center">
                        <h6 className="text-dark">Attack Type Weakness:&nbsp;&nbsp;</h6> 
                        <ul className="card-text text-dark">
                            <li>Cut: {weak_at.slashing}</li>
                            <li>Impact: {weak_at.blow}</li>
                            <li>Shot: {weak_at.bullet}</li>
                        </ul>
                    </div>}

                    {bgm != null && <YoutubePlayer 
                        videoID={generateYoutubeEmbed(bgm)}
                    />}
                </div>
            </div>
        );
    }
	
}