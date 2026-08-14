<script setup>
/**
 * Animated starfield site background.
 * Dark: cyan / white on very dark royal navy.
 * Light: brand dots on pale sky.
 */
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <!-- Light sky + soft glow -->
    <div class="absolute inset-0 dark:hidden">
      <div
        class="absolute inset-0"
        style="
          background-color: #fafcfd;
          background-image:
            linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #f2f7fa 100%),
            radial-gradient(ellipse 70% 40% at 50% 0%, rgba(27, 115, 159, 0.11), transparent 65%);
        "
      />
      <div class="site-glow site-glow--a" />
      <div class="site-glow site-glow--b" />
      <div class="site-glow site-glow--c" />
    </div>

    <!-- Dark sky -->
    <div
      class="absolute inset-0 hidden dark:block"
      style="background: radial-gradient(ellipse at bottom, #12203a 0%, #07101f 48%, #050a18 100%)"
    />
    <div class="absolute inset-0 hidden dark:block">
      <div class="site-glow site-glow--a site-glow--dark" />
      <div class="site-glow site-glow--b site-glow--dark" />
      <div class="site-glow site-glow--c site-glow--dark" />
    </div>

    <!-- Light stars -->
    <div class="absolute inset-0 dark:hidden">
      <div class="stars stars-light--sm" />
      <div class="stars stars-light--md" />
      <div class="stars stars-light--lg" />
      <div class="stars stars-light--sm stars--delay" />
      <div class="stars stars-light--md stars--delay" />
      <div class="stars stars-light--lg stars--delay" />
    </div>

    <!-- Dark stars -->
    <div class="absolute inset-0 hidden dark:block">
      <div class="stars stars-dark--sm" />
      <div class="stars stars-dark--md" />
      <div class="stars stars-dark--lg" />
      <div class="stars stars-dark--sm stars--delay" />
      <div class="stars stars-dark--md stars--delay" />
      <div class="stars stars-dark--lg stars--delay" />
    </div>
  </div>
</template>

<style scoped>
.site-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(80px);
  pointer-events: none;
  animation: glow-breathe 14s ease-in-out infinite;
}

.site-glow--a {
  top: 10%;
  inset-inline-start: 8%;
  width: 16rem;
  height: 16rem;
  background: rgba(35, 184, 193, 0.12);
}

.site-glow--b {
  top: 40%;
  inset-inline-end: 4%;
  width: 18rem;
  height: 18rem;
  background: rgba(27, 115, 159, 0.11);
  animation-delay: -4s;
}

.site-glow--c {
  bottom: 14%;
  inset-inline-start: 35%;
  width: 14rem;
  height: 14rem;
  background: rgba(184, 134, 11, 0.08);
  animation-delay: -7s;
}

.site-glow--dark.site-glow--a {
  background: rgba(0, 232, 240, 0.16);
}

.site-glow--dark.site-glow--b {
  background: rgba(30, 64, 140, 0.28);
}

.site-glow--dark.site-glow--c {
  background: rgba(0, 232, 240, 0.08);
}

@keyframes glow-breathe {
  0%,
  100% {
    opacity: 0.65;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.03);
  }
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  will-change: transform;
}

.stars-dark--sm,
.stars-light--sm {
  width: 1px;
  height: 1px;
  animation: anim-star 50s linear infinite;
}

.stars-dark--md,
.stars-light--md {
  width: 2px;
  height: 2px;
  animation: anim-star 100s linear infinite;
}

.stars-dark--lg,
.stars-light--lg {
  width: 3px;
  height: 3px;
  animation: anim-star 150s linear infinite;
}

.stars-dark--sm {
  box-shadow:
    100px 100px #00e8f0, 200px 300px #00e8f0, 400px 150px #2de2ed, 800px 700px #00e8f0,
    1200px 1100px #2de2ed, 1400px 1300px #00e8f0, 1600px 1150px #2de2ed, 1800px 1700px #00e8f0,
    500px 400px #00e8f0, 600px 600px #2de2ed, 700px 900px #00e8f0, 1100px 800px #2de2ed,
    200px 1200px #00e8f0, 400px 1300px #2de2ed, 600px 1450px #00e8f0, 800px 1600px #2de2ed,
    1700px 1700px #00e8f0, 1500px 1800px #2de2ed, 1300px 1950px #00e8f0, 1100px 2100px #2de2ed,
    80px 500px #00e8f0, 950px 200px #2de2ed, 1350px 450px #00e8f0, 1750px 900px #2de2ed;
}

