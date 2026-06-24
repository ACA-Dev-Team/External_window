<template>



 <div class="h-screen bg-gray-100 overflow-hidden flex z-20">
 
<asideComponent :isOpen="menuOpen"></asideComponent>

<div class="max-w-screen-2xl mx-auto flex flex-col md:px-8">
 <navComponent @menu-toggled="onMenuToggle"></navComponent>
    <div class=" my-auto min-h-64 w-96 mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">

       


        <h2 class="text-xl font-bold mb-4">تغيير كلمة السر</h2>

        <form @submit.prevent="handleChangePassword">
            <!-- كلمة السر الحالية -->
            <div class="mb-4">
                <label class="block text-gray-700">كلمة السر الحالية</label>
                <input type="password" v-model="currentPassword" class="w-full mt-1 p-2 border border-gray-300 rounded"
                    required />
            </div>

            <!-- كلمة السر الجديدة -->
            <div class="mb-4">
                <label class="block text-gray-700">كلمة السر الجديدة</label>
                <input type="password" v-model="newPassword" class="w-full mt-1 p-2 border border-gray-300 rounded"
                    required />

                    <div class="mt-2 text-xs space-y-1">
        <p :class="passwordCriteria.length ? 'text-green-600' : 'text-gray-400'">✓ 8 خانات على الأقل</p>
        <p :class="passwordCriteria.upper ? 'text-green-600' : 'text-gray-400'">✓ حرف كبير (A-Z)</p>
        <p :class="passwordCriteria.lower ? 'text-green-600' : 'text-gray-400'">✓ حرف صغير (a-z)</p>
        <p :class="passwordCriteria.number ? 'text-green-600' : 'text-gray-400'">✓ رقم واحد على الأقل</p>
        <p :class="passwordCriteria.special ? 'text-green-600' : 'text-gray-400'">✓ رمز خاص (@$!%*?&)</p>
    </div>

            </div>

            <!-- تأكيد كلمة السر الجديدة -->
            <div class="mb-4">
                <label class="block text-gray-700">تأكيد كلمة السر الجديدة</label>
                <input type="password" v-model="confirmPassword" class="w-full mt-1 p-2 border border-gray-300 rounded"
                    required />
            </div>

            <!-- رسالة خطأ أو نجاح -->
            <p v-if="errorMessage" class="text-red-600 mb-2">{{ errorMessage }}</p>
            <p v-if="successMessage" class="text-green-600 mb-2">{{ successMessage }}</p>

            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                تغيير كلمة السر
            </button>
        </form>


            <div
      v-if="screenFreeze"
      class="w-screen h-screen bg-black bg-opacity-30 absolute inset-0 z-50 flex justify-center items-center"
    >
      <div v-if="loading" class="">
        <svgLoadingComponent></svgLoadingComponent>
      </div>
    </div>


    </div>

      </div>
          </div>

</template>

<script>

import svgLoadingComponent from "../../components/svgLoadingComponent.vue";
import asideComponent from "@/components/asideComponent.vue";
import navComponent from "@/components/navComponent.vue";
import { ensureAccessToken } from "@/services/tokenHelper";
export default {

        name: "change_pass",

      components: {
    asideComponent,
    navComponent,
    svgLoadingComponent,
  },

  mounted(){
    window.addEventListener('resize', this.handleResize);
  },

     beforeDestroy() { // أو beforeUnmount في Vue 3
    window.removeEventListener('resize', this.handleResize);
  },


    data() {
        return {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            errorMessage: "",
            successMessage: "",


               loading: false,
            screenFreeze: false,

            menuOpen:true,

            passwordCriteria: {
            length: false,
            upper: false,
            lower: false,
            number: false,
            special: false
        }

        };
    },
    methods: {

           handleResize() {
      this.menuOpen = window.innerWidth >= 800;
    },



       onMenuToggle(value) {
      this.menuOpen = value; // 🔹 نستقبل القيمة هنا
    },
        
    // validatePassword() {
    //     const p = this.newPassword;
    //     this.passwordCriteria = {
    //         length: p.length >= 8,
    //         upper: /[A-Z]/.test(p),
    //         lower: /[a-z]/.test(p),
    //         number: /[0-9]/.test(p),
    //         special: /[@$!%*?&]/.test(p)
    //     };
    // },
validatePassword() {
    const p = this.newPassword || "";
    
    // شروط التحقق بدون Regex
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSpecial = false;

    for (let i = 0; i < p.length; i++) {
        const char = p[i];
        if (char >= 'A' && char <= 'Z') hasUpper = true;
        else if (char >= 'a' && char <= 'z') hasLower = true;
        else if (char >= '0' && char <= '9') hasNumber = true;
        else hasSpecial = true; // أي شيء آخر نعتبره رمزاً خاصاً
    }

    this.passwordCriteria = {
        length: p.length >= 8,
        upper: hasUpper,
        lower: hasLower,
        number: hasNumber,
        special: hasSpecial
    };
    
    console.log("Current Criteria Values:", JSON.stringify(this.passwordCriteria));
},
        async handleChangePassword() {


this.errorMessage = "";
    this.successMessage = "";

    // 1. إعادة التأكد من الشروط قبل أي شيء
    this.validatePassword(); 
    
    // 2. التحقق من القوة
    const isStrong = Object.values(this.passwordCriteria).every(val => val === true);
    if (!isStrong) {
        this.errorMessage = "كلمة السر لا تستوفي معايير القوة (يجب أن تحتوي على حروف كبيرة، صغيرة، أرقام، ورموز).";
        return;
    }

    // 3. التحقق من التطابق
    if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "كلمة السر الجديدة وتأكيدها غير متطابقين.";
        return;
    }


                var passnewuserpass = {

                password_new: this.newPassword,
                password_old: this.currentPassword,
                currentUser: Number(localStorage.getItem("AY_LW"))

            }

            // أرسل البيانات إلى الخادم

  this.screenFreeze = true;
      this.loading = true;

                           const token = await ensureAccessToken();
    if (!token) return;

            this.$http.securityService.update_pass(passnewuserpass)

                .then(() => {

                      this.successMessage = "تم تغيير كلمة السر بنجاح.";
                    this.currentPassword = "";
                    this.newPassword = "";
                    this.confirmPassword = "";

                      this.screenFreeze = false;
                      this.loading = false;

                })
                .catch(() => {
                    this.errorMessage = "كلمة السر القديمة غير صحيحة او حدثت مشكلة في الاتصال الرجاء المحاولة مجددا";
                    this.screenFreeze = false;
                      this.loading = false;
                });

         
        },
    },
};
</script>
