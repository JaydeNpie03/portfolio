package tictactoe;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;

import javax.swing.*;
import javax.swing.border.*;

public class Window extends JFrame{

	private static final long serialVersionUID = 1L;
	private static Font markFont = new Font("Verdana", Font.PLAIN, 60);
	public static int turn = 0;

	public Window() {
		this.setTitle("Tic-Tac-Toe");
		this.setSize(500, 500);
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setResizable(false );
		
		
		//Parent panel
		JPanel body = new JPanel(new GridLayout(3, 3, 25, 25));
		body.setBorder(new EmptyBorder(10, 10, 10, 10));
		body.setBackground(Color.black);
		add(body);
		
		//Tile panels
		int[][] tileArray = new int[3][3];
		ArrayList<JPanel> panelArray = new ArrayList<JPanel>();
		RoundedLineBorder tileBorder = new RoundedLineBorder(Color.white, 3, 15, true);
		RoundedLineBorder tileHover = new RoundedLineBorder(Color.yellow, 3, 15, true);
		for(int i = 0; i < 3; i++) {
			for(int j = 0; j < 3; j++) {
				JPanel panel = new JPanel();
				panel.setBackground(Color.black);
				panel.setBorder(tileBorder);
				panel.setName(i + ", " + j);
				
				final int I = i;	//Used to avoid local scope error in the MouseListener array assignment
				final int J = j;
				panel.addMouseListener(new MouseAdapter() {
				    @Override
				    public void mouseClicked(MouseEvent e) {
				    	
				    	if(tileArray[I][J] == 0) {
				    		
				    		tileArray[I][J] = (turn == 0) ? 1 : 2;
				    		turn = (turn == 0) ? 1 : 0;		//Switch turn
					        applyArray(tileArray, panelArray);
					        body.revalidate();
					        checkForWin(tileArray);
				    	} else {
				    		System.out.println("This square is already taken!");
				    	}
				    	
				    }
				    
				    @Override
				    public void mouseEntered(MouseEvent e) {
				    	panel.setBorder(tileHover);
				    }
				    
				    @Override
				    public void mouseExited(MouseEvent e) {
				    	panel.setBorder(tileBorder);
				    }
				});
				
				panelArray.add(panel);
				body.add(panel);
			}
			
		}
		
		setVisible(true);
	}
	
	private static void applyArray(int[][] tArr, ArrayList<JPanel> pArr) {
		
		for(int i = 0; i < 3; i++) {
			for(int j = 0; j < 3; j++) {
				if(tArr[i][j] > 0) {
					int k = (i * 3) + j;
					String xO = (tArr[i][j] == 1) ? "X" : "O";
					tArr[i][j] = (tArr[i][j] == 1) ? -1 : -2;	//Prevents new marks on subsequent passes.
					JLabel mark = new JLabel(xO);
					mark.setFont(markFont);
					pArr.get(k).add(mark);
				}
			}
		}
	}
	
	private static void checkForWin(int[][] tArr) {
		boolean gameWon = false;
		int winner = 0;
		
		//Rows and Columns
		for(int i = 0; i < 3; i++) {
			boolean row = (tArr[i][0] == tArr[i][1]) && (tArr[i][1] == tArr[i][2]) && (tArr[i][0] < 0);
			boolean column = (tArr[0][i] == tArr[1][i]) && (tArr[1][i] == tArr[2][i]) && (tArr[0][i] < 0);
			if(row) {
				gameWon = true;
				winner = tArr[i][0];
				break;
			} 
			if(column) {
				gameWon = true;
				winner = tArr[0][i];
				break;
			}
		}
		
		//Diagonals
		boolean lDiagonal = (tArr[0][0] == tArr[1][1]) && (tArr[1][1] == tArr[2][2]) && (tArr[1][1] < 0);
		boolean rDiagonal = (tArr[0][2] == tArr[1][1]) && (tArr[1][1] == tArr[2][0]) && (tArr[1][1] < 0);
		if(lDiagonal || rDiagonal) {
			gameWon = true;
			winner = tArr[1][1];
		}
		
		if(gameWon) {
			System.out.println("The winner is Player " + (winner * -1) + "!");
			System.exit(0);
		}
	}
	
	public class RoundedLineBorder extends AbstractBorder {
	    
		private static final long serialVersionUID = 1L;
		int lineSize, cornerSize;
	    Paint fill;
	    Stroke stroke;
	    private Object aaHint;

	    public RoundedLineBorder(Paint fill, int lineSize, int cornerSize) {
	        this.fill = fill;
	        this.lineSize = lineSize;
	        this.cornerSize = cornerSize;
	        stroke = new BasicStroke(lineSize);
	    }
	    public RoundedLineBorder(Paint fill, int lineSize, int cornerSize, boolean antiAlias) {
	        this.fill = fill;
	        this.lineSize = lineSize;
	        this.cornerSize = cornerSize;
	        stroke = new BasicStroke(lineSize);
	        aaHint = antiAlias? RenderingHints.VALUE_ANTIALIAS_ON: RenderingHints.VALUE_ANTIALIAS_OFF;
	    }

	    @Override
	    public Insets getBorderInsets(Component c, Insets insets) {
	        int size = Math.max(lineSize, cornerSize);
	        if(insets == null) insets = new Insets(size, size, size, size);
	        else insets.left = insets.top = insets.right = insets.bottom = size;
	        return insets;
	    }

	    @Override
	    public void paintBorder(Component c, Graphics g, int x, int y, int width, int height) {
	        Graphics2D g2d = (Graphics2D)g;
	        Paint oldPaint = g2d.getPaint();
	        Stroke oldStroke = g2d.getStroke();
	        Object oldAA = g2d.getRenderingHint(RenderingHints.KEY_ANTIALIASING);
	        try {
	            g2d.setPaint(fill!=null? fill: c.getForeground());
	            g2d.setStroke(stroke);
	            if(aaHint != null) g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, aaHint);
	            int off = lineSize >> 1;
	            g2d.drawRoundRect(x+off, y+off, width-lineSize, height-lineSize, cornerSize, cornerSize);
	        }
	        finally {
	            g2d.setPaint(oldPaint);
	            g2d.setStroke(oldStroke);
	            if(aaHint != null) g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, oldAA);
	        }
	    }
	}
}
