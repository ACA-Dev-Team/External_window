<template>
  <div class="">
    <div class="h-screen bg-slate-50 overflow-hidden flex font-sans dir-rtl">
      <asideComponent :isOpen="menuOpen"></asideComponent>
      
      <div class="flex-1 w-0 overflow-y-auto scroll-smooth">
        <div class="max-w-screen-2xl mx-auto flex flex-col md:px-8">
          <navComponent @menu-toggled="onMenuToggle"></navComponent>
          
          <main class="flex-1 relative focus:outline-none pt-6 pb-12 px-4 sm:px-0">
            <!-- العنوان -->
            <div class="mb-10 text-center animate-fade-in-down">
              <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 drop-shadow-sm">
                إحصائيات بريد ( {{ dep_name }} )
              </h1>
   
            </div>

            <!-- حاوية الإحصائيات -->
            <section class="grid grid-cols-1 gap-10  mt-28">
              
              <!-- قسم الصادر -->
              <div class="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8 animate-fade-in-up" style="animation-delay: 0.1s;">
                <div class="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                  <div class="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  </div>
                  <h2 class="text-2xl font-bold text-slate-800">البريد الصادر</h2>
                </div>
                
                <section class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <!-- بطاقة مجموع الصادر -->
                  <div class="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-100 border-r-4 border-r-blue-500 hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-2 group cursor-default">
                    <div class="absolute -left-6 -top-6 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
                    <div class="relative z-10 flex justify-between items-center">
                      <div>
                        <p class="text-slate-500 text-sm font-semibold mb-2">مجموع البريد الصادر</p>
                        <p class="font-black text-blue-600 text-4xl tracking-tight">
                          {{ total_sent }}
                        </p>
                      </div>
                      <div class="text-blue-200 group-hover:text-blue-500 transition-colors duration-300">
                        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                    </div>
                  </div>

                  <!-- بطاقة صادر لم يقرأ -->
                  <div class="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-100 border-r-4 border-r-red-500 hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-2 group cursor-default">
                    <div class="absolute -left-6 -top-6 w-32 h-32 bg-red-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
                    <div class="relative z-10 flex justify-between items-center">
                      <div>
                        <p class="text-slate-500 text-sm font-semibold mb-2">بريد صادر لم يُقرأ</p>
                        <p class="font-black text-red-500 text-4xl tracking-tight">
                          {{ total_sent_not_reded }}
                        </p>
                      </div>
                      <div class="text-red-200 group-hover:text-red-500 transition-colors duration-300 flex-shrink-0">
                        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <!-- قسم الوارد -->
              <div class="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8 animate-fade-in-up" style="animation-delay: 0.2s;">
                <div class="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                  <div class="p-3 bg-green-50 text-green-600 rounded-2xl">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                  </div>
                  <h2 class="text-2xl font-bold text-slate-800">البريد الوارد</h2>
                </div>
                
                <section class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <!-- بطاقة مجموع الوارد -->
                  <div class="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-100 border-r-4 border-r-green-500 hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-2 group cursor-default">
                    <div class="absolute -left-6 -top-6 w-32 h-32 bg-green-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
                    <div class="relative z-10 flex justify-between items-center">
                      <div>
                        <p class="text-slate-500 text-sm font-semibold mb-2">مجموع البريد الوارد</p>
                        <p class="font-black text-green-600 text-4xl tracking-tight">
                          {{ total_inbox }}
                        </p>
                      </div>
                      <div class="text-green-200 group-hover:text-green-500 transition-colors duration-300">
                        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                      </div>
                    </div>
                  </div>

                  <!-- بطاقة وارد لم يقرأ -->
                  <div class="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-100 border-r-4 border-r-yellow-500 hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-2 group cursor-default">
                    <div class="absolute -left-6 -top-6 w-32 h-32 bg-yellow-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
                    <div class="relative z-10 flex justify-between items-center">
                      <div>
                        <p class="text-slate-500 text-sm font-semibold mb-2">بريد وارد لم يُقرأ</p>
                        <p class="font-black text-yellow-600 text-4xl tracking-tight">
                          {{ total_inbox_not_reded }}
                        </p>
                      </div>
                      <div class="text-yellow-200 group-hover:text-yellow-500 transition-colors duration-300 flex-shrink-0">
                        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

            </section>
          </main>
        </div>
      </div>
    </div>

    <!-- شاشة التحميل (بقت كما هي مع تحسين بسيط في المظهر) -->
    <div
      v-if="screenFreeze"
      class="w-screen h-screen bg-slate-900 bg-opacity-40 backdrop-blur-sm absolute inset-0 z-50 flex justify-center items-center transition-opacity duration-300"
    >
      <div v-if="loading" class="bg-white p-6 rounded-2xl shadow-2xl">
        <svgLoadingComponent></svgLoadingComponent>
      </div>
    </div>
  </div>
</template>
<script>
import asideComponent from "@/components/asideComponent.vue";
import navComponent from "@/components/navComponent.vue";
import svgLoadingComponent from "@/components/svgLoadingComponent.vue";
import { ensureAccessToken } from "@/services/tokenHelper";

