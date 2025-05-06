<template>
    <div @dragover.prevent="events.dragover" @drop.prevent="events.handleDrop" class="app-container">
        <h1>💖 Hello World!</h1>
        <p>Welcome to your Electron application.</p>
        <div v-for="fileData in fileDatas" class="file-item">
            <img :src="fileData.imgSrc" alt="File Icon" class="file-icon" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileData } from './types/file-data'

const files = ref<File[]>([])
const fileDatas = ref<FileData[]>('')

const events = {
    dragover: (e) => {
        e.dataTransfer.dropEffect = 'copy'
    },
    handleDrop: async (e) => {
        const fileList = e.dataTransfer.files;
        const pathes = [];
        for (let i = 0; i < fileList.length; i++) {
            const p = await window.api.fullpath(fileList[i]);
            pathes.push(p);
        }
        fileDatas.value = await window.api.resolveFiles(pathes);
    }
}

</script>