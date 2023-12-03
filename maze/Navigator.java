package main;
import java.awt.Color;
import java.util.ArrayList;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.lang.Thread;

public class Navigator{
	/**
	 * 
	 */
	public MazeCell[][] cells;
	public ArrayList<MazeCell> previousList = new ArrayList<>();
	private ArrayList<Integer> validDir = new ArrayList<>();
	private ArrayList<MazeCell> nextList = new ArrayList<>();
	private MazeCell current;
	private MazeCell start;
	private int size;
	private Random rand = new Random();
	private int x;
	private int y;
	
	public Navigator(int startX, int startY, int arrSize, MazeCell[][] allCells) {
		this.x = startX;
		this.y = startY;
		this.size = arrSize;
		this.cells = allCells;
		this.start = allCells[startX][startY];
		this.current = this.start;
		
		this.start.visited = true;
		this.start.setBackground(new Color(128, 0, 32));
	}
	
	public void navigate() {
		do {
			current.setBackground(new Color(128, 0, 32));
			try {
				Thread.sleep(50);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			//Check which surrounding tiles are unvisited
			if(x-1 >= 0 && !cells[x-1][y].visited) {
				validDir.add(0);
				nextList.add(cells[x-1][y]);
			}
			if(y-1 >= 0 && !cells[x][y-1].visited) {
				validDir.add(1);
				nextList.add(cells[x][y-1]);
			}
			if(x+1 < size && !cells[x+1][y].visited) {
				validDir.add(2);
				nextList.add(cells[x+1][y]);
			}
			if(y+1 < size && !cells[x][y+1].visited) {
				validDir.add(3);
				nextList.add(cells[x][y+1]);
			}
			
			//Choose next cell
			if(nextList.isEmpty()) {
				//There are no unvisited cells nearby, backtrack until there are.
				current.setBackground(Color.lightGray);
				
				//Backtrack by one tile
				current = previousList.get(previousList.size() - 1);
				previousList.remove(previousList.size() - 1);
				
				if(previousList.isEmpty() && nextList.isEmpty()) {
					//Loop break case
					System.out.println("Maze generation complete!");
					break;
				} else {
					//Get coordinates of previous cell and move to them
					Pattern p = Pattern.compile("\\[(\\d+)\\]\\[(\\d+)\\]");
					Matcher m = p.matcher(current.getName());
					if(m.find()) {
						x = Integer.parseInt(m.group(1));
						y = Integer.parseInt(m.group(2));
						validDir.clear();
						nextList.clear();
					} else {
						System.out.println("Previous cell coordinate parsing error.");
						System.exit(1);
					}
					continue;
				}
				
			} else {
				//Connect and move to next cell
				int randInt = rand.nextInt(validDir.size());
				previousList.add(current);
				switch(validDir.get(randInt)) {
					case 0:
						x--;
						break;
					case 1:
						y--;
						break;
					case 2:
						x++;
						break;
					case 3:
						y++;
						break;
						
				}
				current.connect(nextList.get(randInt), validDir.get(randInt));
				current.setBackground(Color.lightGray);
				current = nextList.get(randInt);
				current.visited = true;
				nextList.clear();
				validDir.clear();
				continue;
			}
		} while(true);
	}
}
