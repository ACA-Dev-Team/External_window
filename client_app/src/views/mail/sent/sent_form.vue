<template>
  <div class="">
    
    <div class="h-screen bg-gray-100 overflow-hidden flex">
      <asideComponent :isOpen="menuOpen" ></asideComponent>
     <ProfessionalTour tourKey="sent_form_tour" :showTour="true" />
      <div class="flex-1 bg-gray-200 w-0 overflow-y-auto">
        <div class="max-w-screen-2xl mx-auto flex flex-col md:px-8">
          <navComponent @menu-toggled="onMenuToggle"></navComponent>

          <main class="flex-1 relative focus:outline-none py-6">
            <div class="grid grid-cols-2 lg:grid-cols-7 gap-6">
              <section
                class="col-span-5 flex flex-col xl:flex-row items-center justify-between"
              >
                <div class="xl:w-2/12 w-full ml-3">
                  <h3 class="text-xl font-semibold text-gray-900">
                    معلومات البريد
                  </h3>
                </div>
              </section>

              <section class="col-span-2">
                <div
                data-tour="هنا هنا سيظهر رقم البريد تلقائيا بعد عملية حفظ البريد "
                  class="float-left text-sm font-semibold text-gray-800 flex items-center"
                >
                  رقم الرسالة

                  <span
                    class="mr-4 underline font-bold text-2xl flex items-center"
                  >
                    <input
                      type="number"
                      min="1"
                      max="5000"
                      @keypress.enter="mail_search()"
                      class="w-24 px-1 rounded-md focus:outline-none"
                      v-model="mail_Number"
                    />

                    <div
                      class="w-16 px-1 rounded-md font-normal focus:outline-none mx-4 bg-white"
                    >
                      {{ my_department_id }}
                    </div>

                    <input
                      type="number"
                      @keypress.enter="mail_search()"
                      class="w-20 px-1 rounded-md focus:outline-none"
                      v-model="mail_year"
                    />
                  </span>
                </div>
              </section>
            </div>

            <div class="mt-6 space-y-6 relative">
              <div
                v-if="mailType == ''"
                class="bg-gray-200 bg-opacity-80 rounded-lg absolute z-50 inset-0"
              ></div>

              <div class="grid grid-cols-2 lg:grid-cols-7 gap-6">
                <section
                  class="col-span-5 flex flex-col lg:flex-row gap-4 items-stretch"
                >
                  <section
                    class="lg:w-6/12 w-full grid grid-cols-1 gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-inner"
                  >
                    <div data-tour="هنا يجب كتابة ملخص الموضوع المراد إرساله إلى هيئة الرقابة الإدارية" class="">
                      <label
                        for="summary"
                        class="block text-[11px] uppercase tracking-wider font-bold text-gray-500"
                      >
                        الملخص
                      </label>
                      <textarea
                        tabindex="1"
                        v-model="summary"
                        id="summary"
                        rows="4"
                        class="block w-full text-sm text-gray-800 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 p-3 transition resize-none bg-white shadow-sm"
                      ></textarea>
                    </div>

                    <div data-tour=" هنا حقل التاريخ الذي سيكون تلقائيا مربوط بالتاريخ الحالي لإدخال الرسالة الرسالة" class="">
                      <label
                        for="date"
                        class="block text-[11px] uppercase tracking-wider font-bold text-gray-500"
                      >
                        التاريخ
                      </label>
                      <input
                        v-model="releaseDate"
                        type="date"
                        id="date"
                        class="block w-full rounded-xl h-10 text-sm text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 px-3 transition bg-white shadow-sm"
                      />
                    </div>

                            <div data-tour=" في هذا الحقل يجب إدخال الرقم الإشاري الممنوح للمراسلة  الخاصة بالجهةالجهة  ليتيح لكم لاحقا تعدد البحث بحيث يمكنكم البحث بالرقم الاشاري الممنوح من المنظومة أو الرقم الإشاري الممنوح من قبلكم" class="">
                    <label
                      for="entity_reference_number"
                      class="block text-[11px] uppercase tracking-wider font-bold text-gray-500"
                    >
                    رقم إشاري الجهة
                    </label>
                    <input
                      v-model="entity_reference_number"
                      type="number"
                      id="entity_reference_number"
                      class="block w-full rounded-xl h-10 text-sm text-gray-700 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 px-3 transition bg-white shadow-sm"
                      required
                    />
                  </div>

                  </section>

                  <section
                    class="lg:w-6/12 w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-inner flex flex-col"
                  >
                    <div
                    data-tour="هنا يمكنك كتابة الغرض من ارسال هذه الرسالة بصورة مختصرة"
                      v-if="my_department_id != 79"
                      class="w-full h-full flex flex-col space-y-2"
                    >
                      <label
                        for="required_action"
                        class="block text-[11px] uppercase tracking-wider font-bold text-gray-500"
                      >
                        الإجراء المطلوب
                      </label>
                      <textarea
                        tabindex="4"
                        v-model="required_action"
                        id="required_action"
                        class="block w-full flex-1 text-sm text-gray-800 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 p-3 transition resize-none bg-white shadow-sm"
                      ></textarea>
                    </div>
                  </section>
                </section>
                <section
                  v-if="documentSection"
                  data-tour="هنا يمكنك إضافة المستندات عن طريقة ميزة رفع الصور أو الملفات (PDF) علما بأن ظهور زر الرفع مرتبط بحفظ البريد"
                  class="w-full col-span-4 lg:col-span-2 bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-inner"
                >
                  <div class="flex w-full justify-between items-center">
                    <h3 class="block text-[11px] uppercase tracking-wider font-bold text-gray-500">
                      المستندات
                    </h3>

                    <div v-if="mailId">
                      <!-- زر مخصص بالعربية -->

                      <label
                        for="fileInput"
                        class="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-300"
                      >
                        اختر الصور
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
                        v-if="roles.includes('6') && image_of_doc"
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
                        v-if="!roles.includes('ggg')"
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
                                v-if="roles.includes('6')"
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
              </div>

              <section
                v-if="
                  signture_images.length > 0 &&
                  (roles.includes('signature') ||
                    roles.includes('sendforsignature'))
                "
                class="lg:col-span-2 col-span-5 w-full bg-gray-100 rounded-md py-6"
              >
                <div class="flex justify-center items-center">
                  <h3 class="block text-base font-semibold text-gray-800">
                    المستندات المهمشة
                  </h3>
                </div>

                <div class="h-72 w-full bg-gray-100 rounded-md mt-4 mb-10">
                  <!--  v-if="imagesToSend != '' || imagesToShow != ''" -->

                  <div class="mt-4 pt-4 pb-4 rounded-md relative">
                    <!-- لو المستخدم ما عنده الصلاحية -->

                    <div
                      v-if="!roles.includes('sss')"
                      class="cursor-not-allowed w-full h-full bg-gray-900 bg-opacity-90 absolute z-20 inset-0"
                    ></div>

                    <div>
                      <div class="relative h-64 w-full">
                        <!-- الصورة -->

                        <img
                          :src="signture_images[0].path"
                          alt="image"
                          class="w-full h-full rounded object-contain"
                        />

                        <!-- وسم مائي -->

                        <div
                          class="absolute w-24 z-10 pointer-events-none flex justify-center items-center"
                          style="
                            top: 50%;

                            left: 50%;

                            transform: translate(-50%, -50%) rotate(-5deg);
                          "
                        >
                          <span
                            class="text-6xl font-bold text-gray-400 opacity-20 select-none"
                          >
                            {{ user_name33 }}
                          </span>
                        </div>

                        <div
                          class="absolute z-20 flex justify-center items-center"
                          style="
                            top: 50%;

                            left: 50%;

                            transform: translate(-50%, -50%) rotate(-50deg);
                          "
                        >
                          <button
                            @click="show_current_image_for_bigger_screen_sig()"
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
                        </div>
                      </div>

                      <!-- التنقل بين المستندات -->

                      <div
                        class="flex justify-center justify-self-center items-center pt-2 mt-2"
                      >
                        <div
                          class="ml-2 flex justify-center items-center w-full"
                        >
                          <div>عدد {{ signture_images.length }} مستند مهمش</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div class="sm:col-span-6 flex items-center justify-end mt-10">
                  <div class="flex justify-end ml-6">
                    <!--  :href="$router.resolve({ name: 'sent-add' }).href" -->

                    <button
                      v-if="summary "
                      @click="clear_page()"
                      class="flex justify-center items-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md border-green-600 text-green-600 hover:shadow-lg focus:shadow-none duration-300 focus:outline-none"
                    >
                      <svg
                        class="w-5 h-5 stroke-current ml-2 fill-current"
                        enable-background="new 0 0 512 512"
                        height="512"
                        viewBox="0 0 512 512"
                        width="512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path d="m115.817 138.734h195.166v30h-195.166z" />

                          <path d="m115.817 198.734h195.166v30h-195.166z" />

                          <path d="m115.817 258.734h195.166v30h-195.166z" />

                          <path
                            d="m438.304 330.762c-15.36-15.361-34.297-25.016-54.154-28.976v-301.786h-272.714l-68.786 68.787v372.418h220.429c5.203 14.767 13.686 28.302 25.084 39.7 20.052 20.052 46.713 31.095 75.071 31.095 28.357 0 55.019-11.043 75.07-31.096 41.395-41.394 41.395-108.747 0-150.142zm-316.92-298.283v46.255h-46.255zm-48.734 378.726v-302.47h78.734v-78.735h202.766v270.11c-24.084 2.05-47.598 12.262-65.987 30.652-20.053 20.052-31.096 46.713-31.096 75.071 0 1.798.045 3.588.133 5.371h-184.55zm344.442 48.486c-14.386 14.386-33.513 22.309-53.858 22.309-20.346 0-39.473-7.923-53.858-22.309-14.386-14.386-22.309-33.513-22.309-53.857s7.923-39.472 22.309-53.858c14.851-14.85 34.351-22.273 53.858-22.273 19.502 0 39.011 7.426 53.857 22.273 29.698 29.697 29.698 78.018.001 107.715z"
                          />

                          <path
                            d="m378.233 365.807h-30v25.026h-25.026v30h25.026v25.027h30v-25.027h25.027v-30h-25.027z"
                          />
                        </g>
                      </svg>

                      جديد
                    </button>
                  </div>
                  <div
                    v-if="
                      updataButton &&
                      (!(Number(mail_year) < year1) || roles.includes('8'))
                    "
                    class="flex justify-end ml-6"
                  >
                    <div class="">
                      <button
                        v-if="summary"
                        @click="updateMail"
                        type="button"
                        id="edit"
                        class="w-full sm:w-auto sm:mr-3 flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md border-green-600 text-white bg-green-600 hover:shadow-lg focus:shadow-none duration-300 focus:outline-none"
                      >
                        <!-- onclick="change();" -->
                        <svg
                          class="w-4 h-4 stroke-current text-white ml-2 fill-current"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 477.873 477.873"
                          style="enable-background: new 0 0 477.873 477.873"
                          xml:space="preserve"
                        >
                          <g>
                            <g>
                              <path
                                d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2
                                              c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067
                                              S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2
                                              c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"
                              ></path>
                            </g>
                          </g>
                          <g>
                            <g>
                              <path
                                d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937
                                              c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585
                                              c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13
                                              l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202
                                              L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955
                                              C443.754,73.631,440.467,81.575,434.603,87.419z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        تعديل
                      </button>
                    </div>
                  </div>

                  <!-- <div v-if="deleteButton" class="flex justify-end ml-6">
                    <div v-if="roles.includes('3') && mailType == '1'" class="">
                      <button
                        v-if="
                          summary &&
                          classification &&
                          (consignees.length != 0 ||
                            newactionSenders.length != 0)
                        "
                        @click="prepare_delete_mail()"
                        type="button"
                        id="edit"
                        class="w-full sm:w-auto sm:mr-3 flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md border-green-600 text-white bg-green-600 hover:shadow-lg focus:shadow-none duration-300 focus:outline-none"
                      >
                      
                        <svg
                          class="w-4 h-4 stroke-current text-white ml-2 fill-current"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 477.873 477.873"
                          style="enable-background: new 0 0 477.873 477.873"
                          xml:space="preserve"
                        >
                          <g>
                            <g>
                              <path
                                d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2
                                              c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067
                                              S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2
                                              c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"
                              ></path>
                            </g>
                          </g>
                          <g>
                            <g>
                              <path
                                d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937
                                              c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585
                                              c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13
                                              l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202
                                              L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955
                                              C443.754,73.631,440.467,81.575,434.603,87.419z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        حذف
                      </button>
                    </div>

                    <div v-if="roles.includes('5') && mailType == '2'" class="">
                      <button
                        v-if="
                          summary &&
                          classification &&
                          (consignees.length != 0 ||
                            newactionSenders.length != 0)
                        "
                        @click="prepare_delete_mail()"
                        type="button"
                        id="edit"
                        class="w-full sm:w-auto sm:mr-3 flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md border-green-600 text-white bg-green-600 hover:shadow-lg focus:shadow-none duration-300 focus:outline-none"
                      >
                      
                        <svg
                          class="w-4 h-4 stroke-current text-white ml-2 fill-current"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 477.873 477.873"
                          style="enable-background: new 0 0 477.873 477.873"
                          xml:space="preserve"
                        >
                          <g>
                            <g>
                              <path
                                d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2
                                              c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067
                                              S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2
                                              c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"
                              ></path>
                            </g>
                          </g>
                          <g>
                            <g>
                              <path
                                d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937
                                              c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585
                                              c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13
                                              l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202
                                              L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955
                                              C443.754,73.631,440.467,81.575,434.603,87.419z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        حذف
                      </button>
                    </div>

                    <div v-if="roles.includes('4') && mailType == '3'" class="">
                      <button
                        v-if="summary && classification"
                        @click="prepare_delete_mail()"
                        type="button"
                        id="edit"
                        class="w-full sm:w-auto sm:mr-3 flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md border-green-600 text-white bg-green-600 hover:shadow-lg focus:shadow-none duration-300 focus:outline-none"
                      >
                     
                        <svg
                          class="w-4 h-4 stroke-current text-white ml-2 fill-current"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 477.873 477.873"
                          style="enable-background: new 0 0 477.873 477.873"
                          xml:space="preserve"
                        >
                          <g>
                            <g>
                              <path
                                d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2
                                              c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067
                                              S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2
                                              c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"
                              ></path>
                            </g>
                          </g>
                          <g>
                            <g>
                              <path
                                d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937
                                              c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585
                                              c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13
                                              l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202
                                              L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955
                                              C443.754,73.631,440.467,81.575,434.603,87.419z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                        حذف
                      </button>
                    </div>
                  </div> -->

                  <div v-if="saveButton" class="flex justify-end">
                    <div v-if="mailType == '3'" class="">
                      <button
                        v-if="summary"
                        class="flex justify-center items-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md border-green-600 text-white bg-green-600 hover:shadow-lg focus:shadow-none duration-300 focus:outline-none"
                        @click="saveMail()"
                      >
                        <svg
                          class="w-4 h-4 stroke-current ml-2 fill-current"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 512 512"
                          style="enable-background: new 0 0 512 512"
                          xml:space="preserve"
                        >
                          <g>
                            <g>
                              <g>
                                <path
                                  d="M166,332h180c8.284,0,15-6.716,15-15s-6.716-15-15-15H166c-8.284,0-15,6.716-15,15S157.716,332,166,332z"
                                ></path>
                                <path
                                  d="M166,392h180c8.284,0,15-6.716,15-15s-6.716-15-15-15H166c-8.284,0-15,6.716-15,15S157.716,392,166,392z"
                                ></path>
                                <path
                                  d="M507.606,84.394l-80-80C424.793,1.58,420.978,0,417,0H15C6.716,0,0,6.716,0,15v482c0,8.284,6.716,15,15,15
                                                  c6.912,0,477.495,0,482,0c8.284,0,15-6.716,15-15V95C512,91.021,510.419,87.206,507.606,84.394z M121,30h210v100H121V30z
                                                  M391,482H121V272h270V482z M482,482h-61V257c0-8.284-6.716-15-15-15H106c-8.284,0-15,6.716-15,15v225H30V30h61v115
                                                  c0,8.284,6.716,15,15,15h240c8.284,0,15-6.716,15-15V30h49.787L482,101.213V482z"
                                ></path>
                                <path
                                  d="M166,452h180c8.284,0,15-6.716,15-15s-6.716-15-15-15H166c-8.284,0-15,6.716-15,15S157.716,452,166,452z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                        حفظ
                      </button>
                    </div>
                  </div>

                  <div v-if="sendButton" class="flex justify-end">
                    <div v-if="roles.includes('1') && mailType == '3'" class="">
                      <button
                        v-if="summary"
                        class="flex justify-center items-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md border-green-600 text-white bg-green-600 hover:shadow-lg focus:shadow-none duration-300 focus:outline-none"
                        @click="sendMail()"
                      >
                        <svg
                          class="w-4 h-4 stroke-current ml-2 fill-current"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 512 512"
                          style="enable-background: new 0 0 512 512"
                          xml:space="preserve"
                        >
                          <g>
                            <g>
                              <g>
                                <path
                                  d="M166,332h180c8.284,0,15-6.716,15-15s-6.716-15-15-15H166c-8.284,0-15,6.716-15,15S157.716,332,166,332z"
                                ></path>
                                <path
                                  d="M166,392h180c8.284,0,15-6.716,15-15s-6.716-15-15-15H166c-8.284,0-15,6.716-15,15S157.716,392,166,392z"
                                ></path>
                                <path
                                  d="M507.606,84.394l-80-80C424.793,1.58,420.978,0,417,0H15C6.716,0,0,6.716,0,15v482c0,8.284,6.716,15,15,15
                                                  c6.912,0,477.495,0,482,0c8.284,0,15-6.716,15-15V95C512,91.021,510.419,87.206,507.606,84.394z M121,30h210v100H121V30z
                                                  M391,482H121V272h270V482z M482,482h-61V257c0-8.284-6.716-15-15-15H106c-8.284,0-15,6.716-15,15v225H30V30h61v115
                                                  c0,8.284,6.716,15,15,15h240c8.284,0,15-6.716,15-15V30h49.787L482,101.213V482z"
                                ></path>
                                <path
                                  d="M166,452h180c8.284,0,15-6.716,15-15s-6.716-15-15-15H166c-8.284,0-15,6.716-15,15S157.716,452,166,452z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                        إرسال
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <div>.</div>
            </div>
          </main>
          <div>..</div>
        </div>
      </div>
    </div>

    <div
      v-if="alert_prepare_delete_document"
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
        <p class="text-xl font-bold mt-4">هل انت متأكد من عملية الحذف؟</p>
        <p class="text-gray-600">لن تتمكن من استرداد المستند بعد حذفه.</p>

        <div class="mt-6">
          <button
            v-if="delete_all_documents"
            @click="deleteAllDocuments()"
            class="bg-red-600 hover:bg-red-700 hover:shadow-lg duration-200 rounded text-white w-32 py-1 ml-2"
          >
            نعم ، احذفها
          </button>

          <button
            v-else
            @click="deleteDocument()"
            class="bg-red-600 hover:bg-red-700 hover:shadow-lg duration-200 rounded text-white w-32 py-1 ml-2"
          >
            نعم ، احذفها
          </button>
          <button
            @click="alert_prepare_delete_document = false"
            class="bg-gray-400 hover:bg-gray-700 hover:shadow-lg duration-200 rounded text-white w-32 py-1 mr-2"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="alert_prepare_delete_mail"
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
        <p class="text-xl font-bold mt-4">هل انت متأكد من عملية الحذف؟</p>
        <p class="text-gray-600">لن تتمكن من استرداد البريد بعد حذفه.</p>

        <div class="mt-6">
          <button
            @click="deleteMail"
            class="bg-red-600 hover:bg-red-700 hover:shadow-lg duration-200 rounded text-white w-32 py-1 ml-2"
          >
            نعم ، احذفها
          </button>
          <button
            @click="alert_prepare_delete_mail = false"
            class="bg-gray-400 hover:bg-gray-700 hover:shadow-lg duration-200 rounded text-white w-32 py-1 mr-2"
          >
            إلغاء
          </button>
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

    <div
      v-if="show_current_image_for_bigger_screen_model"
      class="w-screen h-full fixed inset-0 z-50 overflow-hidden"
    >
      <div class="relative">
        <div
          v-if="image_to_print_n_model"
          id="print_one_dec"
          class="bg-black bg-opacity-50 h-screen-100"
        >
          <div class="h-screen-100">
            <template v-if="isPdfFile(image_of_doc)">
              <iframe
                :src="image_of_doc"
                class="w-full h-screen border-0"
              ></iframe>
            </template>

            <!-- صورة واحدة أو عدة صور -->
            <template v-else>
              <img
                :src="image_of_doc"
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
            v-if="!isPdfFile(image_of_doc)"
            type="button"
            @click="image_rotate = !image_rotate"
            class="absolute text-white font-bold px-8 z-50 bg-yellow-500 py-2 right-12"
          >
            تدوير الصفحة
          </button>

          <div class="w-3/4 mx-auto relative">
            <div
              class="absolute top-6 z-50 flex justify-between items-center w-full"
            >
              <button
                @click="show_current_image_for_bigger_screen_model = false"
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
                v-if=" isPdfFile(image_of_doc)"
                @click="printPdf(image_of_doc)"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة المستند الحالي
              </button>

              <button
                v-else-if="roles.includes('kkk')"
                @click="print_image()"
                v-print="'#print_one_dec'"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
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
              <div
                v-if="image_of_doc"
                class="flex items-center border border-blue-400 rounded-md"
              >
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
            </div>

            <div class="h-screen-93 min-w-full mt-4 relative">
              <template class="min-w-full" v-if="isPdfFile(image_of_doc)">
                <iframe
                  :src="image_of_doc"
                  class="min-w-full h-screen border-0 object-contain"
                ></iframe>
              </template>

              <!-- صورة واحدة أو عدة صور -->
              <template class="w-full" v-else>
                <img
                  :class="image_rotate ? 'rotate-0' : 'rotate-180'"
                  class="h-full w-full object-contain transform z-0"
                  :src="image_of_doc"
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

            <div
              class="absolute bottom-3 z-50 bg-gray-100 flex justify-between items-center w-full mx-auto mt-4"
            >
              <div class="">
                <button
                  @click="farst_documents()"
                  class="bg-gray-500 hover:bg-gray-400 px-2 py-2 rounded-lg text-xs text-white"
                >
                  &#x276E; &#x276E;
                </button>
              </div>

              <div class="w-12 h-8">
                <button
                  title="prev"
                  v-if="doc_number > 1"
                  @click="GetAllDocN('prev')"
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
                {{ doc_number }} / {{ total_of_doc }}
              </div>

              <div class="w-12 h-8">
                <button
                  v-if="doc_number < total_of_doc"
                  title="next"
                  @click="GetAllDocN('next')"
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
        </div>
      </div>
    </div>

    <div
      v-if="show_current_reply_image_to_for_bigger_screen_model"
      class="w-screen h-full absolute inset-0 z-50 overflow-hidden"
    >
      <div class="relative">
        <div
          v-if="reply_image_to_print_n_model"
          id="print_reply_doc_n"
          class="bg-black bg-opacity-50 h-screen-100"
        >
          <!--  v-for="image in reply_image_to_print_n"
            :key="image.id" -->
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
                v-if=" isPdfFile(reply_image_of_doc)"
                @click="printPdf(reply_image_of_doc)"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة المستند الحالي
              </button>

              <button
                v-else-if="roles.includes('kkk')"
                @click="print_reply_image()"
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
    </div>

    <div
      v-if="alert_state"
      class="w-screen h-full flex justify-center items-center absolute inset-0 z-50 overflow-hidden bg-black bg-opacity-70"
    >
      <div
        class="bg-yellow-100 rounded-md w-1/3 py-10 flex flex-col justify-center items-center"
      >
        <div
          v-if="alert_state_true_false"
          class="flex flex-col justify-center items-center"
        >
          <div class="">
            <svg
              class="w-14 h-14 stroke-current stroke-2 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p class="text-xl font-bold mt-4">تمت العملية بنجاح..</p>
        </div>

        <div v-else class="flex flex-col justify-center items-center">
          <div class="">
            <svg
              class="w-14 h-14 stroke-current stroke-2 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p class="text-xl font-bold mt-4">فشلت العملية..</p>
        </div>

        <div class="mt-6">
          <button
            @click="alert_state = false"
            class="bg-blue-500 hover:bg-blue-700 hover:shadow-lg duration-200 rounded text-white w-32 py-1 mr-2"
          >
            حسناً
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="show_current_image_for_bigger_screen_model_sig"
      class="w-screen h-full fixed inset-0 z-50 overflow-hidden"
    >
      <div class="relative">
        <div
          v-if="image_to_print_n_model_sig"
          id="print_one_dec_sig"
          class="bg-black bg-opacity-50 h-screen-100"
        >
          <div class="h-screen-100">
            <!-- صورة واحدة أو عدة صور -->
            <template>
              <img
                :src="signture_images[currentIndex_sig].path"
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
          <div class="w-3/4 mx-auto relative">
            <div
              class="absolute top-6 z-50 flex justify-between items-center w-full"
            >
              <button
                @click="show_current_image_for_bigger_screen_model_sig = false"
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
                @click="print_image_sig()"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة المستند الحالي
              </button>
            </div>

            <!-- الصورة مع العلامة المائية -->
            <div class="relative h-screen-93 min-w-full mt-4">
              <!-- صورة واحدة أو عدة صور -->
              <template class="w-full">
                <img
                  :class="image_rotate ? 'rotate-0' : 'rotate-180'"
                  class="h-full w-full object-contain transform z-0"
                  :src="signture_images[currentIndex_sig].path"
                  :alt="'Image '"
                />
              </template>

              <!-- watermark -->
              <div
                class="absolute z-10 pointer-events-none flex justify-center items-center"
                style="
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%) rotate(-50deg);
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
                  v-if="currentIndex_sig + 1 > 1"
                  @click="prevImage_sig"
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
                {{ currentIndex_sig + 1 }} / {{ signture_images.length }}
              </div>

              <div class="w-12 h-8">
                <button
                  v-if="currentIndex_sig + 1 < signture_images.length"
                  title="next"
                  @click="nextImage_sig"
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
    </div>

    <div
      v-if="show_model_to_order_image"
      class="w-screen h-full absolute inset-0 z-50 overflow-hidden"
    >
      <div class="relative">
        <div
          class="h-screen bg-black bg-opacity-90 absolute top-0 inset-0 z-50 w-full"
        >
          <div class="w-full text-white">
            <div class="">
              <div
                class="flex justify-between items-center w-full p-4 text-white text-xl"
              >
                <div class="">
                  <span>ترتيب مرفقات للبريد </span>
                  <span class="underline">
                    {{ mail_Number }} {{ my_department_id }} {{ mail_year }}
                  </span>
                </div>
                <div
                  @click="show_model_to_order_image = false"
                  class="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center"
                >
                  X
                </div>
              </div>
            </div>

            <div class="flex items-start justify-between p-4">
              <div class="w-3/12 h-screen-75">
                <p>الترتيب الحالي</p>
                <div class="bg-white p-1 overflow-y-scroll mt-4 h-screen-75">
                  <button
                    @click="select_image_to_ordering(n)"
                    class="my-1 py-1 w-full"
                    v-for="(n, index) in ordering_image_list"
                    :key="n.id"
                    :class="
                      index_of_image_selected == n.order
                        ? 'bg-blue-700 hover:bg-blue-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    "
                  >
                    الصورة رقم
                    {{ index + 1 }}
                  </button>
                </div>
              </div>

              <div
                class="w-2/12 h-screen-75 flex flex-col items-center justify-center"
              >
                <button
                  @click="show_image_to_ordering()"
                  class="bg-gray-600 hover:bg-gray-500 my-5 py-1 w-44"
                >
                  عرض المرفق
                </button>

                <button
                  @click="transfer_image_to_order()"
                  class="bg-gray-600 hover:bg-gray-500 my-5 py-1 w-44"
                >
                  نقل المرفق
                </button>

                <button
                  @click="transfer_back_image_to_order()"
                  class="bg-gray-600 hover:bg-gray-500 my-5 py-1 w-44"
                >
                  إرجاع المرفق
                </button>

                <button
                  @click="transfer_all_images_to_order()"
                  class="bg-gray-600 hover:bg-gray-500 my-5 py-1 w-44"
                >
                  نقل كل المرفقات
                </button>

                <button
                  @click="transfer_back_images_to_order()"
                  class="bg-gray-600 hover:bg-gray-500 my-5 py-1 w-44"
                >
                  إرجاع كل المرفقات
                </button>

                <button
                  @click="save_new_order()"
                  class="bg-green-600 hover:bg-green-500 mt-10 py-1 w-48 text-lg font-bold"
                >
                  حفظ الترتيب الجديد
                </button>
              </div>

              <div class="w-3/12 h-screen-75">
                <p>الترتيب الجديد</p>
                <div class="bg-white p-1 overflow-y-scroll mt-4 h-screen-75">
                  <button
                    @click="select_image_to_ordering(n)"
                    class="my-1 py-1 w-full"
                    v-for="(n, index) in new_ordering_image_list"
                    :key="n.id"
                    :class="
                      index_of_image_selected == n.order
                        ? 'bg-blue-700 hover:bg-blue-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    "
                  >
                    الصورة رقم
                    {{ index + 1 }}
                  </button>
                </div>
              </div>

              <div class="w-4/12 h-screen-75 pr-6">
                <p>المرفق</p>
                <div class="w-full h-screen-75 bg-gray-400 mt-4">
                  <img
                    :src="image_ordering"
                    alt="image"
                    :class="image_rotate ? 'rotate-0' : 'rotate-180'"
                    class="h-full w-full object-contain transform"
                  />
                </div>
              </div>
            </div>
          </div>
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
import ProfessionalTour from '@/components/ProfessionalTour.vue';

