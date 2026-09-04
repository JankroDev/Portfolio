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
</script>

<template>
  <HeroSection />
  <ProjectGrid />
  <ExperienceTimeline />
  <SkillGroups />
  <AboutSection />
  <ContactSection />
</template>
