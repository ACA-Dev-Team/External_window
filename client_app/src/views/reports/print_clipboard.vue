<template>
  <div class="p-6 max-w-full mx-auto">
    <!-- نموذج الإدخال (لن يظهر في الطباعة) -->
    <div class="no-print mb-6 grid grid-cols-6 gap-4 mt-8">
      <input
        v-model="form.mail_Number"
        placeholder="رقم الوارد"
        class="border p-2 rounded"
      />
      <input
        v-model="form.entity_reference_number"
        placeholder="الرقم الإشاري"
        class="border p-2 rounded"
      />
      <input v-model="form.send_time" type="date" class="border p-2 rounded" />
      <input
        v-model="form.section_name"
        placeholder="مصدر الرسالة"
        class="border p-2 rounded col-span-2"
      />

      <select v-model="form.other_docoments" class="border p-2 rounded">
        <option :value="true">توجد مرفقات</option>
        <option :value="false">لا توجد مرفقات</option>
      </select>
    </div>

    <div class="flex">
      <!-- <select v-model="department_name" class="border rounded no-print h-10">
            <option
                      v-for="recipient in departments"
                      :key="recipient.id"
                      :value="recipient.departmentName"
                    >
                      {{ recipient.departmentName }}
                    </option>
      </select> -->

      <button
        class="no-print bg-blue-600 text-white px-4 py-2 rounded mb-6 mr-4 w-32"
        @click="addRow"
      >
        إضافة
      </button>

      <button
        class="no-print bg-blue-600 text-white px-4 py-2 rounded mb-6 mr-4 w-32"
        @click="back()"
      >
        <span class="text-sm font-bold block ml-1">رجوع</span>
      </button>

      <button
        class="no-print bg-blue-600 text-white px-4 py-2 rounded mb-6 mr-4 w-32"
        @click="printReport"
      >
        طباعة التقرير
      </button>
    </div>

    <!-- التقرير -->
    <div id="report">
      <h2 class="text-xl font-bold text-center mb-4">دولة ليبيا</h2>
      <h2 class="text-xl font-bold text-center mb-4">هيئة الرقابة الإدارية</h2>
      <h2 class="text-xl font-bold text-center mb-4">قسم المحفوظات</h2>
      <h2 class="text-xl font-bold text-center mb-4">
        تقرير بالرسائل الواردة ل {{ dep_name }} بتاريخ {{ date }}
      </h2>

 <p class="font-semibold">
                عدد المراسلات: {{ rows2.length }}
              </p>

      <table class="w-full border text-center">
        <thead class="bg-gray-100">
          <tr>
            <th class="border p-2">#</th>
            <th class="border p-2">رقم الوارد</th>
            <th class="border p-2">الرقم الإشاري</th>
            <th class="border p-2">التاريخ</th>
            <th class="border p-2">مصدر الرسالة</th>
            <th class="border p-2">المرفقات</th>
            <th class="border p-2 no-print">#</th>
          </tr>
        </thead>

        <tbody v-if="rows2">
          <tr v-for="(row, index) in rows2" :key="index">
            <td class="border p-2">{{ index + 1 }}</td>
            <td class="border p-2">{{ row.mail_Number }}</td>
            <td class="border p-2">{{ row.entity_reference_number }}</td>
            <td class="border p-2">{{ row.send_time }}</td>
            <td class="border p-2">{{ row.section_name }}</td>
            <td class="border p-2">
              {{ row.other_docoments ? "توجد" : "لا توجد" }}
            </td>

            <td class="border p-2 no-print">
              <button
                type="button"
                class="bg-red-600 hover:bg-red-500 duration-500 p-2 rounded-full focus:outline-none ml-2"
                @click="prepare_delete_document(index)"
              >
                <svg
                  class="w-3 h-3 stroke-current text-white mx-auto"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6.5H5H21"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 6.5V4.5C8 3.96957 8.21071 3.46086 8.58579 3.08579C8.96086 2.71071 9.46957 2.5 10 2.5H14C14.5304 2.5 15.0391 2.71071 15.4142 3.08579C15.7893 3.46086 16 3.96957 16 4.5V6.5M19 6.5V20.5C19 21.0304 18.7893 21.5391 18.4142 21.9142C18.0391 22.2893 17.5304 22.5 17 22.5H7C6.46957 22.5 5.96086 22.2893 5.58579 21.9142C5.21071 21.5391 5 21.0304 5 20.5V6.5H19Z"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>

        <!-- أسفل التقرير (تم نقله إلى tfoot للطباعة الصحيحة) -->
        <tfoot v-if="rows2">
          <tr>
            <td colspan="7" class="p-4 text-right">
             
              <div class="flex justify-end mt-6">
                <p>
                  اسم المستلم:
                  ........................................................................
                </p>
                <p class="mr-8">
                  التوقيع:
                  ........................................
                </p>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>


