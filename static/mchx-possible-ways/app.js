
let w =["0%","1%","5%","15","25%","35%","45%","55%","65%","75%","85%","95%","100%"];
let h =["0%","1%","5%","15","25%","35%","45%","55%","65%","75%","85%","95%","100%"];

// color for gradient and position


let acol = ['#E7897B', '#F172DC','#F62646','#E26464','#F2AEE1','#FF341F','#1E6969','#968D1D']; 
let pos = ['center','flex-start','flex-end'];


// deg of gradient

let ax = ["45deg","90deg","0deg","135deg","180deg"];


// blocks

let aa = document.querySelector('.a1');
let ab = document.querySelector('.a2');
let ac = document.querySelector('.a3');
let ad = document.querySelector('.a4');
let a0 = document.querySelector('.a5');

let b1 = document.querySelector('.b1');
let b2 = document.querySelector('.b2');
let b3 = document.querySelector('.b3');

let deg = ax[Math.floor(fxrand()*ax.length)];


// onload 

a0.style.backgroundImage = 'linear-gradient('+deg+','+acol[Math.floor(fxrand()*acol.length)]+ ', ' + acol[Math.floor(fxrand()*acol.length)] + ', ' + acol[Math.floor(fxrand()*acol.length)] + ')';

b1.style.justifyContent = pos[Math.floor(fxrand()*pos.length)];
b1.style.alignItems = pos[Math.floor(fxrand()*pos.length)];

b2.style.justifyContent = pos[Math.floor(fxrand()*pos.length)];
b2.style.alignItems = pos[Math.floor(fxrand()*pos.length)];

b3.style.justifyContent = pos[Math.floor(fxrand()*pos.length)];
b3.style.alignItems = pos[Math.floor(fxrand()*pos.length)];

aa.style.backgroundImage = 'linear-gradient('+deg+','+acol[Math.floor(fxrand()*acol.length)]+ ', ' + acol[Math.floor(fxrand()*acol.length)] + ', ' + acol[Math.floor(fxrand()*acol.length)] + ')';           
aa.style. width = w[Math.floor(fxrand() * w.length)];
aa.style. height = h[Math.floor(fxrand() * h.length)];
aa.style.transition = "5s";

ab.style.backgroundImage = 'linear-gradient('+deg+','+acol[Math.floor(fxrand()*acol.length)]+ ', ' + acol[Math.floor(fxrand()*acol.length)] + ', ' + acol[Math.floor(fxrand()*acol.length)] + ')';
ab.style. width = w[Math.floor(fxrand() * w.length)];
ab.style. height = h[Math.floor(fxrand() * h.length)];
ab.style.transition = "5s";

ac.style.backgroundImage = 'linear-gradient('+deg+','+acol[Math.floor(fxrand()*acol.length)]+ ', ' + acol[Math.floor(fxrand()*acol.length)] + ', ' + acol[Math.floor(fxrand()*acol.length)] + ')';
ac.style. width = w[Math.floor(fxrand() * w.length)];
ac.style. height = h[Math.floor(fxrand() * h.length)];
ac.style.transition = "5s";

ad.style.backgroundImage = 'linear-gradient('+deg+','+acol[Math.floor(fxrand()*acol.length)]+ ', ' + acol[Math.floor(fxrand()*acol.length)] + ', ' + acol[Math.floor(fxrand()*acol.length)] + ')';
ad.style. width = w[Math.floor(fxrand() * w.length)];
ad.style. height = h[Math.floor(fxrand() * h.length)];
ad.style.transition = "5s";

// interval  

setTimeout(function (){
    aa.style. width = w[Math.floor(Math.random() * w.length)];
    aa.style. height = h[Math.floor(Math.random() * h.length)];
    aa.style.transition = "5s";
    
    ab.style. width = w[Math.floor(Math.random() * w.length)];
    ab.style. height = h[Math.floor(Math.random() * h.length)];
    ab.style.transition = "5s";

    ac.style. width = w[Math.floor(Math.random() * w.length)];
    ac.style. height = h[Math.floor(Math.random() * h.length)];
    ac.style.transition = "5s";

    ad.style. width = w[Math.floor(Math.random() * w.length)];
    ad.style. height = h[Math.floor(Math.random() * h.length)];
    ad.style.transition = "5s";
},3000);


setTimeout(function(){

    setInterval(function () {
                
        aa.style. width = w[Math.floor(Math.random() * w.length)];
        aa.style. height = h[Math.floor(Math.random() * h.length)];
        aa.style.transition = "5s";
        
        ab.style. width = w[Math.floor(Math.random() * w.length)];
        ab.style. height = h[Math.floor(Math.random() * h.length)];
        ab.style.transition = "5s";
    
        ac.style. width = w[Math.floor(Math.random() * w.length)];
        ac.style. height = h[Math.floor(Math.random() * h.length)];
        ac.style.transition = "5s";
    
        ad.style. width = w[Math.floor(Math.random() * w.length)];
        ad.style. height = h[Math.floor(Math.random() * h.length)];
        ad.style.transition = "5s";
    
    }, 8000);

},3000);
