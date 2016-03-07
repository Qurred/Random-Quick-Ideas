package qurred.teatimeideas;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.Random;
import javax.swing.JPanel;

@SuppressWarnings("serial")
public class ColorWormsPanel extends JPanel implements Runnable, KeyListener{
	
	public static final int WIDTH = 1280;
	public static final int HEIGHT = 720;
	public static final Dimension DIM = new Dimension(WIDTH, HEIGHT);
	public static final int AMOUNT = 100;
	
	private int FPS = 30;
	private long targetTime = 1000 / FPS;
	private boolean running;
	private boolean pause;
	
	private Thread thread;
	
	private BufferedImage image;
	private Graphics2D g2d;
	
	ArrayList<Worm> worms = new ArrayList<Worm>();
	
	public ColorWormsPanel() {
		super();
		setMinimumSize(DIM);
		setMaximumSize(DIM);
		setPreferredSize(DIM);
		setFocusable(true);
		requestFocus();
	}

	@Override
	public void run() {
		
		init();
		
		long starttime;
		long spenttime;
		long waittime;
		
		while(running){
			starttime  = System.nanoTime();
			update();
			drawBegin();
			draw();
			spenttime = System.nanoTime() - starttime;
			waittime = targetTime - spenttime / 1000000;
			if(waittime < 0){waittime = 0;}
			try{ thread.sleep(waittime);
			}catch(Exception e){e.printStackTrace();}
		}
	}
	
	public void init(){
		image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_4BYTE_ABGR);
		g2d = (Graphics2D) image.getGraphics();
		g2d.setColor(Color.BLACK);
		g2d.fillRect(0, 0, WIDTH, HEIGHT);
		running = true;
		
		Random random = new Random();
		
		for(int i = 0; i< AMOUNT; i++){
			worms.add(new Worm(new Color(random.nextInt(255), random.nextInt(255), random.nextInt(255) ),
					random.nextInt(10)+1, WIDTH / 2, HEIGHT / 2));
		}
	}
	
	public void update(){
		if(!pause){
			for(int i = 0; i<worms.size();i++){
				worms.get(i).newWay();
			}
		}
	}
	
	public void draw(){
		for(int i = 0; i<worms.size();i++){
			worms.get(i).draw(g2d);
		}
	}
	
	public void drawBegin(){
		Graphics g2 = getGraphics();
		g2.drawImage(image, 0, 0, WIDTH, HEIGHT, null);
		g2.dispose();
	}
	
	public void addNotify(){
		super.addNotify();
		if(thread == null){
			thread = new Thread(this);
			addKeyListener(this);
			thread.start();
		}
	}
	

	@Override
	public void keyPressed(KeyEvent e) {
		if(e.getKeyCode() == KeyEvent.VK_SPACE){
			if(!pause){pause = true;}
			else{pause = false;}
		}		
	}
	
	@Override
	public void keyReleased(KeyEvent arg0) {}

	@Override
	public void keyTyped(KeyEvent arg0) {}

}
