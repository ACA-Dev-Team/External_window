<template>
  <div class="">
    <div class="h-screen bg-gray-100 overflow-hidden flex">
      <asideComponent :isOpen="menuOpen"></asideComponent>
      <div class="flex-1 bg-gray-200 w-0 overflow-y-auto pb-20">
        <div class="max-w-screen-2xl mx-auto flex flex-col md:px-8">
          <navComponent @menu-toggled="onMenuToggle"></navComponent>
          <main class="flex-1 relative focus:outline-none pt-2 pb-6">
            <div
              class="flex flex-col mt-4 md:mt md:flex-row justify-between items-center"
            >
              <h3 class="text-xl font-semibold mt-4 md:mt-0 text-gray-900">
                معلومات البريد
              </h3>
              <!-- 
                                animate-bounce
                            -->

          
              <div
                class="float-left mt-4 md:mt-0 text-base font-semibold text-gray-800"
              >
                رقم الرسالة
                <span class="mr-4 underline font-bold text-2xl">
                  {{ mail_Number }} - {{ department_Id }} - {{ mail_year }}
                </span>
              </div>
            </div>

            <div class="mt-6 space-y-6">
              <div class="grid grid-cols-1 xl:grid-cols-7 gap-4 p-2">

                <section
                  class="col-span-5 p-4 flex flex-col md:flex-row justify-between items-stretch"
                >
                 
                  <section
                    class="md:w-10/12 md:mr-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 bg-gray-100 rounded-md p-6"
                  >
                    <div class="sm:col-span-6">
                      <label
                        for="summary"
                        class="block text-base font-semibold text-gray-800"
                      >
                        الملخص
                      </label>

                      <div
                        class="block mt-2 w-full rounded-md h-24 text-sm border border-green-400 p-2 overflow-y-scroll"
                      >
                        {{ summary }}
                      </div>
                    </div>

                    <div class="sm:col-span-6">
                      <label
                        for="action_required"
                        class="block text-base font-semibold text-gray-800"
                      >
                        الإجراء المطلوب
                      </label>
                      <div
                        class="block mt-2 w-full rounded-md h-24 text-sm border border-green-400 p-2 overflow-y-scroll"
                      >
                        {{ required_action }}
                      </div>
                    </div>

                        <div class="sm:col-span-6">
                      <label
                        for="date"
                        class="block text-base font-semibold text-gray-800"
                      >
                        التاريخ
                      </label>

                      <div
                        class="block mt-2 w-full rounded-md h-10 text-sm border border-green-400 p-2"
                      >
                        {{ releaseDate }}
                      </div>
                    </div>
                  </section>
                </section>

                <section
                  class="lg:col-span-2 w-full bg-gray-100 rounded-md p-4 "
                >
                  <div class="flex justify-between items-center">
                    <h3 class="block text-base font-semibold text-gray-800">
                      المستندات
                    </h3>
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
                        v-if="resended_from == 0"
                        @click="search_the_doc()"
                        class="py-2 px-4 bg-white rounded-lg tracking-wide border border-blue-600 cursor-pointer hover:text-white hover:bg-blue-600 focus:outline-none duration-300 text-sm leading-normal"
                      >
                        بحث
                      </button>

                      <button
                        v-else
                        @click="search_the_doc_sec()"
                        class="py-2 px-4 bg-white rounded-lg tracking-wide border border-blue-600 cursor-pointer hover:text-white hover:bg-blue-600 focus:outline-none duration-300 text-sm leading-normal"
                      >
                        بحث
                      </button>
                    </div>
                  </div>

                  <div
                    v-if="image_of_doc"
                    class="h-72 w-full bg-gray-100 rounded-md mt-4 mb-10"
                  >
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

                          <!-- وسم مائي -->
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

                          <!-- أزرارك -->
                          <div
                            class="absolute inset-0 flex justify-between items-center"
                          >
                            <div>
                              <button
                                @click="farst_documents()"
                                class="bg-gray-500 hover:bg-gray-400 px-2 py-2 rounded-lg text-xs text-white"
                              >
                                &#x276E; &#x276E;
                              </button>
                            </div>

                            <div>
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
                            </div>

                            <div>
                              <button
                                @click="last_documents()"
                                class="bg-gray-500 hover:bg-gray-400 px-2 py-2 rounded-lg text-xs text-white"
                              >
                                &#x276F; &#x276F;
                              </button>
                            </div>
                          </div>
                        </div>

                        <!-- التنقل بين المستندات -->
                        <div
                          class="flex justify-between items-center pt-2 MB-2"
                        >
                          <div
                            class="ml-2 flex justify-between items-center w-full"
                          >
                            <div v-if="resended_from == 0" class="w-8 h-8">
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

                            <div v-else class="w-8 h-8">
                              <button
                                title="prev"
                                v-if="doc_number > 1"
                                @click="GetAllDocN_sec('prev')"
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

                            <div>{{ doc_number }} / {{ total_of_doc }}</div>

                            <div v-if="resended_from == 0" class="w-8 h-8">
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

                            <div v-else class="w-8 h-8">
                              <button
                                v-if="doc_number < total_of_doc"
                                title="next"
                                @click="GetAllDocN_sec('next')"
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

           
             
            </div>
          </main>
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
        <!-- <div
          v-if="image_to_print_n_model"
          id="printMe"
          class="bg-black bg-opacity-50 h-screen-100"
        >
          <div
            v-for="image in image_to_print_n"
            :key="image.id"
            class="h-screen-100"
          >
            <template v-if="isPdfFile(image.url)">
              <iframe
                :src="image.url"
                class="w-full h-screen border-0"
              ></iframe>
            </template>

            
            <template v-else>
              <img
                :src="image.url"
                :alt="'Image ' + image.id"
                :style="{
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  transform: `scale(${zoom})`,
                  transition: 'transform 0.2s ease',
                }"
              />
            </template>
          </div>
        </div> -->

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
                v-if="roles.includes('kkk') && isPdfFile(image_of_doc)"
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
                  v-if="resended_from == 0"
                  @click="search_the_doc()"
                  class="py-2 px-4 bg-white rounded-lg tracking-wide border border-blue-600 cursor-pointer hover:text-white hover:bg-blue-600 focus:outline-none duration-300 text-sm leading-normal"
                >
                  بحث
                </button>

                <button
                  v-else
                  @click="search_the_doc_sec()"
                  class="py-2 px-4 bg-white rounded-lg tracking-wide border border-blue-600 cursor-pointer hover:text-white hover:bg-blue-600 focus:outline-none duration-300 text-sm leading-normal"
                >
                  بحث
                </button>
              </div>
            </div>

            <!-- الصورة مع العلامة المائية -->
            <div class="relative h-screen-93 min-w-full mt-4">
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
              <div class="">
                <button
                  @click="farst_documents()"
                  class="bg-gray-500 hover:bg-gray-400 px-2 py-2 rounded-lg text-xs text-white"
                >
                  &#x276E; &#x276E;
                </button>
              </div>

              <div v-if="resended_from == 0" class="w-12 h-8">
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

              <div v-else class="w-12 h-8">
                <button
                  title="prev"
                  v-if="doc_number > 1"
                  @click="GetAllDocN_sec('prev')"
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

              <div v-if="resended_from == 0" class="w-12 h-8">
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

              <div v-else class="w-12 h-8">
                <button
                  v-if="doc_number < total_of_doc"
                  title="next"
                  @click="GetAllDocN_sec('next')"
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
      v-if="show_current_image_for_bigger_screen_model2"
      class="w-screen h-full fixed inset-0 z-50 overflow-hidden"
    >
      <div class="relative">
        <!-- جميع الصور للطباعة -->
        <div
          v-if="image_to_print_n_model2"
          id="printMe2"
          class="bg-black bg-opacity-50 h-screen-100"
        >
          <div
            v-for="image in image_to_print_n2"
            :key="image.id"
            class="h-screen-100 relative"
          >
            <img
              :src="image.path"
              alt=""
              class="h-full w-full object-contain z-0"
            />
          </div>
        </div>

        <!-- صورة واحدة للطباعة -->
        <div
          v-if="image_to_print_n_model2"
          id="print_one_dec2"
          class="bg-black bg-opacity-50 h-screen-100 relative"
        >
          <div class="h-screen-100 relative">
            <img
              :src="image_of_doc2"
              alt=""
              class="h-full w-full object-contain"
            />
          </div>
        </div>

        <!-- واجهة التحكم الرئيسية -->
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
              <button
                @click="show_current_image_for_bigger_screen_model2 = false"
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
                v-if="roles.includes('kkk') && measure_id_for_photo != 1"
                @click="print_image2()"
                v-print="'#print_one_dec2'"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة المستند الحالي
              </button>

              <button
                v-if="roles.includes('kkk') && measure_id_for_photo != 1"
                @click="print_image2()"
                v-print="'#printMe2'"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة كافة المستندات
              </button>

              <div
                v-if="image_of_doc2"
                class="flex items-center border border-blue-400 rounded-md"
              >
                <input
                  type="text"
                  v-model="doc_number_to_search2"
                  id="doc_number"
                  class="ml-2 block w-16 rounded-md h-10 text-sm border border---200 hover:shadow-sm focus:outline-none focus:border-blue-300 p-2"
                />

                <button
                  @click="search_the_doc2()"
                  class="py-2 px-4 bg-white rounded-lg tracking-wide border border-blue-600 cursor-pointer hover:text-white hover:bg-blue-600 focus:outline-none duration-300 text-sm leading-normal"
                >
                  بحث
                </button>
              </div>
            </div>

            <!-- عرض الصورة مع العلامة المائية -->
            <div class="h-screen-93 mt-4 relative">
              <img
                :src="image_of_doc2"
                alt="image"
                :class="image_rotate ? 'rotate-0' : 'rotate-180'"
                class="h-full w-full object-contain transform z-0"
              />

              <!-- العلامة المائية -->
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

            <!-- شريط التنقل بين المستندات -->
            <div
              class="absolute bottom-3 z-50 bg-gray-100 flex justify-between items-center w-full mx-auto mt-4"
            >
              <div>
                <button
                  @click="farst_documents2()"
                  class="bg-gray-500 hover:bg-gray-400 px-2 py-2 rounded-lg text-xs text-white"
                >
                  &#x276E; &#x276E;
                </button>
              </div>

              <div class="w-12 h-8">
                <button
                  title="prev"
                  v-if="doc_number2 > 1"
                  @click="GetAllDocN_resend('prev')"
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
                {{ doc_number2 }} / {{ total_of_doc2 }}
              </div>

              <div class="w-12 h-8">
                <button
                  v-if="doc_number2 < total_of_doc2"
                  title="next"
                  @click="GetAllDocN_resend('next')"
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

              <div>
                <button
                  @click="last_documents2()"
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
      v-if="show_images_model"
      class="w-screen h-full absolute inset-0 z-50 overflow-hidden"
    >
      <div class="relative">
        <div
          v-if="to_test_print_images_model"
          id="printMe"
          class="bg-black bg-opacity-50 h-screen-85"
        >
          <div
            v-for="image in show_images_images_model"
            :key="image.id"
            class="h-screen-85"
          >
            <img
              :src="image.path"
              alt=""
              class="h-full w-full object-contain"
            />
          </div>
        </div>

        <div
          class="h-screen flex flex-col justify-center items-center bg-black bg-opacity-90 absolute top-0 inset-0 z-50 w-full"
        >
          <div class="max-w-3xl mx-auto">
            <div class="flex justify-between items-center w-full">
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
                v-if="roles.includes('kkk') && measure_id_for_photo != 1"
                @click="print_image()"
                v-print="'#printMe'"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg"
              >
                طباعة كافة المستندات
              </button>
            </div>

            <div class="h-screen-85 mt-4">
              <img
                :src="testimage_images_model"
                alt="image"
                class="h-full w-full object-contain"
              />
            </div>

            <div
              v-if="testimage_images_model"
              class="flex justify-between items-center max-w-xs mx-auto w-full mt-4 text-white"
            >
              <button
                @click="previousImage_images_model()"
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

              <div class="text-white">
                {{ indextotest_images_model + 1 }} /
                {{ show_images_images_model.length }}
              </div>

              <button
                title="next"
                @click="nextImage_images_model()"
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

      <!-- w-full h-full rounded object-contain -->
    </div>

    <div
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
                v-if="roles.includes('kkk') && measure_id_for_photo != 1"
                v-print="'#print_reply_doc_n'"
                class="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-white"
              >
                طباعة المستند الحالي
              </button>
            </div>

            <div class="h-screen-93 mt-4">
              <img
                :src="reply_image_of_doc"
                alt="image"
                class="h-full w-full object-contain"
              />
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
            @click="prevImage_sig_send"
            class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-white transition-all text-sm font-bold"
          >
            السابق
          </button>
          <span
            class="text-white text-sm font-mono bg-black/50 px-3 py-1 rounded-full"
          >
            {{ currentIndexsig + 1 }} / {{ signture_images.length }}
          </span>
          <button
            @click="nextImage_sig_send"
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