<script>
import { ensureAccessToken } from "@/services/tokenHelper";
export default {
  mounted() {
     this.Get_sent_report_ayoub();
    this.GetAllDepartments();

    var date = new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    this.date = date.getFullYear() + "-" + month + "-" + day;
  },
  data() {
    return {
      mails: [],
      total: [],
      roles: [],

      mail_type: "",

      mailtype2: "",

      mail_type_num: 1,
      current_department_name: "",

      date: "",

      mailtype: 0,
      mail_type_new: "",
      dep_name: "",

      date2: "",
      form: {
        mail_Number: "",
        entity_reference_number: "",
        date: "",
        section_name: "",
        other_docoments: false,
      },

      departments: [],

      department_name: "",

      rows: [],
       rows2: [],
    };
  },
  methods: {


    prepare_delete_document(i){

      this.rows2.splice(i, 1)

    },
    async Get_sent_report_ayoub() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .GetReportDepartmentForArchive(
          this.$route.params.department_Id,
          this.$route.params.from,
          this.$route.params.to,
          this.$route.params.department_id_selected,
          this.$route.params.mail_id,
          this.$route.params.summary,
          this.$route.params.mail_type,
          this.$route.params.measure_selected,
          this.$route.params.classifaction_selected,
          this.$route.params.mail_caseid,
          this.$route.params.g_in_num,

          //*******eman
          this.$route.params.side_selected,
          this.$route.params.entity_ref_num,
          this.$route.params.date_of_reply,
          this.$route.params.done_mail,
          this.$route.params.not_done

          //****end eman
        )
        .then((res) => {
          this.rows2 = res.data.data;
          this.dep_name=res.data.departmentName
          console.log(this.rows);
          // this.total = res.data.totalOfTotal;
        })
        .catch((err) => {
          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
            console.log(err);
          }, 100);
        });
    },

    addRow() {
      if (
        !this.form.mail_Number ||
        !this.form.entity_reference_number ||
        !this.form.send_time ||
        !this.form.section_name
      ) {
        alert("الرجاء تعبئة جميع الحقول");
        return;
      }

      this.rows2.push({ 

        mail_Number:this.form.mail_Number,

        entity_reference_number:this.form.entity_reference_number,
        send_time:this.form.send_time,
        section_name:this.form.section_name,
        other_docoments:this.form.other_docoments
       });

      // تفريغ النموذج
      this.form.mail_Number = "";
      this.form.entity_reference_number = "";
      this.form.send_time = "";
      this.form.section_name = "";
      this.form.other_docoments = false;
    },

    printReport() {
      window.print();
    },

    GetAllDepartments() {
      this.$http.mailService
        .AllDepartments()
        .then((res) => {
          console.log(res);

          this.departments = res.data;
        })
        .catch((err) => {
          this.loading = false;
          this.screenFreeze = false;
          console.log(err);
        });
    },

    back() {
      this.$router.push("/sent");
    },
  },
};
</script>

<style>
@media print {
  .no-print {
    display: none !important;
  }

  tr {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  thead {
    display: table-header-group;
  }

  tfoot {
    display: table-footer-group;
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

</style>
