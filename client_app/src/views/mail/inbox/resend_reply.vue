<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
    
    <!-- مربع الصور -->
    <div class="w-full max-w-3xl bg-white p-4 rounded-xl shadow-md text-center">
      
      <!-- اختيار الصور -->
      <div class="flex items-center justify-between mb-2">
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
          <span>تحديد الكل</span>
        </label>
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" v-model="selectedImages" :value="currentImage" />
          <span>تحديد الصورة</span>
        </label>
      </div>

      <!-- عرض الصورة -->
      <div v-if="currentImage!=null" class="flex justify-center items-center">
        <img
          :src="currentImage.path"
          :alt="'Image ' + currentImage.id"
          :style="{
            maxWidth: '100%',
            maxHeight: '400px',
            objectFit: 'contain',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            transform: `scale(${zoom})`,
            transition: 'transform 0.2s ease'
          }"
        />
      </div>

      <!-- التحكم في التكبير/التصغير -->
      <div class="flex justify-center gap-3 mt-2">
        <button @click="zoomIn" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 z-10">+</button>
        <button @click="zoomOut" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 z-10">-</button>
        <button @click="resetZoom" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 z-10">إعادة</button>
      </div>

      <!-- العداد + السابق/التالي -->
      <div class="flex justify-center items-center gap-3 mt-2 text-sm">
        <button
         
          @click="prevImage"
          class="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          السابق
        </button>

        <span>{{ currentIndex + 1 }} / {{ reply_total_of_doc }}</span>

        <button
       
          @click="nextImage"
          class="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          التالي
        </button>
      </div>
    </div>

    <!-- الحقول -->
    <div class="w-full max-w-xl bg-white mt-6 p-6 rounded-xl shadow-md">
      <!-- اختيار المستلم -->
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">اختر المستلم</label>
        <select
          v-model="selectedRecipient"
          class="w-full border border-gray-300 rounded-lg p-2"
        >
          <option v-for="recipient in recipients" :key="recipient.id" :value="recipient">
            {{ recipient.departmentName }}
          </option>
        </select>
      </div>

      <!-- النص -->
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">النص</label>
        <textarea
          v-model="message"
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
             @click="back()"
          >
            <span class="text-sm font-bold block ml-1">رجوع</span>
          </button>
        </div>

    </div>
  </div>
</template>
<script>


export default {
  name: "ResendReply",

mounted() {

 this.GetResources_ById(this.rep_id)
this.my_department_id = Number (localStorage.getItem("chrome"));
   
this.get_department_for_reply()

    
},
  data() {
    return {
 
      selectedRecipient: null,

   
    images:[],
      currentIndex: 0,
      selectedImages: [],
      selectAll: true,

      message: "",
   
         zoom: 1,
         recipients:[],
         my_department_id:"",

         mid:this.$route.params.mail_id,
          dep:this.$route.params.dep_id,
          reply_total_of_doc:0,
          rep_id:this.$route.params.rep_id,
          imagesToSend:[],
    };
  },


  computed: {
    currentImage() {
     
      return this.images[this.currentIndex] || null;

      
    },

   
  },

  watch:{

     selectedImages(){

      if(this.selectedImages.length==this.reply_total_of_doc){

        this.selectAll=true
      }else{this.selectAll=false}
     }
  },
  methods: {





    get_department_for_reply(){


      
      this.$http.mailService
        .get_department_for_reply( this.dep,  this.my_department_id , this.mid)
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
    


    back(){

      this.$router.push("/inbox");
    },


        GetResources_ById(id) {
      
          

      this.$http.documentService
        .GetResources_ById_Resend(id)
        .then((res) => {
    
               this.reply_total_of_doc = res.data.total;

               this.selectedImages = res.data.date;

               this.images= res.data.date;
           

          setTimeout(() => {
           
          }, 200);
        })
        .catch((err) => {
        
          console.log(err);
        });
    },
    
    nextImage() {
      if (this.currentIndex < this.images.length - 1) this.currentIndex++;
    },
    prevImage() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    toggleSelectAll() {
      this.selectedImages = this.selectAll ? [...this.images] : [];
    },


    send() {
      if (!this.selectedRecipient) {
        alert("الرجاء اختيار مستلم");
        return;
      }
      if (this.selectedImages.length === 0) {
        alert("الرجاء اختيار صورة واحدة على الأقل");
        return;
      }
      if (!this.message.trim()) {
        alert("الرجاء كتابة نص الرسالة");
        return;
      }

       

           
     
    
     
     for(var i=0;i<this.selectedImages.length;i++){

   this.imagesToSend.push(

           this.selectedImages[i].id,
          
        );

      }

    
      
      var ReplyViewModel = {
        UserId: Number(localStorage.getItem("AY_LW")),
        mailId: Number(this.mid),
        SendsId: Number(this.selectedRecipient.sendsToId),
        ReplyId:Number(this.rep_id),
        DepartmentId:Number(this.selectedRecipient.id),
        MailDetails:this.message,
        CanNotDeleted :1,
        MyDep:Number(this.my_department_id),

        ResourceId: this.imagesToSend,
        
      };

     this.$http.mailService
        .ResendReplayWithPhoto(ReplyViewModel)
        .then(() => {
          setTimeout(() => {
          
   alert("  تمت إعادة توجيه عدد  " + this.selectedImages.length + " صور إلى " + this.selectedRecipient.departmentName);

                 this.$router.push("/inbox");
                 
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

     


  },
};
</script>
<style>

.preview-image {
  max-width: 100%;
  max-height: 250px; /* صغرت الصورة */
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.image-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;         /* تقليل المسافة بين العناصر */
  margin-top: 5px;   /* تقليل المسافة بين الصورة والعداد */
  font-size: 14px;   /* حجم أصغر للعداد */
}
</style>
