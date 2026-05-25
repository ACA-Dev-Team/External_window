<template>
  <div class="">
    <div class="h-screen bg-white overflow-hidden flex">
      <asideComponent :isOpen="menuOpen"></asideComponent>
      <div class="flex-1 bg-gray-100 w-0 overflow-y-auto">
        <div class="max-w-screen-2xl mx-auto flex flex-col md:px-8">
          <navComponent @menu-toggled="onMenuToggle"></navComponent>
          <main class="flex-1 relative focus:outline-none pt-2 pb-6">
            <h1 class="text-2xl font-semibold text-black text-center">
              إحصائيات بريد ( {{ dep_name }} )
            </h1>

            <div
            v-if="roles.includes('dashboardreport')&& my_department_id==17"
              class="flex flex-col items-center xl:flex-row mt-6 xl:justify-between"
            >
           
              <div
                class="flex items-center gap-3 bg-white p-2 px-4 rounded-xl border border-gray-200 shadow-sm mt-12"
              >
                <div class="text-blue-500"></div>

                <label class="text-sm font-bold text-gray-700 whitespace-nowrap"
                  >الفترة الزمنية:</label
                >

                <select
                  v-model="selectedPeriod"
                  @change="prepareAndFetch"
                  class="bg-gray-50 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 cursor-pointer hover:bg-gray-100 transition-colors outline-none font-semibold"
                >
                  <option selected value="all">جميع الأوقات</option>
                  <option
                    v-for="year in availableYears"
                    :key="year"
                    :value="year"
                  >
                    إحصائيات سنة {{ year }}
                  </option>
                </select>
              </div>

              <div class="w-96 mt-6">
                <label
                  for="department"
                  class="block text-base font-semibold text-gray-800"
                >
                  الإدارات العامة
                </label>

                <div class="relative">
                  <button
                    @click="departmentselect = !departmentselect"
                    @keyup.space.prevent
                    id="department"
                    class="text-right block mt-2 w-full rounded-md h-12 border text-sm bg-white border-gray-300 hover:shadow-sm focus:outline-none focus:border-gray-300 px-2"
                  >
                    <input
                      @click="
                        (departmentNameSelected = ''),
                          (departmentIdSelected = '')
                      "
                      v-model="departmentNameSelected"
                      type="text"
                      class="h-6 w-full"
                    />

                    <!-- {{ departmentNameSelected }} -->
                  </button>

                  <div
                    v-if="departmentselect"
                    class="border text-sm bg-white border-gray-300 p-2 absolute w-full z-20 shadow h-24 overflow-y-scroll rounded-b-md"
                  >
                    <button
                      class="block focus:outline-none w-full my-1 text-right"
                      @click="
                        selectdepartment('', 'الكل');
                        departmentselect = !departmentselect;
                      "
                    >
                      الكل
                    </button>

                    <button
                      class="block focus:outline-none w-full my-1 text-right"
                      @click="
                        selectdepartment(
                          department.id,
                          department.departmentName,
                        );
                        departmentselect = !departmentselect;
                      "
                      v-for="department in filterByTerm"
                      :key="department.id"
                    >
                      {{ department.departmentName }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="w-96 mt-6">
                <label
                  for="department"
                  class="block text-base font-semibold text-gray-800"
                >
                  الإدارات الفرعية و الأقسام
                </label>

                <div class="relative">
                  <button
                    @click="branchdepartmentdelect = !branchdepartmentdelect"
                    id="department"
                    class="text-right block mt-2 w-full rounded-md h-12 border text-sm bg-white border-gray-300 hover:shadow-sm focus:outline-none focus:border-gray-300 p-2"
                  >
                    {{ branchdepartmentNameSelected }}
                  </button>

                  <div
                    v-if="branchdepartmentdelect"
                    class="border text-sm bg-white border-gray-300 p-2 absolute w-full z-20 shadow h-40 overflow-y-scroll rounded-b-md"
                  >
                    <!--selectUserOfDepartment-->

                    <button
                      v-if="departmentNameSelected != ''"
                      class="block focus:outline-none w-full duration-500 px-1 py-2 text-right hover:bg-gray-200"
                      @click="
                        GetNumbersOfReports(departmentIdSelected);

                        branchdepartmentdelect = !branchdepartmentdelect;
                        branchdepartmentNameSelected = 'الأمانة الإدارية';
                      "
                    >
                      <!--  <a  class="w-full block " :id="department.id" @click="test(department.id)" > {{ department.departmentName }}</a>-->
                      الأمانة الإدارية
                    </button>

                    <button
                      class="block focus:outline-none w-full duration-500 px-1 py-2 text-right hover:bg-gray-200"
                      @click="
                        selectbranchdepartment(
                          department.id,
                          department.departmentName,
                        );

                        branchdepartmentdelect = !branchdepartmentdelect;
                      "
                      v-for="department in branches"
                      :key="department.id"
                    >
                      <!--  <a  class="w-full block " :id="department.id" @click="test(department.id)" > {{ department.departmentName }}</a>-->

                      {{ department.departmentName }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 
              <h1 class="self-center text-center text-3xl font-semibold text-black mt-6">الإدارات العامة والمكاتب والفروع</h1> -->

            <section class="grid grid-cols-1 md:grid-cols-2 p-4 gap-8">
              <div class="border border-gray-400 rounded mt-8 p-4">
                <p class="text-center text-lg font-bold">الصادر</p>
                <section class="grid grid-cols-2 gap-8 mt-8">
                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-green-500"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الداخلي</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.totale_internell_externl }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-red-700"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">داخلي لم يقرأ</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.notreaded_internell_externl }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-green-500"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الصادر الخارجي</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.totale_externl }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-red-700"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">صادر خارجي لم يقرأ</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.notreaded_Totale_externl }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-green-500"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الوارد الخارجي</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.totale_inbox }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-red-700"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">وارد لم يقرأ</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.notreaded_Totale_inbox }}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div class="border border-gray-400 rounded mt-8 p-4">
                <p class="text-center text-lg font-bold">الوارد</p>
                <section class="grid grid-cols-2 gap-8 mt-8">
                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-green-500"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الداخلي</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.totale_Internal_inbox }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-red-700"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">داخلي لم يقرأ</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.notreaded_Totale_Internal_inbox }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-green-500"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الصادر الخارجي</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.total_externl2 }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-red-700"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">صادر خارجي لم يقرأ</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.notreaded_Total_externl2 }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-green-500"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الوارد الخارجي</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.totale_inbox2 }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="bg-white p-4 hover:shadow focus:outline-none group border-t-4 border-red-700"
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">وارد خارجي لم يقرأ</p>
                        <p
                          class="font-bold text-gray-600 text-3xl mt-2 text-right"
                        >
                          {{ Reports.notreaded_Totale_inbox2 }}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>

            <!-- لوحة مؤشرات بريد الاقسام -->
            <!-- <div v-if="isperent=='true'">

            <h1 class="self-center text-center text-3xl font-semibold text-black mt-6">الأقسام والإدارات الفرعية</h1>

            <section class="grid grid-cols-2 gap-8">
              <div class="border border-gray-400 rounded mt-8 p-4">
                <p class="text-center text-lg font-bold">الصادر</p>
                <section class="grid grid-cols-2 gap-8 mt-8">
                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-green-500
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الداخلي</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.totale_internell_externl }}
                        </p>
                      </div>

                
                    </div>
                  </div>

                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-red-700
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">داخلي لم يقرأ</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.notreaded_internell_externl }}
                        </p>
                      </div>
                 
                    </div>
                  </div>

                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-green-500
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الصادر الخارجي</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.totale_externl }}
                        </p>
                      </div>

                    </div>
                  </div>

                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-red-700
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">صادر خارجي لم يقرأ</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.notreaded_Totale_externl }}
                        </p>
                      </div>
                   
                    </div>
                  </div>

                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-green-500
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الوارد الخارجي</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.totale_inbox }}
                        </p>
                      </div>

             
                    </div>
                  </div>

                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-red-700
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">وارد لم يقرأ</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.notreaded_Totale_inbox }}
                        </p>
                      </div>
              
                    </div>
                  </div>
                </section>
              </div>

              <div class="border border-gray-400 rounded mt-8 p-4">
                <p class="text-center text-lg font-bold">الوارد</p>
                <section class="grid grid-cols-2 gap-8 mt-8">
                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-green-500
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الداخلي</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.totale_Internal_inbox }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-red-700
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">داخلي لم يقرأ</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.notreaded_Totale_Internal_inbox }}
                        </p>
                      </div>

                    </div>
                  </div>

                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-green-500
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الصادر الخارجي</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.total_externl2 }}
                        </p>
                      </div>

                    </div>
                  </div>

                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-red-700
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">صادر خارجي لم يقرأ</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.notreaded_Total_externl2 }}
                        </p>
                      </div>
               
                    </div>
                  </div>

                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-green-500
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">مجموع الوارد الخارجي</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.totale_inbox2 }}
                        </p>
                      </div>

                    </div>
                  </div>

                  <div
                    class="
                      bg-white
                      p-4
                      hover:shadow
                      focus:outline-none
                      group
                      border-t-4 border-red-700
                    "
                  >
                    <div class="flex justify-between items-start">
                      <div class="">
                        <p class="text-gray-900">وارد خارجي لم يقرأ</p>
                        <p
                          class="
                            font-bold
                            text-gray-600 text-3xl
                            mt-2
                            text-right
                          "
                        >
                          {{ Reports2.notreaded_Totale_inbox2 }}
                        </p>
                      </div>
                 
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div> -->
          </main>
        </div>
      </div>
    </div>
    <div
      v-if="screenFreeze"
      class="w-screen h-screen bg-black bg-opacity-30 absolute inset-0 z-50 flex justify-center items-center"
    >
      <div v-if="loading" class="">
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


    this.year=date.getFullYear();

    this.generateYears();

    this.dep_name = sessionStorage.getItem("dep_name2");

    this.roles = localStorage.getItem("Az07");

    if (
      localStorage.getItem("AY_LW") == null ||
      localStorage.getItem("member") == "true"
    ) {
      this.$router.push("/");
    }

    this.isperent = localStorage.getItem("isperent");

    this.my_user_id = localStorage.getItem("AY_LW");
    this.my_department_id = localStorage.getItem("chrome");
    this.roles = localStorage.getItem("Az07");

    if (this.isperent == "true") {
      this.GetNumbersOfReports("");
      //  this.GetNumbersOfReports2();
    } else {
      this.GetNumbersOfReports("");
    }

    this.GetAllDepartments(),
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

      year:"",
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
    };
  },

  watch: {
    departmentIdSelected: function () {
      //  this.GetUsersOfDepartment();
      this.GetBranchOfDepartment();
    },

    branchIdSelected: function () {
      this.GetNumbersOfReports(this.branchIdSelected);
    },
  },
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

      this.GetNumbersOfReports("")
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

    // GetNumbersOfReports(id1) {

    //   if(id1==''){

    //     var id = this.my_department_id
    //   }

    //   else id = id1

    //   this.$http.DashboardService.NumbersOfReports(id)
    //     .then((res) => {
    //       console.log(res.data);
    //       this.Reports = res.data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },

    GetNumbersOfReports(id1) {

  

      if (id1 == "") {
        var id = this.my_department_id;
      } else id = id1;

 
      this.$http.DashboardService.GettDashbordReport(id, this.date_from, this.date_to)
        .then((res) => {
          console.log(res.data);
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
          console.log(res.data);
          this.Reports2 = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
