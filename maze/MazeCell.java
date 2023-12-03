package main;
import java.awt.Color;
import java.util.ArrayList;

import javax.swing.JPanel;
import javax.swing.border.MatteBorder;

public class MazeCell extends JPanel{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public boolean visited = false;
	private ArrayList<MazeCell> connectedTo = new ArrayList<>();
	public int[] connectedDir = {1, 1, 1, 1};
	
	public MazeCell() {
		this.setBackground(Color.white);
		this.setBorder(new MatteBorder(1, 1, 1, 1, Color.black));
	}
	
	public void connect(MazeCell cell, int dir) {
		/**
		 * Connects two cells together.
		 * @param cell The cell that is being connected to
		 * @param dir The direction in which the connection is moving (0, 1, 2, 3 for up, left, down, right respectively)
		 */
		this.connectedTo.add(cell);
		cell.connectedTo.add(this);
		this.connectedDir[dir] = 0;
		
		switch(dir) {
			case 0:
				cell.connectedDir[2] = 0;
				break;
			case 1:
				cell.connectedDir[3] = 0;
				break;
			case 2:
				cell.connectedDir[0] = 0;
				break;
			case 3:
				cell.connectedDir[1] = 0;
				break;
			
		}
		
		this.setBorder(new MatteBorder(connectedDir[0], connectedDir[1], connectedDir[2], connectedDir[3], Color.black));
		cell.setBorder(new MatteBorder(cell.connectedDir[0], cell.connectedDir[1], cell.connectedDir[2], cell.connectedDir[3], Color.black));
	}
}
