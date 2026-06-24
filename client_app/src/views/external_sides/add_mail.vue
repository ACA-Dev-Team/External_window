<template>
  <div class="min-h-screen bg-gray-50 flex font-sans" dir="rtl">
    <div class="flex-1 w-0 overflow-y-auto pb-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header class="py-8 flex justify-between items-center border-b border-gray-200 mb-8">
          <div>
            <h3 class="text-2xl font-extrabold text-gray-900 tracking-tight">معلومات البريد</h3>
         
          </div>
          <div class="flex space-x-reverse space-x-3">
             </div>
        </header>

        <main class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <section class="lg:col-span-8 space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
              <div class="grid grid-cols-1 sm:grid-cols-6 gap-6">
                

                    <!-- v-model="summary" -->
                <div class="sm:col-span-6 group">
                  <label for="summary" class="block text-sm font-bold text-gray-700 group-focus-within:text-green-600 transition-colors">الملخص</label>
                  <textarea
                    tabindex="1"
                
                    id="summary"
                    rows="4"
                    class="mt-2 block w-full text-sm rounded-xl border-gray-200 bg-gray-50 p-4 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 focus:bg-white transition-all resize-none shadow-sm"
                    placeholder="اكتب ملخص البريد هنا..."
                  ></textarea>
                </div>


                      <!-- v-model="entity_reference_number" -->
                <div class="sm:col-span-3 group">
                  <label for="entity_reference_number" class="block text-sm font-bold text-gray-700 group-focus-within:text-green-600 transition-colors">رقم إشاري الجهة</label>
                  <input
                   
                    type="number"
                    id="entity_reference_number"
                    class="mt-2 block w-full h-12 rounded-xl border-gray-200 bg-gray-50 px-4 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div class="sm:col-span-3 group">
                  <label for="date" class="block text-sm font-bold text-gray-700 group-focus-within:text-green-600 transition-colors">التاريخ</label>
                  <input
                    v-model="releaseDate"
                    type="date"
                    id="date"
                    class="mt-2 block w-full h-12 rounded-xl border-gray-200 bg-gray-50 px-4 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 focus:bg-white transition-all shadow-sm cursor-pointer"
                  />
                </div>

