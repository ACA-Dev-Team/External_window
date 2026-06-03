<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4" dir="rtl">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      
      <!-- شعار المنظومة -->
      <div class="pt-8 pb-4">
        <img class="mx-auto h-32 w-auto object-contain" src="../../assets/img/logo-aca.png" alt="logo" />
        <h2 class="mt-4 text-center text-2xl font-extrabold text-gray-900">منظومة البريد الخارجي</h2>
        <p class="text-center text-sm text-gray-500 mt-1">{{ currentTitle }}</p>
      </div>

      <!-- 1. واجهة تسجيل الدخول الأساسية -->
      <form v-if="step === 'login'" @submit.prevent="submitFirstStep" class="p-8 pt-4 space-y-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">اسم المستخدم</label>
          <input 
            v-model.trim="loginData.username"
            type="text" 
            autocomplete="username" 
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all text-sm"
            placeholder="أدخل اسم المستخدم"
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="block text-sm font-semibold text-gray-700">كلمة المرور</label>
            <button type="button" @click="step = 'forgot'" class="text-xs text-green-600 hover:underline font-medium">نسيت كلمة المرور؟</button>
          </div>
          <input 
            v-model="loginData.password"
            type="password" 
            autocomplete="current-password" 
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none transition-all text-sm"
            placeholder="••••••••"
          />
        </div>

        <!-- أداة التحقق (reCAPTCHA) -->
        <div class="flex justify-center py-2">
          <vue-recaptcha 
            ref="recaptcha" 
            sitekey="6LfHbdgsAAAAAMaahvlIRvIIYBMdva4H8Nc0g8sz" 
            @verify="onCaptchaVerify"
            @expired="onCaptchaExpired"
          ></vue-recaptcha>
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md disabled:opacity-50 transition-all flex items-center justify-center">
          <span v-if="loading" class="animate-spin ml-2">⏳</span>
          <span>{{ loading ? 'جاري التحقق...' : 'دخول' }}</span>
        </button>
      </form>

      <!-- 2. واجهة كود التحقق (2FA) -->
      <form v-if="step === 'otp'" @submit.prevent="verifyOTP" class="p-8 pt-4 space-y-5 text-center">
        <div class="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm mb-4 border border-blue-100">
          تم إرسال كود التحقق إلى بريدك الإلكتروني المرتبط بالحساب.
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-3">أدخل كود التحقق (6 أرقام)</label>
          <input 
            v-model="otpCode" 
            type="text" 
            inputmode="numeric" 
            maxlength="6" 
            @input="sanitizeOTP"
            required
            class="w-full px-4 py-4 text-center text-3xl tracking-[0.5em] font-bold rounded-lg border-2 border-green-500 outline-none focus:ring-2 focus:ring-green-400"
            placeholder="000000" 
          />
        </div>
        <button type="submit" :disabled="loading"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transition-all">
          {{ loading ? 'جاري التأكيد...' : 'تأكيد الرمز والدخول' }}
        </button>
        <button type="button" @click="step = 'login' , loginData.username='',loginData.password=''" class="text-xs text-gray-500 hover:text-green-600 transition-all mt-4">العودة لتسجيل الدخول</button>
      </form>

      <!-- 3. واجهة نسيت كلمة المرور -->
      <form v-if="step === 'forgot'" @submit.prevent="requestPasswordReset" class="p-8 pt-4 space-y-5">
        <div class="text-sm text-gray-600 mb-4 leading-relaxed">أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.</div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">البريد الإلكتروني</label>
          <input v-model.trim="forgotEmail" type="email" required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none text-sm"
            placeholder="example@domain.com" />
        </div>
        <button type="submit" :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all">
          إرسال رابط التعيين
        </button>
        <button type="button" @click="step = 'login'" class="w-full text-sm text-gray-500 font-medium pt-2 hover:underline text-center">إلغاء والعودة</button>
      </form>

      <div class="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
      
      </div>

    </div>
  </div>
</template>

<script>
import { VueRecaptcha } from 'vue-recaptcha';
import Swal from 'sweetalert2';

