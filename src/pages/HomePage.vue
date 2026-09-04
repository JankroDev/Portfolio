<script setup lang="ts">
import { onMounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import ProjectGrid from '../components/ProjectGrid.vue'
import ExperienceTimeline from '../components/ExperienceTimeline.vue'
import SkillGroups from '../components/SkillGroups.vue'
import AboutSection from '../components/AboutSection.vue'
import ContactSection from '../components/ContactSection.vue'

onMounted(() => {
  document.title = 'Chris Janke · Full Stack Developer'
})

// The template must have exactly one root element (no leading comment, no sibling
// sections): App.vue wraps routes in <Transition mode="out-in">, which cannot animate
// a fragment, and a stuck leave would leave the next page blank.
</script>

<template>
  <div class="home">
    <HeroSection />
    <ProjectGrid />
    <ExperienceTimeline />
    <SkillGroups />
    <AboutSection />
    <ContactSection />
  </div>
</template>
