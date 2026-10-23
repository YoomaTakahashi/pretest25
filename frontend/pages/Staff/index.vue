<template>
    <v-container>
        <v-sheet class="pa-3">
            <h1 class="text-center">Dashboard-Staff</h1>
            <v-row>
                <v-col v-for="b in box" :key="b" cols="12" md="4">
                    <v-card class="pa-3">
                        <v-card-text>
                            <p>{{ b.title }}</p>
                            <p>{{ b.value }}</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="b in box2" :key="b" cols="12" md="4">
                    <v-card class="pa-3">
                        <v-card-text>
                            <p>{{ b.title }}</p>
                            <p>{{ b.value }}</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
        <v-row>
            <v-col cols="12" md="12">
                <v-card class="pa-3">
                    <v-table>
                        <thead>
                            <tr>
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">ชื่อ-สกุล</th>
                                <th class="border text-center">อีเมล</th>
                                <th class="border text-center">ชื่อผู้ใช้</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_member">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ items.fname }} {{ items.lname }}</td>
                                <td class="border text-center">{{ items.email }}</td>
                                <td class="border text-center">{{ items.username }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { staff } from '~/API/base';

const box = ref([])
const box2 = ref([])
const result = ref([])
const token = import.meta.client ? localStorage.getItem('token'):null
const fetch = async()=>{

    try {
        const res = await axios.get(`${staff}/member/showE`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        const res2 = await axios.get(`${api}/dash/staff`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res2.data.box
        box2.value = res2.data.box2
    } catch (error) {
        console.error("Error get",error);
        
    }

}

onMounted(fetch)

</script>

<style scoped>

</style>