package qurred.teatimeideas;

import javax.swing.JFrame;


public class ColorWorms {
	
	public static final String TITLE = "Color Worms";
	
	public static void main(String[] args){
		JFrame frame = new JFrame(TITLE); 
		frame.setContentPane(new ColorWormsPanel());
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setResizable(false);
		frame.pack();
		frame.setVisible(true);
		frame.setLocationRelativeTo(null);
	}
}
