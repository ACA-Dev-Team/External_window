<template>
    <div class="h-screen bg-gray-100 overflow-hidden flex z-20">
        <asideComponent :isOpen="menuOpen"></asideComponent>

        <div class="bg-gray-200 h-screen w-full overflow-hidden p-4 border  border-green-400" dir="rtl">
           
            <div class="min-h-full mx-auto max-w-4xl p-2 flex flex-col mt-4 items-center">
                <div class="flex justify-between w-full">
 <navComponent  @menu-toggled="onMenuToggle" ></navComponent>
                  
                </div>
                <h1 class="font-extrabold text-xl mt-2">إدارة الإعلانات </h1>

                <div class="flex  justify-between mt-6 w-full">

                    <div class="ml-2 w-full">

                        <label class="font-medium mr-1 text-gray-700"> عنوان الإعلان</label>

                        <div class="relative">

                            <textarea class="block mt-2 w-full text-sm rounded-md border border-green-400 hover:shadow-sm focus:outline-none focus:border-green-500 p-2"
                          v-model="ads_title" type="text" id="ads_title" placeholder="ادخل عنوان الإعلان" rows="3" ></textarea>
                        </div>



                    
                    </div>


                    <div class="ml-2 w-full">

                        <label class="font-medium mr-1 rounded-md  text-gray-700"> تفاصيل الإعلان</label>

                        <div class="relative">


                                  <textarea
                       
                        v-model="ads_details"
                        id="ads_details"
                        rows="3"
                        placeholder=" تفاصيل الإعلان"
                        class="block mt-2 w-full text-sm rounded-md border border-green-400 hover:shadow-sm focus:outline-none focus:border-green-500 p-2"
                      >
                      </textarea>

                           
                        </div>

                    </div>

                        


                        <!-- <select class="shadow-sm w-full focus:outline-none rounded-md mt-2 px-2 py-1 " name="mangment_name">
                    <option value="1">التوثيق</option>
                    <option value="2">مكتب</option>

                </select> -->
                    </div>


                    <div class="flex justify-center">
                        <div class="ml-4">
                            
                            <button type="button" id="add" @click="add_ads()" 
                            
                            class="
                                    mx-auto
                                    w-48
                                    bg-green-700
                                    text-green-50
                                    rounded-md
                                    py-2
                                    border border-green-300
                                    hover:bg-green-800
                                    focus:outline-none
                                    flex
                                    items-center
                                    justify-center
                                    col-span-2
                                    mt-4
                                            ">
                                <!-- onclick="change();" -->
                                <svg class="w-4 h-4 stroke-current text-white ml-2 fill-current" version="1.1"
                                    id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 477.873 477.873" style="enable-background: new 0 0 477.873 477.873"
                                    xml:space="preserve">
                                    <g>
                                        <g>
                                            <path
                                                d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2
                                        c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067
                                        S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2
                                        c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z">
                                            </path>
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937
                                        c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585
                                        c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13
                                        l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202
                                        L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955
                                        C443.754,73.631,440.467,81.575,434.603,87.419z"></path>
                                        </g>
                                    </g>
                                </svg>
                                إضافة
                            </button>


                        </div>

                        <div class="mr-4">
                            <button type="button" id="edit" @click="update_ads()" class="
                                                    mx-auto
                                                    w-48
                                                    bg-green-700
                                                    text-green-50
                                                    rounded-md
                                                    py-2
                                                    border border-green-300
                                                    hover:bg-green-800
                                                    focus:outline-none
                                                    flex
                                                    items-center
                                                    justify-center
                                                    col-span-2
                                                    mt-4
                                                    ">
                                <!-- onclick="change();" -->
                                <svg class="w-4 h-4 stroke-current text-white ml-2 fill-current" version="1.1"
                                    id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 477.873 477.873" style="enable-background: new 0 0 477.873 477.873"
                                    xml:space="preserve">
                                    <g>
                                        <g>
                                            <path
                                                d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2
                                        c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067
                                        S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2
                                        c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z">
                                            </path>
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937
                                        c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585
                                        c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13
                                        l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202
                                        L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955
                                        C443.754,73.631,440.467,81.575,434.603,87.419z"></path>
                                        </g>
                                    </g>
                                </svg>
                                تعديل
                            </button>


                        </div>

                        </div>




                 <div class="
                                            grid grid-cols-6
                                            w-full
                                            border-b
                                            items-center
                                            p-1
                                            sticky
                                            top-0
                                            bg-gray-100
                                            mt-6
                                        ">
                        <span class="col-span-3 mx-auto text-lg font-bold">العنوان </span>

                        <span class="col-span-2 mx-auto text-lg font-bold">الحالة</span>

                        



                        <span> </span>
                    </div>

                <div  v-if="ads[0]" class="bg-gray-100 mt-3 rounded-md overflow-y-auto max-h-96 w-full">
                   

                    <div v-for="ad in ads" :key="ad.id" class="grid grid-cols-6 mt-2 border-b pb-4 items-center " >

                        

                        <div  class="grid grid-cols-5 col-span-5 mt-2 border-b pb-4 items-center"  @click=" GetAdById(ad.id)"
                               @keyup.space.prevent 
                            >
                        


                            
                  <span class="col-span-3 mx-auto">{{ ad.titel }}</span>

     
               

                            <span class="col-span-2 mx-auto" v-if="ad.state == true"
                            >مفعل</span
                            >
                            <span class="col-span-2 mx-auto" v-else>غير مفعل</span>


                   
                        </div>

                                 <button class="

                                    hover:text-red-500
                                    text-black
                                    p-2
                                    mx-auto
                                    rounded-md
                                " v-if="ad.state == true" @click="stop_ad(ad.id)" title="إيقاف الإعلان">
                                <svg class="w-8 h-8 inline-block text-center" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                                    </path>
                                </svg>
                            </button>

                            <button class="
                                    hover:text-green-500
                                    text-black-500
                                    
                                    p-2
                                    mx-auto
                                    rounded-md
                                " v-else @click="stop_ad(ad.id)" title="تفعيل الإعلان">
                                <svg class="w-8 h-8 inline-block text-center" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z">
                                    </path>
                                </svg>
                            </button>






                    </div>
                </div>
                <div v-else class="text-center text-2xl text-red-500 mt-20">
                    لايوجد إعلانات حاليا </div>
            </div>
            </div>
        </div>
    
