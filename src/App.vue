<template>
    <div @dragover.prevent="events.dragover" @drop.prevent="events.handleDrop" @wheel="events.wheel" class="app-container">
        <div v-if="fileDatas.length > 0" class="img-container">
            <img :src="fileDatas[index].imgSrc" alt="Image" class="file-image" />
        </div>
        <div v-else class="drop-container">
            <h2>Drop here!</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileData } from './types/file-data'

const files = ref<File[]>([])
const fileDatas = ref<FileData[]>('')
const index = ref(0);

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
    },
    wheel: (e) => {
        if (e.deltaY > 0) {
            index.value = index.value + 1;
        } else {
            index.value = index.value - 1;
        }

        if (index.value < 0) {
            index.value = 0;
        } else if (index.value >= fileDatas.value.length) {
            index.value = fileDatas.value.length - 1;
        }
    }
}

</script>


<style scoped lang="css">
.drop-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border: 2px dashed #ccc;
    border-radius: 10px;
    font-size: 24px;
    color: #333;
}

.img-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 10px;
}   
</style>