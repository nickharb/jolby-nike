import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

function sketch2 (p) {

    let height = 270;
    let width = 270;

    let g;
    let m;
    let t1 = 0;
    let t2 = 0;
    let c_points = [];

    let color1;
    let color2;
    let color0;

    let numLines = 30; //number of lines
    let speed = 0.012; //speed of undulation
    let uni = 0.05; //uniformity of lines
    let numPts = 8; //number of points aka smoothness
    let gradRad = 0.015; //gradient radius
    let gradMulti = 10;
    let r = 45; //radius of orb
    let a = 0;
    let n = 0;

  p.setup = (canvasParentRef) => {
        
        p.createCanvas(width, height).parent(canvasParentRef);

        for (let x = 1; x <= 360; x +=8) { // number of points projects
            c_points.push(p.radians(x));
        }

        color0 = p.color(0,0,0);
        color1 = p.color(194, 34, 121); // dark pink
        color2 = p.color(227, 142, 246, 100); // light pink
  }

  p.draw = function (){
        p.blendMode(p.BLEND);
        p.background(0);
        p.blendMode(p.ADD);
        drawBg();
  } 


 const drawBg = function(){
        p.strokeWeight(1.5);
        p.noFill();
        t1 = 0;
        t2 = t2 + speed; //speed

        for (let f = 0; f < numLines; f++) { // number of lines
            t1 = t1 + uni; // uniformity of lines
            g = f * gradRad; // gradient radius
            m = g * gradMulti; // gradient multiplier

            let c = p.lerpColor(color1, color2, g);
            let h = p.lerpColor(color0, c, m);

            p.stroke(h);

            p.beginShape();

            // let r = r; // size
            let a = 0;
            let n = 0;

            a = c_points[0];
            n = p.map(p.noise(t1, t2, a), 0, 1,1, 2); 
            const [x0, y0] = circle_point(width / 2, height / 2, n * (r + f), a);
            p.curveVertex(x0, y0);


            a = c_points[1];
            n = p.map(p.noise(t1, t2, a), 0, 1, 1, 2);
            const [x1, y1] = circle_point(width / 2, height / 2, n * (r + f), a);
            p.curveVertex(x1, y1);

            a = c_points[2];
            n = p.map(p.noise(t1, t2, a), 0, 1, 1, 2);
            const [x2, y2] = circle_point(width / 2, height / 2, n * (r + f), a);
            p.curveVertex(x2, y2);

            for (let i = 0; i < c_points.length; i++) {
                if (i > 3) {
                    a = c_points[i];
                    n = p.map(p.noise(t1, t2, a), 0, 1, 1, 2);
                    const [x, y] = circle_point(width / 2, height / 2, n * (r + f), a);
                    p.curveVertex(x, y);
                }
            }

            p.curveVertex(x0, y0);
            p.curveVertex(x1, y1);
            p.curveVertex(x2, y2);

            p.endShape();

        } // for loop end
      

        function circle_point(cx, cy, r, a) {
            const x = cx + r * p.cos(a);
            const y = cy + r * p.sin(a);
            return [x, y];
        }
    }

};


export default sketch2




