package qurred.teatimeideas;

import java.awt.Color;
import java.awt.Graphics2D;
import java.util.Random;

public class Worm {
	
	private Color color;
	private Random random;
	
	private int ms;
	
	private int nx;
	private int ny;
	
	private int ox;
	private int oy;
	
	private boolean firstround = true;
	
	private int way = 0;
	
	public Worm(Color color, int ms, int x, int y){
		this.color = color;
		this.ms = ms;
		this.ox = x;
		this.oy = y;
		this.random = new Random();
	}

	public void draw(Graphics2D g2d){
		g2d.setColor(color);
		g2d.drawLine(nx, ny, ox, oy);
		
	}
	
	/** Chooses where to go next with Random*/
	public void newWay(){
		this.way =random.nextInt(8)+1;
		if(!this.firstround){
		this.oy = this.ny;
		this.ox = this.nx;}
		this.firstround = false;
		switch (this.way) {
		//SE
		case 1: if(this.oy+this.ms > ColorWormsPanel.HEIGHT){
				this.ny = ColorWormsPanel.HEIGHT;
				}else{ this.ny = this.oy + ms; }
				if(this.ox - this.ms < 0){
					this.nx = 0;
				}else{ this.nx = this.ox - this.ms; }
         		break;
         //S		
		case 2: if(this.oy+this.ms > ColorWormsPanel.HEIGHT){
					this.ny = ColorWormsPanel.HEIGHT;
				}else{ this.ny = this.oy + this.ms; }
				this.nx = this.ox;
 				break;
 		//SW
		case 3: if(this.oy+this.ms > ColorWormsPanel.HEIGHT){
					this.ny = ColorWormsPanel.HEIGHT;
				}else{ this.ny = this.oy +this.ms; }
				if(ox + ms > ColorWormsPanel.WIDTH){
					this.nx = ColorWormsPanel.WIDTH;
				}else{ this.nx = this.ox + this.ms; }
				break;
 		//W
		case 4: if(this.ox + this.ms > ColorWormsPanel.WIDTH){
				this.nx = ColorWormsPanel.WIDTH;
				}else{ this.nx = this.ox + this.ms; }
				this.ny = this.oy;
 				break;
 				
 		//NW
		case 5: if(this.oy+this.ms < 0 ){
			this.ny = 0;
				}else{ this.ny = this.oy - this.ms; }
				if(this.ox + this.ms > ColorWormsPanel.WIDTH){
					this.nx = ColorWormsPanel.WIDTH;
				}else{ this.nx = this.ox + this.ms; }
 				break;
 		//N
		case 6: if(this.oy+this.ms < 0 ){
			this.ny = 0;
				}else{ this.ny = this.oy - this.ms; }
				this.nx = this.ox;
 				break;
 				
 		//NE
		case 7: if(this.oy+this.ms < 0 ){
			this.ny = 0;
				}else{ this.ny = this.oy - this.ms; }
				if(this.ox - this.ms < 0){
					this.nx = 0;
				}else{ this.nx = this.ox - this.ms; }
				break;
		
 		//E
		case 8: if(this.ox - this.ms < 0){
					this.nx = 0;
				}else{ this.nx = this.ox - this.ms; }
				this.ny = this.oy;
 				break;
 				
 		default:	System.out.println("Something went terribly wrong: " + this.way);
 					break;
		}//switch
	}

}
