<template>
  <div class="">
    <div class="h-screen bg-gray-100 overflow-hidden flex">
      <asideComponent :isOpen="menuOpen"></asideComponent>
      <div class="flex-1 bg-gray-200 w-0 overflow-y-auto">
        <div class="max-w-screen-2xl mx-auto flex flex-col md:px-8">
          <navComponent @menu-toggled="onMenuToggle"></navComponent>
          <main class="flex-1 relative focus:outline-none pt-2 pb-24">
            <div class="flex flex-col xl:flex-row justify-between items-center">
              <div class="">
                <h1 class="text-xl font-semibold text-gray-900">
                  البريد الصادر
                </h1>
              </div>

              <div class="flex items-center mt-2">
                <span class="text-base font-medium text-gray-800">
                  التاريخ :
                </span>

                <span class="flex items-center mr-4">
                  من
                  <input
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dd-mm-yyyy"
                    min="2000-12-01"
                    max="2040-12-30"
                    id="date_from"
                    v-model="date_from"
                    @keypress.enter="GetSentMail()"
                    class="block mr-2 w-full rounded-md h-10 border border-gray-200 hover:shadow-sm focus:outline-none focus:border-gray-300 px-2"
                  />
                </span>

                <span class="flex items-center mr-4">
                  إلي
                  <input
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="dd-mm-yyyy"
                    min="2000-12-01"
                    max="2040-12-30"
                    id="date_to"
                    v-model="date_to"
                    @keypress.enter="GetSentMail()"
                    class="block mr-2 w-full rounded-md h-10 border border-gray-200 hover:shadow-sm focus:outline-none focus:border-gray-300 px-2"
                  />
                </span>
              </div>

          
   
            </div>

            <div class="mt-2 flex">
              <div
                class="flex sm:col-span-2 border border-green-400 px-2 rounded-md ml-2"
              >
                <label
                  for="new_reply"
                  class="block text-base font-semibold text-gray-800"
                >
                  الردود الجديدة
                </label>
                <input
                  v-model="new_reply"
                  type="checkbox"
                  id="new_reply"
                  class="block mt-2 ml-2 h-8 w-8 overflow-hidden rounded-md border border-gray-300 hover:shadow-sm focus:outline-none focus:border-gray-300"
                />
              </div>

              <div class="relative w-full">
                <button
                  @click="filter = !filter"
                  :class="filter ? 'shadow-md' : ''"
                  class="rounded-t-md border border-b-0 hover:text-blue-600 hover:font-bold group w-full p-2 bg-white flex items-center justify-between focus:outline-none"
                >
                  <span class="flex items-center">
                    <svg
                      class="w-6 h-6 ml-2 stroke-current group-hover:stroke-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      ></path>
                    </svg>
                    فرز
                  </span>

                  <span class="">
                    <svg
                      class="w-6 h-6 stroke-current group-hover:stroke-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="{2}"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  v-if="filter"
                  class="rounded-b-md shadow-md absolute top-10 border border-t-0 z-40 w-full bg-white px-4 py-8"
                >
                  <div
                    class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 max-w-4xl mx-auto"
                  >
                    <div class="sm:col-span-2">
                      <label
                        for="mail_id"
                        class="block text-base font-semibold text-gray-800"
                      >
                        رقم البريد
                      </label>
                      <input
                        v-model="mail_id"
                        type="number"
                        min="1"
                        max="1000000"
                        id="mail_id"
                        class="block mt-2 h-10 w-full rounded-md border border-gray-300 hover:shadow-sm focus:outline-none focus:border-gray-300 px-2"
                      />
                    </div>

                  
                 
                 
                  
                 
                    <div class="sm:col-span-2">
                      <label
                        for="summary"
                        class="block text-base font-semibold text-gray-800"
                      >
                        جزء من الملخص
                      </label>
                      <input
                        type="text"
                        v-model="summary"
                        spellcheck="true"
                        lang="ar"
                        id="summary"
                        class="block mt-2 w-full rounded-md h-10 text-sm border border-gray-300 hover:shadow-sm focus:outline-none focus:border-gray-300 p-2"
                      />
                    </div>



    <div  class="sm:col-span-2">
                      <label
                        for="s-number"
                        class="block text-base font-semibold text-gray-800"
                      >
                        رقم إشاري الجهة
                      </label>
                      <input
                        v-model="s_number"
                        type="number"
                        min="1"
                        id="s-number"
                        class="block mt-2 h-10 w-full rounded-md border border-gray-300 hover:shadow-sm focus:outline-none focus:border-gray-300 px-2"
                      />
                    </div>

                  
                  
                

                 
                    <div class=" mt-2">
                      <label
                        class="block text-base font-semibold text-gray-800 "
                      >
                        السنة
                      </label>

                      <select
                        id="small"
                        class="block p-2 w-28 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        v-model="year_filter"
                      >
                        <option value="0" selected>اختر السنة</option>
                        <option value="0">إلغاء</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>

                        <!--    <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028">2028</option>
                              <option value="2029">2029</option>
                              <option value="2030">2030</option>
                              <option value="2031">2031</option>
                              <option value="2032">2032</option>
                              <option value="2033">2033</option>
                              <option value="2034">2034</option>
                              <option value="2035">2035</option>
                              <option value="2036">2036</option>
                              <option value="2037">2037</option>
                              <option value="2038">2038</option>
                              <option value="2039">2039</option>
                              <option value="2040">2040</option>
                              <option value="2041">2041</option>
                              <option value="2042">2042</option>
                              <option value="2043">2043</option>
                              <option value="2044">2044</option>
                              <option value="2045">2045</option>
                              <option value="2046">2046</option>
                              <option value="2047">2047</option>
                              <option value="2048">2048</option>
                              <option value="2049">2049</option>
                              <option value="2050">2050</option>
                              <option value="2051">2051</option>
                              <option value="2052">2052</option>
                              <option value="2053">2053</option>
                              <option value="2054">2054</option>
                              <option value="2055">2055</option>
                              <option value="2056">2056</option>
                              <option value="2057">2057</option>
                              <option value="2058">2058</option>
                              <option value="2059">2059</option>
                              <option value="2060">2060</option>
                              <option value="2061">2061</option>
                              <option value="2062">2062</option>
                              <option value="2063">2063</option>
                              <option value="2064">2064</option>
                              <option value="2065">2065</option>
                              <option value="2066">2066</option>
                              <option value="2067">2067</option>
                              <option value="2068">2068</option>
                              <option value="2069">2069</option>
                              <option value="2070">2070</option> -->
                      </select>
                    </div>


                   <!-- <div clss="">
                      <label
                        class="block text-base font-semibold text-gray-800 "
                      >
                       التهميش
                      </label>

                      <select
                        id="small"
                        class="block p-2 w-48 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        v-model="sig_filter"
                      >
                        <option value="3" selected>الكل </option>
                        
                        <option value="1">البريد الذي لم يتم تهميشه</option>
                        <option value="2">البريد الذي تم تهميشه</option>
                        

                   
                      </select>
                    </div> -->



                 
                    <div class="sm:col-span-6 items-center w-full flex justify-center">
                      <div>
                        <button
                          @click="
                            senders = [];
                            show_senders_mail = '';
                            (mail_sub_number = false),
                              (show_number = false),
                              (sub_number = ''),
                              (sub_id = 0),
                              (replies = []);
                            departmentflag = 0;
                            departmentName = '';
                            page_num = 1;
                            GetSentMail();
                            filter = !filter;
                          "
                          id="search_button"
                          class="px-8 mr-2 bg-green-700 text-green-50 rounded-md py-2 border border-green-300 hover:bg-green-800 focus:outline-none flex items-center justify-center col-span-2"
                        >
                          <span class="text-sm font-bold block ml-1"> بحث</span>
                        </button>
                      </div>

                      <div>
                        <button
                          @click="search_reset()"
                          id="search_button"
                          class="px-8 mr-2 bg-green-700 text-green-50 rounded-md py-2 border border-green-300 hover:bg-green-800 focus:outline-none flex items-center justify-center col-span-2"
                        >
                          <span class="text-sm font-bold block ml-1">
                            جديد</span
                          >
                        </button>
                      </div>

                    </div>

                    <!-- <div class="mt-6">
                    
                    <button 
                    @click="   
                       search_reset()"
                    
                    id="search_button" class="
                    px-8
                mr-2
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
                        ">

                        <span class="text-sm font-bold block ml-1"> جديد</span>
                    </button>
                    
                  </div>
                 -->
                  </div>
                </div>
              </div>

              <!-- <button
                v-if="roles.includes('mmm') && my_department_id != 79"
                class="px-8 mr-2 w-2/12 bg-green-700 text-green-50 rounded-md border border-green-300 hover:bg-green-800 focus:outline-none flex items-center justify-center"
                @click="GetMailsToPrint()"
              >
                <span class="text-sm font-bold block ml-1"> طباعة </span>

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
              </button> -->

              <!-- <button
                v-if="my_department_id == 79 && departmentIdSelected"
                class="px-8 mr-2 w-2/12 bg-green-700 text-green-50 rounded-md border border-green-300 hover:bg-green-800 focus:outline-none flex items-center justify-center"
                @click="GetMailsToPrint2()"
              >
                <span class="text-sm font-bold block ml-1"> طباعة الحافظة</span>

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
              </button> -->

              <!-- <button
                v-if="roles.includes('mmm') && !report_button"
                class="px-8 mr-2 w-2/12 bg-green-700 text-green-50 rounded-md border border-green-300 hover:bg-green-800 focus:outline-none flex items-center justify-center"
                @click="print_report()"
              >
                <span class="text-sm font-bold block ml-1"> تقرير إحصائي </span>

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
              </button> -->
            </div>

            <div class="w-full mt-2 rounded-md divide-y-2 divide-gray-200">
              <div class="flex flex-col lg:flex-row justify-between">
                <div class="w-full lg:w-5/12 ml-2 relative">
                  البريد
                  <div
                    class="flex items-center bg-gray-100 w-full text-sm pl-2 mt-2"
                  >
                    <div class="w-9/12 flex items-center">
                      <div class="w-3/6 pr-4 py-1">رقم الرسالة</div>
                      

                      <div class="w-3/6">تاريخ البريد</div>
                    </div>

                    <div class="w-3/12 text-center">الإجراءات</div>
                  </div>

                  <div
                  
                    class="min-h-64   text-sm bg-gray-100"
                  >
                    <div
                      v-for="mail in inboxMails"
                      :key="mail.mail_id"
                      :class="mail.flag | mail_state_inbox"
                      class="group border-r-8 flex items-center bg-white hover:bg-gray-100 pl-2"
                    >
                      <button
                        @click="
                          show_senders(
                            mail.mail_id,
                            mail.type_of_mail,
                            mail.mail_Number
                          ),
                         signiture_State_reply= mail.signiture_State
                        "
                        class="w-9/12 flex items-center"
                      >
                        <div class="w-3/6 pr-4 py-1 text-right">
                          {{ mail.mail_Number }}
                        </div>
                       
                        <div class="w-3/6 text-right">
                          {{ date_format(mail.date) }}
                        </div>
                      </button>

                      <div
                        class="w-3/12 flex justify-between items-center px-4"
                      >
                        <div class="w-1/3 flex justify-center items-center">
                          <router-link
                            title="عرض التفصيل"
                            :to="{
                              name: 'sent-show',
                              params: {
                                mail: mail.mail_id,
                                type: mail.type_of_mail,
                                sends_id: mail.sends_id,
                              },
                            }"
                            class=""
                          >
                            <svg
                              class="w-5 h-5 fill-current hover:text-green-500"
                              version="1.1"
                              id="Capa_1"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18.453 18.453"
                              xml:space="preserve"
                            >
                              <rect
                                x="2.711"
                                y="4.058"
                                width="8.23"
                                height="1.334"
                              />
                              <path
                                d="M14.972,14.088c0.638-1.127,0.453-2.563-0.475-3.49c-0.549-0.549-1.279-0.852-2.058-0.852
                                                                    c-0.779,0-1.51,0.303-2.059,0.852s-0.852,1.279-0.852,2.059c0,0.777,0.303,1.508,0.852,2.059c0.549,0.547,1.279,0.85,2.057,0.85
                                                                    c0.507,0,0.998-0.129,1.434-0.375l3.262,3.262l1.101-1.102L14.972,14.088z M13.664,13.881c-0.652,0.652-1.796,0.652-2.448,0
                                                                    c-0.675-0.676-0.675-1.773,0-2.449c0.326-0.326,0.762-0.506,1.225-0.506s0.897,0.18,1.224,0.506s0.507,0.762,0.507,1.225
                                                                    S13.991,13.554,13.664,13.881z"
                              />
                              <path
                                d="M13.332,16.3H1.857c-0.182,0-0.329-0.148-0.329-0.328V1.638c0-0.182,0.147-0.329,0.329-0.329
                                                                    h11.475c0.182,0,0.328,0.147,0.328,0.329V8.95c0.475,0.104,0.918,0.307,1.31,0.597V1.638C14.97,0.735,14.236,0,13.332,0H1.857
                                                                    C0.954,0,0.219,0.735,0.219,1.638v14.334c0,0.902,0.735,1.637,1.638,1.637h11.475c0.685,0,1.009-0.162,1.253-0.76l-0.594-0.594
                                                                    C13.772,16.347,13.426,16.3,13.332,16.3z"
                              />
                              <rect
                                x="2.711"
                                y="7.818"
                                width="8.23"
                                height="1.334"
                              />
                            </svg>
                          </router-link>
                        </div>

                        <div
                          v-if="roles.includes('ggg')"
                          class="w-1/3 flex justify-center items-center"
                        >
                          <button
                            @click="
                              GetAllDocumentsAndReplies(
                                mail.mail_id,
                                my_user_id,
                                mail.mangment_sender_id,
                                my_department_id,
                                mail.sends_id
                              )
                            "
                            title="عرض المستندات"
                            class="focus:outline-none"
                          >
                            <svg
                              class="w-5 h-5 fill-current hover:text-blue-500"
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
                      </div>

                      <div
                        class="group-hover:block items-end hidden absolute z-50 w-full -top-24 -left-0 -right-0 h-40 bg-white p-2 border-4 border-gray-300 shadow-2xl rounded-md overflow-y-auto"
                      >
                        <p class="font-bold">ملخص الرسالة</p>

                        <p class="mt-2">
                          {{ mail.summary }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex justify-end mt-8 mx-auto px-4 sm:px-6 lg:px-8 w-full bg-white relative"
                  >
                     <pagination
                      dir="rtl"
                      v-model="page_num"
                      :per-page="page_size"
                      :records="total_of_transaction"
                      @paginate="GetSentMail"
                      class="z-10"
                    /> 
                    <div class="">
                      <div
                        class="absolute z-0 top-0 py-2 left-0 w-full text-left p-1 flex bg-white items-center justify-end"
                      >
                        <span class="text-xs ml-1"> عدد الرسائل </span>
                        {{ total_of_transaction }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full lg:w-7/12 mr-2 mt-12 lg:mt-0">
                  الجهات المرسل إليها
                  <span v-if="show_senders_mail">
                    - رقم البريد
                    <span class="font-bold">{{ show_senders_mail }}</span>
                  </span>
                  <div
                    class="flex items-center bg-gray-100 w-full text-sm pl-2 mt-2 pr-3"
                  >
                  

                    <div class="w-3/12">وقت الإرسال</div>
                    <div class="w-3/12">تاريخ الرد</div>
                  
                    <div class="w-2/12">الحالة</div>
                    <div class="w-3/12">وقت القراءة</div>
                    <div class="w-1/12">تأكيد قراءة الرد</div>
                  </div>

                  <div
                    class="min-h-64 h-full overflow-y-auto max-h-64 text-sm bg-white"
                  >
                    <div
                      v-for="sender in senders"
                      :key="sender.department_id"
                      :class="sender.flag | mail_state_inbox"
                      class="group relative border-r-8 pt-1 bg-white hover:bg-gray-100 pl-2"
                    >
                      <button
                        @click="
                          to_pass_data_to_get_mail_by_id(
                            sender.department_id,
                            sender.send_ToId,
                            sender.department_name,
                            sender.flag,
                            sender.sends_from,
                            sender.shared
                          ),
                            back_resend()
                        "
                        :class="
                          ((sender.sends_from == my_department_id &&
                            sender.reply_readed) ||
                            (sender.sends_from == 0 && sender.reply_readed) ||
                            (sender.sends_from != my_department_id &&
                              sender.sends_from != 0 &&
                              sender.reply_readed_inbox)) &&
                          (sender.flag == 4 || sender.flag == 5)
                            ? 'bg-red-100'
                            : ''
                        "
                        class="flex items-center w-full text-right"
                      >
                       
                        <div class="w-3/12 mr-2">
                          {{ sender.time_of_send }}
                        </div>

                        <div class="w-3/12">
                          {{ sender.date_read }}
                        </div>

                     
                        <div class="w-2/12">
                          {{ sender.state }}
                        </div>

                        <div class="w-3/12">
                          {{ sender.time_of_read }}
                        </div>

                        <div
                          v-if="
                            ((sender.sends_from == my_department_id &&
                              sender.reply_readed) ||
                              (sender.sends_from == 0 && sender.reply_readed) ||
                              (sender.sends_from != my_department_id &&
                                sender.sends_from != 0 &&
                                sender.reply_readed_inbox)) &&
                            (sender.flag == 4 || sender.flag == 5)
                          "
                          class="w-1/12 flex justify-center items-center"
                        >
                          <!-- v-if="roles.includes('g')" -->
                          <button
                            @click="
                              ReplyReaded(
                                sender.department_id,
                                sender.sends_from,
                                sender.send_ToId
                              )
                            "
                            title="تأكيد قراءة الرد"
                            class="focus:outline-none"
                          >
                            <svg
                              class="w-4 h-4 fill-current text-gray-400 hover:text-green-500"
                              id="Capa_1"
                              enable-background="new 0 0 512 512"
                              height="512"
                              viewBox="0 0 512 512"
                              width="512"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g>
                                <path
                                  d="m153 157.328c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h206c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z"
                                />
                                <path
                                  d="m359 235.578c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-60.809c-12.709-7.789-27.642-12.288-43.608-12.288-16.628 0-32.126 4.894-45.166 13.288h-56.417c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h38.926c-11.593 13.094-19.148 29.827-20.718 48.25h-18.208c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h18.259c1.746 18.709 9.668 35.647 21.711 48.75h-39.97c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h58.244c12.649 7.687 27.486 12.117 43.339 12.117 15.738 0 30.688-4.321 43.518-12.117h60.899c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-42.671c5.17-5.667 9.62-12.112 13.175-19.229 1.851-3.706.348-8.21-3.358-10.062-3.705-1.85-8.21-.347-10.061 3.358-11.723 23.47-35.29 38.049-61.503 38.049-37.882 0-68.702-30.819-68.702-68.702s30.82-68.703 68.702-68.703c37.883 0 68.703 30.82 68.703 68.703v.21c0 .024.003.047.003.071 0 .018-.003.036-.003.054 0 4.143 3.358 7.5 7.5 7.5h28.215c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-21.042c-1.61-18.891-9.503-36.015-21.599-49.25h42.641z"
                                />
                                <path
                                  d="m359 412.328h-206c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h206c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z"
                                />
                                <path
                                  d="m418.594 43.254h-57.432c-1.703-7.296-8.247-12.754-16.055-12.754h-36.607v-1.652c0-15.907-12.941-28.848-28.847-28.848h-47.306c-15.906 0-28.847 12.941-28.847 28.848v1.652h-36.607c-7.808 0-14.351 5.458-16.055 12.754h-57.432c-15.164 0-27.5 12.337-27.5 27.5v413.746c0 15.163 12.336 27.5 27.5 27.5h91.423c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-91.423c-6.893 0-12.5-5.607-12.5-12.5v-413.746c0-6.893 5.607-12.5 12.5-12.5h56.986v15h-41.986c-6.893 0-12.5 5.607-12.5 12.5v383.746c0 6.893 5.607 12.5 12.5 12.5h295.188c6.893 0 12.5-5.607 12.5-12.5v-383.746c0-6.893-5.607-12.5-12.5-12.5h-41.986v-15h56.986c6.893 0 12.5 5.607 12.5 12.5v413.746c0 6.893-5.607 12.5-12.5 12.5h-198.765c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h198.765c15.164 0 27.5-12.337 27.5-27.5v-413.746c0-15.163-12.337-27.5-27.5-27.5zm-253.201 3.746c0-.827.673-1.5 1.5-1.5h44.107c4.142 0 7.5-3.357 7.5-7.5v-9.152c0-7.636 6.212-13.848 13.847-13.848h47.306c7.635 0 13.847 6.212 13.847 13.848v9.152c0 4.143 3.358 7.5 7.5 7.5h44.107c.827 0 1.5.673 1.5 1.5 0 47.697.075 57.448-.045 59.588-.054.963-.705 1.417-1.455 1.417h-178.214c-.827 0-1.5-.673-1.5-1.5 0-24.736 0-29.663 0-59.505zm235.701 420h-290.188v-378.746h39.486v18.251c0 9.101 7.405 16.5 16.5 16.5h178.215c9.046 0 16.5-7.377 16.5-16.5v-18.251h39.486v378.746z"
                                />
                                <path
                                  d="m283.604 261.149-46.186 44.447-10.337-20.891c-1.837-3.713-6.338-5.234-10.048-3.396-3.712 1.837-5.233 6.335-3.396 10.048l14.879 30.07c2.242 4.529 8.258 5.603 11.923 2.078l53.566-51.549c2.984-2.872 3.076-7.62.204-10.604s-7.62-3.074-10.605-.203z"
                                />
                              </g>
                            </svg>
                          </button>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div v-if="realated_departments.length > 0" class="mt-2 flex">
                    <div class="sm:col-span-4 w-10/12">
                      <label
                        tabindex="5"
                        for="department"
                        class="block text-sm font-semibold text-gray-800"
                      >
                        الإدارات المشتركة
                      </label>

                      <div class="relative">
                        <button
                          @click="
                            realated_departmentselect =
                              !realated_departmentselect
                          "
                          id="realated_department"
                          class="overflow-hidden text-right block mt-2 w-full rounded-md h-10 border text-xs bg-white border-green-400 hover:shadow-sm focus:outline-none focus:border-green-400 p-2"
                        >
                          {{ realated_departmentNameSelected }}
                        </button>

                        <div
                          v-if="realated_departmentselect"
                          class="border text-sm bg-white border-green-400 p-2 absolute w-full z-20 shadow h-40 overflow-y-scroll rounded-b-md"
                        >
                          <button
                            class="block focus:outline-none w-full my-1 text-right"
                            @click="
                              select_realated_department(
                                realated_department.id,
                                realated_department.departmentName,
                                index
                              );
                              realated_departmentselect =
                                !realated_departmentselect;
                            "
                            v-for="(
                              realated_department, index
                            ) in realated_departments"
                            :key="realated_department.id"
                          >
                            {{ realated_department.departmentName }}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      class="sm:col-span-1 flex justify-center w-2/12"
                      v-if="realated_departmentNameSelected"
                    >
                      <button
                        @click="ResharedMailWithAnotherDep()"
                        class="mt-8 rounded-md text-green-400 duration-200 hover:text-green-500 text-base font-semibold w-8 h-8"
                      >
                        <svg
                          class="fill-current w-full h-full"
                          version="1.1"
                          id="Capa_1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 512 512"
                          style="enable-background: new 0 0 512 512"
                          xml:space="preserve"
                        >
                          <g>
                            <g>
                              <path
                                d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341
                                                            c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z
                                                            "
                              />
                            </g>
                          </g>
                          <g>
                            <g>
                              <path
                                d="M355.148,234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83,8.884-19.83,19.83v79.318h-79.318
                                                            c-10.966,0-19.83,8.884-19.83,19.83s8.864,19.83,19.83,19.83h79.318v79.318c0,10.946,8.864,19.83,19.83,19.83
                                                            s19.83-8.884,19.83-19.83v-79.318h79.318c10.966,0,19.83-8.884,19.83-19.83S366.114,234.386,355.148,234.386z"
                              />
                            </g>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- v-if="replies.length > 0" -->
              <section
                v-if="departmentflag > 2 && roles.includes('fff')"
                class="bg-gray-100 rounded-md p-6 mt-16"
              >


              <div class="flex">


                <p class="block text-sm font-semibold text-gray-800 ml-6">
                  ردود 
                </p>



          <button v-if="signiture_State_reply==0 && roles.includes('sendforsignature') "
                  class="px-8 h-12 mt-4 md:mt-0 mr-2 w-auto bg-green-700 text-green-50 rounded-md border border-green-300 hover:bg-green-800 focus:outline-none flex items-center justify-center"
                  @click="Signiture_State(1)"
                >
                  <span class="text-sm font-bold block ml-1">
                    العرض على المدير للتوقيع</span
                  >
                </button>

                       <button v-if="signiture_State_reply==2 && roles.includes('sendforsignature') "
                  class="px-8 h-12 mt-4 md:mt-0 mr-2 w-auto bg-green-700 text-green-50 rounded-md border border-green-300 hover:bg-green-800 focus:outline-none flex items-center justify-center"
                  @click="Signiture_State(0)"
                >
                  <span class="text-sm font-bold block ml-1">
                     تم ارسال المستندات المهمشة  </span
                  >
                </button>


                       <button v-if="signiture_State_reply==1 && roles.includes('sendforsignature') "
                  class="px-8 h-12 mt-4 md:mt-0 mr-2 w-auto bg-green-700 text-green-50 rounded-md border border-green-300 hover:bg-green-800 focus:outline-none flex items-center justify-center"
                  @click="Signiture_State(0)"
                >
                  <span class="text-sm font-bold block ml-1">
                    الغاء العرض على المدير </span
                  >
                </button>

</div>
                <div
                  id="scroll"
                  class="h-72 overflow-y-scroll mt-4 rounded-lg py-2 border border-green-400"
                >
                  <div
                    v-for="(reply, index) in replies"
                    :key="index"
                    :class="
                      reply.reply.to == my_department_id
                        ? ' flex-row-reverse justify-start'
                        : 'justify-start'
                    "
                    class="w-full my-0.5 flex px-2"
                  >
                    <div class="">
                      <div
                        class="flex"
                        :class="
                          reply.reply.to == my_department_id
                            ? '  justify-end'
                            : 'justify-end flex-row-reverse'
                        "
                      >
                        <button
                          v-if="
                            reply.reply.to != my_department_id &&
                            reply.reply.userId == my_user_id &&
                            !isdone &&
                            !isdonetext &&
                            !isdone2 &&
                            !reply.canNotDeleted &&
                            reply.reply.state
                          "
                          @click="
                            (alert_delete_document = true),
                              (reply_id_to_delete = reply.reply.replyId)
                          "
                          type="button"
                          class="hover:bg-red-500 duration-500 p-1 rounded-full focus:outline-none ml-2"
                        >
                          <svg
                            class="w-4 h-4 stroke-current text-red mx-auto"
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

                        <button
                          v-if="
                            reply.reply.to == my_department_id &&
                            reply.resources &&
                            senders.length > 1
                          "
                          @click="
                            (reply_id_to_delete = reply.reply.replyId),
                              get_department_for_reply(),
                              GetResources_ById_resend2(reply.reply.replyId);
                            show_resend = true;
                          "
                          type="button"
                          class="hover:bg-blue-500 duration-500 p-1 rounded-full focus:outline-none ml-2"
                          title="إعادة توجيه مستندات الرد"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4 stroke-current text-red mx-auto"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                            />
                          </svg>
                        </button>

                        <div
                          v-if="alert_delete_document"
                          class="w-screen h-full flex justify-center items-center absolute inset-0 z-50 overflow-hidden bg-black bg-opacity-70"
                        >
                          <div
                            class="bg-yellow-100 rounded-md w-1/3 py-10 flex flex-col justify-center items-center"
                          >
                            <div class="">
                              <svg
                                class="w-20 h-20 stroke-current text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                ></path>
                              </svg>
                            </div>
                            <p class="text-xl font-bold mt-4">
                              هل انت متأكد من عملية الحذف؟
                            </p>
                            <p class="text-gray-600">
                              لن تتمكن من استرداد الرد بعد حذفه.
                            </p>

                            <div class="mt-6">
                              <button
                                @click="deletereply()"
                                class="bg-red-600 hover:bg-red-700 hover:shadow-lg duration-200 rounded text-white w-32 py-1 ml-2"
                              >
                                نعم متأكد
                              </button>
                              <button
                                @click="alert_delete_document = false"
                                class="bg-gray-400 hover:bg-gray-700 hover:shadow-lg duration-200 rounded text-white w-32 py-1 mr-2"
                              >
                                إلغاء
                              </button>
                            </div>
                          </div>
                        </div>

                        <div v-if="reply.resources == true" class="mx-2">
                          <button
                            v-if="roles.includes('ggg')"
                            @click="GetResources_ById2(reply.reply.replyId)"
                            class="px-2 text-xs rounded leading-9 text-white bg-red-400 flex items-center w-28"
                          >
                            عرض الصور
                            <svg
                              class="stroke-current mr-2 w-6 h-6"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                                stroke-width="1"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
                                stroke-width="1"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M21 15L16 10L5 21"
                                stroke-width="1"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </div>

                        <div
                          v-if="reply.reply.state"
                          :class="
                            reply.reply.to == my_department_id
                              ? 'bg-gray-700'
                              : 'bg-blue-700'
                          "
                          class="text-white w-8/12 whitespace-normal break-words py-0 leading-9 px-2 rounded"
                        >
                          {{ reply.reply.mail_detail }}
                        </div>

                        <div
                          v-else
                          :class="
                            reply.reply.to == my_department_id
                              ? 'bg-gray-700'
                              : 'bg-blue-700'
                          "
                          class="text-white max-w-10/12 py-0 leading-9 px-2 rounded"
                        >
                          تم حذف الرد
                        </div>
                      </div>

                      <div
                        class="mt-1 text-sm"
                        :class="
                          reply.reply.to == my_department_id
                            ? 'text-left'
                            : 'text-right'
                        "
                      >
                        {{ reply.reply.date }}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-if="roles.includes('sr')"
                  class="sm:justify-between sm:items-center mt-4 sm:flex"
                >
                  <div
                    class="w-7/12 sm:flex sm:justify-between"
                    v-if="!isdone && !isdonetext && !isdone2"
                  >
                    <div class="w-5/12 mt-2">
                      <textarea
                        id=""
                        class="block w-full h-20 text-sm rounded-md border border-green-400 hover:shadow-sm focus:outline-none focus:border-gray-300 p-2"
                        v-model="reply_to_add"
                        spellcheck="true"
                        lang="ar"
                      >
                      </textarea>
                    </div>

                    <div v-if="reply_to_add != ''" class="sm:w-6/12 sm:mr-2 sm:flex mt-2">

                      <div class="mr-4 mt-6" >
                      <!-- زر اختيار الملفات -->
                      <label
                        for="fileInput"
                        class="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-300"
                      >
                        اختر الملفات (صور أو PDF)
                      </label>

                      <!-- input مخفي -->
                      <input
                        type="file"
                        id="fileInput"
                        accept=".jpg,.jpeg,.png,.pdf"
                        multiple
                        ref="try_fileinput"
                        @change="try_handleFilesChange"
                        class="hidden"
                      />

                      <!-- زر الرفع -->
                      <button
                        v-if="try_selectedFiles.length && !isUploading"
                        @click="try_upload"
                        class="bg-blue-700 hover:bg-blue-600 w-64 text-white font-bold py-2 mt-2"
                      >
                        رفع الملفات
                      </button>

                      <!-- أثناء الرفع -->
                      <div
                        v-if="isUploading"
                        class="mt-2 text-sm text-blue-600"
                      >
                        جاري رفع الملفات ... الرجاء الانتظار
                      </div>

                      <!-- عرض عدد الملفات -->
                      <div
                        v-if="try_selectedFiles.length"
                        class="mt-2 text-sm text-gray-800"
                      >
                        <p>
                          تم اختيار عدد {{ try_selectedFiles.length }} من
                          الملفات
                        </p>
                      </div>

                      <!-- Progress -->
                      <div
                        v-if="try_progress > 0"
                        class="w-full bg-gray-200 rounded mt-2"
                      >
                        <div
                          class="bg-green-500 text-xs leading-none py-1 text-center text-white rounded"
                          :style="{ width: try_progress + '%' }"
                        >
                          {{ try_progress }}%
                        </div>
                      </div>

                      <!-- رسالة -->
                      <p v-if="try_message">{{ try_message }}</p>
                    </div>


                      <!--  <input class="hidden" type="button" @click="scanToJpg" />-->
                  
                              <div class="ml-2 h-full">
                      <button
                        v-if="roles.includes('sendforsignature') "
                        @click="GetAllDocuments_signture()"
                        class="p-2 h-20 mt-4 md:mt-0 sm:mr-2 bg-green-700 text-green-50 rounded-md border border-green-300 hover:bg-green-800 focus:outline-none flex items-center justify-center"
                      >
                        اختيار صورة مهمشة
                      </button>
                    </div>
                  


                    </div>

                    <div class="w-3/12">
                      <button
                        v-if="reply_to_add != ''"
                        @click="AddReply()"
                        class="w-10/12 flex items-center justify-center h-20 py-2 bg-white rounded-lg text-blue-600 tracking-wide border border-blue-600 cursor-pointer hover:text-white hover:bg-blue-600 focus:outline-none duration-300"
                      >
                        <span class="leading-normal">إرسال</span>
                        <svg
                          class="w-6 h-6 mr-2"
                          viewBox="0 0 441 441"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0)">
                            <path
                              d="M26.2637 181.168L382.073 33.5286C397.063 27.3081 413.997 30.0445 426.267 40.6664C438.538 51.29 443.669 67.6578 439.659 83.384L404.694 220.501L439.659 357.617C443.669 373.343 438.538 389.711 426.268 400.335C413.974 410.979 397.036 413.681 382.073 407.472L26.2637 259.833C10.0639 253.111 0.000120282 238.04 0.000120282 220.501C0.000120282 202.961 10.0639 187.89 26.2637 181.168ZM36.1681 235.966L391.977 383.605C397.96 386.087 404.456 385.039 409.354 380.798C414.252 376.558 416.22 370.279 414.619 364.001L381.321 233.42H252.927C245.791 233.42 240.007 227.636 240.007 220.5C240.007 213.364 245.791 207.579 252.927 207.579H381.32L414.619 76.9998C416.22 70.7224 414.252 64.4434 409.354 60.203C404.457 55.9627 397.963 54.9136 391.978 57.396L36.1681 205.035C26.5859 209.011 25.8408 217.878 25.8408 220.501C25.8408 223.123 26.5859 231.99 36.1681 235.966Z"
                              fill="currentColor"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="441"
                                height="441"
                                fill="white"
                                transform="matrix(-1 0 0 1 441 0)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div
                    v-if="!isdonetext && isdone && !shared"
                    class="sm:col-span-2 w-2/12 mr-4"
                  >
                    <label
                      for="done"
                      class="block text-base font-semibold text-gray-800"
                    >
                      تم الإنجاز
                    </label>
                    <input
                      v-model="isdone"
                      @click="isdone_changed()"
                      type="checkbox"
                      id="done"
                      class="block mt-2 h-10 w-10 overflow-hidden rounded-md border border-gray-300 hover:shadow-sm focus:outline-none focus:border-gray-300 px-2"
                    />
                  </div>

                  <div class="w-10/12 flex-col" v-if="!isdone && isdone2">
                    <textarea
                      spellcheck="true"
                      lang="ar"
                      name="cancel_reason"
                      id="cancel_reason"
                      v-model="cancel_reason2"
                      @input="protectBaseText"
                      class="rounded-md border border-green-300 w-full"
                    >
                    </textarea>

                    <div class="flex justify-center">
                      <div class="flex justify-center ml-4">
                        <button
                          @click="isdone22()"
                          class="bg-green-700 hover:bg-green-900 hover:shadow-lg duration-200 rounded text-white w-32 py-1"
                        >
                          تأكيد
                        </button>
                      </div>

                      <div class="flex justify-center mr-4">
                        <button
                          @click="
                            (isdone = true),
                              (isdone2 = true),
                              (isdonetext = false)
                          "
                          class="bg-green-700 hover:bg-green-900 hover:shadow-lg duration-200 rounded text-white w-32 py-1"
                        >
                          إلغاء
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="
                                 mailType != 1&&
        my_department_id_to_get_mail_by_id==79&&
                      !isdone &&
                      !isdonetext &&
                      !isdone2 &&
                      isperent == 'true'
                    "
                    class="sm:col-span-2 w-3/12 mr-4"
                  >
                    <label
                      for="mail_sub_number"
                      class="block text-base font-semibold text-gray-800"
                    >
                      إصدار رقم إشاري لمخاطبة خارجية
                    </label>
                    <input
                      v-model="mail_sub_number"
                      @click="GetMailSubId()"
                      type="checkbox"
                      id="mail_sub_number"
                      class="block mt-2 h-8 w-8 overflow-hidden rounded-md border border-gray-300 hover:shadow-sm focus:outline-none focus:border-gray-300 px-2"
                    />

                    <div
                      class="text-center text-base font-semibold text-gray-800"
                    >
                      <span
                        v-if="show_number"
                        class="mr-4 underline font-bold text-2xl"
                      >
                        {{ sub_number }} - {{ show_senders_mail }}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>

          <section
            v-if="show_resend && departmentflag > 2 && roles.includes('fff')"
            ref="mySection"
          >
            <div
              class="absolute z-10 pointer-events-none flex justify-center items-center"
              style="
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-30deg);
              "
            >
              <span
                class="text-6xl font-bold text-gray-400 opacity-20 select-none"
              >
                {{ user_name33 }}
              </span>
            </div>

            <div class="flex flex-col items-center mb-8 bg-gray-50 p-6">
              <h1 class="mt-4 justify-self-start text-xl">
                إعادة توجيه المستندات
              </h1>
              <!-- مربع الصور -->
              <div
                class="w-full max-w-3xl bg-white p-4 rounded-xl shadow-md text-center mt-4"
              >
                <!-- اختيار الصور -->
                <div class="flex items-center justify-between mb-2">
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="selectAll"
                      @change="toggleSelectAll"
                    />
                    <span>تحديد الكل</span>
                  </label>
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="selectedImages_resend"
                      :value="currentImage"
                    />
                    <span>تحديد الصورة</span>
                  </label>
                </div>

                <!-- عرض الصورة -->
                <div
                  v-if="currentImage != null"
                  class="flex justify-center items-center"
                >
                  <template v-if="isPdfFile(currentImage.path)">
                    <iframe
                      :src="currentImage.path"
                      class="w-full h-screen border-0"
                    ></iframe>
                  </template>

                  <!-- صورة واحدة أو عدة صور -->
                  <template v-else>
                    <img
                      :src="currentImage.path"
                      :alt="'Image ' + currentImage.id"
                      :style="{
                        objectFit: 'contain',
                        borderRadius: '8px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                       
                        transition: 'transform 0.2s ease',
                      }"
                    />
                  </template>

                  <!-- <img
                    :src="currentImage.path"
                    :alt="'Image ' + currentImage.id"
                    :style="{
                     
                      objectFit: 'contain',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      transform: `scale(${zoom})`,
                      transition: 'transform 0.2s ease',
                    }"
                  /> -->
                </div>

                <!-- التحكم في التكبير/التصغير -->
                <div class="flex justify-center gap-3 mt-2">
                  <button
                    @click="zoomIn"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 z-10"
                  >
                    +
                  </button>
                  <button
                    @click="zoomOut"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 z-10"
                  >
                    -
                  </button>
                  <button
                    @click="resetZoom"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 z-10"
                  >
                    إعادة
                  </button>
                </div>

                <!-- العداد + السابق/التالي -->
                <div
                  class="flex justify-center items-center gap-3 mt-2 text-sm"
                >
                  <button
                    @click="prevImage_resend"
                    class="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    السابق
                  </button>

                  <span
                    >{{ currentIndex + 1 }} /
                    {{ reply_total_of_doc_resend }}</span
                  >

                  <button
                    @click="nextImage_resend"
                    class="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    التالي
                  </button>
                </div>
              </div>

              <!-- الحقول -->
              <div
                class="w-full max-w-xl bg-white mt-6 p-6 rounded-xl shadow-md"
              >
                <!-- اختيار المستلم -->
                <div class="mb-4">
                  <label class="block text-gray-700 mb-2">اختر المستلم</label>
                  <select
                    v-model="selectedRecipient"
                    class="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option
                      v-for="recipient in recipients"
                      :key="recipient.id"
                      :value="recipient"
                    >
                      {{ recipient.departmentName }}
                    </option>
                  </select>
                </div>

                <!-- النص -->
                <div class="mb-4">
                  <label class="block text-gray-700 mb-2">النص</label>
                  <textarea
                    v-model="message"
                    spellcheck="true"
                    lang="ar"
                    rows="4"
                    class="w-full border border-gray-300 rounded-lg p-2"
                  ></textarea>
                </div>

                <!-- زر الارسال -->
                <div class="text-center flex justify-center">
                  <button
                    @click="send"
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-2"
                  >
                    ارسال
                  </button>

                  <button
                    class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-2"
                    @click="back_resend()"
                  >
                    <span class="text-sm font-bold block ml-1"
                      >إغلاق النافذة</span
                    >
                  </button>
                </div>
              </div>
            </div>
          </section>
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

      <div
        v-if="there_are_no_documents"
        class="bg-white w-96 h-32 flex justify-center items-center"
      >
        لا توجد مستندات لهذا البريد.
      </div>
    </div>

    <!-- <div
      v-if="show_images_model"
      class="w-screen h-full absolute inset-0 z-50 overflow-hidden"
    >
      <div class="relative">
        <div
          v-if="to_test_print"
          id="printMe"
          class="bg-black bg-opacity-50 h-screen-100"
        >
          <div
            v-for="image in show_images"
            :key="image.id"
            class="h-screen-100 mb-2"
          >
            <img
              id="img_toprint"
              :src="image.path"
              alt=""
              class="h-full w-full object-contain"
            />
          </div>
        </div>

        <div
          v-if="to_test_print"
          id="print_one_dec"
          class="bg-black bg-opacity-50 h-screen-100"
        >
          <div class="h-screen-100">
            <img :src="testimage" alt="" class="h-full w-full object-contain" />
          </div>
        </div>

        <div
          class="h-screen flex flex-col justify-center items-center bg-black bg-opacity-90 absolute top-0 inset-0 z-50 w-full"
        >
          <button
            type="button"
            @click="image_rotate = !image_rotate"
            class="absolute text-white font-bold px-8 z-50 bg-yellow-500 py-2 right-12"
          >
            تدوير الصفحة
          </button>

          <div class="max-w-3xl mx-auto relative">
            <div
              class="absolute top-6 z-50 flex justify-between items-center w-full"
            >
              <button @click="show_images_model = false">
                <svg
                  class="w-8 h-8 stroke-current text-red-500 hover:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>

              <button
                v-if="roles.includes('kkk')"
                @click="print_image()"
                v-print="'#print_one_dec'"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة المستند الحالي
              </button>

              <button
                v-if="roles.includes('kkk')"
                @click="print_image()"
                v-print="'#printMe'"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة كافة المستندات
              </button>

            
            </div>

            <div class="h-screen-93 mt-4 relative">
              <img
                :src="testimage"
                :class="image_rotate ? 'rotate-0' : 'rotate-180'"
                class="h-full w-full object-contain transform z-0"
              />

              <div
                class="absolute z-10 pointer-events-none flex justify-center items-center"
                style="
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%) rotate(-30deg);
                "
              >
                <span
                  class="text-6xl font-bold text-gray-400 opacity-20 select-none"
                >
                  {{ user_name33 }}
                </span>
              </div>
            </div>

            <div
              class="absolute bottom-3 z-50 bg-gray-100 flex justify-between items-center w-full mx-auto mt-4"
            >


              <div v-if="testimage" class="w-12 h-8">
                <button
                  title="prev"
                  @click="previousImage()"
                  class="focus:outline-none w-12 h-8 bg-gray-300 rounded flex justify-center items-center"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>

              <div class="text-black">
                {{ indextotest + 1 }} / {{ show_images.length }}
              </div>

              <div class="w-12 h-8">
                <button
                  title="next"
                  @click="nextImage()"
                  class="focus:outline-none w-12 h-8 bg-gray-300 rounded flex justify-center items-center"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
              </div>

   
            </div>
          </div>
        </div>
      </div>

     
    </div> -->

    <div
      v-if="show_images_model"
      class="w-screen h-full fixed inset-0 z-50 overflow-hidden"
    >
      <div class="relative">
        <div
          v-if="to_test_print"
          id="printMe"
          class="bg-black bg-opacity-50 h-screen-100"
        >
          <div
            v-for="image in show_images"
            :key="image.id"
            class="h-screen-100"
          >
            <template v-if="isPdfFile(image.url)">
              <iframe
                :src="image.url"
                class="w-full h-screen border-0"
              ></iframe>
            </template>

            <!-- صورة واحدة أو عدة صور -->
            <template v-else>
              <img
                :src="image.url"
                :alt="'Image ' + image.id"
                :style="{
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                 
                  transition: 'transform 0.2s ease',
                }"
              />
            </template>
          </div>
        </div>

        <div
          v-if="to_test_print"
          id="print_one_dec"
          class="bg-black bg-opacity-50 h-screen-100"
        >
          <div class="h-screen-100">
            <!-- <img :src="testimage" alt="" class="h-full w-full object-contain" /> -->

            <template v-if="isPdfFile(testimage)">
              <iframe
                :src="testimage"
                class="w-full h-screen border-0"
              ></iframe>
            </template>

            <!-- صورة واحدة أو عدة صور -->
            <template v-else>
              <img
                :src="testimage"
                :alt="'Image '"
                :style="{
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                 
                  transition: 'transform 0.2s ease',
                }"
              />
            </template>
          </div>
        </div>

        <div
          class="h-screen flex flex-col justify-center items-center bg-black bg-opacity-90 absolute top-0 inset-0 z-50 w-full"
        >
          <button
            v-if="!isPdfFile(testimage)"
            type="button"
            @click="image_rotate = !image_rotate"
            class="absolute text-white font-bold px-8 z-50 bg-yellow-500 py-2 right-12"
          >
            تدوير الصفحة
          </button>

          <button
            v-if="roles.includes('signature') && !isPdfFile(testimage)"
            type="button"
            @click="signeture(testimage, current_page_number, 1)"
            class="absolute text-white font-bold px-8 z-50 bg-yellow-500 py-2 left-12"
          >
            التوقيع
          </button>

          <button
            v-if="roles.includes('signature') && isPdfFile(testimage)"
            type="button"
            @click="
              openSwalPrompt(testimage,2)
            "
            class="absolute text-white font-bold px-8 z-50 bg-yellow-500 py-2 left-12"
          >
            التوقيع
          </button>

          <div class="w-full mx-auto relative mb-4">
            <div
              class="absolute top-6 z-50 flex justify-center items-center w-full"
            >
              <button @click="show_images_model = false">
                <svg
                  class="w-8 h-8 ml-16 stroke-current text-red-500 hover:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>

              <!-- <button
                v-if="roles.includes('kkk') && measure_id_for_photo != 1"
                @click="print_image()"
                v-print="'#print_one_dec'"
                class="bg-blue-500 ml-16 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة المستند الحالي
              </button> -->

              <button
                v-if="isPdfFile(testimage)"
                @click="printPdf(testimage)"
               
                class="bg-blue-500 ml-16 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة المستند الحالي
              </button>

              <button
                v-else
                @click="print_image()"
                v-print="'#print_one_dec'"
                class="bg-blue-500 ml-16 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة المستند الحالي
              </button>

              <button
                v-if="roles.includes('kkk')"
                @click="MergeAndDownload(p_id, p_uid, p_did, p_mydep)"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة كافة المستندات
              </button>
            </div>

            <div class="h-screen-93 mt-4 w-full">
              <div class="h-screen-93 mt-4 relative w-full">
                <template class="w-full" v-if="isPdfFile(testimage)">
                  <iframe
                    :src="testimage"
                    class="w-full h-screen border-0 object-contain"
                  ></iframe>
                </template>

                <!-- صورة واحدة أو عدة صور -->
                <template class="w-full" v-else>
                  <img
                    :class="image_rotate ? 'rotate-0' : 'rotate-180'"
                    class="h-full w-full object-contain transform z-0"
                    :src="testimage"
                    :alt="'Image '"
                  />
                </template>

                <div
                  class="absolute z-10 pointer-events-none flex justify-center items-center"
                  style="
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-30deg);
                  "
                >
                  <span
                    class="text-6xl font-bold text-gray-400 opacity-20 select-none"
                  >
                    {{ user_name33 }}
                  </span>
                </div>
              </div>

              <!-- <img :src="testimage" alt="image" class="h-full w-full object-contain" /> -->
            </div>

            <div
         
              class="fixed bottom-10 left-0 right-0  z-50 bg-gray-100 flex justify-between items-center w-64 justify-self-center mx-auto mt-4"
            >
              <div class="w-12 h-8">
                <button
                  title="prev"
                  @click="previousImage()"
                  class="focus:outline-none w-12 h-8 bg-gray-300 rounded flex justify-center items-center"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>

              <div class="text-black">
                {{ indextotest + 1 }} / {{ show_images.length }}
              </div>

              <div class="w-12 h-8">
                <button
                  title="next"
                  @click="nextImage()"
                  class="focus:outline-none w-12 h-8 bg-gray-300 rounded flex justify-center items-center"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- w-full h-full rounded object-contain -->
    </div>

    <div
      v-if="show_current_reply_image_to_for_bigger_screen_model"
      class="w-screen h-full fixed inset-0 z-50 overflow-hidden"
    >
      <div
        class="relative h-screen w-screen bg-black bg-opacity-90 flex justify-center items-center"
      >
        <!-- عرض الصورة أو PDF -->
        <div
          id="print_reply_doc_n"
          class="w-full h-full flex justify-center items-center"
        >
          <!-- PDF -->
          <template v-if="isPdfFile(currentFile)">
            <iframe :src="currentFile" class="w-full h-full border-0"></iframe>
          </template>

          <!-- صورة واحدة أو عدة صور -->
          <template v-else>
            <img
              :src="currentFile"
              alt="document"
              class="w-full h-full object-contain"
            />
          </template>

          <div
            class="absolute z-10 pointer-events-none flex justify-center items-center"
            style="
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-30deg);
            "
          >
            <span
              class="text-6xl font-bold text-gray-400 opacity-20 select-none"
            >
              {{ user_name33 }}
            </span>
          </div>
        </div>

        <!-- شريط الأدوات العلوي -->
        <div
          class="absolute top-4 left-0 right-0 flex justify-between items-center px-6 z-50"
        >
          <button
            @click="show_current_reply_image_to_for_bigger_screen_model = false"
          >
            <svg
              class="w-8 h-8 stroke-current text-red-500 hover:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
          <!-- طباعة -->
          <button
            v-if="isPdfFile(currentFile)"
            @click="printPdf(currentFile)"
            class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
          >
            طباعة المستند الحالي
          </button>

          <button
            v-else
            v-print="'#print_reply_doc_n'"
            class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
          >
            طباعة المستند الحالي
          </button>
        </div>

        <!-- شريط التنقل السفلي -->
        <div
          class="fixed bottom-3 left-0 right-0 bg-gray-100 flex justify-between items-center w-full max-w-4xl mx-auto px-4 py-2 rounded-lg shadow z-50"
          v-if="isImageArray(reply_image_of_doc)"
        >
          <div class="w-12 h-8">
            <button
              title="السابق"
              v-if="currentIndex > 0"
              @click="prevImage1()"
              class="focus:outline-none w-12 h-8 bg-gray-300 rounded flex justify-center items-center"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>

          <div class="text-black font-semibold">
            {{ currentIndex + 1 }} / {{ reply_image_of_doc.length }}
          </div>

          <div class="w-12 h-8">
            <button
              title="التالي"
              v-if="currentIndex < reply_image_of_doc.length - 1"
              @click="nextImage1()"
              class="focus:outline-none w-12 h-8 bg-gray-300 rounded flex justify-center items-center"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div

      v-if="show_current_reply_image_to_for_bigger_screen_model"
      class="w-screen h-full absolute inset-0 z-50 overflow-hidden"
    >
      <div class="relative">
        <div id="print_reply_doc_n" class="bg-black bg-opacity-50 h-screen-100">
          <div class="h-screen-100">
            <img
              :src="reply_image_of_doc"
              alt=""
              class="h-full w-full object-contain"
            />
          </div>
        </div>

        <div
          class="h-screen flex flex-col justify-center items-center bg-black bg-opacity-90 absolute top-0 inset-0 z-50 w-full"
        >
          <div class="max-w-3xl mx-auto relative">
            <div
              class="absolute top-6 z-50 flex justify-between items-center w-full"
            >
              <button
                @click="
                  show_current_reply_image_to_for_bigger_screen_model = false
                "
              >
                <svg
                  class="w-8 h-8 stroke-current text-red-500 hover:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>

              <button
                v-if="roles.includes('kkk')"
                v-print="'#print_reply_doc_n'"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة المستند الحالي
              </button>
            </div>

            <div class="h-screen-93 mt-4 relative">
              <img
                :src="reply_image_of_doc"
                alt="image"
                class="h-full w-full object-contain z-0"
              />

              <div
                class="absolute z-10 pointer-events-none flex justify-center items-center"
                style="
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%) rotate(-30deg);
                "
              >
                <span
                  class="text-6xl font-bold text-gray-400 opacity-20 select-none"
                >
                  {{ user_name33 }}
                </span>
              </div>
            </div>

            <div
              class="absolute bottom-3 z-50 bg-gray-100 flex justify-between items-center w-full mx-auto mt-4"
            >
              <div class="w-12 h-8">
                <button
                  title="prev"
                  v-if="reply_doc_number > 1"
                  @click="Next_prevent_GetResources_ById('prev')"
                  class="focus:outline-none w-12 h-8 bg-gray-300 rounded flex justify-center items-center"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>

              <div class="text-black">
                {{ reply_doc_number }} / {{ reply_total_of_doc }}
              </div>

              <div class="w-12 h-8">
                <button
                  v-if="reply_doc_number < reply_total_of_doc"
                  title="next"
                  @click="Next_prevent_GetResources_ById('next')"
                  class="focus:outline-none w-12 h-8 bg-gray-300 rounded flex justify-center items-center"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->


       <div
      v-if="showAnnotatedModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
    >
      <button
        @click="showAnnotatedModal = false"
        class="absolute top-5 right-5 text-white text-4xl cursor-pointer hover:text-red-500 z-[60]"
      >
        &times;
      </button>

      <button
        @click="save_selected_images"
        class="absolute top-5 left-5 text-white text-4xl cursor-pointer hover:text-red-500 z-[60]"
      >
        حفظ
      </button>

      <div
        v-if="currentImagesig"
        class="relative flex flex-col max-w-full max-h-full items-center"
      >
        <div class="w-full flex justify-between items-center mb-2 px-1">
          <label
            class="flex items-center text-white cursor-pointer bg-white/10 px-2 py-1 rounded"
          >
            <input
              type="checkbox"
              v-model="selectAllsig"
              @change="toggleSelectAllsig"
            />
            <span class="mr-2 text-sm">تحديد الكل</span>
          </label>
          <label
            class="flex items-center text-white cursor-pointer bg-white/10 px-2 py-1 rounded"
          >
            <input
              type="checkbox"
              v-model="selectedImages_sig"
              :value="currentImagesig"
            />
            <span class="mr-2 text-sm">تحديد الصورة</span>
          </label>
        </div>

        <div class="relative bg-white p-1 rounded-lg">
          <img
            :src="currentImagesig.path"
            class="block mx-auto object-contain"
            style="max-width: 90vw; max-height: calc(100vh - 180px)"
          />

          <div
            class="absolute inset-0 flex justify-center items-center pointer-events-none opacity-10"
          >
            <span
              class="text-5xl md:text-8xl font-bold text-gray-500 transform -rotate-45 select-none uppercase"
            >
              {{ user_name33 }}
            </span>
          </div>
        </div>

        <div class="flex justify-center items-center gap-4 mt-4 w-full">
          <button
            @click="prevImage_sig"
            class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-white transition-all text-sm font-bold"
          >
            السابق
          </button>
          <span
            class="text-white text-sm font-mono bg-black/50 px-3 py-1 rounded-full"
          >
            {{ currentIndexsig + 1 }} / {{ reply_total_of_doc_sig }}
          </span>
          <button
            @click="nextImage_sig"
            class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-white transition-all text-sm font-bold"
          >
            التالي
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script
  type="text/javascript"
  src="http://cdn.asprise.com/scannerjs/scanner.js"
