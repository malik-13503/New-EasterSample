class ConfettiGenerator {
  constructor(params) {
    this.target = params.target;
    this.maxCount = params.maxCount || 200;
    this.size = params.size || 12;
    this.canvas = document.getElementById(this.target);
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    if (!this.ctx) return; // Exit if canvas not found
    this.particles = [];
    this.speedFactor = 18;
    this.colors = ['#ED1F23', '#231F20', '#FFFFFF', '#203B8C', '#25BFFA', '#12385F'];
    this.populateParticles();
  }

  render() {
    if (!this.ctx) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    setInterval(this.draw.bind(this), 30);
  }

  draw() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.particles.forEach((particle, index) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.colors[index % this.colors.length];
      this.ctx.moveTo(particle.x, particle.y);
      this.ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true);
      this.ctx.fill();
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed;
      if (particle.y > window.innerHeight) {
        particle.x = Math.random() * window.innerWidth;
        particle.y = -10;
      }
    });
  }

  populateParticles() {
    for (let i = 0; i < this.maxCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 12 + 8,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 10 + 5,
      });
    }
  }
}
