//Make sure to download the entire maze folder, to ensure that "package maze;" work!

package maze;
import javax.swing.*;
import javax.swing.border.MatteBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;

public class Main {
	

	public static void main(String[] args) {
		
		//Create window
		JFrame window = new JFrame();
		window.setSize(500, 500);
		window.setTitle("Maze Generation");
		window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		window.setResizable(false);
		
		//Parent JPanel
		JPanel body = new JPanel();
		body.setLayout(new BoxLayout(body, BoxLayout.PAGE_AXIS));
		body.setBackground(Color.lightGray);
		window.add(body);
		
		//User input for row/col size
		Font font = new Font("Verdana", Font.PLAIN, 20);
		JLabel introLabel = new JLabel("How many rows/columns would you like? (10-100)");
		JSpinner input = new JSpinner(new SpinnerNumberModel(20, 10, 100, 1));
		input.setEditor(new JSpinner.DefaultEditor(input));
		input.setMaximumSize(new Dimension(75, 30));
		introLabel.setFont(font.deriveFont(16f));
		input.setFont(font);
		JButton ok = new JButton("Generate");
		introLabel.setAlignmentX(Component.CENTER_ALIGNMENT);
		input.setAlignmentX(Component.CENTER_ALIGNMENT);
		ok.setAlignmentX(Component.CENTER_ALIGNMENT);
		body.add(Box.createVerticalGlue());
		body.add(introLabel);
		body.add(Box.createRigidArea(new Dimension(0,10)));
		body.add(input);
		body.add(Box.createRigidArea(new Dimension(0,5)));
		body.add(ok);
		body.add(Box.createVerticalGlue());
		ok.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				//Resize for maze generation
				try {
					input.commitEdit();
				} catch ( java.text.ParseException pE ) { 
					System.exit(1);
				}
				
				body.removeAll();
				int size = (int) input.getValue();
				int winSize = (size * 20 <= 800) ? size * 20 : 800;
				body.setLayout(new GridLayout(size, size));
				window.setSize(winSize, winSize);
				
				//Maze cell panels
				MazeCell[][] cellArr = new MazeCell[size][size];
				for(int i=0; i<size; i++) {
					for(int j=0; j<size; j++) {
						cellArr[i][j] = new MazeCell();
						cellArr[i][j].setName(String.format("[%d][%d]", i, j));
						body.add(cellArr[i][j]);
					}
				}
				cellArr[0][(int)size/2].connectedDir[0] = 0;			//Openings for maze
				cellArr[size-1][(int)size/2].connectedDir[2] = 0;
				cellArr[0][(int)size/2].setBorder(new MatteBorder(0, 1, 1, 1, Color.black));
				cellArr[size-1][(int)size/2].setBorder(new MatteBorder(1, 1, 0, 1, Color.black));
				body.revalidate();
				
				//Navigator object
				Random rand = new Random();
				int x = rand.nextInt(size);
				int y = rand.nextInt(size);
				Navigator nav = new Navigator(x, y, size, cellArr);
				
				Thread beginNav = new Thread(new Runnable() {
					public void run(){
						try {
							Thread.sleep(1000);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
						nav.navigate();
			        };
				});
				beginNav.start();
			}
		});
		
		//Make window visible
		window.setVisible(true);
	}
}