//import { HubConnectionBuilder } from "@microsoft/signalr";

export default {
  created() {},

  destroyed() {
    console.log("destroyed_inbox_form");
    if (this.conn != null) {
      if (this.conn.readystate != 3) {
        console.log("readystate destory_inbox_form=" + this.conn.readyState);
        this.conn.close();
        console.log("close_inbox_form");
        this.conn = null;
      }
    }
  },

  computed: {
    currentImagesig() {
      return this.signture_images[this.currentIndexsig] || null;
    },

    filterByTermMembers() {
      return this.members.filter((member) => {
        return member.userName.includes(this.memberNameSelected);
      });
    },

    filterByTerm1() {
      return this.departments.filter((department) => {
        return department.departmentName.includes(this.departmentNameSelected2);
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
  },

  async mounted() {
    this.GetAllBranches();

    this.GetAllDocuments_signture(),
      window.addEventListener("resize", this.handleResize);

    this.perent_id = localStorage.getItem("perent_id");
    this.roles = localStorage.getItem("Az07");

    this.user_name33 = localStorage.getItem("user_name");

    if (
      localStorage.getItem("AY_LW") == null ||
      localStorage.getItem("member") == "true" ||
      !this.roles.includes("nnn")
    ) {
      this.$router.push("/");
    }

    //21/1/2023*********************websocket
    /*  this.conn = new WebSocket("ws://localhost:58316/ws");
    //  this.conn = new WebSocket("ws://mail:82/ws");
    console.log("inbox_form websocket connect ok mounted");

 

this.conn.onerror =(error) =>{
console.log("inbox_form.vue  WebSocket Error " + error);
};

this.conn.onclose =(event) =>{
console.log("inbox_form.vue readystate"+this.conn.readyState);
console.log(" inbox_form.vue WebSocket close");
console.log("code inbox_form="+event.code);

};

    this.conn.onmessage = (event) => {
       console.log("inbox_form onmessage mounted ");
      let scannedImage = event.data;
      let mgs = JSON.parse(scannedImage);
      this.imagesscantest = mgs;
      var ind = this.imagesscantest.index;
      console.log("inbox_form index="+ind);
      if (ind == 1) {
        this.keyid = this.imagesscantest.keyid;
        console.log("mounted inbox keyid="+this.keyid);
      } else {
         console.log("inbox_form.vue else");
        //this.imagesToSend=[]
        for (var i = 0; i < mgs["image"].length; i++) {
          this.indexOfimagesToShow++;
          this.imagesToSend.push({
            baseAs64: mgs["image"][i],
            index: this.indexOfimagesToShow,
          });
        }
      }
    };*/
    //****************21/1/20232

    this.mailId = this.$route.params.mail;

    this.resended_from = this.$route.params.resended_from;

    this.department_id2 = this.$route.params.department_id2;

    if (this.department_id2) {
      localStorage.setItem("department_id3", this.department_id2);
    }

    this.department_id2 = localStorage.getItem("department_id3");

    this.isperent = localStorage.getItem("isperent");

    this.my_user_id = localStorage.getItem("AY_LW");
    this.my_department_id = localStorage.getItem("chrome");

    if (this.$route.params.mail) {
      if (this.$route.params.type == "1") {
        this.to_test_passing_mail_type = 1;
      }
      if (this.$route.params.type == "2") {
        this.to_test_passing_mail_type = 2;
      }
      if (this.$route.params.type == "3") {
        this.to_test_passing_mail_type = 3;
      }

      await this.getMailById();

      this.GetAllMembers();

      this.GetAllDepartments();

      if (this.resended_from == 0) {
        this.GetAllDocN("next");
        this.GetAllDocN_resend("next");
      } else {
        this.GetAllDocN_sec("next");
        this.GetAllDocN_resend("next");
      }
    } else {
    }

    if (this.$route.params.mail_state_flag == 2) {
      this.read_it_mail();
    }
  },

  beforeDestroy() {
    // أو beforeUnmount في Vue 3
    window.removeEventListener("resize", this.handleResize);
  },

  components: {
    asideComponent,
    navComponent,
    svgLoadingComponent,
  },

  data() {
    return {


      cont_state:0,
      perent_id: "",

      sig_state: -1,

      allsubDepartment: false,
      allsubDepartmentButton: true,

      blblbl: [],

      p_id: 0,
      p_uid: 0,
      p_did: 0,
      p_mydep: 0,

      menuOpen: true,
      user_name33: "",
      mail_state_flag: 0,
      try_selectedFiles: [],
      try_message: "",
      try_mail_id: "",
      try_userId: localStorage.getItem("AY_LW"),
      user_department: localStorage.getItem("chrome"),

      measure_id_for_photo: 0,
      members12: [],
      resended_from: 0,

      isperent: false,

      mail_sended: false,
      department_list: [],
      members_list: [],
      section_Notes: [],
      alert_delete_document: false,

      alert_state: false,
      alert_state_true_false: false,
      alert_prepare_delete_document: false,
      alert_prepare_delete_mail: false,
      //*************

      departmentselect2: false,

      departmentselect: false,
      memberselect: false,

      departmentNameSelected2: "",
      departmentIdSelected2: "",
      departmentName2: "",

      memberNameSelected: "",
      memberIdSelected: "",
      memberName: "",
      members: [],

      Departments2: [],

      image_rotate: true,
      redirection1: true,

      documentSection: true,
      doc_number_to_search: "",
      doc_number_to_search2: "",

      //********21/1/2023
      keyid: "",
      conn: null,
      //**end 21/1/2023
      reply_id_to_delete: "",
      alert_delete_document: false,

      roles: [],
      from_reply_or_general: "",

      to_test_print_images_model: false,
      show_images_model: false,

      testimage_images_model: "",
      indextotest_images_model: 0,

      show_images_images_model: [],

      testimage: "",
      indextotest: 0,

      reply_to_add: "",
      to_test_passing_mail_type: "",

      my_user_id: "",
      my_department_id: "",

      mailType: this.$route.params.type,
      sends_id: this.$route.params.sends_id,

      mail_Number: "",
      mail_year: "",

      releaseDate: "",
      summary: "",
      classification: "",
      general_incoming_number: "",
      genaral_inbox_year: "",
      required_action: "",
      required_action2: "",
      required_action7: "",

      consignees: [],
      consignees7: [],

      consigneesIncludesId: [],
      consigneesIncludesId7: [],

      newactionSenders: [],
      newactionSendersIncludesId: [],

      newactionSenders7: [],
      newactionSendersIncludesId7: [],

      mailId: "",
      external_mailId: "",

      department_Id: "",

      department_id2: "",

      imagesToSend: [],

      imagesToSend_sig: [],

      indexOfimagesToShow: 0,

      action_required_by_the_entity: "",
      mail_forwarding: "",

      send_to_sector: "",

      sectors: [],
      sectorselect: false,
      sectorIdSelected: "",

      sides: [],

      sideselect: false,
      sideIdSelected: "",

      send_to_side: "",

      entity_reference_number: "",
      procedure_type: "",
      entity_mail_date: "",
      mail_ward_type: "",
      ward_to: "",

      to_test_passing_mail_type: "",
      remove_button_consignees: true,
      add_button_consignees: true,

      remove_button_consignees7: true,
      add_button_consignees7: true,

      side: 0,
      action: 0,

      imagesToShow: [],

      loading: false,
      screenFreeze: false,

      replies: [],

      doc_number: 0,
      total_of_doc: 0,

      image_of_doc: "",
      id_of_doc: "",
      image_to_print_n: [],

      doc_number2: 0,
      total_of_doc2: 0,

      image_of_doc2: "",
      id_of_doc2: "",
      image_to_print_n2: [],

      image_to_print_n_model: false,
      image_to_print_n_model_sig: false,
      image_to_print_n_model2: false,

      show_current_image_for_bigger_screen_model: false,
      show_current_image_for_bigger_screen_model_sig: false,
      show_current_image_for_bigger_screen_model2: false,

      reply_doc_number: 0,
      reply_total_of_doc: 0,

      reply_image_of_doc: "",
      reply_id_of_doc: "",
      reply_image_to_print_n: [],

      reply_image_to_print_n_model: false,
      show_current_reply_image_to_for_bigger_screen_model: false,

      id_reply_image: "",

      external_sectoin: [],

      delete_all_documents: false,

      scan: false,

      allMembers: false,
      allMemberButton: true,

      signture_images: [],

      currentIndex_sig: 0,

      total_sig: 0,

      blblblbranch: [],
      AllBranches: [],

      add_button_consigneesbranch: true,

      show_branch: false,

      branchselect: false,

      branchNameSelected: "",
      branchIdSelected: "",
      allbranchButton: true,

      allbranch: false,

      showAnnotatedModal: false,

      currentIndexsig: 0,
      selectedImages_sig: [],
      selectAllsig: false,
      reply_total_of_doc_sig: 0,
    };
  },
  methods: {

    cont_state_change(){

  
      this.$http.mailService
        .Contarct_State(this.sends_id,Number(this.cont_state) )
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },


    toggleSelectAllsig() {
      this.selectedImages_sig = this.selectAllsig
        ? [...this.signture_images]
        : [];
    },

    save_selected_images() {
      for (let index = 0; index < this.selectedImages_sig.length; index++) {
        this.imagesToSend_sig.push({
          baseAs64: this.selectedImages_sig[index].path,
          index: index + 1,
          department_id: Number(this.my_department_id),
        });
      }

      this.showAnnotatedModal = false;
    },

    selectbranch(id, name) {
      this.allbranch = false;
      this.branchNameSelected = name;
      this.branchIdSelected = id;
    },

    selectAllbranch(x, name) {
      this.branchNameSelected = name;

      this.allbranch = true;
      this.blblblbranch = x;
    },

    async Signiture_State(state) {
      //              const token = await ensureAccessToken();
      // if (!token) return;

      this.$http.mailService
        .Signiture_State(this.sends_id, state, 2, this.mailId)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
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

            this.$http.mailService
        .PrintOrShowDocument(
          Number(this.mailId),
          Number(localStorage.getItem("AY_LW")),
          Number(this.from_reply_or_general)
        )
        .then((res) => {
          setTimeout(() => {
            console.log(res);
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

    isPdfFile(file) {
      return file && typeof file === "string" && file.endsWith(".pdf");
    },

    handleResize() {
      this.menuOpen = window.innerWidth >= 800;
    },

    onMenuToggle(value) {
      this.menuOpen = value; // 🔹 نستقبل القيمة هنا
    },

    GetMailsToPrint() {
      this.$router.push({
        name: "mail_report",
        params: {
          mn: this.mail_Number,
          sumary: this.summary,
          mid: this.mailId,
          dep: Number(this.my_department_id),
          type: this.to_test_passing_mail_type,
        },
      });
    },

    async read_it_mail() {
      //                 const token = await ensureAccessToken();
      // if (!token) return;

      this.$http.mailService
        .read_it_mail(
          this.mailId,
          Number(localStorage.getItem("chrome")),
          Number(localStorage.getItem("AY_LW")),
        )
        .then((res) => {})
        .catch((err) => {
          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
            console.log(err);
          }, 100);
        });
    },

    try_handleFilesChange(event) {
      this.try_selectedFiles = Array.from(event.target.files);
    },
    async try_upload() {
      if (!this.try_selectedFiles.length) {
        this.try_message = "يرجى اختيار الصور أولاً";
        return;
      }

      try {
        // تحويل كل صورة إلى base64
        const try_base64List = await Promise.all(
          this.try_selectedFiles.map((file, index) => {
            return this.try_convertToBase64(file).then((base64) => ({
              baseAs64: base64,
              index: index,
              department_id: Number(this.user_department),
            }));
          }),
        );

        // تجهيز البيانات
        var data = {
          mail_id: Number(this.mailId),
          userId: Number(this.try_userId),
          list: try_base64List,
        };

        const token = await ensureAccessToken();
        if (!token) return;

        this.$http.documentService
          .upload_doc_from_web(data)
          .then((res) => {
            this.try_message = res.data.message || "تم رفع الصور بنجاح";

            this.try_selectedFiles = [];
            this.$refs.try_fileinput.value = null;

            //this.doc_number2=0,
            this.GetAllDocN_resend("next"); // ayoub lwela
          })
          .catch((err) => {
            this.try_message = "حدث خطأ أثناء رفع الصور";
            this.try_selectedFiles = [];
            this.$refs.try_fileinput.value = null;
            console.log(err);
          });

        // إرسال الطلب إلى API
        // const response = await axios.post("http://mail:96/api/Mail/Uplode", data);
      } catch (err) {
        this.try_message = "حدث خطأ أثناء رفع الصور";
        this.try_selectedFiles = [];
        this.$refs.try_fileinput.value = null;
        console.error(err);
      }
    },

    async try_upload_sig() {
      if (!this.imagesToSend_sig.length) {
        this.try_message = "يرجى اختيار الصور أولاً";
        return;
      }

      try {
        // تحويل كل صورة إلى base64

        // تجهيز البيانات
        var data = {
          mail_id: Number(this.mailId),
          userId: Number(this.try_userId),
          list: this.imagesToSend_sig,
        };

        const token = await ensureAccessToken();
        if (!token) return;

        this.$http.documentService
          .upload_doc_from_web(data)
          .then((res) => {
            this.try_message = res.data.message || "تم رفع الصور بنجاح";

            this.imagesToSend_sig = [];
            this.$refs.try_fileinput.value = null;

            //this.doc_number2=0,
            this.GetAllDocN_resend("next"); // ayoub lwela
          })
          .catch((err) => {
            this.try_message = "حدث خطأ أثناء رفع الصور";
            this.imagesToSend_sig = [];
            this.$refs.try_fileinput.value = null;
            console.log(err);
          });

        // إرسال الطلب إلى API
        // const response = await axios.post("http://mail:96/api/Mail/Uplode", data);
      } catch (err) {
        this.try_message = "حدث خطأ أثناء رفع الصور";
        this.try_selectedFiles = [];
        this.$refs.try_fileinput.value = null;
        console.error(err);
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

    async update_members() {
      for (let index = 0; index < this.newactionSenders7.length; index++) {
        this.members_list.push(Number(this.newactionSenders7[index].member));
      }

      this.screenFreeze = true;
      this.loading = true;

      var member = {
        mail_id: Number(this.mailId),

        userId: this.members_list,

        admin: Number(this.my_user_id),

        dep: Number(this.my_department_id),
      };

      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .Update_members(member)
        .then((res) => {
          setTimeout(() => {
            // this.loading = false;

            /// this.documentSection = true;
            // this.proceduresSection = true;
            this.members_list = [];
            this.loading = false;
            this.screenFreeze = false;

            this.newactionSenders7 = [];

            // this.mail_Number = res.data.mail_Number;

            // this.mailId = res.data.mailId;
            // this.department_Id = res.data.department_Id;
            // this.mail_year = res.data.mail_year;
            // this.to_test_passing_mail_type = this.mailType;

            this.getMailById();
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    async update_resend() {
      for (let index = 0; index < this.newactionSenders.length; index++) {
        this.department_list.push({
          Sendes_to: this.newactionSenders[index].departmentId,
          ResendFrom: Number(this.newactionSenders[index].resend_from),
          Note: this.newactionSenders[index].measureName,
        });
      }

      this.screenFreeze = true;
      this.loading = true;
      var info = {
        userid: Number(this.my_user_id),
        Mail_id: Number(this.mailId),
        actionSenders: this.department_list,
      };

      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .UpdateResendMail(info)
        .then((res) => {
          setTimeout(() => {
            // this.loading = false;

            // this.documentSection = true;
            // this.proceduresSection = true;
            this.department_list = [];
            this.loading = false;
            this.screenFreeze = false;

            this.newactionSenders = [];

            // this.mail_Number = res.data.mail_Number;

            // this.mailId = res.data.mailId;
            // this.department_Id = res.data.department_Id;
            // this.mail_year = res.data.mail_year;
            // this.to_test_passing_mail_type = this.mailType;

            this.getMailById();
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    async send_resend() {
      this.screenFreeze = true;
      this.loading = true;

      // this.updateMail();

      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .Send_resend(
          Number(this.mailId),
          Number(localStorage.getItem("AY_LW")),
          Number(this.my_department_id),
        )
        .then((res) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
            this.getMailById();
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    async save_resend() {
      for (let index = 0; index < this.newactionSenders.length; index++) {
        this.department_list.push({
          Sendes_to: this.newactionSenders[index].departmentId,
          ResendFrom: Number(this.newactionSenders[index].resend_from),
          Note: this.newactionSenders[index].measureName,
        });
      }

      this.screenFreeze = true;
      this.loading = true;
      var info = {
        userid: Number(this.my_user_id),
        Mail_id: Number(this.mailId),
        actionSenders: this.department_list,
      };

      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .Save_resend(info)
        .then((res) => {
          setTimeout(() => {
            // this.loading = false;

            // this.documentSection = true;
            // this.proceduresSection = true;

            this.loading = false;
            this.screenFreeze = false;

            this.newactionSenders = [];

            // this.mail_Number = res.data.mail_Number;

            // this.mailId = res.data.mailId;
            // this.department_Id = res.data.department_Id;
            // this.mail_year = res.data.mail_year;
            // this.to_test_passing_mail_type = this.mailType;

            this.getMailById();
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    selectAllMembers(x, name) {
      this.memberNameSelected = name;

      this.allMembers = true;

      this.members12 = x;
    },

    async delete_member(member_id) {
      this.screenFreeze = true;
      this.loading = true;

      var member = {
        mail_id: Number(this.mailId),
        userId: [],

        admin: Number(this.my_user_id),

        userdele: Number(member_id),

        dep: Number(this.my_department_id),
      };

      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .cancel_member(member)

        .then((res) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
            // this.consignees = res.data.actionSenders

            const index = this.newactionSenders7.findIndex((element, index) => {
              if (element.memberId === member_id) {
                return true;
              }
            });
            this.newactionSenders7.splice(index, 1);

            const index2 = this.consignees7.findIndex((element, index2) => {
              if (element.memberId === member_id) {
                return true;
              }
            });
            this.consignees7.splice(index2, 1);

            // const index3 = this.department_list.findIndex((element, index) => {
            //   if (element.departmentId === department_id) {
            //     return true;
            //   }
            // });
            // this.department_list.splice(index2, 1);
            this.getMailById();
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
          alert("حدث خطأ أثناء عملية الحذف");
        });
    },

    async delete_side_measure(sends, section_id, department_id) {
      this.screenFreeze = true;
      this.loading = true;
      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .cancel_sending_to_department_resend(
          sends,
          section_id,
          Number(localStorage.getItem("AY_LW")),
        )
        .then((res) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
            // this.consignees = res.data.actionSenders
            this.getMailById();

            const index = this.newactionSenders.findIndex((element, index) => {
              if (element.departmentId === department_id) {
                return true;
              }
            });
            this.newactionSenders.splice(index, 1);

            const index2 = this.consignees.findIndex((element, index) => {
              if (element.departmentId === department_id) {
                return true;
              }
            });
            this.consignees.splice(index2, 1);

            // const index3 = this.department_list.findIndex((element, index) => {
            //   if (element.departmentId === department_id) {
            //     return true;
            //   }
            // });
            // this.department_list.splice(index2, 1);
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

    // deleteAllDocuments() {
    //   this.alert_prepare_delete_document = false;

    //   this.$http.mailService
    //     .DeleteAllDocuments(
    //       Number(this.mailId),
    //       Number(localStorage.getItem("AY_LW"))
    //     )
    //     .then((res) => {
    //       this.doc_number = 0;
    //       this.total_of_doc = 0;

    //       this.image_of_doc = "";
    //       this.id_of_doc = "";

    //       this.doc_number2 = 0;
    //       this.total_of_doc2 = 0;

    //       this.image_of_doc2 = "";
    //       this.id_of_doc2 = "";

    //       this.alert_state = true;
    //       this.alert_state_true_false = true;

    //       // this.GetAllDocN("next");

    //       // this.imagesToShow.splice(index, 1);
    //       // this.mail_search();

    //       // this.imagesToShow = res.data.result.documents
    //     })
    //     .catch((err) => {
    //       this.alert_state = true;
    //       this.alert_state_true_false = false;
    //       this.addErorr = err.message;
    //     });
    // },

    async deleteDocument() {
      this.alert_prepare_delete_document = false;

      const token = await ensureAccessToken();
      if (!token) return;

      this.$http.mailService
        .DeleteDocument(
          Number(this.id_of_doc2),
          Number(localStorage.getItem("AY_LW")),
        )
        .then((res) => {
          this.doc_number = 0;
          this.total_of_doc = 0;

          this.image_of_doc = "";
          this.id_of_doc = "";

          this.doc_number2 = 0;
          this.total_of_doc2 = 0;

          this.image_of_doc2 = "";
          this.id_of_doc2 = "";

          this.alert_state = true;
          this.alert_state_true_false = true;

          this.GetAllDocN("next");
          this.GetAllDocN_resend("next");

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

    async deleteAllDocuments() {
      this.alert_prepare_delete_document = false;

      const token = await ensureAccessToken();
      if (!token) return;

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

          this.doc_number2 = 0;
          this.total_of_doc2 = 0;

          this.image_of_doc2 = "";
          this.id_of_doc2 = "";

          this.alert_state = true;
          this.alert_state_true_false = true;

          this.GetAllDocN("next");

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

    prepare_delete_all_documents() {
      this.delete_all_documents = true;

      this.alert_prepare_delete_document = true;
    },

    async UploadImagesMail() {
      this.screenFreeze = true;
      this.loading = true;
      console.log("test test test");

      const token = await ensureAccessToken();
      if (!token) return;

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
            //   this.ButtonUploadImagesMail = false;
            this.loading = false;
            this.screenFreeze = false;

            this.imagesToSend = [];
            console.log(res);

            this.getMailById();

            this.doc_number2 = 0;
            this.doc_number = 0;

            this.GetAllDocN("next");
            this.GetAllDocN_resend("next");
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    func() {
      if (this.conn == null) {
        console.log("conn=" + this.conn);
        // this.conn = new WebSocket("ws://localhost:58316/ws");
        this.conn = new WebSocket("ws://mail:82/ws");
        // this.conn = new WebSocket("ws://mail:96/ws");

        this.conn.onclose = (event) => {
          console.log("close code_sent_form=" + event.code);
        };

        this.conn.onmessage = (event) => {
          console.log("onmessage");
          let scannedImage = event.data;

          let mgs = JSON.parse(scannedImage);
          //console.log( "tttt="+mgs.image);
          this.imagesscantest = mgs;
          var ind = this.imagesscantest.index;
          console.log("index=" + ind);
          if (ind == 1) {
            this.keyid = this.imagesscantest.keyid;
            //   localStorage.setItem("keyid",this.keyid);
            console.log("keyid=" + this.keyid);
            console.log(
              "count websocket_ send_form=" + this.imagesscantest.count1,
            );
          } else {
            var flag1 = this.imagesscantest.flag1;
            if (flag1 == 1) {
              console.log("flag=" + flag1);
              this.imagesToSend = [];
            }
            for (var i = 0; i < mgs["image"].length; i++) {
              //****************13/12/2024
              //  this.indexOfimagesToShow++;
              // this.imagesToSend.push({
              //   baseAs64: mgs["image"][i],
              //   index: this.indexOfimagesToShow,
              //   department_id:Number(this.my_department_id),
              //});
              console.log("order index" + mgs.image[i].num_img);
              this.imagesToSend.push({
                baseAs64: mgs.image[i].img,
                index: mgs.image[i].num_img,
                department_id: Number(this.my_department_id),
              });
              //*******End 13/12/2024
            }

            if (flag1 == 1) {
              console.log("uploadimagemail function  inbox_form");

              this.UploadImagesMail();
            }
          }
        };
      } else if (this.conn.readyState === 3 || this.conn.readyState === 2) {
        console.log("readystate=" + this.conn.readyState);
        this.conn.close();
        this.conn = null;
        this.func();
      } else {
        console.log("func");
        var mailid = this.mailId;
        var keyid = this.keyid;

        var timeout;
        window.addEventListener("blur", function (e) {
          window.clearTimeout(timeout);
        });

        timeout = window.setTimeout(function () {
          window.location = "http://mail/scanner_app8/SetupNew.msi";
        }, 1000);

        document.location =
          "Stage2Scaner:flag=1" + "mId=" + mailid + "keyid=" + keyid;
      }

      //21/1/2023
      /* var link = document.getElementById("a1");

      var replyByDepartmenId = this.replyByDepartmenId;
      var sends_id = this.sends_id;
      var mailid = this.mailId;
      var keyid = this.keyid;

      var timeout;
      window.addEventListener("blur", function (e) {
        window.clearTimeout(timeout);
      });

      timeout = window.setTimeout(function () {
        window.location = "http://mail/scanner_app/Setup1.msi";
      }, 1000);

      link.href = "SScaner:flag=1" + "mId=" + mailid + "keyid=" + keyid;*/
      //end 21/1/2023
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

    remove_to_array_of_members(consignee7, name) {
      if (this.mail_Number) {
        const index = this.newactionSenders7.findIndex((element, index) => {
          if (element.member === consignee7) {
            return true;
          }
        });
        this.newactionSenders7.splice(index, 1);
        this.newactionSendersIncludesId7.splice(index, 1);
      } else {
        const index = this.newactionSenders7.findIndex((element, index) => {
          if (element.member === consignee7) {
            return true;
          }
        });
        this.newactionSenders7.splice(index, 1);
        this.newactionSendersIncludesId7.splice(index, 1);
      }

      // this.departments.push({
      //   id: consignee,
      //   departmentName: name,
      // });

      this.allMemberButton = true;
    },

    selectmember(id, name, index) {
      this.allMembers = false;
      this.memberNameSelected = name;
      this.memberIdSelected = id;

      this.indexOfmember = index;
    },

    add_to_array_of_side_measure() {
      // consigneesIncludesId

      {
        if (this.allsubDepartment) {
          for (let index = 0; index < this.blblbl.length; index++) {
            if (
              this.newactionSendersIncludesId.includes(this.blblbl[index].id) ||
              this.consigneesIncludesId.includes(this.blblbl[index].id) ||
              this.blblbl[index].officeOrdirectorate != 3
            ) {
            } else {
              this.newactionSenders.push({
                departmentId: this.blblbl[index].id,
                departmentName: this.blblbl[index].departmentName,
                resend_from: this.my_department_id,
                measureName: this.required_action2,
              });

              this.newactionSendersIncludesId.push(this.blblbl[index].id);
            }
          }

          this.departmentNameSelected2 = "";
          this.departmentIdSelected2 = "";

          this.required_action2 = "";
          // this.measureIdSelected = "";
          // this.measureNameSelected = "";

          // this.departments = [];
          this.allsubDepartmentButton = false;
        } else if (
          this.newactionSendersIncludesId.includes(
            this.departmentIdSelected2,
          ) ||
          this.consigneesIncludesId.includes(this.departmentIdSelected2)
        ) {
          alert("تم اضافة الادارة من قبل");
          this.departmentNameSelected2 = "";
          this.departmentIdSelected2 = "";
        } else if (this.departmentIdSelected2) {
          this.newactionSendersIncludesId;
          this.newactionSenders.push({
            departmentId: this.departmentIdSelected2,
            departmentName: this.departmentNameSelected2,
            resend_from: this.my_department_id,
            measureName: this.required_action2,
          });
          this.newactionSendersIncludesId.push(this.departmentIdSelected2);

          this.departmentNameSelected2 = "";
          this.departmentIdSelected2 = "";

          this.required_action2 = "";
        }

        // this.departments.splice(this.indexOfDepartment, 1);
      }

      if (this.branchIdSelected || this.allbranch) {
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
                resend_from: this.my_department_id,
                measureName: this.required_action2,
              });
              this.newactionSendersIncludesId.push(this.blblblbranch[index].id);
            }
          }

          this.branchNameSelected = "";
          this.branchIdSelected = "";
          this.required_action2 = "";

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
          } else {
            this.newactionSendersIncludesId;
            this.newactionSenders.push({
              departmentId: this.branchIdSelected,
              departmentName: this.branchNameSelected,
              resend_from: this.my_department_id,
              measureName: this.required_action2,
            });

            this.newactionSendersIncludesId.push(this.branchIdSelected);

            this.branchNameSelected = "";
            this.branchIdSelected = "";

            this.required_action2 = "";
          }

          // this.departments.splice(this.indexOfDepartment, 1);
        }
      }
    },

    add_to_array_of_members() {
      // consigneesIncludesId

      if (this.allMembers) {
        for (let index = 0; index < this.members12.length; index++) {
          if (
            this.newactionSendersIncludesId7.includes(
              this.members12[index].userId,
            ) ||
            this.consigneesIncludesId7.includes(this.members12[index].userId)
          ) {
          } else {
            this.newactionSenders7.push({
              member: this.members12[index].userId,
              sends: this.mailId,

              member_name: this.members12[index].userName,
            });
            this.newactionSendersIncludesId7.push(this.members12[index].userId);
          }
        }

        this.memberNameSelected = "";
        this.memberIdSelected = "";

        // this.departments = [];
        this.allMemberButton = false;
      } else {
        if (
          this.newactionSendersIncludesId7.includes(this.memberIdSelected) ||
          this.consigneesIncludesId7.includes(this.memberIdSelected)
        ) {
          alert("تم اضافة العضو من قبل");
          this.memberNameSelected = "";
          this.memberIdSelected = "";

          // this.measureIdSelected = "";
          // this.measureNameSelected = "";
        } else {
          this.newactionSendersIncludesId7;
          this.newactionSenders7.push({
            member: this.memberIdSelected,
            sends: this.mailId,

            member_name: this.memberNameSelected,
          });
          this.newactionSendersIncludesId7.push(this.memberIdSelected);

          this.memberNameSelected = "";
          this.memberIdSelected = "";
        }

        // this.departments.splice(this.indexOfDepartment, 1);
      }
    },

    selectdepartment2(id, name, index) {
      //this.allDepartment = false;
      this.departmentNameSelected2 = name;
      this.departmentIdSelected2 = id;

      this.indexOfDepartment = index;
    },

    selectAllsubDepartment(x, name) {
      this.departmentNameSelected2 = name;

      this.allsubDepartment = true;
      this.blblbl = x;
    },

    async GetAllDepartments2() {
      //                 const token = await ensureAccessToken();
      // if (!token) return;

      this.$http.mailService
        .GetBranchOfDepartment(localStorage.getItem("current_department_id"))
        .then((res) => {
          this.departments = res.data;

          for (let index = 0; index < this.departments.length; index++) {
            if (this.departments[index].id == this.department_Id) {
              this.departments.splice(index, 1);
            }
          }
          // this.departments2.splice(24, 1);
          // this.departments2.splice(22, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async GetAllMembers() {
      //                   const token = await ensureAccessToken();
      // if (!token) return;

      this.$http.mailService
        .Get_all_members(localStorage.getItem("current_department_id"))
        .then((res) => {
          this.members = res.data;
          // this.departments2.splice(24, 1);
          // this.departments2.splice(22, 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    farst_documents() {
      this.image_rotate = true;

      this.doc_number_to_search = 1;

      if (this.resended_from == 0) {
        this.search_the_doc();
      } else {
        this.search_the_doc_sec();
      }
    },

    farst_documents2() {
      this.image_rotate = true;

      this.doc_number_to_search2 = 1;
      this.search_the_doc2();
    },

    last_documents() {
      this.image_rotate = true;

      this.doc_number_to_search = this.total_of_doc;
      if (this.resended_from == 0) {
        this.search_the_doc();
      } else {
        this.search_the_doc_sec();
      }
    },

    last_documents2() {
      this.image_rotate = true;

      this.doc_number_to_search2 = this.total_of_doc2;
      this.search_the_doc2();
    },

    async search_the_doc() {
      // doc_number_to_search

      if (this.doc_number_to_search > this.total_of_doc) {
        alert("لقد ادخلة رقم خطا الرجاء إعادة المحاولة");
      } else {
        this.doc_number = this.doc_number_to_search;
        this.screenFreeze = true;
        this.loading = true;

        const token = await ensureAccessToken();
        if (!token) return;

        this.$http.documentService
          .GetAllDocN(this.mailId, this.doc_number, Number(this.department_id2))
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
            console.log(err);
          });
      }
    },

    async search_the_doc_sec() {
      // doc_number_to_search

      if (this.doc_number_to_search > this.total_of_doc) {
        alert("لقد ادخلة رقم خطا الرجاء إعادة المحاولة");
      } else {
        this.doc_number = this.doc_number_to_search;
        this.screenFreeze = true;
        this.loading = true;
        const token = await ensureAccessToken();
        if (!token) return;

        this.$http.documentService
          .GetAllDocN_sec(
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
            this.doc_number = 0;
            console.log(err);
          });
      }
    },

    async search_the_doc2() {
      // doc_number_to_search

      if (this.doc_number_to_search2 > this.total_of_doc2) {
        alert("لقد ادخلة رقم خطا الرجاء إعادة المحاولة");
      } else {
        this.doc_number2 = this.doc_number_to_search2;
        this.screenFreeze = true;
        this.loading = true;

        const token = await ensureAccessToken();
        if (!token) return;

        this.$http.documentService
          .GetAllDocN(
            this.mailId,
            this.doc_number2,
            Number(this.my_department_id),
          )
          .then((res) => {
            this.total_of_doc2 = res.data.total;

            this.image_of_doc2 = res.data.data.url;
            this.id_of_doc2 = res.data.data.id;

            setTimeout(() => {
              this.screenFreeze = false;
              this.loading = false;
            }, 200);
          })
          .catch((err) => {
            this.screenFreeze = false;
            this.loading = false;
            this.doc_number2 = 0;
            console.log(err);
          });
      }
    },

    async getMailById() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.newactionSendersIncludesId = [];
      this.consigneesIncludesId = [];
      this.department_list = [];
      (this.required_action2 = ""),
        this.$http.mailService
          .GetInboxMailById2(
            this.mailId,
            this.my_department_id,
            this.to_test_passing_mail_type,
          )
          .then((res) => {
            this.mail_Number = res.data.mail.mail_Number;
            this.department_Id = res.data.mail.department_Id;
            this.mail_year = res.data.mail.mail_year;

            this.releaseDate = res.data.mail.date_Of_Mail;
            this.summary = res.data.mail.mail_Summary;
            this.classification = res.data.mail.classification_name;
            this.mailType = res.data.mail.mail_Type;
            this.general_incoming_number = res.data.mail.genaral_inbox_Number;
            this.genaral_inbox_year = res.data.mail.genaral_inbox_year;
            this.required_action = res.data.mail.actionRequired;

            this.measure_id_for_photo = res.data.measure_id;

            this.mail_sended = res.data.is_resended;
            this.resended_from = res.data.resended_from;

            // this.resended_from = res.data.resended_from;

            this.replies = res.data.list;

            this.section_Notes = res.data.section_Notes;
            this.consignees = res.data.section_Notes;

            this.consignees7 = res.data.mail_Members_Name;

            this.mail_state_flag = res.data.mail.flag;

            this.sig_state = res.data.signiture_State;


            this.cont_state=res.data.contarct_state
            // this.total_of_doc = res.data.total;

            // this.image_of_doc = res.data.data.path;
            // this.id_of_doc = res.data.data.id;

            // this.total_of_doc2 = res.data.total;

            // this.image_of_doc2 = res.data.data.path;
            // this.id_of_doc2 = res.data.data.id;

            for (
              let index = 0;
              index < res.data.section_Notes.length;
              index++
            ) {
              this.consigneesIncludesId.push(
                res.data.section_Notes[index].department_id,
              );
            }

            for (let index = 0; index < this.consignees7.length; index++) {
              this.consigneesIncludesId7.push(this.consignees7[index].memberId);
            }

            setTimeout(() => {
              // document.getElementById("scroll").scrollTop =
              //   document.getElementById("scroll").scrollHeight;
            }, 100);

            // this.consignees = res.data.actionSenders;

            this.imagesToShow = res.data.mail_Resourcescs;

            if (this.imagesToShow.length > 0) {
              this.testimage = this.imagesToShow[0].path;
            }

            if (this.to_test_passing_mail_type == "2") {
              this.external_sectoin = res.data.external_sectoin;

              this.external_mailId = res.data.external.id;

              this.action_required_by_the_entity =
                res.data.external.action_required_by_the_entity;

              this.mail_forwarding = res.data.external.action;
            }
            if (this.to_test_passing_mail_type == "3") {
              this.external_sectoin = res.data.external_sectoin;

              this.external_mailId = res.data.inbox.id;

              this.mail_forwarding = res.data.inbox.action;

              this.ward_to = res.data.inbox.to;

              this.mail_ward_type = res.data.inbox.type;

              this.entity_mail_date = res.data.inbox.send_time;

              this.entity_reference_number =
                res.data.inbox.entity_reference_number;

              this.procedure_type = res.data.inbox.procedure_type;
            }

            //  this.to_get_all_doc_of_mail();
            //   this.GetDocmentForMail();
            //   this.GetDocmentForMailToShow();

            //   this.GetProcessingResponses()
          })
          .catch((err) => {
            console.log(err);
          });
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
          this.getMailById();
          this.GetAllDocN("next");

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

    async GetAllDocuments_sec(id, plase, department_id) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.from_reply_or_general = plase;
      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        .GetAllDocuments_sec(
          id,
          Number(localStorage.getItem("AY_LW")),
          Number(department_id),
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

    async GetAllDocuments_signture() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.signture_images = [];
      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        .GetAllDocuments_signture(
          this.mailId,
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
          Number(this.department_id2),
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

    async to_get_all_doc_of_mail9() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.p_id = this.mailId;
      this.p_uid = Number(localStorage.getItem("AY_LW"));
      this.p_did = 0;
      this.p_mydep = Number(this.my_department_id);

      this.screenFreeze = true;
      this.loading = true;
      this.$http.mailService
        .GetAllDocuments_sec(
          this.mailId,
          Number(localStorage.getItem("AY_LW")),
          Number(this.department_id2),
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

    async to_get_all_doc_of_mail2() {
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
          this.image_to_print_n2 = res.data;
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

    show_current_image_for_bigger_screen() {
      if (this.resended_from == 0) {
        this.to_get_all_doc_of_mail();
      } else {
        this.to_get_all_doc_of_mail9();
      }

      this.screenFreeze = true;
      this.loading = true;
      setTimeout(() => {
        this.show_current_image_for_bigger_screen_model = true;
        this.screenFreeze = false;
        this.loading = false;
      }, 300);
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

    show_current_image_for_bigger_screen2() {
      this.to_get_all_doc_of_mail2();
      this.screenFreeze = true;
      this.loading = true;
      setTimeout(() => {
        this.show_current_image_for_bigger_screen_model2 = true;
        this.screenFreeze = false;
        this.loading = false;
      }, 300);
    },

    async GetAllDocN_resend(x) {
      const token = await ensureAccessToken();
      if (!token) return;

      this.image_rotate = true;

      if (x == "next") {
        this.doc_number2++;
      } else {
        this.doc_number2--;
      }

      this.screenFreeze = true;
      this.loading = true;
      this.$http.documentService
        .GetAllDocN(
          this.mailId,
          this.doc_number2,
          Number(this.my_department_id),
        )
        .then((res) => {
          this.total_of_doc2 = res.data.total;

          this.image_of_doc2 = res.data.data.url;
          this.id_of_doc2 = res.data.data.id;

          setTimeout(() => {
            this.screenFreeze = false;
            this.loading = false;
          }, 200);
        })
        .catch((err) => {
          this.screenFreeze = false;
          this.loading = false;
          this.doc_number2 = 0;
          console.log(err);
        });
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

      if (this.isperent == "false" && this.resended_from != 0) {
        console.log(
          "1111111111111111111111111111111111111111",
          this.isperent,
          "2222222222",
          this.resended_from,
        );

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
            this.doc_number = 0;
            console.log(err);
          });
      } else {
        console.log(
          "1111111111111111111111111111111111111111",
          this.isperent,
          "2222222222",
          this.resended_from,
        );

        this.$http.documentService
          .GetAllDocN(this.mailId, this.doc_number, Number(this.department_id2))
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
            console.log(err);
          });
      }
    },

    async GetAllDocN_sec(x) {
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

      if (this.resended_from != 0) {
        console.log(
          "1111111111111111111111111111111111111111",
          this.isperent,
          "2222222222",
          this.resended_from,
        );

        this.$http.documentService
          .GetAllDocN_sec(
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
            this.doc_number = 0;
            console.log(err);
          });
      } else {
        console.log(
          "1111111111111111111111111111111111111111",
          this.isperent,
          "2222222222",
          this.resended_from,
        );

        this.$http.documentService
          .GetAllDocN(this.mailId, this.doc_number, Number(this.department_id2))
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
            console.log(err);
          });
      }
    },

    //*******************
    /* reply1() {
      if (this.conn == null) {
        console.log("conn=" + this.conn);
        this.conn = new WebSocket("ws://localhost:58316/ws");
        //  this.conn = new WebSocket("ws://mail:82/ws");

        this.conn.onclose = (event) => {
          console.log("close code_inbox_form=" + event.code);
        };
        this.conn.onmessage = (event) => {
          console.log("inbox_form onmessage");
          let scannedImage = event.data;
          let mgs = JSON.parse(scannedImage);
          this.imagesscantest = mgs;
          var ind = this.imagesscantest.index;
          console.log("inbox_form index=" + ind);
          if (ind == 1) {
            this.keyid = this.imagesscantest.keyid;
            console.log("inbox keyid=" + this.keyid);
            console.log(
              "count websocket_inbox_form=" + this.imagesscantest.count1
            );
          } else {
            console.log("inbox_form.vue else");
            //this.imagesToSend=[]
            for (var i = 0; i < mgs["image"].length; i++) {
              //**********13/12/2024
            
             // this.indexOfimagesToShow++;
             // this.imagesToSend.push({
              //  baseAs64: mgs["image"][i],
              //  index: this.indexOfimagesToShow,
              //  department_id:Number(this.my_department_id),
             // });

               this.imagesToSend.push({
                baseAs64: mgs.image[i].img,
                index: mgs.image[i].num_img,
                 department_id:Number(this.my_department_id),
              });
              //***********end 13/12/2024

            }
          }
        };
      } else if (this.conn.readyState === 3 || this.conn.readyState === 2) {
        console.log("readystate=" + this.conn.readyState);
        this.conn = null;
        this.reply1();
      } else {
        var mailId_to_get_mail_by_id = this.mailId_to_get_mail_by_id;
        var mailId = this.mailId;
        var sends_id = this.sends_id;
        var department_Id = this.department_Id;
        var keyid = this.keyid;

        var timeout;
        window.addEventListener("blur", function (e) {
          window.clearTimeout(timeout);
        });

        timeout = window.setTimeout(function () {
          window.location = "http://mail/scanner_app/Setup1.msi";
        }, 1000);

        console.log("replay" + "  id= " + mailId_to_get_mail_by_id);
        document.location =
          "SScaner:flag=0" +
          "userId=" +
          localStorage.getItem("AY_LW") +
          "mId=" +
          mailId +
          "send_ToId=" +
          sends_id +
          "to=" +
          department_Id +
          "keyid=" +
          keyid;

        console.log(
          "testreplay " +
            "  id= " +
            mailId +
            "userId=" +
            localStorage.getItem("AY_LW") +
            "send_ToId=" +
            sends_id +
            "to=" +
            department_Id +
            "keyid=" +
            keyid
        );
      }*/

    //***********21/1/2023
    /* var link = document.getElementById("a5");
      var mailId_to_get_mail_by_id = this.mailId_to_get_mail_by_id;
      var mailId = this.mailId;
      var sends_id = this.sends_id;
      var department_Id = this.department_Id;
      var keyid = this.keyid;

      var timeout;
      window.addEventListener("blur", function (e) {
        window.clearTimeout(timeout);
      });

      timeout = window.setTimeout(function () {
        window.location = "http://mail/scanner_app/Setup1.msi";
      }, 1000);

      console.log("replay" + "  id= " + mailId_to_get_mail_by_id);
      link.href =
        "SScaner:flag=0" +
        "userId=" +
        localStorage.getItem("AY_LW") +
        "mId=" +
        mailId +
        "send_ToId=" +
        sends_id +
        "to=" +
        department_Id +
        "keyid=" +
        keyid;

      console.log(
        "testreplay " +
          "  id= " +
          mailId +
          "userId=" +
          localStorage.getItem("AY_LW") +
          "send_ToId=" +
          sends_id +
          "to=" +
          department_Id +
          "keyid=" +
          keyid
      );*/
    //*************21/1/2023
    // },
    //**************************************

    print_image() {
      this.image_to_print_n_model = true;

      this.$http.mailService
        .PrintOrShowDocument(
          Number(this.mailId),
          Number(localStorage.getItem("AY_LW")),
          Number(this.from_reply_or_general)
        )
        .then((res) => {
          setTimeout(() => {
            console.log(res);
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

    print_image2() {
      this.image_to_print_n_model2 = true;

      this.$http.mailService
        .PrintOrShowDocument(
          Number(this.mailId),
          Number(localStorage.getItem("AY_LW")),
          Number(this.from_reply_or_general)
        )
        .then((res) => {
          setTimeout(() => {
            console.log(res);
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

    print_image_sig() {
      this.image_to_print_n_model_sig = true;

      this.$htmlToPaper("print_one_dec_sig");
      this.$http.mailService
        .PrintOrShowDocument(
          Number(this.mailId),
          Number(localStorage.getItem("AY_LW")),
          Number(this.from_reply_or_general)
        )
        .then((res) => {
          setTimeout(() => {
            console.log(res);
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
          Number(this.mailId),
          Number(localStorage.getItem("AY_LW")),
          2,
        )
        .then((res) => {
          setTimeout(() => {
            console.log(res);

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

    // GetAllDocuments(id, plase) {
    //   this.from_reply_or_general = plase;
    //   this.screenFreeze = true;
    //   this.loading = true;
    //   this.$http.mailService
    //     .GetAllDocuments(id, Number(localStorage.getItem("AY_LW")))
    //     .then((res) => {
    //       this.show_images_images_model = res.data;

    //       this.testimage_images_model = this.show_images_images_model[0].path;

    //       setTimeout(() => {
    //         this.show_images_model = true;
    //         this.screenFreeze = false;
    //         this.loading = false;
    //       }, 300);
    //     })
    //     .catch((err) => {
    //       this.loading = false;
    //       this.there_are_no_documents = true;
    //       setTimeout(() => {
    //         this.screenFreeze = false;
    //         this.there_are_no_documents = false;
    //         console.log(err);
    //       }, 700);
    //     });
    // },

    previousImage() {
      if (this.indextotest > 0) {
        this.indextotest--;
        this.testimage = this.imagesToShow[this.indextotest].path;
      }
    },

    nextImage() {
      if (this.indextotest < this.imagesToShow.length - 1) {
        this.indextotest++;
        this.testimage = this.imagesToShow[this.indextotest].path;
      }
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

    async displayReplyImagesOnPage(successful, mesg, response) {
      const token = await ensureAccessToken();
      if (!token) return;

      if (!successful) {
        // On error
        console.error("Failed: " + mesg);
        return;
      }

      if (
        successful &&
        mesg != null &&
        mesg.toLowerCase().indexOf("user cancel") >= 0
      ) {
        // User cancelled.
        console.info("User cancelled");
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

    async AddReply_old() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;

      var ReplyViewModel = {
        userId: Number(localStorage.getItem("AY_LW")),
        mailId: Number(this.mailId),
        send_ToId: Number(this.sends_id),
        from: Number(2),
        reply: {
          mail_detail: this.reply_to_add,
          To: Number(this.department_Id),
        },
        file: {
          list: this.imagesToSend,
        },
      };
      this.$http.mailService
        .NewAddReply(ReplyViewModel)
        .then((res) => {
          setTimeout(() => {
            console.log(res);
            // this.documentSection = true;
            // this.proceduresSection = true;

            this.loading = false;
            this.screenFreeze = false;

            this.reply_to_add = "";
            this.imagesToSend = [];
            this.getMailById();
          }, 500);
        })
        .catch((err) => {
          setTimeout(() => {
            this.loading = false;
            this.screenFreeze = false;
          }, 500);
        });
    },

    //***************8/3/2023
    async AddReply() {
      const token = await ensureAccessToken();
      if (!token) return;

      this.screenFreeze = true;
      this.loading = true;
      console.log("lenght1111=" + this.imagesToSend.length);
      var ReplyViewModel = {
        userId: Number(localStorage.getItem("AY_LW")),
        mailId: Number(this.mailId),
        send_ToId: Number(this.sends_id),
        from: Number(2),
        reply: {
          mail_detail: this.reply_to_add,
          To: Number(this.department_Id),
        },
        file: {
          list: this.imagesToSend.slice(0, 50),
        },
      };
      //

      //

      this.$http.mailService
        .NewAddReply(ReplyViewModel)
        .then((res) => {
          setTimeout(() => {
            console.log("res=" + res.data.replyid);
            // this.imagesToSend = [];
            // this.documentSection = true;
            // this.proceduresSection = true;

            this.loading = false;
            this.screenFreeze = false;

            this.reply_to_add = "";
            //28/2/2023 this.getMailById();
            var cou = Math.ceil(this.imagesToSend.length / 50);
            if (cou > 1) {
              console.log("cou=" + cou);
              var id_of_reply_from_beackend = res.data.replyid; //101
              this.update_reply_to_complet_sent_img(
                1,
                id_of_reply_from_beackend,
                cou,
                50,
              );
            }
            //****28/2/2023
            else {
              this.getMailById();
            }
            //********end 28/2/2023
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

    async update_reply_to_complet_sent_img(ii, id, count1, a2) {
      const token = await ensureAccessToken();
      if (!token) return;

      console.log("update_reply ii=" + ii);

      if (ii < count1) {
        var a1 = a2;
        a2 = a1 + 50;
        this.screenFreeze = true;
        this.loading = true;

        var ReplyViewModel = {
          userId: Number(localStorage.getItem("AY_LW")),
          mailId: Number(this.mailId),
          send_ToId: Number(this.sends_id),
          from: Number(2),
          reply: {
            mail_detail: this.reply_to_add,
            To: Number(this.department_Id),
          },
          file: {
            list: this.imagesToSend.slice(a1, a2),
          },
          id_of_reply: id,
        };
        this.$http.mailService
          .update_replay(ReplyViewModel)
          .then((res) => {
            setTimeout(() => {
              console.log(res);
              //28/3/2023  this.imagesToSend = [];
              // this.documentSection = true;
              // this.proceduresSection = true;

              this.loading = false;
              this.screenFreeze = false;

              this.reply_to_add = "";
              // this.getMailById();

              ii++;
              if (ii < count1) {
                // var id_of_reply_from_beackend = 1
                //   this.update_reply_to_complet_sent_img(ii,id_of_reply_from_beackend);
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
    //************************************8/3/2023

    async GetAllDepartments() {
      const token = await ensureAccessToken();
      if (!token) return;

      if (this.isperent == "true") {
        this.$http.mailService
          .AllDepartments_and_mysections22(
            localStorage.getItem("current_department_id"),
            Number(this.mailId),
          )
          .then((res) => {
            this.departments = res.data;
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
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
