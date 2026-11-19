import { useEffect, useState } from 'react';

import MonsterCard from './MonsterCard.jsx';
import Journal from './Journal.jsx';

import '../css/App.css';


async function getInfo(monster=null) {
        //Search for given monster name and update infoBody div with info
		
		try {
			//const response = await fetch(`https://mhw-db.com/monsters?q={"name":"${monster}"}`);
			const apiUrl = (monster == null) ? "https://141.148.71.142/v1/monsters?limit=333" : `https://141.148.71.142/v1/monsters?MonsterName=${monster}?limit=333`
			const response = await fetch(apiUrl);
			const monsterInfo = await response.json();

			return monsterInfo;
		}
		catch (error) {
			console.log(`Error: ${error}`);
		}
    }
	
	
function App() {
  const [apiInfo, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  
  // Get async data to populate card
  useEffect(() => {
        async function fetchData() {
            try {
				const resp = await Promise.all([
					getInfo()
				]);
				
				setInfo(resp[0]);
			}
			catch (e) {
				console.error(e);
			}
			finally {
				setLoading(false);
			}
        }

        fetchData();
    }, []);
  
	if (loading) {
		return (
			<div>Loading...</div>
		);
	}

	const totalPages = Math.ceil(apiInfo.monsters.length / itemsPerPage);

	const currentMonsters = apiInfo.monsters.slice(
		firstItemIndex,
		lastItemIndex
	)

	console.log(totalPages);

	// returns with an empty constructor MonsterInfo upon first load; will not be visible or populated. Populated when a monster card is clicked
  return (
	<>
		<Journal>
				{currentMonsters.map((monster) => (
					<div key={monster.monster_id}>
						<MonsterCard
							image={monster.image_url}
							icon={monster.IconUrl}
							nameEn={monster.name_en}
							nameJp={monster.name}
							species={null}
							desc={monster.description}
							monElement={monster.element}
							blights={null}
							resist={null}
							weak_el={monster.weakness_element}
							weak_at={monster.weakness_attack}
							bgm={monster.bgm[0].url}
						/>
					</div>
				))}
		</Journal>

		{/* Pagination controls*/}
		<div className="z-3 position-relative d-flex justify-content-center gap-3 mt-3">
			<button
				className="btn btn-primary"
				disabled={currentPage === 1}
				onClick={() => setCurrentPage(currentPage - 1)}
			>
				Previous
			</button>

			<span className="align-self-center">
				Page {currentPage} of {totalPages}
			</span>

			<button
				className="btn btn-primary"
				disabled={currentPage === totalPages || totalPages === 0}
				onClick={() => setCurrentPage(currentPage + 1)}
			>
				Next
			</button>
		</div>
	</>
    );
}



export default App;
