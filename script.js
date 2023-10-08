/*
این کد به صورت شی گرا تهیه شده تا اگر شی جدیدی خواستیم تعریف کنیم
یا اپدیت و منطق جدیدی بتوانیم به عنوان پایه از ان استفاده کنیم.
این صفحه حاوی کدهای اولیه بهینه شده است که میتوانیم در پروژه های مختلف از ان استفاده کنیم

مثلا برای تغییر ابجکت و المان به جای توپ استفاده از مستطیل کافیه بخش دراو را تغییر بدیم، لاین کد دوم
c.arc(this.x,this.y,this.r,0, 2*Math.PI) 

یا اگر منطق حرکت ابجکت را خواستیم تغییر بدیم کافیه بخش اپدیت رو تغییر بدیم
update(){
    this.draw()
}
*/



let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c= canvas.getContext("2d");

/*
سایز اسکرین در یک متغییر گلوبال قرار داده شده
وقتی خارج از یک کلاس کلمه کلیدی دیس استفاده شه ،تبدیل به یک متغییر گلوبال میشه و درون ابچکت ویندو قرار میگیره
عرض و ارتفاع اسکرین به عنوان پراپرتی هاش قرار گرفته
*/
this.screen = {
    width: window.innerWidth,
    height: window.innerHeight
}

/*
برای ماوس هم مانند اسکرین ابجکت زیر ساحته شده.
پراپرتی ایکس و وای رو تعریف کردیم و مقدار اولیه اش وسط اسکرین است
البته ر وقت کاربر ماوس رو حرکت بده این مقدار به روز میشه به وسیله ایونت لیسنار نوشته شده در اخر صفحه
window.addEventListener("mousemove",function(e){
    mouse.x = e.clientX
    mouse.y = e.clientY
})
با این روش میشه بارها ازش استفاده کرد و نیاز به بازنویسی نداره
مثلا برای مکان ایکس یا وای اشاره گر ماوس کافیه بگیم mouse.x or mouse.y
*/
this.mouse = {
    x: screen.width / 2,
    y: screen.height / 2
}

class Ball{
    constructor(x, y, dx, dy, r, color){   
        this.r = r || 10  
        this.x = x || randomInFromInterval(0+this.r ,window.innerWidth-this.r)
        this.y = y || randomInFromInterval(0+this.r ,window.innerHeight-this.r)
        this.dx = dx || (Math.random() - 0.5) * 4
        this.dy = dy || (Math.random())*4
        this.color = color || `rgba(231, 76, 60, ${Math.random()})`
        this.draw() 
    }

//برای تغییر ابجکت و المان مثلا به جای توپ استفاده از مستطیل کافیه بخش دراو را تغییر بدیم، لاین کد دوم
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.r,0, 2*Math.PI)  
        c.fillStyle = "red"
        c.fill()
    }

/*
درون اپدیت فعلا دستوری وجود نداره جز دراو
منطق هر بازی را میتوان در اینجا نوشت. مثلا منطق جاذبه یا ...
*/
    update(){
        this.draw()
    }
}


/*
کانواس رو تبدیل به یک کلاس کردیم که یک متد کانستراکتور داره و توش توپ ها رو ایجاد کردیم
و همچنین متد انیمیت داره 
و سپس یک ابجکت ازش میسازیم و متد انیمیت رو صدا می زنیم
let mycan = new Canvas();
mycan.animate();
*/
class Canvas{
    constructor(){
        this.balls = []
        for(let i = 0; i<1; i++){
            this.balls.push(new Ball())
        }
    }

    animate(){
        c.clearRect(0,0,window.innerWidth, window.innerHeight)
        this.balls.forEach(ball=>{
            ball.update()
        })   
        // requestAnimationFrame(this.animate);// در این خط 1 ارور خواهیم داشت و برای رفع این ارور مانند خط زیر باید this را بهش bind بکنیم - این مبحث مربود به دوره مستر جاوا اسکریپت است 
        requestAnimationFrame(this.animate.bind(this));
    }
    
}


let mycan = new Canvas();
mycan.animate();




window.addEventListener("mousemove",function(e){
    mouse.x = e.clientX
    mouse.y = e.clientY
})


window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})




function randomInFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

console.log(mouse.x)