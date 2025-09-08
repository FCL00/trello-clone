<template>
  <footer id="footer" class="footer">
    <div class="container grid">
      <div class="footer-brand">
        <h2>Taskly</h2>
        <p>Stay organized, stay productive.</p>
      </div>

      <div class="footer-links">
        <h4>Product</h4>
        <ul>
          <li><router-link to="/">Features</router-link></li>
          <li><router-link to="/">Pricing</router-link></li>
          <li><router-link to="/">Download</router-link></li>
        </ul>
      </div>

      <div class="footer-links">
        <h4>Company</h4>
        <ul>
          <li><router-link to="/">About Us</router-link></li>
          <li><router-link to="/">Careers</router-link></li>
          <li><router-link to="/">Blog</router-link></li>
        </ul>
      </div>

      <div class="footer-links">
        <h4>Support</h4>
        <ul>
          <li><router-link to="/">Help Center</router-link></li>
          <li><router-link to="/">Contact</router-link></li>
          <li><router-link to="/">Privacy Policy</router-link></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 Taskly. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>