.stars-dark--md {
  box-shadow:
    150px 200px #00e8f0, 300px 400px #2de2ed, 500px 250px #00e8f0, 900px 800px #2de2ed,
    1200px 1050px #00e8f0, 1400px 1200px #2de2ed, 1600px 1350px #00e8f0, 1800px 1500px #2de2ed,
    200px 200px #6ffbff, 400px 500px #00e8f0, 600px 800px #6ffbff, 1000px 900px #00e8f0,
    300px 1100px #2de2ed, 500px 1250px #00e8f0, 700px 1400px #6ffbff, 900px 1550px #2de2ed,
    1100px 1600px #00e8f0, 1300px 1700px #2de2ed, 1500px 1850px #6ffbff, 1700px 2000px #00e8f0,
    50px 750px #2de2ed, 850px 350px #6ffbff, 1550px 600px #00e8f0, 1900px 1100px #6ffbff;
}

.stars-dark--lg {
  box-shadow:
    200px 300px #fff, 400px 500px #fff, 600px 350px #fff, 1000px 900px #fff,
    1300px 1150px #fff, 1500px 1300px #fff, 1700px 1450px #fff, 1900px 1600px #fff,
    250px 400px #fff, 450px 600px #fff, 650px 900px #fff, 850px 1100px #fff,
    1050px 1200px #fff, 1250px 1400px #fff, 1450px 1600px #fff, 1650px 1800px #fff,
    1850px 1900px #fff, 2050px 2100px #fff, 2250px 2300px #fff, 2450px 2500px #fff,
    120px 850px #fff, 780px 220px #fff, 1480px 780px #fff, 2100px 400px #fff;
}

.stars-light--sm {
  opacity: 1;
  box-shadow:
    100px 100px #d49200, 200px 300px #d49200, 400px 150px #c48a00, 800px 700px #d49200,
    1200px 1100px #c48a00, 1400px 1300px #d49200, 1600px 1150px #c48a00, 1800px 1700px #d49200,
    500px 400px #d49200, 600px 600px #c48a00, 700px 900px #d49200, 1100px 800px #c48a00,
    200px 1200px #d49200, 400px 1300px #c48a00, 600px 1450px #d49200, 800px 1600px #c48a00,
    1700px 1700px #d49200, 1500px 1800px #c48a00, 1300px 1950px #d49200, 1100px 2100px #c48a00,
    80px 500px #d49200, 950px 200px #c48a00, 1350px 450px #d49200, 1750px 900px #c48a00;
}

.stars-light--md {
  opacity: 0.95;
  box-shadow:
    150px 200px #0b5f75, 300px 400px #1b739f, 500px 250px #0b5f75, 900px 800px #1b739f,
    1200px 1050px #0b5f75, 1400px 1200px #1b739f, 1600px 1350px #0b5f75, 1800px 1500px #1b739f,
    200px 200px #1b739f, 400px 500px #0b5f75, 600px 800px #1b739f, 1000px 900px #0b5f75,
    300px 1100px #1b739f, 500px 1250px #0b5f75, 700px 1400px #1b739f, 900px 1550px #0b5f75,
    1100px 1600px #1b739f, 1300px 1700px #0b5f75, 1500px 1850px #1b739f, 1700px 2000px #0b5f75,
    50px 750px #1b739f, 850px 350px #0b5f75, 1550px 600px #1b739f, 1900px 1100px #0b5f75;
}

.stars-light--lg {
  opacity: 0.7;
  box-shadow:
    200px 300px #050d1e, 400px 500px #0b5f75, 600px 350px #050d1e, 1000px 900px #1b739f,
    1300px 1150px #050d1e, 1500px 1300px #0b5f75, 1700px 1450px #050d1e, 1900px 1600px #1b739f,
    250px 400px #0b5f75, 450px 600px #050d1e, 650px 900px #1b739f, 850px 1100px #050d1e,
    1050px 1200px #0b5f75, 1250px 1400px #050d1e, 1450px 1600px #1b739f, 1650px 1800px #050d1e,
    1850px 1900px #0b5f75, 2050px 2100px #050d1e, 2250px 2300px #1b739f, 2450px 2500px #050d1e,
    120px 850px #0b5f75, 780px 220px #050d1e, 1480px 780px #1b739f, 2100px 400px #050d1e;
}

.stars--delay {
  top: 2000px;
}

@keyframes anim-star {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2000px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stars,
  .site-glow {
    animation: none !important;
  }
}
</style>
