<template>
  <div class="p-6">
    <div class="overflow-hidden">
      <div class="flex justify-end mb-10 mt-6 pl-7">
        <div class="">
          <button
            class="ml-2 w-64 bg-green-700 text-green-50 rounded-md py-3 border border-green-300 hover:bg-green-800 focus:outline-none flex items-center justify-center"
            @click="printpage(), printHistory()"
          >
            <span class="text-sm font-bold block ml-1">طباعة</span>

            <svg
              class="h-5 w-5 mr-1 text-white block fill-current hover:text-blue-500"
              id="Capa_1"
              enable-background="new 0 0 512 512"
              height="512"
              viewBox="0 0 512 512"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="m437 129h-14v-54c0-41.355-33.645-75-75-75h-184c-41.355 0-75 33.645-75 75v54h-14c-41.355 0-75 33.645-75 75v120c0 41.355 33.645 75 75 75h14v68c0 24.813 20.187 45 45 45h244c24.813 0 45-20.187 45-45v-68h14c41.355 0 75-33.645 75-75v-120c0-41.355-33.645-75-75-75zm-318-54c0-24.813 20.187-45 45-45h184c24.813 0 45 20.187 45 45v54h-274zm274 392c0 8.271-6.729 15-15 15h-244c-8.271 0-15-6.729-15-15v-148h274zm89-143c0 24.813-20.187 45-45 45h-14v-50h9c8.284 0 15-6.716 15-15s-6.716-15-15-15h-352c-8.284 0-15 6.716-15 15s6.716 15 15 15h9v50h-14c-24.813 0-45-20.187-45-45v-120c0-24.813 20.187-45 45-45h362c24.813 0 45 20.187 45 45z"
                />
                <path
                  d="m296 353h-80c-8.284 0-15 6.716-15 15s6.716 15 15 15h80c8.284 0 15-6.716 15-15s-6.716-15-15-15z"
                />
                <path
                  d="m296 417h-80c-8.284 0-15 6.716-15 15s6.716 15 15 15h80c8.284 0 15-6.716 15-15s-6.716-15-15-15z"
                />
                <path
                  d="m128 193h-48c-8.284 0-15 6.716-15 15s6.716 15 15 15h48c8.284 0 15-6.716 15-15s-6.716-15-15-15z"
                />
              </g>
            </svg>
          </button>
        </div>

        <div class="">
          <button
            class="mr-4 w-40 bg-green-700 text-green-50 rounded-md py-3 border border-green-300 hover:bg-green-800 focus:outline-none"
            @click="back()"
          >
            <span class="text-sm font-bold block ml-1">رجوع</span>
          </button>
        </div>
      </div>
      <div
        id="print"
        class="w-full h-full text-center bg-gray-50 py-1 px-4"
        style="
          width: 100%;
          height: 100%;
          text-align: center;
          direction: rtl;
          --tw-bg-opacity: 1;
          background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
          padding-top: 0.25rem /* 4px */;
          padding-bottom: 0.25rem /* 4px */;
          padding-left: 16px;
          padding-right: 16px;
        "
      >
        <div
          class="w-full h-full text-center"
          style="width: 100%; height: 100%; text-align: center; direction: rtl"
        >
          <div class="text-center" style="text-align: center">
            <div
              class="text-2xl text-center font-semibold py-1 px-3"
              style="
                font-size: 24px;
                line-height: 32px;
                text-align: center;
                font-weight: 600;
                padding-top: 4px;
                padding-bottom: 4px;
                padding-left: 12px;
                padding-right: 12px;
              "
            >
              هيئة الرقابة الإدارية
              <div class="my-4" style="margin-top: 16px; margin-bottom: 16px">
                منظومة البريد
              </div>

              <div
                class="ml-4 mt-4"
                style="margin-left: 16px; margin-top: 16px"
              >
                <span class="ml-2" style="margin-left: 8px">
                  تقرير  بالإجراءات التي 
                  اتُخِذَت على البريد رقم {{ mnum }} من تاريخ إرساله إلى
                  يوم {{ d1 }}
                </span>
              </div>

              <div
                class="w-full flex justify-center mt-8"
                style="
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  margin-top: 2rem;
                "
              >
                <div
                  class="w-11/12 md:w-8/12 lg:w-4/12 border border-gray-400 rounded-md p-4"
                  style="
                    width: 91.666667%;

                    .md\:w-8\/12 {
                      width: 66.666667%;
                    }

                    .lg\:w-4\/12 {
                      width: 33.333333%;
                    }
                    border-width: 1px;

                    --tw-border-opacity: 1;
                    border-color: rgba(156, 163, 175, var(--tw-border-opacity))
                      /* #9ca3af */;
                    border-radius: 0.375rem /* 6px */;
                    padding: 1rem /* 16px */;
                  "
                >
                  <!-- العنوان -->
                  <h2
                    class="text-center text-xl font-bold mb-4"
                    style="
                      text-align: center;
                      font-size: 1.25rem /* 20px */;
                      line-height: 1.75rem /* 28px */;
                      font-weight: 700;
                      margin-bottom: 1rem /* 16px */;
                    "
                  >
                    ملخص البريد
                  </h2>

                  <!-- النص داخل البرواز -->
                  <div
                    class="text-center break-words"
                    style="text-align: center; overflow-wrap: break-word"
                  >
                    <span>
                      {{ sum }}
                    </span>
                  </div>
                </div>
              </div>

              <div
                class="mt-8 text-left w-full"
                style="margin-top: 32px; text-align: left; width: 100%"
              >
                <span class=""> تاريخ الطباعة : {{ d1 }}</span>
              </div>

              <div
                class="rounded-lg shadow mt-2 mb-4"
                style="
                  border-radius: 0.5rem /* 8px */;
                  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
                    0 1px 2px 0 rgba(0, 0, 0, 0.06);
                  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                  margin-top: 0.5rem /* 8px */;
                "
              >
                <table
                  class="w-full text-sm text-left border-collapse table-fixed"
                  style="
                    width: 100%;
                    font-size: 0.875rem /* 14px */;
                    line-height: 1.25rem /* 20px */;
                    text-align: left;
                    border-collapse: collapse;
                    table-layout: fixed;
                  "
                >
                  <!-- الصف الأول: العناوين -->
                  <thead
                    class="bg-gray-100"
                    style="
                      --tw-bg-opacity: 1;
                      background-color: rgba(
                          243,
                          244,
                          246,
                          var(--tw-bg-opacity)
                        )
                        /* #f3f4f6 */;
                    "
                  >
                    <tr>
                      <th
                        class="px-4 py-2 border w-1/12 text-center"
                        style="
                          padding-left: 1rem /* 16px */;
                          padding-right: 1rem /* 16px */;
                          padding-top: 0.5rem /* 8px */;
                          padding-bottom: 0.5rem /* 8px */;
                          border-width: 1px;
                          width: 8.333333%;
                          text-align: center;
                        "
                      >
                        ر. ت
                      </th>
                      <th
                        class="px-4 py-2 border w-8/12 text-center"
                        style="
                          padding-left: 1rem /* 16px */;
                          padding-right: 1rem /* 16px */;
                          padding-top: 0.5rem /* 8px */;
                          padding-bottom: 0.5rem /* 8px */;
                          border-width: 1px;
                          width: 66.666667%;
                          text-align: center;
                        "
                      >
                        الحالة
                      </th>
                      <th
                        class="px-4 py-2 border w-3/12 text-center"
                        style="
                          padding-left: 1rem /* 16px */;
                          padding-right: 1rem /* 16px */;
                          padding-top: 0.5rem /* 8px */;
                          padding-bottom: 0.5rem /* 8px */;
                          border-width: 1px;
                          width: 25%;
                          text-align: center;
                        "
                      >
                        التاريخ
                      </th>
                    </tr>
                  </thead>

                  <!-- باقي الصفوف: البيانات -->
                  <tbody>
                    <tr
                      v-for="(item, index) in mail"
                      :key="index"
                      class="hover:bg-gray-50 align-top"
                      style="
                        .hover\:bg-gray-50:hover {
                          --tw-bg-opacity: 1;
                          background-color: rgba(
                              249,
                              250,
                              251,
                              var(--tw-bg-opacity)
                            )
                            /* #f9fafb */;
                          vertical-align: top;
                        }
                      "
                    >
                      <td
                        class="px-4 py-2 border text-center align-middle"
                        style="
                          padding-left: 1rem /* 16px */;
                          padding-right: 1rem /* 16px */;
                          padding-top: 0.5rem /* 8px */;
                          padding-bottom: 0.5rem /* 8px */;
                          border-width: 1px;
                          text-align: center;
                          vertical-align: middle;
                        "
                      >
                        {{ index + 1 }}
                      </td>
                      <td
                        class="px-4 py-2 border whitespace-normal break-words text-center align-middle"
                        style="
                          padding-left: 1rem /* 16px */;
                          padding-right: 1rem /* 16px */;
                          padding-top: 0.5rem /* 8px */;
                          padding-bottom: 0.5rem /* 8px */;
                          border-width: 1px;
                          white-space: normal;
                          overflow-wrap: break-word;
                          text-align: center;
                          vertical-align: middle;
                        "
                      >
                        {{ item.changes }}
                      </td>
                      <td
                        class="px-4 py-2 border text-center align-middle"
                        style="
                          padding-left: 1rem /* 16px */;
                          padding-right: 1rem /* 16px */;
                          padding-top: 0.5rem /* 8px */;
                          padding-bottom: 0.5rem /* 8px */;
                          border-width: 1px;
                          text-align: center;
                          vertical-align: middle;
                        "
                      >
                        {{ checkSingleDigit(item.time) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- في حال لم تصل بيانات -->
              <p
                v-if="mail.length === 0"
                class="text-center text-gray-500 mt-4"
                style="
                  text-align: center;
                  --tw-text-opacity: 1;
                  color: rgba(107, 114, 128, var(--tw-text-opacity))
                    /* #6b7280 */;
                  margin-top: 1rem /* 16px */;
                "
              >
                لا توجد بيانات متاحة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ensureAccessToken } from "@/services/tokenHelper";

export default {
  name: "ReportData",

  data() {
    return {
      mail: [],

      sum: this.$route.params.sumary,
      mid: this.$route.params.mid,
      mnum: this.$route.params.mn,
      dep: this.$route.params.dep,
      d1: "",
      type: this.$route.params.type,
    };
  },

  mounted() {
    const t1 = new Date();

    var month1 = t1.getMonth() + 1;
    if (month1 < 10) month1 = "0" + month1;
    this.d1 = t1.getFullYear() + "-" + month1 + "-" + t1.getDate();

    this.GetReport(this.mid, this.dep);
  },

  methods: {
    checkSingleDigit(digit) {
      const t = new Date(digit);

      var month = t.getMonth() + 1;
      if (month < 10) month = "0" + month;
      var d = t.getFullYear() + "-" + month + "-" + t.getDate();

      const h = t.getHours();

      const m = new Date(digit).getMinutes();
      const s = new Date(digit).getSeconds();

      const m2 = ("0" + m).slice(-2);
      const s2 = ("0" + s).slice(-2);

      var j = h + "-" + m2 + "-" + s2 + " <--- " + d;

      return j;
    },

   async GetReport(mid, dep) {

                const token = await ensureAccessToken();
    if (!token) return;

      this.$http.mailService
        .get_mail_report(Number(mid), Number(dep))
        .then((res) => {
          this.mail = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    back() {
      this.$router.push({
        name: "sent-show",
        params: {
          mail: this.mid,
          type: this.type,

        
      //sends_id: mail.sends_id,
        },
      });
    },

    printpage() {
      this.$htmlToPaper("print");
    },

   async printHistory() {
                const token = await ensureAccessToken();
    if (!token) return;

      var model = {
        Current: Number(localStorage.getItem("AY_LW")),
      };

      this.$http.mailService
        .printHistory(model)
        .then((res) => {
          console.log(res);
          setTimeout(() => {}, 300);
        })
        .catch((err) => {
          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
            console.log(err);
          }, 100);
        });
    },
  },
};
</script>
