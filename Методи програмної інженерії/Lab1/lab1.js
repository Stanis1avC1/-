function net(ctx, width, height) {
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y <= height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
}

function move() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    net(ctx, canvas.width, canvas.height);
    
    const x0 = parseFloat(document.getElementById("x0").value);
    const y0 = parseFloat(document.getElementById("y0").value);
    const angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;
    const v0 = parseFloat(document.getElementById("velocity").value);
    const a = parseFloat(document.getElementById("acceleration").value);
    const color = document.getElementById("color").value;
    
    let x = x0, y = y0;
    let vx = v0 * Math.cos(angle);
    let vy = v0 * Math.sin(angle);
    let t = 0, dt = 0.1;
    
    ctx.fillStyle = color;
    
    while (y >= 0 && x < canvas.width) {
        x = x0 + vx * t;
        y = y0 + vy * t + 0.5 * a * t * t;
        if (y >= 0) {
            ctx.beginPath();
            ctx.arc(x + canvas.width / 2, canvas.height / 2 - y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        t += dt;
    }
}

function delet() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    net(ctx, canvas.width, canvas.height);
}

window.onload = function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    net(ctx, canvas.width, canvas.height);
};
