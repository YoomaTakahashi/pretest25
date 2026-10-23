<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2" >
                    <h1 class="font-weight-bold">ผลการประเมินของผู้รับการประเมินผล</h1>
                     <v-card elevation="5" rounded class="pa-4" >
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมินที่ : {{ user.round_sys }} {{ user.year_sys }}</p>
                     </v-card>
                     <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="font-weight-bold">{{t+1}}.{{ topic.name_topic }}</h1>
                            <v-table class="table">
                                <tr>
                                    <th class="bg-grey border pa-2" style="width: 10%;">ตัวชี้วัด</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">รายละเอียดตัวชี้วัด</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">น้ำหนักคะแนน</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">คะแนนเต็ม</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">ไฟล์</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">รายละเอียด</th>
                                    <th class="bg-grey border pa-2" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate">
                                    <td class="border pa-2 text-center" style="width: 10%;">{{ indicate.name_indicate }}</td>
                                    <td class="border pa-2 text-center" style="width: 10%;">{{ indicate.detail_indicate }}</td>
                                    <td class="border pa-2 text-center" style="width: 10%;">{{ indicate.point_indicate }}</td>
                                    <td class="border pa-2 text-center" style="width: 10%;">{{ indicate.point_indicate*4 }}</td>
                                    <td class="border pa-2 text-center" style="width: 10%;"><v-btn color="warning" prepend-icon="mdi-eye" @click="viweFile(indicate.file_eva)">เปิดดู</v-btn></td>
                                    <td class="border pa-2 text-center" style="width: 10%;">{{ indicate.detail_eva || '-' }}</td>
                                    <td class="border pa-2 text-center" style="width: 10%;">{{indicate.point_indicate*indicate.score_member }}</td>
                                </tr>
                            </v-table>
                        </v-col>
                     </v-row>
                     <div class="mt-3 text-end">
                        <v-card color="green" type="submit">คะแนนรวม : {{ user.total_eva }} คะแนน</v-card>
                     </div>
                </v-form>
                <v-alert v-else-if="user.status_eva === 1" variant="tonal" type="success" color="green">ประเมินสำเร็จ</v-alert>
                <v-alert v-else variant="tonal" type="error" color="error">ไม่มีแบบประเมิน</v-alert >
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { eva,api, commit } from '~/API/base';

const user =ref<any>({})
const topics = ref<any>([])
const id_eva = useRoute().params.id_eva

const viweFile = (filename:string) =>{
    const url = `http://localhost:3001/uploads/file_eva/${filename}`
    window.open(url,'_blank')
}

const fetchUser = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${commit}/save_score/user/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    } catch (error) {
        console.error('Error get User',error)
    }
}
const fetchTopic = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${commit}/score_member/topic/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
    } catch (error) {
        console.error('Error get User',error)
    }
}

onMounted(async()=>{
    await Promise.all([fetchUser(),fetchTopic()])
})


</script>

<style scoped>

</style>