export default {
  created() {},


  components: {
    asideComponent,
    navComponent,
    svgLoadingComponent,
    ProfessionalTour
  },

  beforeDestroy() {
    // أو beforeUnmount في Vue 3
    window.removeEventListener("resize", this.handleResize);
  },

  async mounted() {
   
      window.addEventListener("resize", this.handleResize);

    this.user_name33 = localStorage.getItem("user_name");

    this.roles = localStorage.getItem("Az07");

    this.mailType = 3;
    if (
      localStorage.getItem("AY_LW") == null ||
      localStorage.getItem("member") == "true" ||
      !this.roles.includes("aaa")
    ) {
      this.$router.push("/");
    }

    this.isperent = localStorage.getItem("isperent");

    this.dep_type = localStorage.getItem("dep_type");

    var date = new Date();

    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    this.releaseDate = date.getFullYear() + "-" + month + "-" + day;

    this.genaral_inbox_year = date.getFullYear();
    this.year1 = Number(date.getFullYear());
    this.mail_year = date.getFullYear();
    this.mail_year_mail = date.getFullYear();
    this.my_user_id = localStorage.getItem("AY_LW");
    this.my_department_id = localStorage.getItem("chrome");

    if (this.$route.params.mail) {
      this.screenFreeze = true;
      this.loading = true;

      if (this.$route.params.type == "1") {
        this.to_test_passing_mail_type = 1;
        this.mailType = 1;
      }
      if (this.$route.params.type == "2") {
        this.to_test_passing_mail_type = 2;
        this.mailType = 2;
      }
      if (this.$route.params.type == "3") {
        this.to_test_passing_mail_type = 3;
        this.mailType = 3;
      }

      setTimeout(() => {
        this.mailId = this.$route.params.mail;
        this.GetSentMailById();
        this.GetAllDocN("next");

        this.sendButton = true;
        this.updataButton = true;
        this.deleteButton = true;
        this.saveButton = false;

        setTimeout(() => {
          this.screenFreeze = false;
          this.loading = false;
        }, 100);
      }, 500);
    } else {
    }
  },

  computed: {
    currentImagesig() {
      return this.signture_images[this.currentIndexsig] || null;
    },
  },

  data() {
    return {
      banchs: [],
      branchselect: false,
      branchNameSelected: "",
      branchIdSelected: "",
      branchName: "",
      allbranch: false,
      allbranchButton: true,
      measureselectbranch: false,
      measureNameSelectedbranch: "",
      measureIdSelectedbranch: "",
      show_branch: false,

      blblblbranch: [],
      AllBranches: [],

      add_button_consigneesbranch: true,

      dep_type: "",

      other_docoments: false,

      p_id: 0,
      p_uid: 0,
      p_did: 0,
      p_mydep: 0,

      menuOpen: true,

      consignees_rec: [],
      new_rec: [],
      consigneesIncludesId: [],
      new_rec_IncludesId: [],

      rec_name: "",

      user_name33: "",

      isUploading: false,
      try_progress: 0,
      try_selectedFiles: [],
      try_message: "",
      try_mail_id: "",
      try_userId: localStorage.getItem("AY_LW"),
      user_department: localStorage.getItem("chrome"),

      id_of_image_selected: "",
      selected_image: "",
      ordering_image_list: [],
      new_ordering_image_list: [],

      index_of_image_selected: "",
      image_ordering: "",
      id_image_ordering: "",

      image_rotate: true,
      isperent: false,

      year1: 0,

      image_rotate: true,
      doc_number_to_search: "",
      delete_all_documents: false,

      reply_id_to_delete: "",
      alert_delete_document: false,

      alert_state: false,
      alert_state_true_false: false,
      alert_prepare_delete_document: false,
      alert_prepare_delete_mail: false,
      //*************

      filter_text: "",
      mail_flag: "",
      keyid: "",
      conn: null,

      imagesscantest: [],
      indexOfimagesToShow1: 0,
      arimage: [],
      user11: [],

      //******************
      roles: [],
      show_images: false,

      from_reply_or_general: "",
      indexOfDepartment: "",
      allDepartment: false,
      allDepartmentButton: true,

      allsubDepartment: false,
      allsubDepartmentButton: true,

      blblbl: [],
      to_test_print_images_model: false,
      show_images_model: false,

      testimage_images_model: "",
      indextotest_images_model: 0,

      show_images_images_model: [],

      replies: [],
      reply_to_add: "",
      sends_id: this.$route.params.sends_id,
      replyByDepartmenId: "",

      testimageToSend: "",
      indextotestToSend: 0,

      testimage: "",
      test_image_id: "",
      indextotest: 0,

      classifications: [],

      measures: [],
      measureselect: false,
      measureNameSelected: "",
      measureIdSelected: "",

      departments: [],
      departmentselect: false,
      departmentNameSelected: "",
      departmentIdSelected: "",
      departmentName: "",
      departmentflag: 0,

      departments_for_rec: [],
      departmentselect_for_rec: false,
      departmentNameSelected_for_rec: "",
      departmentIdSelected_for_rec: "",
      departmentName_for_rec: "",

      consignees: [],
      consignees1: [],
      consigneesIncludesId: [],
      newactionSenders: [],
      newactionSendersIncludesId: [],

      releaseDate: "",
      summary: "",
      classification: "",
      mailType: "",
      general_incoming_number: "",
      genaral_inbox_year: "",
      required_action: "",

      mailId: this.$route.params.mail,
      external_mailId: "",

      saveButton: true,
      sendButton: false,
      updataButton: false,
      deleteButton: false,
      ButtonUploadImagesMail: false,

      mail_Number: "",
      department_Id: "",

      imagesToSend: [],
      indexOfimagesToShow: 0,

      my_user_id: "",
      my_department_id: "",

      action_required_by_the_entity: "",
      mail_forwarding: 2,

      send_to_sector: "",

      sectors: [],
      sectorselect: false,
      sectorNameSelected: "",
      sectorIdSelected: "",

      sides: [],

      sideselect: false,
      sideNameSelected: "",
      sideIdSelected: "",

      send_to_side: "",

      entity_reference_number: "",
      procedure_type: 1,
      entity_mail_date: "",
      mail_ward_type: 1,
      ward_to: "",

      to_test_passing_mail_type: 1,
      remove_button_consignees: true,
      add_button_consignees: true,

      add_button_consignees_rec: true,

      isThisMobile: false,

      send_to_sector_ward: "",

      side: 0,
      action: 0,

      mail_year: "",
      mail_year_mail: "",

      imagesToShow: [],

      showAlert: false,

      addErorr: null,

      documentSection: true,
      proceduresSection: false,

      marginalizedDocuments: [],

      this_value_to_solve_repetition_department: true,

      //
      //name: this.$authenticatedUser.name,
      // userName: this.$authenticatedUser.userName,
      // validity: this.$authenticatedUser.validity,

      loading: false,
      screenFreeze: false,

      doc_number: 0,
      total_of_doc: 0,

      image_of_doc: "",
      id_of_doc: "",
      image_to_print_n: [],

      image_to_print_n_model: false,
      show_current_image_for_bigger_screen_model: false,
      show_model_to_order_image: false,

      reply_doc_number: 0,
      reply_total_of_doc: 0,

      reply_image_of_doc: "",
      reply_id_of_doc: "",
      reply_image_to_print_n: [],

      reply_image_to_print_n_model: false,
      show_current_reply_image_to_for_bigger_screen_model: false,

      id_reply_image: "",

      is_exisite_genaral_inbox_number: true,
      old_mail_number: "",
      conclusion: "",

      office_type: "",

      sector_side_new_array_id: [],
      sector_side_new_array: [],
      sector_side_old_array: [],
      sector_side_old_array_id: [],

      sector_side_from_delet_fun: false,

      signture_images: [],
      show_current_image_for_bigger_screen_model_sig: false,

      image_to_print_n_model_sig: false,
      currentIndex_sig: 0,
    };
  },

  computed: {
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

    filterByTerm2() {
      return this.AllBranches.filter((branch) => {
        return branch.departmentName.includes(this.branchNameSelected);
      });
    },
  },

  watch: {
    selectedImages_sig() {
      if (this.selectedImages_sig.length == this.signture_images.length) {
        this.selectAllsig = true;
      } else {
        this.selectAllsig = false;
      }
    },

    // filter_text: function() {

    //   this.action_required_by_the_entity=this.filter_text;

    //   this.sides.filter(function (n) {
    //             return n.section_Name.indexOf(this.filter_text) !== -1;
    //         });

    // },

    newactionSendersIncludesId: function () {
      if (this.newactionSendersIncludesId.length > 0) {
        for (
          let index = 0;
          index < this.newactionSendersIncludesId.length;
          index++
        ) {
          if (this.newactionSendersIncludesId.includes(22)) {
            this.show_branch = true;
          } else {
            this.show_branch = false;
          }
        }
      }

      return false;
    },

    consignees: function () {
      if (this.consigneesIncludesId.length > 0) {
        for (let index = 0; index < this.consigneesIncludesId.length; index++) {
          if (this.consigneesIncludesId.includes(22)) {
            this.show_branch = true;
          } else {
            this.show_branch = false;
          }
        }
      }
    },

    mailType: function () {
      var date = new Date();

      var month = date.getMonth() + 1;
      var day = date.getDate();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      this.releaseDate = date.getFullYear() + "-" + month + "-" + day;

      this.genaral_inbox_year = date.getFullYear();

      this.mail_flag = "";
      this.image_of_doc = "";
      this.image_to_print_n = [];
      this.indextotest_images_model = 0;
      this.show_images_images_model = [];
      this.mail_Number = "";
      this.summary = "";
      this.classification = "";
      this.general_incoming_number = "";
      this.required_action = "";

      this.mail_forwarding = 2;

      this.old_mail_number = "";

      this.sideNameSelected = "";
      this.sideIdSelected = "";
      this.sectorNameSelected = "";
      this.sectorIdSelected = "";

      this.action_required_by_the_entity = "";
      this.mail_ward_type = 1;
      if (this.my_department_id == 21) {
        this.ward_to = 1;
      } else if (this.my_department_id == 22) {
        this.ward_to = 2;
      } else {
        this.ward_to = "";
      }

      this.entity_mail_date = "";
      this.entity_reference_number = "";
      this.procedure_type = 1;

      this.this_value_to_solve_repetition_department = true;

      this.consignees = [];
      this.consignees1 = [];
      this.consigneesIncludesId = [];
      this.newactionSenders = [];
      this.newactionSendersIncludesId = [];

      this.replies = [];
      this.imagesToShow = [];

      this.saveButton = true;
      this.sendButton = false;
      this.updataButton = false;
      this.deleteButton = false;
      this.ButtonUploadImagesMail = false;
      this.add_button_consignees = true;
      this.office_type = "";

      if (this.my_department_id == 21) {
        this.office_type = "1";
      }
      if (this.my_department_id == 22) {
        this.office_type = "3";
      }

      this.sector_side_new_array = [];
      this.sector_side_new_array_id = [];

      this.sector_side_old_array = [];
      this.sector_side_old_array_id = [];

      setTimeout(() => {
        if (this.mailType == 1) {
          //   this.GetAllDepartments();
        } else if (this.mailType == 2 && this.dep_type != "3") {
          //   this.GetAllDepartments();
          this.newactionSendersIncludesId = [];

          if (this.this_value_to_solve_repetition_department) {
            this.newactionSendersIncludesId = [];
            this.newactionSenders = [];
            for (let index = 0; index < this.departments.length; index++) {
              if (
                this.departments[index].departmentName.includes(
                  "مكتب رئيس الهيئة",
                )
              ) {
                this.newactionSenders.push({
                  departmentId: this.departments[index].id,
                  departmentName: this.departments[index].departmentName,
                  measureId: this.measures[0].measuresId,
                  measureName: this.measures[0].measuresName,
                  nd: 1,
                });
                this.newactionSendersIncludesId.push(
                  this.departments[index].id,
                );
                // this.departments.splice(index, 1);
              }

              if (
                this.departments[index].departmentName.includes("قسم المحفوظات")
              ) {
                this.newactionSenders.push({
                  departmentId: this.departments[index].id,
                  departmentName: this.departments[index].departmentName,
                  measureId: this.measures[2].measuresId,
                  measureName: this.measures[2].measuresName,
                  nd: 1,
                });
                this.newactionSendersIncludesId.push(
                  this.departments[index].id,
                );
                // this.departments.splice(index, 1);
              }
            }
          }
        } else if (this.mailType == 2 && this.dep_type == "3") {
          //   this.GetAllDepartments();
          this.newactionSendersIncludesId = [];

          if (this.this_value_to_solve_repetition_department) {
            this.newactionSendersIncludesId = [];
            this.newactionSenders = [];
            for (let index = 0; index < this.departments.length; index++) {
              if (
                this.departments[index].departmentName.includes(
                  "مكتب رئيس الهيئة",
                )
              ) {
                this.newactionSenders.push({
                  departmentId: this.departments[index].id,
                  departmentName: this.departments[index].departmentName,
                  measureId: this.measures[0].measuresId,
                  measureName: this.measures[0].measuresName,
                  nd: 1,
                });
                this.newactionSendersIncludesId.push(
                  this.departments[index].id,
                );
                // this.departments.splice(index, 1);
              }

              if (
                this.departments[index].departmentName.includes(
                  "مكتب وكيل الهيئة",
                )
              ) {
                this.newactionSenders.push({
                  departmentId: this.departments[index].id,
                  departmentName: this.departments[index].departmentName,
                  measureId: this.measures[0].measuresId,
                  measureName: this.measures[0].measuresName,
                  nd: 1,
                });
                this.newactionSendersIncludesId.push(
                  this.departments[index].id,
                );
                // this.departments.splice(index, 1);
              }

              if (
                this.departments[index].departmentName.includes("قسم المحفوظات")
              ) {
                this.newactionSenders.push({
                  departmentId: this.departments[index].id,
                  departmentName: this.departments[index].departmentName,
                  measureId: this.measures[2].measuresId,
                  measureName: this.measures[2].measuresName,
                  nd: 1,
                });
                this.newactionSendersIncludesId.push(
                  this.departments[index].id,
                );
                // this.departments.splice(index, 1);
              }
            }
          }
        } else if (this.mailType == 3) {
          //   this.GetAllDepartments33();
          // this.GetAllDepartments();

          //   this.GetAllDepartments();
          this.newactionSendersIncludesId = [];

          if (this.this_value_to_solve_repetition_department) {
            this.newactionSendersIncludesId = [];
            this.newactionSenders = [];
            for (let index = 0; index < this.departments.length; index++) {
              if (
                this.departments[index].departmentName.includes(
                  "مكتب رئيس الهيئة",
                )
              ) {
                this.newactionSenders.push({
                  departmentId: this.departments[index].id,
                  departmentName: this.departments[index].departmentName,
                  measureId: this.measures[11].measuresId,
                  measureName: this.measures[11].measuresName,
                });
                this.newactionSendersIncludesId.push(
                  this.departments[index].id,
                );
                // this.departments.splice(index, 1);
              }
            }
          }
        }
      }, 500);
    },
  },

  methods: {
    async print_image_sig() {
      this.image_to_print_n_model_sig = true;

      setTimeout(() => {
        this.$htmlToPaper("print_one_dec_sig");
      }, 200);

 
    },

    show_current_image_for_bigger_screen_sig() {
      this.GetAllDocuments_signture();

      this.screenFreeze = true;
      this.loading = true;
      setTimeout(() => {
        this.show_current_image_for_bigger_screen_model_sig = true;
        this.screenFreeze = false;
        this.loading = false;
      }, 300);
    },

    toggleSelectAllsig() {
      this.selectedImages_sig = this.selectAllsig
        ? [...this.signture_images]
        : [];
    },

    nextImage_sig() {
      if (this.currentIndex_sig < this.signture_images.length - 1)
        this.currentIndex_sig++;
    },
    prevImage_sig() {
      if (this.currentIndex_sig > 0) this.currentIndex_sig--;
    },

    nextImage_sig_send() {
      if (this.currentIndexsig < this.signture_images.length - 1)
        this.currentIndexsig++;
    },

    prevImage_sig_send() {
      if (this.currentIndexsig > 0) this.currentIndexsig--;
    },

    async GetAllDocuments_signture() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.signture_images = [];
      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        .GetAllDocuments_signture(
          Number(this.mailId),
          Number(localStorage.getItem("AY_LW")),
          Number(this.my_department_id),
          1,
        )
        .then((res) => {
          this.signture_images = res.data;
          this.image_sig = signture_images[0].path;
          this.total_sig = this.signture_images.length;
          this.reply_total_of_doc_sig = this.signture_images.length;

          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          this.loading = false;
          setTimeout(() => {
            this.screenFreeze = false;
            console.log(err);
          }, 700);
        });
    },

    selectmeasurebranch(id, name) {
      this.measureNameSelectedbranch = name;
      this.measureIdSelectedbranch = id;
    },

    selectbranch(id, name) {
      this.allbranch = false;
      this.branchNameSelected = name;
      this.branchIdSelected = id;
    },

    add_to_array_of_side_measurebranch() {
      // consigneesIncludesId

      if (this.allbranch) {
        for (let index = 0; index < this.blblblbranch.length; index++) {
          if (
            this.newactionSendersIncludesId.includes(
              this.blblblbranch[index].id,
            ) ||
            this.consigneesIncludesId.includes(this.blblblbranch[index].id)
          ) {
          } else {
            this.newactionSenders.push({
              departmentId: this.blblblbranch[index].id,
              departmentName: this.blblblbranch[index].departmentName,
              measureId: this.measureIdSelectedbranch,
              measureName: this.measureNameSelectedbranch,
            });
            this.newactionSendersIncludesId.push(this.blblblbranch[index].id);
          }
        }

        this.branchNameSelected = "";
        this.branchIdSelected = "";

        this.measureIdSelectedbranch = "";
        this.measureNameSelectedbranch = "";

        // this.departments = [];
        this.allbranchButton = false;
      } else {
        // array.includes('🍰');

        if (
          this.newactionSendersIncludesId.includes(this.branchIdSelected) ||
          this.consigneesIncludesId.includes(this.branchIdSelected)
        ) {
          alert("تم اضافة الادارة من قبل");
          this.branchNameSelected = "";
          this.branchIdSelected = "";

          this.measureIdSelectedbranch = "";
          this.measureNameSelectedbranch = "";
        } else {
          this.newactionSendersIncludesId;
          this.newactionSenders.push({
            departmentId: this.branchIdSelected,
            departmentName: this.branchNameSelected,
            measureId: this.measureIdSelectedbranch,
            measureName: this.measureNameSelectedbranch,
          });
          this.newactionSendersIncludesId.push(this.branchIdSelected);

          this.branchNameSelected = "";
          this.branchIdSelected = "";

          this.measureIdSelectedbranch = "";
          this.measureNameSelectedbranch = "";
        }

        // this.departments.splice(this.indexOfDepartment, 1);
      }
    },

    async GetAllBranches() {
      //              const token = await ensureAccessToken();
      // if (!token) return;

      this.$http.mailService
        .GetAllBranches()
        .then((res) => {
          this.AllBranches = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    selectAllbranch(x, name) {
      this.branchNameSelected = name;

      this.allbranch = true;
      this.blblblbranch = x;
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
            this.show_current_image_for_bigger_screen_model = true;
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

    async GetAllDepartmentRecipients() {
      //          const token = await ensureAccessToken();
      // if (!token) return;

      this.$http.mailService
        .GetAllDepartmentRecipients(Number(this.mailId))
        .then((res) => {
          this.departments_for_rec = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async AddRecipients() {
      const token = await ensureAccessToken();
      if (!token) return;

      var Recipients = {
        UserId: Number(this.my_user_id),
        mailid: Number(this.mailId),
        DepartmenntName: this.departmentNameSelected_for_rec,
        RecipientsName: this.rec_name,
      };

      this.screenFreeze = true;
      this.loading = true;

      this.$http.mailService
        .AddRecipients(Recipients)
        .then((res) => {
          //       this.GetAllDepartments_rec();

          //      this.GetAllDepartmentRecipients();

          (this.departmentIdSelected_for_rec = ""),
            (this.departmentNameSelected_for_rec = "");
          (this.rec_name = ""),
            setTimeout(() => {
              this.screenFreeze = false;
              this.loading = false;
              (this.departmentIdSelected_for_rec = ""),
                (this.departmentNameSelected_for_rec = "");
              this.rec_name = "";
            }, 100);
        })
        .catch((err) => {
          this.screenFreeze = false;
          this.loading = false;
          (this.departmentIdSelected_for_rec = ""),
            (this.departmentNameSelected_for_rec = "");
          (this.rec_name = ""), console.log(err);
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

    transfer_back_images_to_order() {
      if (this.selected_image != "") {
        for (
          let index = 0;
          index < this.new_ordering_image_list.length;
          index++
        ) {
          const element = this.new_ordering_image_list[index];
          this.ordering_image_list.push(element);
        }
        this.new_ordering_image_list = [];
      }
    },

    transfer_all_images_to_order() {
      if (this.selected_image != "") {
        for (let index = 0; index < this.ordering_image_list.length; index++) {
          const element = this.ordering_image_list[index];
          this.new_ordering_image_list.push(element);
        }
        this.ordering_image_list = [];
      }
    },

    async save_new_order() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.transfer_all_images_to_order();

      this.screenFreeze = true;
      this.loading = true;

      this.$http.documentService
        .save_new_order(this.new_ordering_image_list)
        .then((res) => {
       
          this.show_model_to_order_image = false;

          this.new_ordering_image_list = [];
          this.doc_number = 0;
          this.GetAllDocN("next");
          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 100);
        })
        .catch((err) => {
          this.screenFreeze = false;
          this.loading = false;
          console.log(err);
        });
    },

    transfer_image_to_order() {
      if (this.selected_image != "") {
        this.new_ordering_image_list.push(this.selected_image);

        const index = this.ordering_image_list.findIndex((element, index) => {
          if (
            element.id === this.selected_image.id &&
            element.order === this.selected_image.order
          ) {
            return true;
          }
        });
        this.ordering_image_list.splice(index, 1);
      }
    },

    transfer_back_image_to_order() {
      if (this.selected_image != "") {
        this.ordering_image_list.push(this.selected_image);

        const index = this.new_ordering_image_list.findIndex(
          (element, index) => {
            if (
              element.id === this.selected_image.id &&
              element.order === this.selected_image.order
            ) {
              return true;
            }
          },
        );
        this.new_ordering_image_list.splice(index, 1);
      }
    },

    open_model_to_order_image() {
      this.show_model_to_order_image = true;
      this.get_ordering_image();
    },

    select_image_to_ordering(n) {
      this.selected_image = n;
      this.index_of_image_selected = n.order;
      this.id_of_image_selected = n.id;
    },

    async get_ordering_image() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.documentService
        .get_ordering_image(this.mailId)
        .then((res) => {
          this.ordering_image_list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async show_image_to_ordering() {
      const token = await ensureAccessToken();
      if (!token) return;

      if (this.selected_image != "") {
        this.$http.documentService
          .show_doc_for_order(this.id_of_image_selected)
          .then((res) => {
          
            this.image_ordering = res.data.data.path;
            this.id_image_ordering = res.data.data.id;

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

    add_sector_side_to_array() {


      if (
        this.sector_side_new_array_id.includes(this.sideIdSelected) ||
        this.sector_side_old_array_id.includes(this.sideIdSelected)
      ) {
        alert("تم اضافة الجهة من قبل");
        this.sideIdSelected = "";
        this.sideNameSelected = "";
      } else {
        this.sector_side_new_array.push({
          mail_forwarding: Number(this.mail_forwarding),
          side_number: this.sideIdSelected,
          side_name: this.sideNameSelected,
          sector_number: this.sectorIdSelected,
          sector_name: this.sectorNameSelected,
        });
        this.sector_side_new_array_id.push(this.sideIdSelected);

        this.sideIdSelected = "";
        this.sideNameSelected = "";
      }

      // this.departments.splice(this.indexOfDepartment, 1);
    },

    async delete_sector_side_from_array(id) {
      const token = await ensureAccessToken();
      if (!token) return;

      if (this.sector_side_old_array_id.length > 1) {
        this.screenFreeze = true;
        this.loading = true;

        this.sector_side_from_delet_fun = true;
        
        this.$http.mailService
          .cancel_sending_to_sector_side(
            id,
            Number(localStorage.getItem("AY_LW")),
          )
          .then((res) => {
            setTimeout(() => {
              this.loading = false;
              this.screenFreeze = false;

              this.GetSentMailById();
            }, 500);
          })
          .catch((err) => {
            setTimeout(() => {
              this.loading = false;
              this.screenFreeze = false;
            }, 500);
            alert("لا يمكن إلغاء الإدارة بعد القراءة");
          });
      } else {
        alert("لا يمكن حذف جميع الجهات");
      }
    },

    remove_sector_side_from_array(sideId, sideName, sectorId, sectorName) {
 

      // if (
      //   this.sector_side_new_array_id.length +
      //     this.sector_side_old_array_id.length >
      //   1
      // ) {
      const index = this.sector_side_new_array.findIndex((element, index) => {
        if (
          element.side_number === sideId &&
          element.sector_number === sectorId
        ) {
          return true;
        }
      });
      this.sector_side_new_array.splice(index, 1);

      const index_id = this.sector_side_new_array_id.findIndex(
        (element, index_id) => {
          if (element === sideId) {
            return true;
          }
        },
      );
      this.sector_side_new_array_id.splice(index_id, 1);
      // } else {
      //   alert("لا يمكن حذف جميع الجهات");
      // }

      // this.newactionSendersIncludesId.splice(index, 1);
    },

    pass_side(id, name) {
      // this.filter_text=name;
      this.sideNameSelected = name;
      this.sideIdSelected = id;
    },

    async get_sides(sector, sector_name, id) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.sideNameSelected = "";
      this.sideIdSelected = "";
      this.sides = [];
      this.sectorNameSelected = sector_name;
      this.sectorIdSelected = sector;
      this.$http.sectorsService
        .GetSides(sector)
        .then((res) => {
          this.sides = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
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
          .GetAllDocN(
            this.mailId,
            this.doc_number,
            Number(this.my_department_id),
          )
          .then((res) => {
            this.total_of_doc = res.data.total;

            this.image_of_doc = res.data.data.url;
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
          Number(localStorage.getItem("AY_LW")),
        )
        .then((res) => {
          this.GetReplyByDepartment(
            this.replyByDepartmenId,
            this.sends_id,
            this.departmentName,
          );
        })
        .catch((err) => {});
    },

    prepare_delete_all_documents() {
      this.delete_all_documents = true;

      this.alert_prepare_delete_document = true;
    },

    prepare_delete_document() {
      this.delete_all_documents = false;
      this.alert_prepare_delete_document = true;
    },

    prepare_delete_mail() {
      this.alert_prepare_delete_mail = true;
    },

    async deleteAllDocuments() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.alert_prepare_delete_document = false;

      this.$http.mailService
        .DeleteAllDocuments(
          Number(this.mailId),
          Number(localStorage.getItem("AY_LW")),
          Number(this.my_department_id),
        )
        .then((res) => {
          this.doc_number = 0;
          this.total_of_doc = 0;

          this.image_of_doc = "";
          this.id_of_doc = "";

          this.alert_state = true;
          this.alert_state_true_false = true;

          // this.GetAllDocN("next");

          // this.imagesToShow.splice(index, 1);
          // this.mail_search();

          // this.imagesToShow = res.data.result.documents
        })
        .catch((err) => {
          this.alert_state = true;
          this.alert_state_true_false = false;
          this.addErorr = err.message;
        });
    },

    async deleteDocument() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.alert_prepare_delete_document = false;

      this.$http.mailService
        .DeleteDocument(
          Number(this.id_of_doc),
          Number(localStorage.getItem("AY_LW"), Number(this.my_department_id)),
        )
        .then((res) => {
          this.doc_number = 0;
          this.total_of_doc = 0;

          this.image_of_doc = "";
          this.id_of_doc = "";

          this.alert_state = true;
          this.alert_state_true_false = true;

          this.GetAllDocN("next");

          // this.imagesToShow.splice(index, 1);
          this.mail_search();

          // this.imagesToShow = res.data.result.documents
        })
        .catch((err) => {
          this.alert_state = true;
          this.alert_state_true_false = false;
          this.addErorr = err.message;
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

          this.reply_image_of_doc = res.data.date[0].url;
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

          this.reply_image_of_doc = res.data.date[0].url;
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

    //*****************29/3/2022

    show_current_image_for_bigger_screen() {
      this.to_get_all_doc_of_mail();
      this.screenFreeze = true;
      this.loading = true;
      setTimeout(() => {
        this.show_current_image_for_bigger_screen_model = true;
        this.screenFreeze = false;
        this.loading = false;
      }, 300);
    },

    async GetAllDocN(x) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.image_rotate = true;

      if (x == "next") {
        this.doc_number++;
      } else {
        this.doc_number--;
      }

      this.screenFreeze = true;
      this.loading = true;
      this.$http.documentService
        .GetAllDocN(this.mailId, this.doc_number, Number(this.my_department_id))
        .then((res) => {
          this.total_of_doc = res.data.total;

          this.image_of_doc = res.data.data.url;
          this.id_of_doc = res.data.data.id;

          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 200);
        })
        .catch((err) => {
          this.screenFreeze = false;
          this.loading = false;
          this.doc_number = 0;
        });
    },


    async to_get_all_doc_of_mail() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.p_id = this.mailId;
      this.p_uid = Number(localStorage.getItem("AY_LW"));
      this.p_did = 0;
      this.p_mydep = Number(this.my_department_id);

      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        .GetAllDocuments(
          this.mailId,
          Number(localStorage.getItem("AY_LW")),
          Number(this.my_department_id),
        )
        .then((res) => {
          this.image_to_print_n = res.data;
          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          this.loading = false;
          setTimeout(() => {
            this.screenFreeze = false;
            console.log(err);
          }, 700);
        });
    },

    print_reply_image() {
      this.reply_image_to_print_n_model = true;

      // this.$http.mailService
      //   .PrintOrShowDocument(
      //     Number(this.mailId),
      //     Number(localStorage.getItem("AY_LW")),
      //     Number(this.from_reply_or_general)
      //   )
      //   .then((res) => {
      //     setTimeout(() => {
      //       console.log(res);
      //       this.loading = false;
      //       this.screenFreeze = false;
      //     }, 500);
      //   })
      //   .catch((err) => {
      //     setTimeout(() => {
      //       this.loading = false;
      //       this.screenFreeze = false;
      //     }, 500);
      //     console.log(err);
      //   });
    },

    GetMailsToPrint() {
      this.$router.push({
        name: "mail_report_sent",
        params: {
          mn: this.mail_Number,
          sumary: this.summary,
          mid: this.mailId,
          dep: Number(this.my_department_id),
          type: this.to_test_passing_mail_type,
        },
      });
    },

    print_image() {
      this.image_to_print_n_model = true;

      // this.$http.mailService
      //   .PrintOrShowDocument(
      //     Number(this.mailId),
      //     Number(localStorage.getItem("AY_LW")),
      //     Number(this.from_reply_or_general)
      //   )
      //   .then((res) => {
      //     setTimeout(() => {
      //       console.log(res);
      //       this.loading = false;
      //       this.screenFreeze = false;
      //     }, 500);
      //   })
      //   .catch((err) => {
      //     setTimeout(() => {
      //       this.loading = false;
      //       this.screenFreeze = false;
      //     }, 500);
      //     console.log(err);
      //   });
    },

    async show_reply_images(index, plase) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.from_reply_or_general = plase;
      this.screenFreeze = true;
      this.loading = true;

      this.$http.mailService
        .PrintOrShowDocument(
          Number(this.mailId),
          Number(localStorage.getItem("AY_LW")),
          2,
        )
        .then((res) => {
          setTimeout(() => {
            

            this.show_images_images_model = [];
            this.indextotest = 0;

            this.show_images_images_model = this.replies[index].resources;

            this.testimage_images_model = this.show_images_images_model[0].path;

            this.show_images_model = true;
            this.screenFreeze = false;
            this.loading = false;
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

    clear_page() {
      this.screenFreeze = true;
      this.loading = true;

      this.conclusion = "";
      this.doc_number = 0;
      this.total_of_doc = 0;

      this.image_of_doc = "";
      this.id_of_doc = "";

      var date = new Date();

      var month = date.getMonth() + 1;
      var day = date.getDate();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      this.releaseDate = date.getFullYear() + "-" + month + "-" + day;

      this.mail_year = date.getFullYear();

      if (this.mailType == 1) {
        this.mailType = "";
        setTimeout(() => {
          this.mailType = 1;
        }, 100);
      }
      if (this.mailType == 2) {
        this.mailType = "";

        setTimeout(() => {
          this.mailType = 2;
        }, 100);
      }
      if (this.mailType == 3) {
        this.mailType = "";

        setTimeout(() => {
          this.mailType = 3;
        }, 100);
      }
      this.saveButton = true;
      this.sendButton = false;
      this.updataButton = false;
      this.deleteButton = false;
      this.ButtonUploadImagesMail = false;
      this.mail_flag = 0;

      setTimeout(() => {
        this.screenFreeze = false;
        this.loading = false;
      }, 300);
    },

    add_to_array_of_rec() {
      // consigneesIncludesId

      {
        if (
          this.new_rec.includes(this.departmentIdSelected_for_rec) ||
          this.consignees_rec.includes(this.departmentIdSelected_for_rec)
        ) {
          alert("تم اضافة الادارة من قبل");
          this.departmentNameSelected_for_rec = "";
          this.departmentIdSelected_for_rec = "";
        } else {
          this.new_rec.push({
            departmentId: this.departmentIdSelected_for_rec,
            departmentName: this.departmentNameSelected_for_rec,
          });
          this.new_rec_IncludesId.push(this.departmentIdSelected_for_rec);

          this.departmentNameSelected_for_rec = "";
          this.departmentIdSelected_for_rec = "";
        }

        // this.departments.splice(this.indexOfDepartment, 1);
      }
    },

    remove_to_array_of_side_measure(consignee, name) {
      if (this.mail_Number) {
        const index = this.newactionSenders.findIndex((element, index) => {
          if (element.departmentId === consignee) {
            return true;
          }
        });
        this.newactionSenders.splice(index, 1);
        this.newactionSendersIncludesId.splice(index, 1);
      } else {
        const index = this.newactionSenders.findIndex((element, index) => {
          if (element.departmentId === consignee) {
            return true;
          }
        });
        this.newactionSenders.splice(index, 1);
        this.newactionSendersIncludesId.splice(index, 1);
      }

      // this.departments.push({
      //   id: consignee,
      //   departmentName: name,
      // });

      this.allDepartmentButton = true;
    },

    async delete_side_measure(department_id, name) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;

      this.$http.mailService
        .cancel_sending_to_department(
          this.mailId,
          department_id,
          Number(localStorage.getItem("AY_LW")),
        )
        .then((res) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
            // this.consignees = res.data.actionSenders
            this.GetSentMailById();
            // const index = this.consignees.findIndex((element, index) => {
            //   if (element.departmentId === department_id) {
            //     return true;
            //   }
            // });
            // this.consignees.splice(index, 1);
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
          alert("لا يمكن إلغاء الإدارة بعد القراءة");
        });
    },

    async mail_search() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;

      this.consignees = [];
      this.consignees1 = [];
      this.consigneesIncludesId = [];
      this.newactionSenders = [];
      this.newactionSendersIncludesId = [];

      this.sector_side_new_array = [];
      this.sector_side_new_array_id = [];

      this.doc_number = 0;
      this.total_of_doc = 0;

      this.image_of_doc = "";
      this.id_of_doc = "";

      this.mail_flag = 0;

      this.office_type = "";

      this.old_mail_number = "";

      var date = new Date();

      var month = date.getMonth() + 1;
      var day = date.getDate();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      this.releaseDate = date.getFullYear() + "-" + month + "-" + day;

      //   this.GetAllDepartments;
      this.$http.mailService
        .search(
          this.mail_Number,
          this.mailType,
          this.my_department_id,
          this.mail_year,
        )
        .then((res) => {
          if (res.data.mail.is_send == true) {
            this.saveButton = false;
            this.updataButton = true;
            this.deleteButton = false;
            this.sendButton = false;
            this.add_button_consignees = true;

            this.remove_button_consignees = false;
          } else {
            this.deleteButton = true;
            this.updataButton = true;
            this.saveButton = false;
            this.sendButton = true;
          }

          this.mailId = res.data.mail.mailID;
          // this.to_get_all_doc_of_mail();
          this.mail_Number = res.data.mail.mail_Number;
          this.department_Id = res.data.mail.department_Id;
          this.mail_year = res.data.mail.mail_year;

          this.releaseDate = res.data.mail.date_Of_Mail;
          this.summary = res.data.mail.mail_Summary;
          //   this.classification = res.data.mail.clasification;

          //  this.new_class =
          //   this.classifications[Number(this.classification) - 1].name;
          //   this.office_type = res.data.mail.office_type;
          // this.mailType = res.data.mail.mail_Type;
          if (res.data.mail.genaral_inbox_Number == 0) {
            this.general_incoming_number = "";
          } else {
            this.general_incoming_number = res.data.mail.genaral_inbox_Number;
          }

          this.genaral_inbox_year = res.data.mail.genaral_inbox_year;
          this.required_action = res.data.mail.actionRequired;

          this.mail_flag = res.data.mail.flag;

          this.consignees = res.data.actionSenders;
          this.consignees1 = res.data.actionSenders;
          this.old_mail_number = res.data.mail.old_mail_number;

          // for (let index = 0; index < res.data.actionSenders.length; index++) {
          //   this.newactionSendersIncludesId.push(
          //     res.data.actionSenders[index].departmentId
          //   );
          // }

          for (let index = 0; index < res.data.actionSenders.length; index++) {
            this.consigneesIncludesId.push(
              res.data.actionSenders[index].departmentId,
            );
          }

          if (this.mailType == "2") {
            this.external_mailId = res.data.external.id;

            this.action_required_by_the_entity =
              res.data.external.action_required_by_the_entity;

            this.sector_side_old_array = res.data.external_sectoin;

            for (
              let index = 0;
              index < res.data.external_sectoin.length;
              index++
            ) {
              this.sector_side_old_array_id.push(
                res.data.external_sectoin[index].side_number,
              );
            }

            // this.external_mailId = res.data.external.id;

            // this.action_required_by_the_entity =
            //   res.data.external.action_required_by_the_entity;

            // this.sector_side_old_array = res.data.external_sectoin;

            // for (
            //   let index = 0;
            //   index < res.data.sector_side_old_array.length;
            //   index++
            // ) {
            //   this.sector_side_old_array_id.push(
            //     res.data.sector_side_old_array[index].side_number
            //   );
            // }

            // this.get_sectors(this.mail_forwarding);

            // this.sectorNameSelected = res.data.sector[0].section_Name;
            // this.sectorIdSelected = res.data.sector[0].id;

            // this.get_sides(this.sectorIdSelected, this.sectorNameSelected);
            // this.sideNameSelected = res.data.side[0].section_Name;
            // this.sideIdSelected = res.data.side[0].id;
          }
          if (this.mailType == "3") {
            this.external_mailId = res.data.external.id;

            this.sector_side_old_array = res.data.external_sectoin;

            for (
              let index = 0;
              index < res.data.external_sectoin.length;
              index++
            ) {
              this.sector_side_old_array_id.push(
                res.data.external_sectoin[index].side_number,
              );
            }

            // this.get_sectors(this.mail_forwarding);

            // this.sectorNameSelected = res.data.sector[0].section_Name;
            // this.sectorIdSelected = res.data.sector[0].id;

            // this.get_sides(this.sectorIdSelected, this.sectorNameSelected);
            // this.sideNameSelected = res.data.side[0].section_Name;
            // this.sideIdSelected = res.data.side[0].id;

            this.ward_to = res.data.external.to;

            this.mail_ward_type = res.data.external.type;

            this.entity_mail_date = res.data.external.send_time;

            this.entity_reference_number =
              res.data.external.entity_reference_number;

            this.procedure_type = res.data.external.procedure_type;

            // this.external_mailId = res.data.external.id;

            // this.sector_side_old_array = res.data.external_sectoin;

            // for (
            //   let index = 0;
            //   index < res.data.sector_side_old_array.length;
            //   index++
            // ) {
            //   this.sector_side_old_array_id.push(
            //     res.data.sector_side_old_array[index].side_number
            //   );
            // }

            // // this.get_sectors(this.mail_forwarding);

            // // this.sectorNameSelected = res.data.sector[0].section_Name;
            // // this.sectorIdSelected = res.data.sector[0].id;

            // // this.get_sides(this.sectorIdSelected, this.sectorNameSelected);
            // // this.sideNameSelected = res.data.side[0].section_Name;
            // // this.sideIdSelected = res.data.side[0].id;

            // this.ward_to = res.data.external.to;

            // this.mail_ward_type = res.data.external.type;

            // this.entity_mail_date = res.data.external.send_time;

            // this.entity_reference_number =
            //   res.data.external.entity_reference_number;

            // this.procedure_type = res.data.external.procedure_type;
          }

          setTimeout(() => {
            this.GetAllDocN("next");
            this.screenFreeze = false;
            this.loading = false;
          }, 300);
        })
        .catch((err) => {
          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
            this.clear_page();

            alert("لا يوحد بريد بهذا الرقم.");
            console.log(err);
          }, 100);
        });
    },

    async AddReply() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;

      var ReplyViewModel = {
        userId: Number(localStorage.getItem("AY_LW")),
        mailId: Number(this.mailId),
        send_ToId: Number(this.sends_id),
        from: Number(1),
        reply: {
          mail_detail: this.reply_to_add,
          To: Number(this.replyByDepartmenId),
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
            this.imagesToSend = [];
            this.GetReplyByDepartment(
              this.replyByDepartmenId,
              this.sends_id,
              this.departmentName,
            );
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    async GetReplyByDepartment(id, send_ToId, name, flag) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.reply_to_add = "";
      this.imagesToSend = [];

      this.departmentflag = 0;
      this.replyByDepartmenId = id;
      this.sends_id = send_ToId;
      this.departmentName = name;
      this.departmentflag = flag;

      this.$http.mailService
        .GetReplyByDepartment(this.replyByDepartmenId, this.mailId)
        .then((res) => {
          this.replies = res.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    previousImage() {
      if (this.indextotest > 0) {
        this.indextotest--;
        this.testimage = this.imagesToShow[this.indextotest].url;
        this.test_image_id = this.imagesToShow[this.indextotest].id;
      }
    },

    nextImage() {
      if (this.indextotest < this.imagesToShow.length - 1) {
        this.indextotest++;
        this.testimage = this.imagesToShow[this.indextotest].url;
        this.test_image_id = this.imagesToShow[this.indextotest].id;
      }
    },

    previousImage_images_model() {
      if (this.indextotest_images_model > 0) {
        this.indextotest_images_model--;
        this.testimage_images_model =
          this.show_images_images_model[this.indextotest_images_model].path;
      }
    },

    nextImage_images_model() {
      if (
        this.indextotest_images_model <
        this.show_images_images_model.length - 1
      ) {
        this.indextotest_images_model++;
        this.testimage_images_model =
          this.show_images_images_model[this.indextotest_images_model].path;
      }
    },

    async GetAllDocuments(id, plase) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.from_reply_or_general = plase;
      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        .GetAllDocuments(id, Number(localStorage.getItem("AY_LW")))
        .then((res) => {
          this.show_images_images_model = res.data;

          this.testimage_images_model = this.show_images_images_model[0].url;

          this.test_image_id = this.show_images_images_model[0].id;

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

    async get_sectors(type) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.sideNameSelected = "";
      this.sideIdSelected = "";
      this.sectorIdSelected = "";
      this.sectorNameSelected = "";
      this.sectors = [];
      this.sides = [];

      this.$http.sectorsService
        .GetSectors(type)
        .then((res) => {
          this.sectors = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    selectmeasure(id, name) {
      this.measureNameSelected = name;
      this.measureIdSelected = id;
    },

    selectdepartment(id, name, index) {
      this.allDepartment = false;
      this.allsubDepartment = false;
      this.departmentNameSelected = name;
      this.departmentIdSelected = id;

      this.indexOfDepartment = index;
    },

    selectdepartment_for_rec(id, name) {
      this.departmentNameSelected_for_rec = name;
      this.departmentIdSelected_for_rec = id;
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

    async GetAllDepartments33() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .only_tow_main_dep()
        .then((res) => {
          this.departments = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async GetAllDepartments_rec() {
      //              const token = await ensureAccessToken();
      // if (!token) return;

      this.$http.mailService
        .GetAllAddRecipients(Number(this.mailId))
        .then((res) => {
          this.consignees_rec = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async GetAllDepartments() {
      //              const token = await ensureAccessToken();
      // if (!token) return;

      if (this.isperent == "true") {
        this.$http.mailService
          .AllDepartments_and_mysections(
            localStorage.getItem("current_department_id"),
          )
          .then((res) => {
            this.departments = res.data;

            for (let i = 0; i < this.departments.length; i++) {
              if (this.departments[i].id == 19) {
                this.departments.splice(i, 1);
              }

              if (this.mailType == 1 && this.departments[i].id == 79) {
                this.departments.splice(i, 1);
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$http.mailService
          .get_department_and_sections(
            localStorage.getItem("current_department_id"),
          )
          .then((res) => {
            this.departments = res.data;

            for (let i = 0; i < this.departments.length; i++) {
              if (this.departments[i].id == 19) {
                this.departments.splice(i, 1);
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    async updateMail() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;

      this.doc_number = 0;

      if (this.mailType == "3") {
        var dataUpdate = {
          userId: Number(localStorage.getItem("AY_LW")),
          mail: {
            MailID: Number(this.mailId),
            Mail_Type: Number(this.mailType),
            userId: Number(this.my_user_id),
            department_Id: Number(this.my_department_id),
            Date_Of_Mail: this.releaseDate,
            Mail_Summary: this.summary,
         
            ActionRequired: this.required_action,
           
            state: true,
           
          },

          // actionSenders: this.consignees,
          newactionSenders: this.newactionSenders,

          extrenal_Inbox: {
            Id: Number(this.external_mailId),
                action: Number(this.mail_forwarding),

              to: Number(this.ward_to),
              type: Number(this.mail_ward_type),
            Send_time: this.entity_mail_date,
               entity_reference_number: Number(this.entity_reference_number),
               procedure_type: Number(this.procedure_type),
          },

          external_sectoin: this.sector_side_new_array,
        };
      }

      this.$http.mailService
        .UpdateMail(dataUpdate)
        .then((res) => {
          this.newactionSenders = [];
          this.sector_side_new_array = [];
          this.sector_side_new_array_id = "";
          this.newactionSendersIncludesId = [];

          if (this.mailType == 1) {
            this.to_test_passing_mail_type = 1;
          }
          if (this.mailType == 2) {
            this.to_test_passing_mail_type = 2;
          }
          if (this.mailType == 3) {
            this.to_test_passing_mail_type = 3;
          }

          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;

            this.GetSentMailById();
            this.GetAllDocN("next");
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    async saveMail() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;

      this.newactionSenders = [];
      this.sector_side_new_array = [];

      this.newactionSenders.push({
        departmentId: 79,
        departmentName: "قسم المحفوظات",
        measureId: 3,
        measureName: "للاجراء",
      });

      this.sector_side_new_array.push({
        mail_forwarding:  Number(localStorage.getItem("section_type")),
        side_number: Number(localStorage.getItem("section_id")),
        side_name: "تجربة جهة",
        sector_number: Number(localStorage.getItem("section_parent")),
        sector_name: "تجربة قطاع",
      });

      if (this.mailType == "1") {
        var info = {
          mail: {
            Mail_Type: Number(this.mailType),
            userId: Number(this.my_user_id),
            department_Id: Number(this.my_department_id),
            Date_Of_Mail: this.releaseDate,
            Mail_Summary: this.summary,
            clasification: Number(this.classification),
            Genaral_inbox_Number: Number(this.general_incoming_number),
            Genaral_inbox_year: Number(this.genaral_inbox_year),
            old_mail_number: this.old_mail_number,
            ActionRequired: this.required_action,
            office_type: this.office_type,
          },

          actionSenders: this.newactionSenders,
        };
      }

      if (this.mailType == "2") {
        var info = {
          mail: {
            Mail_Type: Number(this.mailType),
            userId: Number(this.my_user_id),
            department_Id: Number(this.my_department_id),
            Date_Of_Mail: this.releaseDate,
            Mail_Summary: this.summary,
            clasification: Number(this.classification),
            Genaral_inbox_Number: Number(this.general_incoming_number),
            Genaral_inbox_year: Number(this.genaral_inbox_year),
            old_mail_number: this.old_mail_number,
            ActionRequired: this.required_action,
            office_type: this.office_type,
          },

          actionSenders: this.newactionSenders,

          external_Mail: {
            action: Number(this.mail_forwarding),

            action_required_by_the_entity: this.action_required_by_the_entity,
          },

          external_sectoin: this.sector_side_new_array,
        };
      }

      if (this.mailType == "3") {
        var info = {
          mail: {
            Mail_Type: Number(this.mailType),
            userId: Number(this.my_user_id),
            department_Id: Number(this.my_department_id),
            Date_Of_Mail: this.releaseDate,
            Mail_Summary: this.summary,
            // clasification: Number(this.classification),
            // Genaral_inbox_Number: Number(this.general_incoming_number),
             Genaral_inbox_year: Number(this.genaral_inbox_year),
            // old_mail_number: this.old_mail_number,
            ActionRequired: this.required_action,
            // office_type: this.office_type,
          },

          actionSenders: this.newactionSenders,

          extrenal_Inbox: {
            action: Number(this.mail_forwarding),

            to: Number(this.ward_to),
            type: Number(this.mail_ward_type),
            Send_time: this.releaseDate,
            entity_reference_number: Number(this.entity_reference_number),
            procedure_type: Number(this.procedure_type),
            other_docoments: this.other_docoments,
          },

          external_sectoin: this.sector_side_new_array,
        };
      }

      this.$http.mailService
        .SaveMail(info)
        .then((res) => {
          setTimeout(() => {
            // this.loading = false;

            // this.documentSection = true;
            // this.proceduresSection = true;

            this.loading = false;
            this.screenFreeze = false;

            this.saveButton = false;
            this.sendButton = true;
            this.updataButton = true;
            this.deleteButton = true;

            this.mail_Number = res.data.mail_Number;

            this.mailId = res.data.mailId;
            this.department_Id = res.data.department_Id;
            this.mail_year = res.data.mail_year;
            this.to_test_passing_mail_type = this.mailType;

            this.GetSentMailById();
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    async GetSentMailById() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.this_value_to_solve_repetition_department = false;

      this.newactionSenders = [];
      this.newactionSendersIncludesId = [];
      this.doc_number = 0;

      if (!this.sector_side_from_delet_fun) {
        this.sector_side_new_array = [];
        this.sector_side_new_array_id = [];
      }

      this.sector_side_old_array = [];
      this.sector_side_old_array_id = [];

      this.screenFreeze = true;
      this.loading = true;

      this.$http.mailService
        .GetSentMailById(this.mailId, this.mailType)
        .then((res) => {
          // this.mailType = res.data.mail.mail_Type;
          if (res.data.mail.is_send == true) {
            this.sendButton = false;
            this.deleteButton = false;
            // this.add_button_consignees = false;
          }

          // this.sector_side_old_array = res.data.external_sectoin

          this.summary = res.data.mail.mail_Summary;

          this.remove_button_consignees = false;

          this.mail_Number = res.data.mail.mail_Number;
          this.department_Id = res.data.mail.department_Id;
          this.mail_year = res.data.mail.mail_year;
          this.mail_flag = res.data.mail.flag;

          this.releaseDate = res.data.mail.date_Of_Mail;
      
          this.office_type = res.data.mail.office_type;

          if (res.data.mail.genaral_inbox_Number == 0) {
            this.general_incoming_number = "";
          } else {
            this.general_incoming_number = res.data.mail.genaral_inbox_Number;
          }

          this.genaral_inbox_year = res.data.mail.genaral_inbox_year;
          this.required_action = res.data.mail.actionRequired;
          this.consignees = res.data.actionSenders;
          this.consignees1 = res.data.actionSenders;
          this.old_mail_number = res.data.mail.old_mail_number;

          // this.newactionSendersIncludesId = [];

          // for (let index = 0; index < res.data.actionSenders.length; index++) {
          //   this.newactionSendersIncludesId.push(
          //     res.data.actionSenders[index].departmentId
          //   );
          // }

          this.consigneesIncludesId = [];

          for (let index = 0; index < res.data.actionSenders.length; index++) {
            this.consigneesIncludesId.push(
              res.data.actionSenders[index].departmentId,
            );
          }

          // this.departments = res.data.departments;

          if (res.data.mail.mail_Type == 1) {
            this.GetAllDepartments();
          }

          if (this.to_test_passing_mail_type == "2") {
            this.external_mailId = res.data.external.id;

            this.action_required_by_the_entity =
              res.data.external.action_required_by_the_entity;

            this.sector_side_old_array = res.data.external_sectoin;

            for (
              let index = 0;
              index < res.data.external_sectoin.length;
              index++
            ) {
              this.sector_side_old_array_id.push(
                res.data.external_sectoin[index].side_number,
              );
            }

            // this.get_sectors(this.mail_forwarding);

            // this.sectorNameSelected = res.data.sector[0].section_Name;
            // this.sectorIdSelected = res.data.sector[0].id;

            // this.get_sides(this.sectorIdSelected, this.sectorNameSelected);
            // this.sideNameSelected = res.data.side[0].section_Name;
            // this.sideIdSelected = res.data.side[0].id;
          }
          if (this.to_test_passing_mail_type == "3") {

           
            this.external_mailId = res.data.external.id;

            this.sector_side_old_array = res.data.external_sectoin;

            for (
              let index = 0;
              index < res.data.external_sectoin.length;
              index++
            ) {
              this.sector_side_old_array_id.push(
                res.data.external_sectoin[index].side_number,
              );
            }

            // this.get_sectors(this.mail_forwarding);

            // this.sectorNameSelected = res.data.sector[0].section_Name;
            // this.sectorIdSelected = res.data.sector[0].id;

            // this.get_sides(this.sectorIdSelected, this.sectorNameSelected);
            // this.sideNameSelected = res.data.side[0].section_Name;
            // this.sideIdSelected = res.data.side[0].id;

            this.ward_to = res.data.external.to;

            this.mail_ward_type = res.data.external.type;

            this.entity_mail_date = res.data.external.send_time;

            this.entity_reference_number =
              res.data.external.entity_reference_number;

            this.procedure_type = res.data.external.procedure_type;
          }

          // this.to_get_all_doc_of_mail();

          // this.GetDocmentForMail();
          // this.GetDocmentForMailToShow();

          // this.GetProcessingResponses();

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

    async updateBeforSendMail() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;

      this.doc_number = 0;



      if (this.mailType == "3") {
        var dataUpdate = {
          userId: Number(localStorage.getItem("AY_LW")),
          mail: {
            MailID: Number(this.mailId),
            Mail_Type: Number(this.mailType),
            userId: Number(this.my_user_id),
            department_Id: Number(this.my_department_id),
            Date_Of_Mail: this.releaseDate,
            Mail_Summary: this.summary,

            ActionRequired: this.required_action,

            state: true,
          },

          // actionSenders: this.consignees,
          newactionSenders: this.newactionSenders,

          extrenal_Inbox: {
            Id: Number(this.external_mailId),
            action: Number(this.mail_forwarding),

            to: Number(this.ward_to),
            type: Number(this.mail_ward_type),
            Send_time: this.entity_mail_date,
            entity_reference_number: Number(this.entity_reference_number),
            procedure_type: Number(this.procedure_type),
          },

          external_sectoin: this.sector_side_new_array,
        };
      }

      this.$http.mailService
        .UpdateMail(dataUpdate)
        .then((res) => {
          this.newactionSenders = [];
          this.newactionSendersIncludesId = [];

          if (this.mailType == 1) {
            this.to_test_passing_mail_type = 1;
          }
          if (this.mailType == 2) {
            this.to_test_passing_mail_type = 2;
          }
          if (this.mailType == 3) {
            this.to_test_passing_mail_type = 3;
          }

          this.sendMail();

          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;

            this.GetSentMailById();
            this.GetAllDocN("next");
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
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

    async sendMail() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;

      // this.updateMail();

      this.$http.mailService
        .SendMail(Number(this.mailId), Number(localStorage.getItem("AY_LW")))
        .then((res) => {
          setTimeout(() => {
            this.deleteButton = false;
            this.sendButton = false;

            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    async deleteMail() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;
      this.alert_prepare_delete_mail = false;

      this.$http.mailService
        .DeleteMail(this.my_department_id, this.my_user_id, this.mailId)
        .then((res) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;

            this.clear_page();
            // this.$router.replace("/sent");
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    scanToReply() {
      scanner.scan(this.displayReplyImagesOnPage, {
        output_settings: [
          {
            type: "return-base64",
            format: "jpg",
          },
        ],
      });
    },

    displayReplyImagesOnPage(successful, mesg, response) {
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

      this.UploadImagesMail();

      if (this.mailType == 1) {
        this.to_test_passing_mail_type = 1;
      }
      if (this.mailType == 2) {
        this.to_test_passing_mail_type = 2;
      }
      if (this.mailType == 3) {
        this.to_test_passing_mail_type = 3;
      }

      setTimeout(() => {
        this.GetSentMailById();
        this.GetAllDocN("next");
      }, 1000);
    },

    ImagetoPrint(img) {
      return (
        "<html><head><scri" +
        "pt>function step1(){\n" +
        "setTimeout('step2()', 10);}\n" +
        "function step2(){window.print();window.close()}\n" +
        "</scri" +
        "pt></head><body onload='step1()'>\n" +
        "<img  style='padding:0; width: 100%; size:A4; margin:0;' src='" +
        img +
        "' /></body></html>"
      );
    },

    async UploadImagesMail() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        //************20/11/2022
        /*  .UploadImagesMail(this.mailId, this.imagesToSend, Number(9))*/
        .UploadImagesMail(
          this.mailId,
          this.imagesToSend,
          Number(localStorage.getItem("AY_LW")),
        )

        //*************end 20/11/2022
        .then((res) => {
          setTimeout(() => {
            this.ButtonUploadImagesMail = false;
            this.loading = false;
            this.screenFreeze = false;

            this.imagesToSend = [];
      

            this.GetSentMailById();
            this.GetAllDocN("next");
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    async GetDocmentForMailToShow() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.documentService
        .GetDocmentForMail(Number(this.mailId), 1)
        .then((res) => {
          this.imagesToShow = res.data.result.documents;
        })
        .catch((err) => {
          this.addErorr = err.message;
        });
    },

    printImage(img) {
      var Pagelink = "هيئة الرقابة الادارية ليبيا";
      var pwa = window.open(
        Pagelink,
        "_new",
        "status=1,scrollbars=1,height=533,width=800",
      );

      pwa.document.open();
      pwa.document.write(this.ImagetoPrint(img));
      pwa.document.close();
    },
  },
};
</script>
