<template>
    <v-container>
        <v-sheet class="pa-3">
            <h1 class="text-center">Dashboard-Staff</h1>
            <v-row>
                <v-col v-for="b in box" :key="b" cols="12" md="4">
                    <v-card class="pa-3">
                        <v-card-text>
                            <h3>{{ b.title }}</h3>
                            <p>{{ b.value }}</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="b in box2" :key="b" cols="12" md="4">
                    <v-card class="pa-3">
                        <v-card-text>
                            <h3>{{ b.title }}</h3>
                            <p>{{ b.value }}</p>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-sheet>
        <v-row class="mt-4">
            <v-col cols="12" md="12">
                <v-card class="pa-3">
                    <v-table class="mt-3">
                        <thead>
                            <tr>
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">ผู้รับการประเมินผล</th>
                                <th class="border text-center">รอบการประเมิน</th>
                                <th class="border text-center">วันที่ออกแบบประเมิน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="border text-center">{{ index+1 }}</td>
                                <td class="border text-center">{{ items.fname }} {{ items.lname }}</td>
                                <td class="border text-center">รอบการประเมินที่:{{ items.round_sys }} ปี:{{ items.year_sys }}</td>
                                <td class="border text-center">{{ formatDate(items.day_eva) }}</td>
                            </tr>
                            <tr>
                                <td class="text-red text-center" v-if="result.length === 0" colspan="12">ไม่พบข้อมูล</td>
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
import { api, staff } from '~/API/base';

const box = ref([])
const box2 = ref([])
const result = ref([])
const token = import.meta.client ? localStorage.getItem('token'):null
const fetch = async()=>{

    try {
        const res = await axios.get(`${staff}/eva/show`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        const res2 = await axios.get(`${api}/dash/staff`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res2.data.box
        box2.value = res2.data.box2
    } catch (error) {
        console.error("Error get",error);
        
    }

}

const formatDate = (dateStr:string)=>{
    if(!dateStr)return '-'
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = String(date.getFullYear())

    return `${day}/${month}/${year}`
}

onMounted(fetch)

</script>

<style scoped>

</style>