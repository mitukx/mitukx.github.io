(() => {
  const canvas = document.getElementById("networkCanvas");
  const sidebar = document.querySelector(".sidebar");
  if (!canvas || !sidebar) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationId = null;

  let nodes = [];
  let stars = [];
  let nebulae = [];
  let signals = [];
  let shootingStars = [];
  let lastTime = 0;

  // chain-reaction cadence
  let elapsed = 0;
  let burstTimer = 0;
  const BURST_INTERVAL = 3400;
  let shootTimer = 0;
  const SHOOT_INTERVAL = 4200;

  const FIRE_RADIUS = 150;
  const FIRE_COOLDOWN = 520;
  const RELAY_CHANCE = 0.85;
  const MAX_BRANCHES = 4;

  const mouse = { x: 0, y: 0, active: false };

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createScene();
    draw();
  }

  function createScene() {
    const nodeCount = Math.max(28, Math.floor((width * height) / 13000));
    const starCount = Math.max(90, Math.floor((width * height) / 5600));

    nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      r: Math.random() * 1.7 + 1.3,
      // twinkle: nodes swell and shrink like stars
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.0012 + Math.random() * 0.0022,
      phase: Math.random() * Math.PI * 2,
      act: 0,             // activation flash from the chain reaction
      lastFire: -1e9
    }));

    stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.38 + 0.1,
      tw: Math.random() * Math.PI * 2,
      twSpeed: 0.01 + Math.random() * 0.03,
      // faint cosmic tint on some stars
      hue: Math.random() < 0.25 ? (Math.random() < 0.5 ? "200,220,255" : "255,225,205") : "255,255,255"
    }));

    // soft drifting nebula clouds for a cosmic backdrop
    const palette = ["120,90,220", "60,120,220", "40,180,200", "150,70,190"];
    nebulae = Array.from({ length: 4 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.max(width, height) * (0.35 + Math.random() * 0.3),
      color: palette[i % palette.length],
      alpha: 0.05 + Math.random() * 0.05,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05,
      drift: Math.random() * Math.PI * 2
    }));

    signals = [];
    shootingStars = [];
    burstTimer = 0;
    shootTimer = 0;
  }

  function setMouse(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;
    mouse.active = true;
  }

  function clearMouse() {
    mouse.active = false;
  }

  function spawnSignal(a, b) {
    signals.push({ a, b, t: Math.random() * 0.08, speed: 0.012 + Math.random() * 0.014 });
  }

  // fire a node: flash + branch signals to nearby nodes (the chain reaction)
  function fireNode(node, kick) {
    if (elapsed - node.lastFire < FIRE_COOLDOWN) return;
    node.lastFire = elapsed;
    node.act = 1;

    const near = [];
    for (const b of nodes) {
      if (b === node) continue;
      const d = Math.hypot(node.x - b.x, node.y - b.y);
      if (d < FIRE_RADIUS) near.push({ b, d });
    }
    near.sort((p, q) => p.d - q.d);

    let branches = 0;
    for (const { b } of near) {
      if (branches >= MAX_BRANCHES) break;
      if (elapsed - b.lastFire < FIRE_COOLDOWN) continue;
      if (Math.random() < RELAY_CHANCE) {
        spawnSignal(node, b);
        branches++;
      }
    }

    if (kick) {
      const ang = Math.random() * Math.PI * 2;
      node.vx += Math.cos(ang) * 0.5 * kick;
      node.vy += Math.sin(ang) * 0.5 * kick;
    }
  }

  function triggerBurst() {
    const seeds = Math.random() < 0.5 ? 1 : 2;
    for (let s = 0; s < seeds; s++) {
      const a = nodes[(Math.random() * nodes.length) | 0];
      a.lastFire = -1e9;
      fireNode(a, 0.6);
    }
  }

  function spawnShootingStar() {
    const fromLeft = Math.random() < 0.5;
    const y = Math.random() * height * 0.7;
    const x = fromLeft ? -20 : width + 20;
    const ang = (fromLeft ? 0.5 : Math.PI - 0.5) + (Math.random() - 0.5) * 0.3;
    const s = 6 + Math.random() * 4;
    shootingStars.push({
      x, y,
      vx: Math.cos(ang) * s,
      vy: Math.sin(ang) * s * 0.6,
      life: 1
    });
  }

  function update(delta) {
    const speed = Math.min(delta / 16.67, 2);
    elapsed += delta;

    // periodic chain reaction
    burstTimer += delta;
    if (burstTimer >= BURST_INTERVAL) {
      burstTimer = 0;
      triggerBurst();
    }

    // periodic shooting star
    shootTimer += delta;
    if (shootTimer >= SHOOT_INTERVAL) {
      shootTimer = 0;
      if (Math.random() < 0.85) spawnShootingStar();
    }

    // drift nebulae
    for (const n of nebulae) {
      n.drift += delta * 0.0002;
      n.x += (n.vx + Math.cos(n.drift) * 0.02) * speed;
      n.y += (n.vy + Math.sin(n.drift) * 0.02) * speed;
      if (n.x < -n.r) n.x = width + n.r;
      if (n.x > width + n.r) n.x = -n.r;
      if (n.y < -n.r) n.y = height + n.r;
      if (n.y > height + n.r) n.y = -n.r;
    }

    const influenceRadius = 150;
    for (const node of nodes) {
      if (mouse.active) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < influenceRadius && dist > 0.001) {
          const force = (1 - dist / influenceRadius) * 0.06;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }
      }

      node.phase += delta * 0.0018;
      node.vx += Math.cos(node.phase) * 0.012;
      node.vy += Math.sin(node.phase * 1.3) * 0.012;

      node.vx *= 0.9975;
      node.vy *= 0.9975;

      const maxVel = 1.0;
      const v = Math.hypot(node.vx, node.vy);
      if (v > maxVel) {
        node.vx = (node.vx / v) * maxVel;
        node.vy = (node.vy / v) * maxVel;
      }
      const minVel = 0.28;
      if (v < minVel && v > 0.001) {
        node.vx = (node.vx / v) * minVel;
        node.vy = (node.vy / v) * minVel;
      }

      node.x += node.vx * speed;
      node.y += node.vy * speed;

      node.pulse += node.pulseSpeed * delta;
      node.act *= Math.pow(0.94, speed);

      if (node.x < -18) node.x = width + 18;
      if (node.x > width + 18) node.x = -18;
      if (node.y < -18) node.y = height + 18;
      if (node.y > height + 18) node.y = -18;
    }

    // advance chain-reaction signals
    for (let i = signals.length - 1; i >= 0; i--) {
      const sig = signals[i];
      sig.t += sig.speed * speed;
      if (sig.t >= 1) {
        fireNode(sig.b, 0.25);
        signals.splice(i, 1);
      }
    }
    if (signals.length > 260) signals.splice(0, signals.length - 260);

    // advance shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const m = shootingStars[i];
      m.x += m.vx * speed;
      m.y += m.vy * speed;
      m.life -= 0.012 * speed;
      if (m.life <= 0 || m.x < -60 || m.x > width + 60 || m.y > height + 60) {
        shootingStars.splice(i, 1);
      }
    }
  }

  function drawNebulae() {
    for (const n of nebulae) {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, `rgba(${n.color},${n.alpha})`);
      g.addColorStop(1, `rgba(${n.color},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawStars() {
    for (const s of stars) {
      s.tw += s.twSpeed;
      const a = s.a * (0.55 + 0.45 * Math.sin(s.tw));
      const r = s.r * (0.7 + 0.5 * (0.5 + 0.5 * Math.sin(s.tw)));
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.hue},${a})`;
      ctx.fill();
    }
  }

  function drawConnections() {
    const maxDist = 118;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          let alpha = (1 - dist / maxDist) * 0.18;
          if (a.act > 0.1 || b.act > 0.1) alpha += 0.12 * Math.max(a.act, b.act);
          if (mouse.active) {
            const da = Math.hypot(a.x - mouse.x, a.y - mouse.y);
            const db = Math.hypot(b.x - mouse.x, b.y - mouse.y);
            if (da < 130 || db < 130) alpha += 0.08;
          }
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(210,225,255,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function drawSignals() {
    for (const sig of signals) {
      const x = sig.a.x + (sig.b.x - sig.a.x) * sig.t;
      const y = sig.a.y + (sig.b.y - sig.a.y) * sig.t;
      const fade = Math.sin(sig.t * Math.PI);
      ctx.beginPath();
      ctx.arc(x, y, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(150,185,255,${0.1 * fade})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(225,235,255,${0.9 * fade})`;
      ctx.fill();
    }
  }

  function drawNodes() {
    for (const node of nodes) {
      // twinkle: radius breathes like a star, boosted when it fires
      const twinkle = 0.72 + 0.42 * (0.5 + 0.5 * Math.sin(node.pulse));
      const radius = node.r * twinkle + node.act * 2.2;

      let glowAlpha = 0.07 + node.act * 0.24;
      let fillAlpha = (0.42 + 0.28 * (0.5 + 0.5 * Math.sin(node.pulse))) + node.act * 0.4;

      if (mouse.active) {
        const d = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        if (d < 120) {
          glowAlpha += 0.08;
          fillAlpha = Math.min(1, fillAlpha + 0.2);
        }
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190,210,255,${glowAlpha})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.min(1, fillAlpha)})`;
      ctx.fill();
    }
  }

  function drawShootingStars() {
    for (const m of shootingStars) {
      const len = 22;
      const tx = m.x - m.vx * (len / Math.hypot(m.vx, m.vy));
      const ty = m.y - m.vy * (len / Math.hypot(m.vx, m.vy));
      const g = ctx.createLinearGradient(tx, ty, m.x, m.y);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(1, `rgba(255,255,255,${0.9 * m.life})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(m.x, m.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${m.life})`;
      ctx.fill();
    }
  }

  function drawMouseAura() {
    if (!mouse.active) return;
    const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
    g.addColorStop(0, "rgba(180,205,255,0.07)");
    g.addColorStop(1, "rgba(180,205,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
    ctx.fill();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    drawNebulae();
    drawStars();
    drawShootingStars();
    drawMouseAura();
    drawConnections();
    drawSignals();
    drawNodes();
  }

  function animate(time) {
    if (!lastTime) lastTime = time;
    const delta = time - lastTime;
    lastTime = time;
    update(delta);
    draw();
    animationId = requestAnimationFrame(animate);
  }

  function restart() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    lastTime = 0;
    resizeCanvas();
    if (!reduceMotion) {
      triggerBurst();
      animationId = requestAnimationFrame(animate);
    }
  }

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(restart, 120);
  });

  sidebar.addEventListener("mousemove", (e) => setMouse(e.clientX, e.clientY));
  sidebar.addEventListener("mouseleave", clearMouse);

  // click to ignite a chain reaction at the cursor
  sidebar.addEventListener("click", (e) => {
    setMouse(e.clientX, e.clientY);
    let src = null;
    let bestD = Infinity;
    for (const n of nodes) {
      const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (d < bestD) { bestD = d; src = n; }
    }
    if (src) {
      src.lastFire = -1e9;
      fireNode(src, 0.6);
    }
  });

  sidebar.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches[0]) setMouse(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  sidebar.addEventListener("touchmove", (e) => {
    if (e.touches && e.touches[0]) setMouse(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  sidebar.addEventListener("touchend", clearMouse, { passive: true });

  restart();
})();