</template>

<script>
import asideComponent from "@/components/asideComponent.vue";
//import logout from "@/components/logout.vue";
import { ensureAccessToken } from "@/services/tokenHelper";

import navComponent from "@/components/navComponent.vue";

export default {
    watch: {
       

     
      
    },

    mounted() {
           window.addEventListener('resize', this.handleResize);

        this.roles = localStorage.getItem("Az07");


        if (localStorage.getItem("AY_LW") == null || localStorage.getItem("AY_LW") != 29 || localStorage.getItem("chrome") != 17 || !this.roles.includes('ads')) {
            this.$router.push("/");
        }
   
        this.my_department_id = localStorage.getItem("chrome");

        this.GetAllAds();
    },

       beforeDestroy() { // أو beforeUnmount في Vue 3
    window.removeEventListener('resize', this.handleResize);
  },


    name: "ads",
    components: {
        asideComponent,
        
        navComponent
    },
    data() {
        return {
            menuOpen:true,
            ads: [],

            roles:[],

            adIid:0,

       my_department_id:0, 
          
            ads_details: "",
              ads_title: "",
        };
    },

    computed: {

     
    },
    methods: {

               handleResize() {
      this.menuOpen = window.innerWidth >= 800;
    },



       onMenuToggle(value) {
      this.menuOpen = value; // 🔹 نستقبل القيمة هنا
    },

    

      async  add_ads(){

            var ad = {

          Titel: this.ads_title,
          Subject: this.ads_details,
          State:true,
          UserId:Number(this.my_department_id)

            }

                     const token = await ensureAccessToken();
    if (!token) return;


this.$http.securityService.add_ads(ad) 

.then(() => {
                   
                    this.GetAllAds(),
                      this.ads_details="",
                    this.ads_title=""
                    
                })
                .catch((err) => {
                    console.log(err);
                });


        },


   async     GetAdById(id) {
            // console.log(this.departmentIdSelected)


                                 const token = await ensureAccessToken();
                                 if (!token) return;



            this.ad_id=id,







            this.$http.securityService
                .get_by_id(id)
                .then((res) => {
                  //  console.log(res.data);
                    this.ads_details = res.data.subject;
                    this.ads_title = res.data.titel;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

     async   GetAllAds() {

                 const token = await ensureAccessToken();
    if (!token) return;

            this.$http.securityService
                .get_all_ads()
                .then((res) => {
                    this.ads = res.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

     async   update_ads(){

       var ad = {

            Id:Number(this.ad_id),
          Titel: this.ads_title,
          Subject: this.ads_details,
          State:true,
          UserId:Number(this.my_department_id)

            }

                     const token = await ensureAccessToken();
    if (!token) return;

this.$http.securityService.update_ads(ad) 

.then(() => {
                    this.GetAllAds(),

                    this.ads_details="",
                    this.ads_title=""
                    
                })
                .catch((err) => {
                    console.log(err);
                });



        },



 



     async   stop_ad(id) {

                                 const token = await ensureAccessToken();
    if (!token) return;
       
            this.$http.securityService
                .stop_ads(id)
                .then(() => {
                    setTimeout(() => {
                      //  console.log(res);
                        
                        
                        this.GetAllAds();
                        // this.documentSection = true;

                        // this.proceduresSection = true;
                    }, 500);
                })
                .catch(() => {
                    setTimeout(() => { }, 500);
                });
        },


    },
};
</script>

<style></style>