></script>

<script>
import asideComponent from "@/components/asideComponent.vue";
import navComponent from "@/components/navComponent.vue";
import svgLoadingComponent from "@/components/svgLoadingComponent.vue";
import { ensureAccessToken } from "@/services/tokenHelper";
import Swal from "sweetalert2";
//***************
//import { HubConnectionBuilder } from "@microsoft/signalr";

export default {
  created() {},



  async mounted() {

    this.GetAllmail_cases() 
  

    window.addEventListener("resize", this.handleResize);

    this.user_name33 = localStorage.getItem("user_name");

    this.roles = localStorage.getItem("Az07");

    if (
      localStorage.getItem("AY_LW") == null ||
      localStorage.getItem("member") == "true" ||
      !this.roles.includes("aaa")
    ) {
      this.$router.push("/");
    }

    this.isperent = localStorage.getItem("isperent");

    var date = new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var month1 = "01";
    var day1 = "01";


    this.date_from = date.getFullYear() + "-" + month1 + "-" + day1;
    this.date_to = date.getFullYear() + "-" + month + "-" + day;

    this.my_user_id = localStorage.getItem("AY_LW");
    this.my_department_id = localStorage.getItem("chrome");

    await this.GetSentMail();


  },

  beforeDestroy() {
    // أو beforeUnmount في Vue 3
    window.removeEventListener("resize", this.handleResize);
  },

  watch: {

        selectedImages_sig() {
      if (this.selectedImages_sig.length == this.reply_total_of_doc_sig) {
        this.selectAllsig = true;
      } else {
        this.selectAllsig = false;
      }
    },

    selectedImages_resend() {
      if (this.selectedImages_resend.length == this.reply_total_of_doc_resend) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },

    show_resend(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.mySection.scrollIntoView({ behavior: "smooth" });
        });
      }
    },

    new_reply: function () {
      this.search_reset();
      this.page_num=1
      if (this.new_reply == true) {
        this.mail_caseIdSelected = 4;
        this.mail_caseNameSelected = this.mail_cases[3].statename;
        this.GetSentMail();
      } else {
        this.mail_caseIdSelected = "";
        this.mail_caseNameSelected = "الكل";
        this.GetSentMail();
      }
    },

        don_state: function () {
      if (this.don_state == 1) {
        this.done_mails = true;
        this.not_done = false;
      } else if (this.don_state == 2) {
        this.done_mails = false;
        this.not_done = true;
      } else {
        this.done_mails = false;
        this.not_done = false;
      }
    },



    departmentNameSelected: function () {
      if (this.departmentNameSelected == "") {
        this.senders = [];
        this.show_senders_mail = "";
        this.replies = [];
        this.departmentflag = 0;
        this.departmentName = "";
        this.page_num = 1;
        //***********stop code 1/2/2024
        //   this.GetSentMail();
        //****end stop code 1/2/2024
      }
    },


    mailType: function () {
      this.senders = [];
      this.show_senders_mail = "";
      this.replies = [];
      this.departmentflag = 0;
      this.departmentName = "";
      this.page_num = 1;

      if (this.mailType == 0 || this.mailType == 2) {
        this.report_button = true;
      } else {
        this.report_button = false;
      }
      this.GetSentMail();
    },

  },

  components: {
    asideComponent,
    navComponent,
    svgLoadingComponent,
  },

  data() {
    return {

        don_state:3,
      

      current_page_number:1,

       sig_filter: 3,

      sig_state:-1,
      p_id: 0,
      p_uid: 0,
      p_did: 0,
      p_mydep: 0,

      menuOpen: true,

      shared: "",

      mail_id_to_print: 0,

      user_name33: "",
      show_number: false,
      show_resend: false,

      selectedRecipient: null,

      images_resend: [],
      currentIndex: 0,
      selectedImages_resend: [],
      selectAll: true,

      message: "",

      zoom: 1,
      recipients: [],

      reply_total_of_doc_resend: 0,

      imagesToSend_resend: [],

      reply_id_for_resend: 0,

      ////////////////

      new_reply: false,

      done_mails: false,
      not_done: false,

      dep_id_for_done: 0,

      baseText: "تم التراجع عن تأكيد الإنجاز بسبب ",

      cancel_reason2: "تم التراجع عن تأكيد الإنجاز بسبب ",

      isdone: false,
      isdone2: false,
      isdonetext: false,

      certified: 0,

      isperent: false,

      image_rotate: true,
      //********21/1/2023
      conn: null,
      keyid: "",
      //**********end 21/1/2023
      reply_id_to_delete: "",
      alert_delete_document: false,

      year_filter: 0,

      image_of_doc: "",
      id_of_doc: "",
      image_to_print_n: [],

      s_number: "",
      s_dare: "",

      roles: [],
      by_date_of_reply: false,
      general_incoming_number: "",

      imagesToSend: [],
      indexOfimagesToShow: 0,

      show_senders_mail: "",
      senders: [],
      to_test_print: false,

      testimage: "",
      indextotest: 0,

      show_images: [],
      show_images_model: false,

      total_of_transaction: 0,
      my_user_id: "",
      my_department_id: "",

      inboxMails: [],

      mail_id: "",

      classifications: [],
      classificationselect: false,
      classificationNameSelected: "",
      classificationIdSelected: "",

      departments: [],
      departmentselect: false,
      departmentNameSelected: "",
      departmentIdSelected: "",
      departmentName: "",
      departmentflag: 0,

      realated_departments: [],
      realated_departmentselect: false,
      realated_departmentNameSelected: "",
      realated_departmentIdSelected: "",

      sides: [],
      sideselect: false,
      sideNameSelected: "",
      sideIdSelected: "",

      measures: [],
      measureselect: false,
      measureNameSelected: "",
      measureIdSelected: "",

      mail_cases: [],
      mail_caseselect: false,
      mail_caseNameSelected: "",
      mail_caseIdSelected: "",

      mailType: 0,

      summary: "",

      filter: false,
      loading: false,
      screenFreeze: false,
      there_are_no_documents: false,

      date_from: "",
      date_to: "",

      page_size: 11,
      page_num: 1,

      mailId_to_get_mail_by_id: "",
      my_department_id_to_get_mail_by_id: "",
      to_test_passing_mail_type_to_get_mail_by_id: "",
      sends_id_to_get_mail_by_id: "",
      mangment_sender_to_get_mail_by_id: "",
      replies: [],
      reply_to_add: "",
      report_button: true,

      reply_doc_number: 0,
      reply_total_of_doc: 0,

      reply_image_of_doc: "",
      reply_id_of_doc: "",
      reply_image_to_print_n: [],

      reply_image_to_print_n_model: false,
      show_current_reply_image_to_for_bigger_screen_model: false,

      id_reply_image: "",

      sends_id: "",

      mail_sub_number: false,
      sub_number: "",
      sub_id: 0,
      show_number: false,

      sends_from_to_reply: 0,

            isUploading: false,
      try_progress: 0,
      try_selectedFiles: [],
      try_message: "",
      try_mail_id: "",
      try_userId: localStorage.getItem("AY_LW"),
      user_department: localStorage.getItem("chrome"),

            sends_for_sig:0,
             signture_images: [],
             reply_total_of_doc_sig: 0,
             currentIndexsig: 0,
             showAnnotatedModal: false,
             selectedImages_sig: [],
             selectAllsig: false,
             signiture_State_reply:-1

    };
  },

  computed: {

       currentImagesig() {
      return this.signture_images[this.currentIndexsig] || null;
    },



    currentFile() {
      // إذا PDF واحد
      if (
        typeof this.reply_image_of_doc === "string" &&
        this.isPdfFile(this.reply_image_of_doc)
      ) {
        return this.reply_image_of_doc;
      }
      // إذا مصفوفة صور
      if (
        Array.isArray(this.reply_image_of_doc) &&
        this.reply_image_of_doc.length > 0
      ) {
        return this.reply_image_of_doc[this.currentIndex].path;
      }
      // صورة واحدة
      return this.reply_image_of_doc;
    },

    currentImage() {
      return this.images_resend[this.currentIndex] || null;
    },

    filterByTerm() {
      return this.sides.filter((side) => {
        return side.section_Name.toLowerCase().includes(this.sideNameSelected);
      });
    },

    filterByTerm1() {
      return this.departments.filter((department) => {
        return department.departmentName.includes(this.departmentNameSelected);
      });
    },
  },

  methods: {

        openSwalPrompt(testimage,n) {
      Swal.fire({
        title: "  PDF إختيار صورة من ال ",
        text: "يرجى إدخال رقم الصفحة المراد التوقيع عليها",
        input: "number", // نوع الإدخال رقم
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "تأكيد",
        cancelButtonText: "إلغاء",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true, // لترتيب الأزرار بشكل صحيح في العربية
        inputPlaceholder: "أدخل الرقم هنا...",

        // التحقق من الإدخال
        inputValidator: (value) => {
          if (!value) {
            return "يجب عليك إدخال رقم للمتابعة!";
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // هنا الرقم الذي أدخله المستخدم
          

          // يمكنك الآن استخدامه في المنظومة
     

          this.signeture(testimage, result.value, 2)
        
        }
      });
    },



        async Signiture_State(state) {
      //              const token = await ensureAccessToken();
      // if (!token) return;

      this.$http.mailService
        .Signiture_State(0, state, 1, this.mailId_to_get_mail_by_id)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },


        save_selected_images() {
      for (let index = 0; index < this.selectedImages_sig.length; index++) {
        this.imagesToSend.push({
          baseAs64: this.selectedImages_sig[index].path,
          index: index + 1,
          department_id: Number(this.my_department_id),
        });
      }

      this.showAnnotatedModal = false;
    },


      prevImage_sig() {
      if (this.currentIndexsig > 0) this.currentIndexsig--;
    },

       nextImage_sig() {
      if (this.currentIndexsig < this.signture_images.length - 1)
        this.currentIndexsig++;
    },


      toggleSelectAllsig() {
      this.selectedImages_sig = this.selectAllsig
        ? [...this.signture_images]
        : [];
    },


        async GetAllDocuments_signture() {
      const token = await ensureAccessToken();
      if (!token) return;
      this.signture_images = [];
      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        .GetAllDocuments_signture(
          Number(this.mailId_to_get_mail_by_id),
          Number(localStorage.getItem("AY_LW")),
          Number(this.my_department_id),
          1,
        )
        .then((res) => {
          this.signture_images = res.data;
          this.reply_total_of_doc_sig = this.signture_images.length;

          if (this.signture_images.length == 0) {
            alert("  لم يتم التهميش على اي صورة  ");
          } else {
            this.showAnnotatedModal = true;
          }

          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          this.loading = false;
          alert("  لم يتم التهميش على اي صورة  ");
          setTimeout(() => {
            this.screenFreeze = false;
            console.log(err);
          }, 700);
        });
    },


    
        signeture(data,cpn,n) {
      this.$router.push({
        name: "tests",
        params: {
          url: data,
          mailid: this.show_images[this.indextotest].mailID,
          sends_for_sig:this.sends_for_sig,
          page:"sent",

             cpn:cpn,
          n:n
        },
      });
    },


    try_handleFilesChange(event) {
      this.try_selectedFiles = Array.from(event.target.files);
      this.try_progress = 0;
    },

    async try_upload() {
      if (!this.try_selectedFiles.length) {
        this.try_message = "يرجى اختيار الصور أولاً";
        return;
      }

      this.isUploading = true; // 👈 نوقف الزر

      try {
        const batchSize = 5; // 👈 عدد الصور في كل دفعة
        for (let i = 0; i < this.try_selectedFiles.length; i += batchSize) {
          const batch = this.try_selectedFiles.slice(i, i + batchSize);

          // تحويل الصور في الدفعة إلى base64
          const try_base64List = await Promise.all(
            batch.map((file, index) => {
              return this.try_convertToBase64(file).then((base64) => ({
                baseAs64: base64,
                index: i + index,
                department_id: Number(this.user_department),
              }));
            }),
          );

          for (let i = 0; i < try_base64List.length; i++) {
            this.imagesToSend.push({
              baseAs64: try_base64List[i].baseAs64,
              index: try_base64List[i].index,
              department_id: Number(this.my_department_id),
            });
          }

          // تجهيز البيانات
          // const data = {
          //   mail_id: Number(this.mailId),
          //   userId: Number(this.try_userId),
          //   list: try_base64List,
          // };

          // إرسال الطلب
          // await this.$http.documentService.upload_doc_from_web(data);

          // تحديث التقدم
          this.try_progress = Math.round(
            ((i + batch.length) / this.try_selectedFiles.length) * 100,
          );
        }

        this.try_message = "تم رفع الصور بنجاح ✅";
        this.try_selectedFiles = [];
        this.$refs.try_fileinput.value = null;
        
      } catch (err) {
        this.try_message = "حدث خطأ أثناء رفع الصور";
        console.error(err);
      } finally {
        this.isUploading = false; // 👈 نرجع الزر مهما كان
      }
    },

    try_convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },



    nextImage1() {
      if (this.currentIndex < this.reply_image_of_doc.length - 1) {
        this.currentIndex++;
        
      }
    },
    prevImage1() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },

    isImageArray(file) {
      return Array.isArray(file) && file.length > 0;
    },

    async MergeAndDownload(id, uid, department_id, mydep) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.from_reply_or_general = 1;
      this.indextotest = 0;
      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        .MergeAndDownload(id, Number(uid), Number(department_id), Number(mydep))
        .then((res) => {
          const blob = res.data;

          this.printPdf(URL.createObjectURL(blob));

          setTimeout(() => {
            this.show_images_model = true;
            this.screenFreeze = false;
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          this.loading = false;
          this.there_are_no_documents = true;
          setTimeout(() => {
            this.screenFreeze = false;
            this.there_are_no_documents = false;
            console.log(err);
          }, 700);
        });
    },

    printPdf(pdfUrl) {
      const w = window.open(pdfUrl, "_blank");
      w.print();
    },

    isPdfFile(file) {
      return file && typeof file === "string" && file.endsWith(".pdf");
    },

    handleResize() {
      this.menuOpen = window.innerWidth >= 800;
    },

    onMenuToggle(value) {
      this.menuOpen = value; // 🔹 نستقبل القيمة هنا
    },

    async ResharedMailWithAnotherDep() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;

      this.$http.mailService
        .ResharedMailWithAnotherDep(
          Number(this.mailId_to_get_mail_by_id),
          Number(this.realated_departmentIdSelected),
          Number(this.my_department_id),
          Number(this.my_user_id)
        )
        .then((res) => {
          this.screenFreeze = false;
          this.loading = false;

          this.show_senders(
            this.mailId_to_get_mail_by_id,
            this.to_test_passing_mail_type_to_get_mail_by_id,
            this.show_senders_mail,
            this.resend_from_to_show,
            this.measure_id1
          );

          this.realated_departmentIdSelected = "";
          this.realated_departmentNameSelected = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },

  

    select_realated_department(id, name) {
      this.realated_departmentNameSelected = name;
      this.realated_departmentIdSelected = id;
    },

    async ReplyReaded(dep_id, sends, sends_id) {
      const token = await ensureAccessToken();
      if (!token) return;

      //*******

      var from2 = null;

      if (sends == this.my_department_id || sends == 0) {
        from2 = 1;
      } else {
        from2 = 2;
      }

      this.$http.mailService
        .ReplyReaded(
          Number(this.mailId_to_get_mail_by_id),
          Number(this.my_department_id),
          Number(dep_id),
          Number(this.my_user_id),
          from2,
          sends_id
        )
        .then((res) => {
          setTimeout(() => {
            this.show_senders(
              this.mailId_to_get_mail_by_id,
              this.to_test_passing_mail_type_to_get_mail_by_id,
              this.show_senders_mail,
              this.resend_from_to_show,
              this.measure_id1
            );
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {}, 500);
          console.log(err);
        });
    },

    async get_department_for_reply() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .get_department_for_reply(
          this.my_department_id_to_get_mail_by_id,
          this.my_department_id,
          this.mailId_to_get_mail_by_id,
          1
        )
        .then((res) => {
          this.recipients = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    zoomIn() {
      this.zoom += 0.1;
    },
    zoomOut() {
      if (this.zoom > 0.3) this.zoom -= 0.1;
    },
    resetZoom() {
      this.zoom = 1;
    },

    back_resend() {
      this.show_resend = false;

      (this.selectedRecipient = null),
        (this.images_resend = []),
        (this.currentIndex = 0),
        (this.selectedImages_resend = []),
        (this.selectAll = true),
        (this.message = ""),
        (this.zoom = 1),
        (this.recipients = []),
        (this.reply_total_of_doc_resend = 0),
        (this.imagesToSend_resend = []),
        (this.reply_id_for_resend = 0);
    },

    async GetResources_ById_resend2(id) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.documentService
        .GetResources_ById_Resend2(id)
        .then((res) => {
          (this.reply_id_for_resend = id),
            (this.reply_total_of_doc_resend = res.data.total);

          this.selectedImages_resend = res.data.date;

          this.images_resend = res.data.date;

          setTimeout(() => {}, 200);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async GetResources_ById_resend(id) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.documentService
        .GetResources_ById_Resend(id)
        .then((res) => {
          (this.reply_id_for_resend = id),
            (this.reply_total_of_doc_resend = res.data.total);

          this.selectedImages_resend = res.data.date;

          this.images_resend = res.data.date;

          setTimeout(() => {}, 200);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    nextImage_resend() {
      if (this.currentIndex < this.images_resend.length - 1)
        this.currentIndex++;
    },
    prevImage_resend() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    toggleSelectAll() {
      this.selectedImages_resend = this.selectAll
        ? [...this.images_resend]
        : [];
    },

    async send() {
      const token = await ensureAccessToken();
      if (!token) return;

      if (!this.selectedRecipient) {
        alert("الرجاء اختيار مستلم");
        return;
      }
      if (this.selectedImages_resend.length === 0) {
        alert("الرجاء اختيار صورة واحدة على الأقل");
        return;
      }
      if (!this.message.trim()) {
        alert("الرجاء كتابة نص الرسالة");
        return;
      }

      for (var i = 0; i < this.selectedImages_resend.length; i++) {
        this.imagesToSend_resend.push(this.selectedImages_resend[i].id);
      }

      var from_how1 = null;

      if (
        this.selectedRecipient.resendFrom == this.my_department_id ||
        this.selectedRecipient.resendFrom == 0
      ) {
        from_how1 = 1;
      } else {
        from_how1 = 2;
      }

      var ReplyViewModel = {
        UserId: Number(localStorage.getItem("AY_LW")),
        mailId: Number(this.mailId_to_get_mail_by_id),
        SendsId: Number(this.selectedRecipient.sendsToId),
        ReplyId: Number(this.reply_id_for_resend),
        DepartmentId: Number(this.selectedRecipient.id),
        MailDetails: this.message,
        CanNotDeleted: 1,
        resended: true,
        from: from_how1,
        IsMember: 0,
        MyDep: Number(this.my_department_id),

        ResourceId: this.imagesToSend_resend,
      };

      this.$http.mailService
        .ResendReplayWithPhoto(ReplyViewModel)
        .then(() => {
          setTimeout(() => {
            alert(
              "  تمت إعادة توجيه عدد  " +
                this.selectedImages_resend.length +
                " صور إلى " +
                this.selectedRecipient.departmentName
            );

            var dep_name = this.departmentflag;

            this.show_senders(
              this.mailId_to_get_mail_by_id,
              this.to_test_passing_mail_type_to_get_mail_by_id,
              this.show_senders_mail,
              this.resend_from_to_show,
              this.measure_id1,
              this.departmentflag
            );

            this.departmentflag = dep_name;

            this.back_resend();

            //********end 28/2/2023
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            alert("حدث خطأ أثناء إعادة توجيه الرد الرجاء المحاولة مرة اخرى");
          }, 500);
          console.log(err);
        });
    },

    async GetMailSubId() {
      const token = await ensureAccessToken();
      if (!token) return;

      if (this.mail_sub_number != true) {
        this.$http.mailService
          .GetMailSubId(
            this.mailId_to_get_mail_by_id,
            this.my_department_id,
            this.my_user_id
          )
          .then((res) => {
            this.sub_number = res.data.subNumber;
            this.sub_id = res.data.subNumberId;
            this.show_number = true;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.show_number = false;
        this.sub_number = "";
        this.sub_id = 0;
      }
    },

    protectBaseText(event) {
      const cursorPos = event.target.selectionStart;
      // إذا النص لا يبدأ بالجزء الثابت، نعيده كما هو مع الإضافة الجديدة فقط
      if (!this.cancel_reason2.startsWith(this.baseText)) {
        this.cancel_reason2 =
          this.baseText + this.cancel_reason2.slice(this.baseText.length);
      }
      // لو حاول يحذف أو يعدل في النص الثابت، نرجع المؤشر بعده
      if (cursorPos < this.baseText.length) {
        event.target.selectionStart = event.target.selectionEnd =
          this.baseText.length;
      }
    },

    isdone_changed() {
      this.isdone = !this.isdone;

      if (!this.isdone) {
        this.isdonetext = true;
        this.isdone2 = true;
      
      }
    },

    async isdone22() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        .mail_done(
          Number(this.dep_id_for_done),
          Number(this.my_user_id),
          Number(this.mailId_to_get_mail_by_id),
          0
        )
        .then((res) => {
          this.screenFreeze = true;
          this.loading = true;

          var ReplyViewModel = {
            userId: Number(localStorage.getItem("AY_LW")),
            mailId: Number(this.mailId_to_get_mail_by_id),
            send_ToId: Number(this.sends_id),
            from: Number(1),
            reply: {
              mail_detail: this.cancel_reason2,
              To: Number(this.dep_id_for_done),
              CanNotDeleted: true,
            },
            file: {
              list: this.imagesToSend.slice(0, 50),
            },
          };
          //********

          //*******
          this.$http.mailService
            .NewAddReply(ReplyViewModel)
            .then((res) => {
              setTimeout(() => {
             
                this.loading = false;
                this.screenFreeze = false;
                this.reply_to_add = "";
                // this.getMailById();
                //this.imagesToSend = [];

                for (let index = 0; index < this.senders.length; index++) {
                  if (this.senders[index].send_ToId == this.sends_id) {
                    if (this.senders[index].flag == 4) {
                      this.senders[index].flag = 5;
                      this.senders[index].state = "تم الرد من قبلك";
                    }
                  }
                }

          
                var cou = Math.ceil(this.imagesToSend.length / 50);
                if (cou > 1) {
                
                  var id_of_reply_from_beackend = res.data.replyid; //101
                  this.update_reply_to_complet_sent_img(
                    1,
                    id_of_reply_from_beackend,
                    cou,
                    50
                  );
                } else {
                  this.getMailById();
                }
                //**********end 9/3/2023
              }, 500);
            })
            .catch((err) => {
              setTimeout(() => {
                this.loading = false;
                this.screenFreeze = false;
              }, 500);
              console.log(err);
            });

          this.isdone = false;
          this.isdone2 = false;
          this.isdonetext = false;

          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 200);
        })
        .catch((err) => {
          this.screenFreeze = false;
          this.loading = false;
          console.log(err);
        });
    },


    search_reset() {
      this.mail_id = "";
      this.summary = "";
      this.general_incoming_number = "";

      this.s_number = "";
      (this.year_filter = "0"),(this.sig_filter = "3"), (this.certified = 0);
   
    },

    farst_documents() {
      this.image_rotate = true;

      this.doc_number_to_search = 1;
      this.search_the_doc();
    },

    last_documents() {
      this.image_rotate = true;

      this.doc_number_to_search = this.total_of_doc;
      this.search_the_doc();
    },

    async search_the_doc() {
      const token = await ensureAccessToken();
      if (!token) return;

      // doc_number_to_search

      if (this.doc_number_to_search > this.total_of_doc) {
        alert("لقد ادخلة رقم خطا الرجاء إعادة المحاولة");
      } else {
        this.doc_number = this.doc_number_to_search;
        this.screenFreeze = true;
        this.loading = true;
        this.$http.documentService
          .GetAllDocN(this.mailId, this.doc_number)
          .then((res) => {
            this.total_of_doc = res.data.total;

            this.image_of_doc = res.data.data.path;
            this.id_of_doc = res.data.data.id;

            setTimeout(() => {
              this.screenFreeze = false;
              this.loading = false;
            }, 200);
          })
          .catch((err) => {
            this.screenFreeze = false;
            this.loading = false;
            console.log(err);
          });
      }
    },

    async deletereply() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.alert_delete_document = false;

      this.$http.mailService
        .delete_reply(
          Number(this.reply_id_to_delete),
          Number(localStorage.getItem("AY_LW"))
        )
        .then((res) => {
          this.getMailById();
          // this.to_pass_data_to_get_mail_by_id(
          //                 this.mail.mail_id,
          //                 this.my_department_id,
          //                 this.mail.type_of_mail,
          //                 this.mail.sends_id,
          //                 this.mail.mangment_sender
          //               )
        })
        .catch((err) => {});
    },

    handleScroll() {
      const obj = document.querySelector("#handleScrollForAyoubTest");
      if (obj.scrollTop === obj.scrollHeight - obj.offsetHeight) {
        if (this.inboxMails.length < this.total_of_transaction) {
          this.PushNewSentMail();
        }
      }
    },

    async PushNewSentMail() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.page_num = this.page_num + 1;

      var date_from2 = this.date_from;
      var date_to2 = this.date_to;

      if (this.year_filter != 0) {
        date_from2 = this.year_filter + "-01-01";
        date_to2 = this.year_filter + "-12-31";
      }

      this.senders = [];
      this.show_senders_mail = "";

      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        .sent(
          this.my_user_id,
          this.mailType,
          this.my_department_id,
          date_from2,
          date_to2,
          this.by_date_of_reply,
          this.mail_id,
          this.general_incoming_number,
          this.summary,
          this.departmentIdSelected,
          this.sideIdSelected,
          this.measureIdSelected,
          this.classificationIdSelected,
          this.mail_caseIdSelected,
          this.s_number,
          this.certified,
          Number(this.done_mails),
          Number(this.not_done),
          Number(this.sig_filter),
          this.page_num,
          this.page_size
        )
        .then((res) => {
          for (let index = 0; index < res.data.mail.length; index++) {
            const element = res.data.mail[index];
            this.inboxMails.push(element);
          }

          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
            console.log(err);
          }, 100);
        });
    },

    GetMailsToPrint() {
      var date_from2 = this.date_from;
      var date_to2 = this.date_to;

      if (this.year_filter != 0) {
        date_from2 = this.year_filter + "-01-01";
        date_to2 = this.year_filter + "-12-31";
      }

      this.$router.push({
        name: "Sent_report",
        params: {
          user_id: this.my_user_id,
          mail_type: this.mailType,
          department_Id: this.my_department_id,
          from: date_from2,
          to: date_to2,
          date_of_reply: this.by_date_of_reply,
          mail_id: this.mail_id,
          g_in_num: this.general_incoming_number,
          summary: this.summary,
          department_id_selected: this.departmentIdSelected,
          side_selected: this.sideIdSelected,
          measure_selected: this.measureIdSelected,
          classifaction_selected: this.classificationIdSelected,
          mail_caseid: this.mail_caseIdSelected,
          certified: this.certified,

          done_mail: Number(this.done_mails),
          not_done: Number(this.not_done),
          sig_filter:  Number(this.sig_filter),
          page_num: 1,
          page_size: 1000000,
          //***********eman
          entity_ref_num: this.s_number,
          //*****End  eman
        },
      });
    },

    GetMailsToPrint2() {
      var date_from2 = this.date_from;
      var date_to2 = this.date_to;

      if (this.year_filter != 0) {
        date_from2 = this.year_filter + "-01-01";
        date_to2 = this.year_filter + "-12-31";
      }

      this.$router.push({
        name: "print_clipboard",
        params: {
          user_id: this.my_user_id,
          mail_type: 3,
          department_Id: this.my_department_id,
          from: date_from2,
          to: date_to2,
          date_of_reply: this.by_date_of_reply,
          mail_id: this.mail_id,
          g_in_num: this.general_incoming_number,
          summary: this.summary,
          department_id_selected: this.departmentIdSelected,
          side_selected: this.sideIdSelected,
          measure_selected: this.measureIdSelected,
          classifaction_selected: this.classificationIdSelected,
          mail_caseid: this.mail_caseIdSelected,
          certified: this.certified,

          done_mail: Number(this.done_mails),
          not_done: Number(this.not_done),

          page_num: 1,
          page_size: 1000000,
          //***********eman
          entity_ref_num: this.s_number,

          dep_name:this.departmentNameSelected,
        sig_filter:  Number(this.sig_filter),
          //*****End  eman
        },
      });
    },

    async Next_prevent_GetResources_ById(x) {
      const token = await ensureAccessToken();
      if (!token) return;

      if (x == "next") {
        this.reply_doc_number++;
      } else {
        this.reply_doc_number--;
      }

      this.screenFreeze = true;
      this.loading = true;
      this.$http.documentService
        .GetResources_ById(this.id_reply_image, this.reply_doc_number)
        .then((res) => {
          this.show_current_reply_image_to_for_bigger_screen_model = true;
          this.reply_total_of_doc = res.data.total;

          this.reply_image_of_doc = res.data.date[0].path;
          this.reply_id_of_doc = res.data.date[0].id;

          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 200);
        })
        .catch((err) => {
          this.screenFreeze = false;
          this.loading = false;
          console.log(err);
        });
    },

    async GetResources_ById(id) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.id_reply_image = id;

      this.reply_doc_number = 1;
      this.reply_image_of_doc = [];
      this.reply_id_of_doc = "";
      this.reply_total_of_doc = "";

      this.screenFreeze = true;
      this.loading = true;
      this.$http.documentService
        .GetResources_ById(id, this.reply_doc_number)
        .then((res) => {
          this.show_current_reply_image_to_for_bigger_screen_model = true;
          this.reply_total_of_doc = res.data.total;

          this.reply_image_of_doc = res.data.date[0].path;
          this.reply_id_of_doc = res.data.date[0].id;

          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 200);
        })
        .catch((err) => {
          this.screenFreeze = false;
          this.loading = false;
          console.log(err);
        });
    },

    async GetResources_ById2(id) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.id_reply_image = id;
      this.currentIndex = 0;
      this.reply_doc_number = 1;
      this.reply_image_of_doc = [];
      this.reply_id_of_doc = "";
      this.reply_total_of_doc = "";

      this.screenFreeze = true;
      this.loading = true;
      this.$http.documentService
        .GetResources_ById2(id)
        .then((res) => {
          this.show_current_reply_image_to_for_bigger_screen_model = true;
          this.reply_total_of_doc = res.data.total;

          this.reply_image_of_doc = res.data.date;
          this.reply_id_of_doc = res.data.date[0].id;

          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 200);
        })
        .catch((err) => {
          this.screenFreeze = false;
          this.loading = false;
          console.log(err);
        });
    },

    async print_image() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.to_test_print = true;
      this.$http.mailService
        .PrintOrShowDocument(
          Number(this.mail_id_to_print),
          Number(localStorage.getItem("AY_LW")),
          Number(this.from_reply_or_general)
        )
        .then((res) => {
          setTimeout(() => {
          
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
          console.log(err);
        });
    },

    async show_reply_images(index, plase) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.from_reply_or_general = plase;

      this.screenFreeze = true;
      this.loading = true;

      this.$http.mailService
        .PrintOrShowDocument(
          Number(this.mailId_to_get_mail_by_id),
          Number(localStorage.getItem("AY_LW")),
          2
        )
        .then((res) => {
          this.show_images = [];
          this.indextotest = 0;

          this.show_images = this.replies[index].resources;

          this.testimage = this.show_images[0].path;

          setTimeout(() => {
            this.show_images_model = true;
            this.screenFreeze = false;
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
          console.log(err);
        });
    },

    scanToJpg() {
      scanner.scan(this.displayImagesOnPage, {
        output_settings: [
          {
            type: "return-base64",
            format: "jpg",
          },
        ],
      });
    },

    displayImagesOnPage(successful, mesg, response) {
      if (!successful) {
        // On error
        return;
      }

      if (
        successful &&
        mesg != null &&
        mesg.toLowerCase().indexOf("user cancel") >= 0
      ) {
        // User cancelled.
        return;
      }

      var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
      for (
        var i = 0;
        scannedImages instanceof Array && i < scannedImages.length;
        i++
      ) {
        var scannedImage = scannedImages[i];
        // this.processScannedImage(scannedImage);
        this.indexOfimagesToShow++;
        this.imagesToSend.push({
          baseAs64: scannedImage.src,
          index: this.indexOfimagesToShow,
          department_id: Number(this.my_department_id),
        });

        // if (this.imagesToSend.length > 0) {
        // this.testimageToSend = this.imagesToSend[0].baseAs64;
        // this.ButtonUploadImagesMail = true;
        // }
      }

      // this.UploadImagesMail()

      // if (this.mailType == 1) {
      //   this.to_test_passing_mail_type = 1;
      // }
      // if (this.mailType == 2) {
      //   this.to_test_passing_mail_type = 2;
      // }
      // if (this.mailType == 3) {
      //   this.to_test_passing_mail_type = 3;
      // }

      // setTimeout(() => {
      //   this.GetSentMailById();
      // }, 1000);
    },
    //**********************************
    async AddReply_old() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;

      var ReplyViewModel = {
        userId: Number(localStorage.getItem("AY_LW")),
        mailId: Number(this.mailId_to_get_mail_by_id),
        send_ToId: Number(this.sends_id),
        from: Number(1),
        reply: {
          mail_detail: this.reply_to_add,
          To: Number(this.my_department_id_to_get_mail_by_id),
        },
        file: {
          list: this.imagesToSend,
        },
      };
      this.$http.mailService
        .NewAddReply(ReplyViewModel)
        .then((res) => {
          setTimeout(() => {
          
            this.loading = false;
            this.screenFreeze = false;

            this.reply_to_add = "";

            this.getMailById();
            this.imagesToSend = [];

            for (let index = 0; index < this.senders.length; index++) {
              if (this.senders[index].send_ToId == this.sends_id) {
                if (this.senders[index].flag == 4) {
                  this.senders[index].flag = 5;
                  this.senders[index].state = "تم الرد من قبلك";
                }
              }
            }

            // this.GetReplyByDepartment(
            //   this.replyByDepartmenId,
            //   this.sends_id,
            //   this.departmentName
            // );
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
          console.log(err);
        });
    },
    //**************end addreply_old
    //*********************9/3/2023
    async AddReply() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;

      if (
        this.sends_from_to_reply == Number(this.my_department_id) ||
        this.sends_from_to_reply == 0
      ) {
        var ReplyViewModel = {
          userId: Number(localStorage.getItem("AY_LW")),
          mailId: Number(this.mailId_to_get_mail_by_id),
          send_ToId: Number(this.sends_id),
          from: Number(1),
          sub_mail_num: Number(this.sub_id),
          reply: {
            mail_detail: this.reply_to_add,
            To: Number(this.my_department_id_to_get_mail_by_id),
          },
          file: {
            list: this.imagesToSend.slice(0, 50),
          },
        };
      } else {
        var ReplyViewModel = {
          userId: Number(localStorage.getItem("AY_LW")),
          mailId: Number(this.mailId_to_get_mail_by_id),
          send_ToId: Number(this.sends_id),
          from: Number(2),
          sub_mail_num: Number(this.sub_id),
          reply: {
            mail_detail: this.reply_to_add,
            To: Number(this.my_department_id_to_get_mail_by_id),
          },
          file: {
            list: this.imagesToSend.slice(0, 50),
          },
        };
      }
      //********

      //*******
      this.$http.mailService
        .NewAddReply(ReplyViewModel)
        .then((res) => {
          setTimeout(() => {
           
            this.loading = false;
            this.screenFreeze = false;
            this.reply_to_add = "";

            this.mail_sub_number = false;
            this.show_number = false;
            this.sub_number = "";
            this.sub_id = 0;

            // this.getMailById();
            this.imagesToSend = [];

            if (this.sends_from_to_reply == Number(this.my_department_id)) {
              for (let index = 0; index < this.senders.length; index++) {
                if (this.senders[index].send_ToId == this.sends_id) {
                  if (this.senders[index].flag == 4) {
                    this.senders[index].flag = 5;
                    this.senders[index].state = "تم الرد من قبلك";
                  }
                  
                }
              }

              for (let index = 0; index < this.inboxMails.length; index++) {
                if (
                  this.inboxMails[index].mail_id ==
                  this.mailId_to_get_mail_by_id
                ) {
                  if (
                    this.inboxMails[index].flag == 2 ||
                    this.inboxMails[index].flag == 3
                  ) {
                    this.inboxMails[index].flag = 4;
                    this.inboxMails[index].state = " تم الرد من قيلك ";
                  }
                }
              }
            } else {
              for (let index = 0; index < this.senders.length; index++) {
                if (this.senders[index].send_ToId == this.sends_id) {
                  if (
                    this.senders[index].flag == 2 ||
                    this.senders[index].flag == 3
                  ) {
                    this.senders[index].flag = 4;
                    this.senders[index].state = "تم الرد من قبلك";
                  }
                }
               
              }

              for (let index = 0; index < this.inboxMails.length; index++) {
                if (
                  this.inboxMails[index].mail_id ==
                  this.mailId_to_get_mail_by_id
                ) {
                  if (
                    this.inboxMails[index].flag == 2 ||
                    this.inboxMails[index].flag == 3
                  ) {
                    this.inboxMails[index].flag = 4;
                    this.inboxMails[index].state = " تم الرد من قيلك ";
                  }
                }
              }
            }
            // this.GetReplyByDepartment(
            //   this.replyByDepartmenId,
            //   this.sends_id,
            //   this.departmentName
            // );

            //**************9/3/2023
            var cou = Math.ceil(this.imagesToSend.length / 50);
            if (cou > 1) {
              
              var id_of_reply_from_beackend = res.data.replyid; //101
              this.update_reply_to_complet_sent_img(
                1,
                id_of_reply_from_beackend,
                cou,
                50
              );
            } else {
              this.getMailById();
            }

            this.show_senders(
              this.mailId_to_get_mail_by_id,
              this.to_test_passing_mail_type_to_get_mail_by_id,
              this.show_senders_mail,
              this.resend_from_to_show,
              this.measure_id1,
              this.departmentflag
            );

            //**********end 9/3/2023
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
             this.imagesToSend = [];
          }, 500);
          console.log(err);
        });
    },
    //****************************
    async update_reply_to_complet_sent_img(ii, id, count1, a2) {
      const token = await ensureAccessToken();
      if (!token) return;

    

      if (ii < count1) {
        var a1 = a2;
        a2 = a1 + 50;
        this.screenFreeze = true;
        this.loading = true;
        var ReplyViewModel = {
          userId: Number(localStorage.getItem("AY_LW")),
          mailId: Number(this.mailId_to_get_mail_by_id),
          send_ToId: Number(this.sends_id),
          from: Number(1),
          reply: {
            mail_detail: this.reply_to_add,
            To: Number(this.my_department_id_to_get_mail_by_id),
          },
          file: {
            list: this.imagesToSend.slice(a1, a2),
          },
          id_of_reply: id,
        };
        //********

        //************

        this.$http.mailService
          .update_replay(ReplyViewModel)
          .then((res) => {
            setTimeout(() => {
              

              for (let index = 0; index < this.senders.length; index++) {
                if (this.senders[index].send_ToId == this.sends_id) {
                  if (this.senders[index].flag == 4) {
                    this.senders[index].flag = 5;
                    this.senders[index].state = "تم الرد من قبلك";
                  }
                }
              }

              this.loading = false;
              this.screenFreeze = false;

              this.reply_to_add = "";
              // this.getMailById();
              ii++;
              if (ii < count1) {
                this.update_reply_to_complet_sent_img(ii, id, count1, a2);
              }
              //*********1/3/2023
              else this.getMailById();
              //*******end 1/3/2023
            }, 500);
          })
          .catch((err) => {
            setTimeout(() => {
              this.loading = false;
              this.screenFreeze = false;
            }, 500);
            console.log(err);
          });
      }
    },

    //*****************************end 9/3/2023

    to_pass_data_to_get_mail_by_id(
      my_department_id_to_get_mail_by_id,
      sends_id,
      departmentName,
      flag,
      resensfrom,
      shared
    ) {
      this.shared = shared;
      this.mail_sub_number = false;
      this.show_number = false;
      this.sub_number = "";
      this.sub_id = 0;

      this.departmentflag = 0;
      this.my_department_id_to_get_mail_by_id =
        my_department_id_to_get_mail_by_id;
      this.sends_id = sends_id;
      this.departmentName = departmentName;
      this.departmentflag = flag;
      this.resend_for_done = resensfrom;
      this.dep_id_for_done = my_department_id_to_get_mail_by_id;

      this.getMailById(resensfrom);
    },

    async getMailById(resensfrom) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.reply_to_add = "";
      this.imagesToSend = [];
      (this.isdone2 = false),
        (this.sends_from_to_reply = resensfrom),
        this.$http.mailService
          .GetInboxMailById(
            this.mailId_to_get_mail_by_id,
            this.my_department_id_to_get_mail_by_id,
            this.to_test_passing_mail_type_to_get_mail_by_id,
            this.sends_id
          )
          .then((res) => {
            this.department_Id = res.data.mail.department_Id;
            this.replies = res.data.list;
            (this.sends_from_to_reply = this.replies[0].sends_from),
              (this.isdone = this.department_Id = res.data.mail_is_done);
          })
          .catch((err) => {
            console.log(err);
          });
    },

    date_format(date) {
      var date2 = new Date(date);

      var month = date2.getMonth() + 1;
      var day = date2.getDate();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      return date2.getFullYear() + "-" + month + "-" + day;
    },

    async show_senders(id, mail_type, number, resend_from, measure_id1, flag) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;
      this.mailId_to_get_mail_by_id = id;
      this.to_test_passing_mail_type_to_get_mail_by_id = mail_type;

      this.replies = [];

      if (flag > 0) {
        this.departmentflag = flag;
      } else {
        this.departmentflag = 0;
      }

      (this.realated_departments = []),
        (this.realated_departmentselect = false),
        (this.realated_departmentNameSelected = ""),
        (this.realated_departmentIdSelected = "");

      this.mail_sub_number = false;
      this.show_number = false;
      this.sub_number = "";
      this.sub_id = 0;

      this.$http.mailService
        .show_senders(id, Number(this.my_department_id))
        .then((res) => {
          this.show_senders_mail = number;
          this.senders = res.data;

          setTimeout(() => {
           // this.GetRelatedDepartments();
            this.screenFreeze = false;
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          setTimeout(() => {
            this.senders = [];
            this.screenFreeze = false;
            this.loading = false;
            console.log(err);
          }, 100);
        });
    },

    previousImage() {
      if (this.indextotest > 0) {
        this.indextotest--;
        this.testimage = this.show_images[this.indextotest].url;
      }
    },

    nextImage() {
      if (this.indextotest < this.show_images.length - 1) {
        this.indextotest++;
        this.testimage = this.show_images[this.indextotest].url;
      }
    },

    async GetAllDocumentsAndReplies(id, uid, department_id, mydep,sends) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.sends_for_sig=sends

      this.p_id = id;
      this.p_uid = uid;
      this.p_did = department_id;
      this.p_mydep = mydep;

      this.indextotest = 0;
      this.mail_id_to_print = id;
      this.from_reply_or_general = 1;
      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        .GetMailResourcesAndAllReplys(
          id,
          Number(uid),
          Number(department_id),
          Number(mydep)
        )
        .then((res) => {
          this.show_images = res.data;

          this.testimage = this.show_images[0].url;

          setTimeout(() => {
            this.show_images_model = true;
            this.screenFreeze = false;
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          this.loading = false;
          this.there_are_no_documents = true;
          setTimeout(() => {
            this.screenFreeze = false;
            this.there_are_no_documents = false;
            console.log(err);
          }, 700);
        });
    },

    async GetAllDocuments(id, plase) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.from_reply_or_general = plase;
      this.screenFreeze = true;
      this.loading = true;
      this.mailId_to_get_mail_by_id = id;
      this.$http.mailService
        .GetAllDocuments(
          id,
          Number(localStorage.getItem("AY_LW")),
          Number(this.my_department_id)
        )
        .then((res) => {
          this.show_images = res.data;

          this.testimage = this.show_images[0].path;

          setTimeout(() => {
            this.show_images_model = true;
            this.screenFreeze = false;
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          this.loading = false;
          this.there_are_no_documents = true;
          setTimeout(() => {
            this.screenFreeze = false;
            this.there_are_no_documents = false;
            console.log(err);
          }, 700);
        });
    },

    async GetSentMail() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.senders = [];
      this.show_senders_mail = "";
      this.departmentflag = "";
      var date_from2 = this.date_from;
      var date_to2 = this.date_to;

      (this.realated_departments = []),
        (this.realated_departmentselect = false),
        (this.realated_departmentNameSelected = ""),
        (this.realated_departmentIdSelected = "");

      if (this.year_filter != 0) {
        date_from2 = this.year_filter + "-01-01";
        date_to2 = this.year_filter + "-12-31";
      }

      if (this.departmentNameSelected == "") {
        this.departmentIdSelected = "";
      }
      this.screenFreeze = true;
      this.loading = true;
      this.inboxMails = [];
      this.$http.mailService
        .sent(
          this.my_user_id,
          this.mailType,
          this.my_department_id,
          date_from2,
          date_to2,
          this.by_date_of_reply,
          this.mail_id,
          this.general_incoming_number,
          this.summary,
          this.departmentIdSelected,
          this.sideIdSelected,
          this.measureIdSelected,
          this.classificationIdSelected,
          this.mail_caseIdSelected,
          this.s_number,
          this.certified,
          Number(this.done_mails),
          Number(this.not_done),
          Number(this.sig_filter),
          this.page_num,
          this.page_size
        )
        .then((res) => {
          this.inboxMails = res.data.mail;
          this.total_of_transaction = res.data.total;
          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
            console.log(err);
          }, 100);
        });
    },

    async GetAllDepartments() {
      const token = await ensureAccessToken();
      if (!token) return;

      if (this.isperent == "true") {
        this.$http.mailService
          .AllDepartments_and_mysections(
            localStorage.getItem("current_department_id")
          )
          .then((res) => {
            this.departments = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$http.mailService
          .AllDepartments_and_mysections(
            localStorage.getItem("perent_id")
            //    .get_department_and_sections(
            //  localStorage.getItem("current_department_id")
          )
          .then((res) => {
            this.departments = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    selectdepartment(id, name) {
      this.departmentNameSelected = name;
      this.departmentIdSelected = id;
    },

    async GetAllSides() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .AllSides()
        .then((res) => {
          this.sides = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    selectsides(id, name) {
      this.sideNameSelected = name;
      this.sideIdSelected = id;
    },

    async GetAllMeasures() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .AllMeasures()
        .then((res) => {
          this.measures = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    selectmeasure(id, name) {
      this.measureNameSelected = name;
      this.measureIdSelected = id;
    },

    async GetAllmail_cases() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .AllStateSent()
        .then((res) => {
          this.mail_cases = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    select_mail_case(id, name) {
      this.mail_caseNameSelected = name;
      this.mail_caseIdSelected = id;
    },

    async GetAllClassifications() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .AllClassifications()
        .then((res) => {
          this.classifications = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    selectClassification(id, name) {
      this.classificationNameSelected = name;
      this.classificationIdSelected = id;
    },

    print_report() {
      var date_from2 = this.date_from;
      var date_to2 = this.date_to;

      if (this.year_filter != 0) {
        date_from2 = this.year_filter + "-01-01";
        date_to2 = this.year_filter + "-12-31";
      }

      this.$router.push({
        name: "Statistical_report",
        params: {
          dateFrom: date_from2,
          dateTo: date_to2,
          mailtype: this.mailType,
        },
      });
    },

    // GetMailsToPrint() {
    //   this.$router.push({
    //     name: "Sent_report",
    //     params: {
    //       dateFrom: this.date_from,
    //       dateTo: this.date_to,
    //       mailtype: this.mailType,
    //     },
    //   });
    // },
  },
};
</script>

<style>
.VuePagination__count {
  display: none;
}

.VuePagination {
  width: 100%;
}

.VuePagination nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  display: flex;
}

.page-link {
  background-color: red;
}

.page-link {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  font-size: 0.75rem;
  /* line-height: 1.25rem; */

  font-weight: 500;
  border-width: 1px;

  --tw-border-opacity: 0;
  border-color: rgba(209, 213, 219, var(--tw-border-opacity));

  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));

  --tw-text-opacity: 1;
  color: rgba(0, 0, 0, var(--tw-text-opacity));
}

.page-link:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(52, 211, 153, var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}

.active {
  background-color: rgba(16, 185, 129);
  color: #fff;
}

.VuePagination nav ul {
  padding-top: 0.3rem;
  padding-bottom: 0.5rem;
  border-radius: 0.375rem;
  overflow: hidden;
}

.img_toprint {
  page-break-after: always;
}



@media print {
  /* استهداف ديف العلامة المائية داخل حاوية الطباعة وإخفاؤه */
  #print_reply_doc_n .pointer-events-none {
    display: none !important;
  }

  /* إذا أردت التأكد من إخفاء أي نص شفاف آخر */
  .select-none {
    display: none !important;
  }

  /* #print_reply_doc_n img {
    width: 100% !important;
    height: auto !important;
    object-fit: contain !important;
  } */

}

</style>