export default {
  components: { VueRecaptcha },
  data() {
    return {
      step: 'login',
      loading: false,
      captchaToken: null,
      otpCode: '',
      forgotEmail: '',
      loginData: {
        username: '',
        password: ''
      }
    };
  },
  computed: {
    currentTitle() {
      if (this.step === 'otp') return 'التحقق الثنائي';
      if (this.step === 'forgot') return 'استعادة الوصول للحساب';
      return 'تسجيل دخول الجهات الخارجية';
    }
  },
  methods: {
    // تنظيف المدخلات (Security)
    sanitizeOTP() {
      this.otpCode = this.otpCode.replace(/\D/g, '');
    },

    // دالة موحدة لعرض التنبيهات الاحترافية
    toast(title, icon = 'error') {
      Swal.fire({
        title: title,
        icon: icon,
        confirmButtonText: 'موافق',
        confirmButtonColor: '#059669', // لون أخضر Tailwind
        customClass: {
          popup: 'rounded-xl shadow-2xl'
        }
      });
    },

    onCaptchaVerify(response) {
      this.captchaToken = response;
    },
    onCaptchaExpired() {
      this.captchaToken = null;
    },

    // المرحلة الأولى
    async submitFirstStep() {
      if (!this.captchaToken) {
        return this.toast("يرجى تأكيد أنك لست روبوت", "warning");
      }
      
      this.loading = true;
      try {
        console.log("التحقق من البيانات وإرسال الكود للإيميل...");
        // محاكاة طلب الباك اند (.NET 8)
        setTimeout(() => {
          this.loading = false;
          this.step = 'otp';
        }, 1200);
      } catch (error) {
        this.loading = false;
        this.toast("فشل التحقق، يرجى التأكد من البيانات", "error");
      }
    },

    // المرحلة الثانية (OTP)
    async verifyOTP() {
      if (this.otpCode.length < 6) {
        return this.toast("يرجى إدخال الرمز المكون من 6 أرقام", "info");
      }
      
      this.loading = true;
      try {
        console.log("جاري التحقق من رمز OTP...");
        setTimeout(() => {
          this.loading = false;

               var Login = {
          Password: this.loginData.password,
          Username:this.loginData.username
          
        };


              
      this.$http.securityService

        .Login(Login)
        .then((res) => {
          setTimeout(() => {
            this.loading = false;
            // this.screenFreeze = false;

            this.loginSuccess = true;
           

            this.user = res.data.find;

            this.$authenticatedUser.userId = this.user.userId;
            this.$authenticatedUser.name = this.user.userName;
            this.$authenticatedUser.departmentId =
            this.user.departmentId;

            localStorage.setItem("AY_LW", this.user.userId);
            localStorage.setItem("user_name", this.user.userName);
            localStorage.setItem("member", this.user.member);
            sessionStorage.setItem("id", this.user.userId);
            sessionStorage.setItem("dep_name", this.departmentNameSelected);

            localStorage.setItem("access_token", res.data.accessToken);
            localStorage.setItem("refresh_token", res.data.refreshToken);

            localStorage.setItem("dep_type", res.data.find.officeOrdirectorate);

            
             localStorage.setItem("section_id", res.data.find.section_id);
             localStorage.setItem("section_parent", res.data.find.section_parent);
             localStorage.setItem("section_type", res.data.find.section_type);

             
            sessionStorage.setItem("dep_name2", this.user.parent_name);


            // if (this.branchdepartmentNameSelected === "الأمانة الإدارية") {
            //   
            // } else {
            //   sessionStorage.setItem(
            //     "dep_name2",
            //     this.branchdepartmentNameSelected
            //   );
            // }

            if (!this.branchdepartmentNameSelected) {
              localStorage.setItem(
                "current_department_name",
                this.departmentNameSelected
              );
            } else {
              localStorage.setItem(
                "current_department_name",
                this.branchdepartmentNameSelected
              );
            }

            localStorage.setItem(
              "current_department_id",
              this.user.departmentId
            );

            localStorage.setItem("perent_id", this.user.parent_id);

            localStorage.setItem("perent_name", this.user.parent_name);

            if (this.user.parent_id == "0") {
              localStorage.setItem("isperent", true);
            } else {
              localStorage.setItem("isperent", false);
            }

            localStorage.setItem(
              "chrome",
              this.user.departmentId
            );
            localStorage.setItem("Az07", this.user.listrole);

            setTimeout(() => {
                  this.$router.push('/Dashboard');
            }, 400);
            // this.$authenticatedUser.userName = this.user.username
            // this.$authenticatedUser.validity = this.user.validity
          }, 10);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            // this.screenFreeze = false;

            this.loginSuccess = false;

            console.log(err);
          }, 10);
        });

          
        }, 1000);
      } catch (error) {
        this.loading = false;
        this.toast("كود التحقق غير صحيح أو انتهت صلاحيته", "error");
      }
    },

    // استعادة كلمة المرور
    async requestPasswordReset() {
      if (!this.forgotEmail || !this.forgotEmail.includes('@')) {
        return this.toast("يرجى إدخال بريد إلكتروني صحيح", "warning");
      }

      this.loading = true;
      console.log("جاري إرسال رابط التعيين...");
      
      setTimeout(() => {
        this.loading = false;
        this.toast("إذا كان الإيميل مسجلاً، فستصلك رسالة خلال دقائق", "success");
        this.step = 'login';
      }, 1500);
    }
  }
};
</script>