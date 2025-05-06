<template>
    <div @dragover.prevent @drop.prevent="handleDrop" class="app-container">
        <h1>💖 Hello World!</h1>
        <p>Welcome to your Electron application.</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const events = {
    dragover: (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
    }
}

</script>