<!-- v-model="classification" -->
                <!-- <div class="sm:col-span-6 group">
                  <label for="classification" class="block text-sm font-bold text-gray-700 group-focus-within:text-green-600 transition-colors">التصنيف</label>
                  <select
                    
                    id="classification"
                    class="mt-2 block w-full h-12 rounded-xl border-gray-200 bg-gray-50 px-4 outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 focus:bg-white transition-all shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="0">إختر التصنيف</option>
                     <option v-for="c in classifications" :key="c.id" :value="c.id">{{ c.name }}</option> 
                  </select>
                </div> -->
              </div>
            </div>

 <!-- v-if="summary && classification" @click="clear_page" -->
            <div class="flex items-center justify-end gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <button class="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition-all">جديد</button>
              
                <!-- v-if="updataButton && roles.includes('8')" -->
              <button 
              
                
                class="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                تعديل البيانات
              </button>

   <!-- v-if="sendButton"
                @click="sendMail" -->
              <button 
             
                class="px-10 py-2.5 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-100 hover:bg-green-700 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
              >
                <span>إرسال البريد</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </section>

 <!-- v-if="documentSection" -->
        <section
                 


                  class=" lg:col-span-4 col bg-gray-100 rounded-md p-6"
                >
                  <div class="flex w-full justify-between items-center">
                    <h3 class="block text-sm font-semibold text-gray-800">
                      المستندات
                      <!-- <div class="">
                        doc_number : {{ doc_number }} //
                        total_of_doc : {{ total_of_doc }}
                      </div> -->
                    </h3>

                    <!-- <input
                        class="hidden"
                        type="button"
                        @click="scanToJpg(), (show_images = true)"
                      /> -->

                    <!-- <div v-if="roles.includes('upload') && mailId ">
                        
                        <input type="file" multiple @change="try_handleFilesChange"  ref="try_fileinput"/>
                        <button @click="try_upload" class="bg-blue-700 hover:bg-blue-600 w-64 text-white font-bold py-2 mt-2">رفع الصور</button>
                        <p v-if="try_message">{{ try_message }}</p>
                      </div>
   -->

                    <div >
                      <!-- زر مخصص بالعربية -->
                      <label
                        for="fileInput"
                        class="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-300"
                      >
                        اختيار المستندات
                      </label>

                      <!-- input مخفي -->
                      <input
                        type="file"
                        id="fileInput"
                        accept=".jpg"
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
                        رفع الصور
                      </button>

                      <!-- أثناء الرفع -->
                      <div
                        v-if="isUploading"
                        class="mt-2 text-sm text-blue-600"
                      >
                        جاري رفع الصور ... الرجاء الانتظار
                      </div>

                      <!-- عرض عدد الصور -->
                      <div
                        v-if="try_selectedFiles.length"
                        class="mt-2 text-sm text-gray-800"
                      >
                        <p>
                          تم اختيار عدد {{ try_selectedFiles.length }} من
                          المستندات
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

                   
                  </div>

                  <div class="flex justify-between items-center mt-2">
                    <div v-if="image_of_doc" class="w-1/2 flex items-center">
                      <input
                        type="text"
                        v-model="doc_number_to_search"
                        id="doc_number"
                        class="ml-2 block w-16 rounded-md h-10 text-sm border border---200 hover:shadow-sm focus:outline-none focus:border-blue-300 p-2"
                      />

                      <button
                        @click="search_the_doc()"
                        class="py-2 px-4 bg-white rounded-lg tracking-wide border border-blue-600 cursor-pointer hover:text-white hover:bg-blue-600 focus:outline-none duration-300 text-sm leading-normal"
                      >
                        بحث
                      </button>
                    </div>

                    <div class="w-1/2 flex justify-end">
                      <button
                        v-if=" image_of_doc"
                        @click="prepare_delete_all_documents()"
                        class="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg text-white"
                      >
                        حذف كل الصور
                      </button>
                    </div>
                  </div>

                  <div
                    v-if="image_of_doc"
                    class="h-72 w-full rounded-md mt-2 mb-10"
                  >
                    <!--  v-if="imagesToSend != '' || imagesToShow != ''" -->
                    <div class="mt-2 pt-2 pb-4 rounded-md relative">
                      <div
                        
                        class="cursor-not-allowed w-full h-full bg-gray-900 bg-opacity-90 absolute z-20 inset-0"
                      ></div>
                      <div class="">
                        <div class="relative h-64 w-full">
                          <template v-if="isPdfFile(image_of_doc)">
                            <iframe
                              :src="image_of_doc"
                              class="w-full h-64 border-0 object-contain"
                            ></iframe>
                          </template>

                          <img
                            v-else
                            :src="image_of_doc"
                            alt="image"
                            class="w-full h-full rounded object-contain"
                          />

                          <div
                            class="absolute inset-0 flex justify-between items-center"
                          >
                            <div class="">
                              <button
                                @click="farst_documents()"
                                class="bg-gray-500 hover:bg-gray-400 px-2 py-2 rounded-lg text-xs text-white"
                              >
                                &#x276E; &#x276E;
                              </button>
                            </div>

                            <div class="">
                              <button
                                @click="open_model_to_order_image()"
                                type="button"
                                class="bg-green-600 hover:bg-green-500 duration-500 p-0 rounded-full focus:outline-none ml-2"
                              >
                                <div class="w-8 h-8">
                                  <svg
                                    class="w-full h-full text-white mx-auto"
                                    enable-background="new 0 0 100 100"
                                    id="Layer_1"
                                    version="1.1"
                                    viewBox="0 0 100 100"
                                    xml:space="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                  >
                                    <g>
                                      <rect
                                        fill="none"
                                        height="5.9"
                                        width="28.7"
                                        x="32.4"
                                        y="42.7"
                                      />
                                      <rect
                                        fill="none"
                                        height="5.9"
                                        width="28.7"
                                        x="32.4"
                                        y="51.2"
                                      />
                                      <rect
                                        fill="#010101"
                                        height="2.5"
                                        width="28.7"
                                        x="32.4"
                                        y="48.6"
                                      />
                                      <rect
                                        fill="#010101"
                                        height="2.5"
                                        width="28.7"
                                        x="32.4"
                                        y="40.2"
                                      />
                                      <rect
                                        fill="#010101"
                                        height="2.5"
                                        width="28.7"
                                        x="32.4"
                                        y="57.1"
                                      />
                                      <g>
                                        <polygon
                                          points="24.4,26 24.2,26.2 15.1,35.3 16.1,36.3 16.2,36.4 16.4,36.6 16.6,36.8 23.5,29.8 23.5,60.9 24.9,60.9 25.1,60.9     25.3,60.9 25.6,60.9 25.6,29.8 32.5,36.8 33,36.3 33.5,35.8 33.6,35.7 33.8,35.5 34,35.3 24.6,25.9   "
                                        />
                                        <polygon
                                          points="75.4,64.6 75.3,64.5 74.8,64.1 74.5,63.7 74.4,63.6 67.4,70.5 67.4,39.4 66.9,39.4 66.7,39.4 65.6,39.4     65.3,39.4 65.3,70.5 58.4,63.6 58,63.9 57.9,64.1 56.9,65 66,74.1 66.2,74.3 66.4,74.5 66.6,74.3 75.8,65   "
                                        />
                                      </g>
                                    </g>
                                  </svg>
                                </div>

                                <!-- <svg
                                  class="w-4 h-4 text-white mx-auto"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                  ></path>
                                </svg> -->
                              </button>

                              <button
                                @click="show_current_image_for_bigger_screen()"
                                type="button"
                                class="bg-green-600 hover:bg-green-500 duration-500 p-2 rounded-full focus:outline-none ml-2"
                              >
                                <svg
                                  class="w-4 h-4 text-white mx-auto"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                  ></path>
                                </svg>
                              </button>

                              <button
                               
                                type="button"
                                class="bg-red-600 hover:bg-red-500 duration-500 p-2 rounded-full focus:outline-none ml-2"
                                @click="prepare_delete_document()"
                              >
                                <svg
                                  class="w-4 h-4 stroke-current text-white mx-auto"
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
                            </div>

                            <div class="">
                              <button
                                @click="last_documents()"
                                class="bg-gray-500 hover:bg-gray-400 px-2 py-2 rounded-lg text-xs text-white"
                              >
                                &#x276F; &#x276F;
                              </button>
                            </div>
                          </div>
                        </div>

                        <div
                          class="flex justify-between items-center pt-2 MB-2"
                        >
                          <div
                            class="ml-2 flex justify-between items-center w-full"
                          >
                            <div class="w-8 h-8">
                              <button
                                title="prev"
                                v-if="doc_number > 1"
                                @click="GetAllDocN('prev')"
                                class="w-8 h-8 bg-gray-300 rounded flex justify-center items-center"
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

                            <div class="">
                              {{ doc_number }} / {{ total_of_doc }}
                            </div>

                            <div class="w-8 h-8">
                              <button
                                v-if="doc_number < total_of_doc"
                                title="next"
                                @click="GetAllDocN('next')"
                                class="w-8 h-8 bg-gray-300 rounded flex justify-center items-center"
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
                  </div>
                </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
