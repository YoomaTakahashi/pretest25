<template>
    <v-app>
        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="font-weight-bold">NTC EVALAUTION SYSTEM</v-toolbar-title>
            <v-spacer></v-spacer>

            <p class="text-center">คุณ : {{ user.fname }} {{ user.lname }} <br> ตำแหน่ง : {{ user.role }}</p>
            <v-btn @click="logout" icon="mdi-logout" variant="text"></v-btn>
        </v-app-bar>
        
        <v-navigation-drawer app color="#404040" width="260" v-model="drawer" :teporary="isMobile"  >
            <v-list density="comfortable">
                <v-list-item>
                    <v-list-item-title class="font-weight-bold">NTC EVALAUTION SYSTEM</v-list-item-title>
                    <div class="mt-3">
                        <v-chip class="text-white" variant="outlined" color="white"><h4>{{ user.role }}</h4></v-chip>
                    </div>
                </v-list-item> 
            </v-list>

            <v-divider color="white" opacity="0.5"></v-divider>

            <v-list density="comfortable">
                <v-list-item v-for="item in navitem" :key="item.title" :to="item.to">
                    <v-list-item-title>
                        {{ item.title }}
                    </v-list-item-title>
                </v-list-item> 
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container>
                <slot></slot>
            </v-container>
            <v-footer class="text-caption justify-center">© 2026 NTC EVALAUTION SYSTEM</v-footer>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import axios from 'axios'
import { api } from '~/API/base';
import {useDisplay} from 'vuetify';

const user = ref<any>({})
const drawer = ref(false)
const {mdAndDown} = useDisplay()
const isMobile = computed(()=> mdAndDown.value)

const lotout = ()=>{
    if(!confirm('ท่าต้องการออกจากระบบใช่หรือไม่'))return
    localStorage.removeItem('token')
    navigateTo('/')
}

const roles = [
    //staff nav

    {title:'หน้าหลัก',to:'',role:''},
    {title:'จัดการผู้รับการประเมิน',to:'',role:''},
    {title:'จัดการกรรมการประเมิน',to:'',role:''},
    {title:'จัดการหัวข้อการประเมิน',to:'',role:''},
    {title:'จัดการตัวชี้วัด',to:'',role:''},
    {title:'จัดการรอบการประเมิน',to:'',role:''},
    {title:'จัดการแบบประเมิน',to:'',role:''},
    {title:'ผลการประเมินของ',to:'',role:''},
    {title:'ผลการประเมินของ',to:'',role:''},
    {title:'สถานะการประเมินของ',to:'',role:''},
    {title:'สถานะการประเมินของ',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
    {title:'หน้าหลัก',to:'',role:''},
]
</script>

<style scoped>

</style>