export default {
  mounted() {
    var date = new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();

    // var month1 = "01";
    // var day1 = "01";

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    // this.date_from = date.getFullYear() + "-" + month1 + "-" + day1;
    this.date_to = date.getFullYear() + "-" + month + "-" + day;

    this.year = date.getFullYear();

    this.generateYears();

    this.dep_name = sessionStorage.getItem("dep_name2");

    this.roles = localStorage.getItem("Az07");

    this.isperent = localStorage.getItem("isperent");

    this.my_user_id = localStorage.getItem("AY_LW");
    this.my_department_id = localStorage.getItem("chrome");
    this.roles = localStorage.getItem("Az07");

    this.GetTotal();

    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // أو beforeUnmount في Vue 3
    window.removeEventListener("resize", this.handleResize);
  },

  computed: {
    filterByTerm() {
      return this.departments.filter((department) => {
        return department.departmentName.includes(this.departmentNameSelected);
      });
    },
  },

  components: {
    asideComponent,
    navComponent,
    svgLoadingComponent,
  },

  data() {
    return {
      availableYears: [],
      // 2. الخيار المختار افتراضياً (جميع الأوقات)
      selectedPeriod: "all",
      // 3. سنة بداية المنظومة (غيرها حسب تاريخ انطلاق مشروعك)
      startSystemYear: 2023,

      date_from: "2023-01-01",
      date_to: "",

      year: "",
      branches: [],
      branchdepartmentdelect: false,
      branchdepartmentNameSelected: "",
      branchIdSelected: "",

      departments: [],
      departmentselect: false,
      departmentNameSelected: "",
      departmentIdSelected: "",

      dep_name: "",

      isperent: false,

      roles: [],
      my_user_id: "",
      my_department_id: "",
      LastMails: {},
      Reports: {},
      Reports2: {},
      loading: false,
      screenFreeze: false,
      menuOpen: true,

      total_sent:0,
      total_sent_not_reded:0,

       total_inbox:0,
      total_inbox_not_reded:0,

    };
  },

  watch: {},
  methods: {
    generateYears() {
      // الحصول على السنة الحالية من جهاز المستخدم
      const currentYear = new Date().getFullYear();
      let years = [];

      // حلقة تكرار تبدأ من السنة الحالية وتعود للخلف حتى سنة البداية
      for (let y = currentYear; y >= this.startSystemYear; y--) {
        years.push(y);
      }

      // تخزين السنوات في المتغير لكي تظهر في الـ Select
      this.availableYears = years;
    },

    // هذه الدالة التي سيتم استدعاؤها عند تغيير الاختيار (الخطوة القادمة سنبرمج محتواها)

    prepareAndFetch() {
      const today = new Date().toISOString().split("T")[0]; // تاريخ اليوم بصيغة YYYY-MM-DD
      let fromDate = "";
      let toDate = "";

      if (this.selectedPeriod === "all") {
        // 1. حالة جميع الأوقات
        fromDate = `${this.startSystemYear}-01-01`;
        toDate = today;
      } else {
        // 2. حالة سنة محددة
        const year = this.selectedPeriod;
        fromDate = `${year}-01-01`;

        // إذا اختار السنة الحالية، نأخذ حتى اليوم. إذا سنة سابقة، نأخذ لآخر يوم فيها.
        const currentYear = new Date().getFullYear();
        if (parseInt(year) === currentYear) {
          toDate = today;
        } else {
          toDate = `${year}-12-31`;
        }
      }

      this.date_from = fromDate;
      this.date_to = toDate;

      this.GetTotal();
    },

    async GetBranchOfDepartment() {
      const token = await ensureAccessToken();
      if (!token) return;

      // console.log(this.departmentIdSelected)
      this.loading = true;
      this.screenFreeze = true;

      this.$http.mailService
        .GetBranchOfDepartment(this.departmentIdSelected)
        .then((res) => {
          this.loading = false;
          this.screenFreeze = false;
          this.branches = res.data;
        })
        .catch((err) => {
          this.branches = [];
          this.loading = false;
          this.screenFreeze = false;
          console.log(err);
        });
    },

    selectbranchdepartment(id, name) {
      this.branchdepartmentNameSelected = name;
      this.branchIdSelected = id;
    },

    async GetAllDepartments() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .AllDepartments()
        .then((res) => {
          this.departments = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    selectdepartment(id, name) {
      this.departmentNameSelected = name;
      this.departmentIdSelected = id;
    },

    go() {
      this.$router.push({
        name: "ex",
        params: {},
      });
    },
    handleResize() {
      this.menuOpen = window.innerWidth >= 800;
    },

    onMenuToggle(value) {
      this.menuOpen = value; // 🔹 نستقبل القيمة هنا
    },

    GetTotal() {
      this.$http.DashboardService.GetTotal(this.my_department_id)
        .then((res) => {
          
          this.Reports = res.data;

          


          this.total_sent=this.Reports.totale_internell_externl+  this.Reports.totale_externl+this.Reports.totale_inbox,


      this.total_sent_not_reded=this.Reports.notreaded_internell_externl +this.Reports.notreaded_Totale_externl + this.Reports.notreaded_Totale_inbox,

       this.total_inbox= this.Reports.totale_Internal_inbox + this.Reports.total_externl2 + this.Reports.totale_inbox2 ,


      this.total_inbox_not_reded= this.Reports.notreaded_Totale_Internal_inbox + this.Reports.notreaded_Total_externl2 + this.Reports.notreaded_Totale_inbox2 



        })
        .catch((err) => {
          console.log(err);
        });
    },

    GetNumbersOfReports(id1) {
      if (id1 == "") {
        var id = this.my_department_id;
      } else id = id1;

      this.$http.DashboardService.GettDashbordReport(
        id,
        this.date_from,
        this.date_to,
      )
        .then((res) => {
     
          this.Reports = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async GetNumbersOfReports2() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.DashboardService.NumbersOfReports2(this.my_department_id)
        .then((res) => {
       
          this.Reports2 = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
/* إعداد اتجاه النص ليكون من اليمين لليسار بشكل افتراضي */
.dir-rtl {
  direction: rtl;
}

/* حركات الأنيميشن المخصصة */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0; /* يبدأ مخفياً حتى يبدأ الأنيميشن */
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>