// import asideComponent from "@/components/asideComponent.vue";
// import navComponent from "@/components/navComponent.vue";
// import svgLoadingComponent from "@/components/svgLoadingComponent.vue";
//  import { ensureAccessToken } from "@/services/tokenHelper";

export default {

  //   components: {
  //   asideComponent,
  //   navComponent,
  //   svgLoadingComponent,
  // },


    beforeDestroy() {
    // أو beforeUnmount في Vue 3
    window.removeEventListener("resize", this.handleResize);
  },

    async mounted() {

        var date = new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;


      this.releaseDate = date.getFullYear() + "-" + month + "-" + day;
    },


     data() {
    return {

       releaseDate: "",
         isUploading: false,
      try_progress: 0,
      try_selectedFiles: [],
      try_message: "",
      try_mail_id: "",

      image_of_doc: "",

      roles: [],
    }
  },


  methods:{

    
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

          // تجهيز البيانات
          const data = {
            mail_id: Number(this.mailId),
            userId: Number(this.try_userId),
            list: try_base64List,
          };

          // إرسال الطلب
          await this.$http.documentService.upload_doc_from_web(data);

          // تحديث التقدم
          this.try_progress = Math.round(
            ((i + batch.length) / this.try_selectedFiles.length) * 100,
          );
        }

        this.try_message = "تم رفع الصور بنجاح ✅";
        this.try_selectedFiles = [];
        this.$refs.try_fileinput.value = null;
        this.GetAllDocN("next");
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

  }
}

</script>