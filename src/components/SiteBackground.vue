<script setup>
/**
 * Animated starfield site background.
 * Dark: gold / teal / white on navy.
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
            radial-gradient(ellipse 70% 40% at 50% 0%, rgba(27, 115, 159, 0.07), transparent 65%);
        "
      />
      <div class="site-glow site-glow--a" />
      <div class="site-glow site-glow--b" />
      <div class="site-glow site-glow--c" />
    </div>

    <!-- Dark sky -->
    <div
      class="absolute inset-0 hidden dark:block"
      style="background: radial-gradient(ellipse at bottom, #0c1629 0%, #050d1e 42%, #02060f 100%)"
    />

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
  background: rgba(35, 184, 193, 0.08);
}

.site-glow--b {
  top: 40%;
  inset-inline-end: 4%;
  width: 18rem;
  height: 18rem;
  background: rgba(27, 115, 159, 0.07);
  animation-delay: -4s;
}

.site-glow--c {
  bottom: 14%;
  inset-inline-start: 35%;
  width: 14rem;
  height: 14rem;
  background: rgba(184, 134, 11, 0.05);
  animation-delay: -7s;
}

@keyframes glow-breathe {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
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
    100px 100px #f8aa00, 200px 300px #f8aa00, 400px 150px #f8aa00, 800px 700px #f8aa00,
    1200px 1100px #f8aa00, 1400px 1300px #f8aa00, 1600px 1150px #f8aa00, 1800px 1700px #f8aa00,
    500px 400px #f8aa00, 600px 600px #f8aa00, 700px 900px #f8aa00, 1100px 800px #f8aa00,
    200px 1200px #f8aa00, 400px 1300px #f8aa00, 600px 1450px #f8aa00, 800px 1600px #f8aa00,
    1700px 1700px #f8aa00, 1500px 1800px #f8aa00, 1300px 1950px #f8aa00, 1100px 2100px #f8aa00,
    80px 500px #f8aa00, 950px 200px #f8aa00, 1350px 450px #f8aa00, 1750px 900px #f8aa00;
}

.stars-dark--md {
  box-shadow:
    150px 200px #23b8c1, 300px 400px #23b8c1, 500px 250px #23b8c1, 900px 800px #23b8c1,
    1200px 1050px #23b8c1, 1400px 1200px #23b8c1, 1600px 1350px #23b8c1, 1800px 1500px #23b8c1,
    200px 200px #01a2ff, 400px 500px #01a2ff, 600px 800px #01a2ff, 1000px 900px #01a2ff,
    300px 1100px #23b8c1, 500px 1250px #23b8c1, 700px 1400px #01a2ff, 900px 1550px #23b8c1,
    1100px 1600px #01a2ff, 1300px 1700px #23b8c1, 1500px 1850px #01a2ff, 1700px 2000px #23b8c1,
    50px 750px #23b8c1, 850px 350px #01a2ff, 1550px 600px #23b8c1, 1900px 1100px #01a2ff;
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
  opacity: 0.9;
  box-shadow:
    100px 100px #d49200, 200px 300px #d49200, 400px 150px #c48a00, 800px 700px #d49200,
    1200px 1100px #c48a00, 1400px 1300px #d49200, 1600px 1150px #c48a00, 1800px 1700px #d49200,
    500px 400px #d49200, 600px 600px #c48a00, 700px 900px #d49200, 1100px 800px #c48a00,
    200px 1200px #d49200, 400px 1300px #c48a00, 600px 1450px #d49200, 800px 1600px #c48a00,
    1700px 1700px #d49200, 1500px 1800px #c48a00, 1300px 1950px #d49200, 1100px 2100px #c48a00,
    80px 500px #d49200, 950px 200px #c48a00, 1350px 450px #d49200, 1750px 900px #c48a00;
}

.stars-light--md {
  opacity: 0.85;
  box-shadow:
    150px 200px #0b5f75, 300px 400px #1b739f, 500px 250px #0b5f75, 900px 800px #1b739f,
    1200px 1050px #0b5f75, 1400px 1200px #1b739f, 1600px 1350px #0b5f75, 1800px 1500px #1b739f,
    200px 200px #1b739f, 400px 500px #0b5f75, 600px 800px #1b739f, 1000px 900px #0b5f75,
    300px 1100px #1b739f, 500px 1250px #0b5f75, 700px 1400px #1b739f, 900px 1550px #0b5f75,
    1100px 1600px #1b739f, 1300px 1700px #0b5f75, 1500px 1850px #1b739f, 1700px 2000px #0b5f75,
    50px 750px #1b739f, 850px 350px #0b5f75, 1550px 600px #1b739f, 1900px 1100px #0b5f75;
}

.stars-light--lg {
  opacity: 0.55;
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
