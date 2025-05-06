<template>
    <div @dragover.prevent="events.dragover" @drop.prevent="events.drop" @wheel="events.wheel" class="app-container">
        <div v-if="fileDatas.length > 0" class="view-container">
            <div class="control-area">
                {{ index+1 }} / {{ fileDatas.length }}
                <button @click="events.deleteClicked" class="del">×</button>
            </div>
            <div>
                <img :src="fileDatas[index].imgSrc" alt="Image" class="file-image" />
            </div>
        </div>
        <div v-else class="drop-container">
            <h2>Drop here!</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileData } from './types/file-data'

const fileDatas = ref<FileData[]>([])
const index = ref(0);

const events = {
    dragover: (e:DragEvent) => {
        e.dataTransfer.dropEffect = 'copy'
    },
    drop: async (e:DragEvent) => {
        const fileList = e.dataTransfer.files;
        const pathes = [];
        for (let i = 0; i < fileList.length; i++) {
            const p = window.api.fullpath(fileList[i]);
            pathes.push(p);
        }
        fileDatas.value = await window.api.resolveFiles(pathes);
        index.value = 0;
    },
    wheel: (e:WheelEvent) => {
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
    },
    deleteClicked: async () => {
        const filepath = fileDatas.value[index.value].filePath;
        const isSuccess = await window.api.deleteFile(filepath);
        if(!isSuccess) {
            alert('Failed to delete the file.');
            return;
        }
        if (fileDatas.value.length > 0) {
            fileDatas.value.splice(index.value, 1);
            if (index.value >= fileDatas.value.length) {
                index.value = fileDatas.value.length - 1;
            }
        }
    }
}

</script>


<style scoped lang="css">

.drop-container {
    width: 100%;
    height:90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border: 2px dashed #ccc;
    border-radius: 10px;
    font-size: 24px;
    color: #333;
}

.view-container {
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 10px;
}   

.control-area {
    width: 100%;
}

.del {
    width: 50px;
    height: 50px;
}

img {
    width: 100%;
    height: auto;
}
</style>