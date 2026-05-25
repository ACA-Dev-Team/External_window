<template>
  <div class="p-6 bg-gray-50 min-h-screen" dir="rtl">
    
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border-b">
      <h2 class="text-xl font-bold text-gray-800 border-r-4 border-green-500 pr-3">
        قائمة البريد المضاف
      </h2>

      <div class="flex-1 text-center hidden md:block">
        <p v-if="startDate || endDate" class="text-sm font-medium text-gray-500">
          <span v-if="startDate">من تاريخ <b class="text-green-600">{{ startDate }}</b></span>
          <span v-if="endDate" class="mr-2">إلى تاريخ <b class="text-green-600">{{ endDate }}</b></span>
        </p>
        <p v-else class="text-sm text-gray-400 italic">عرض كافة المراسلات المضافة</p>
      </div>
      
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <label class="text-xs font-bold text-gray-600">من:</label>
          <input v-model="startDate" type="date" class="border border-gray-300 rounded-md p-2 text-sm focus:border-green-500 outline-none transition-all" />
        </div>
        <div class="flex items-center gap-2">
          <label class="text-xs font-bold text-gray-600">إلى:</label>
          <input v-model="endDate" type="date" class="border border-gray-300 rounded-md p-2 text-sm focus:border-green-500 outline-none transition-all" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full text-right border-collapse">
        <thead>
          <tr class="bg-gray-100 border-b">
            <th class="p-4 text-sm font-bold text-gray-700">الرقم الإشاري</th>
            <th class="p-4 text-sm font-bold text-gray-700">ملخص الموضوع</th>
            <th class="p-4 text-sm font-bold text-gray-700">التاريخ</th>
            <th class="p-4 text-sm font-bold text-gray-700 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mail in paginatedMails" :key="mail.id" class="border-b hover:bg-green-50 transition-colors">
            <td class="p-4 text-sm text-gray-600 font-mono">{{ mail.reference_number }}</td>
            <td class="p-4 text-sm text-gray-800 font-medium">{{ truncateText(mail.summary) }}</td>
            <td class="p-4 text-sm text-gray-600">{{ mail.date }}</td>
            <td class="p-4 text-center">
              <button @click="openChat(mail)" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs shadow-sm flex items-center gap-2 mx-auto">
                <span>الردود</span>
                <span class="bg-white text-blue-500 px-1.5 rounded-full font-bold">
                  {{ allReplies.filter(r => r.mailId === mail.id).length }}
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="p-4 flex justify-between items-center bg-gray-50 border-t font-sans">
        <span class="text-sm text-gray-500">عرض {{ displayFrom }} إلى {{ displayTo }} من أصل {{ filteredMails.length }}</span>
        <div class="flex gap-2">
          <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 transition-all">السابق</button>
          <button @click="currentPage++" :disabled="currentPage >= totalPages" class="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 transition-all">التالي</button>
        </div>
      </div>
    </div>

    <div v-if="showChat" class="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50 overflow-hidden" @click.self="showChat = false">
      <div class="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        
        <div class="p-4 border-b bg-green-600 text-white flex justify-between items-center shadow-md">
          <h3 class="font-bold text-sm">ردود البريد: {{ selectedMail?.reference_number }}</h3>
          <button @click="showChat = false" class="hover:bg-green-700 p-2 rounded-full">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-100" ref="chatWindow">
          <div v-for="reply in currentReplies" :key="reply.id" :class="reply.isAdmin ? 'items-start' : 'items-end'" class="flex flex-col group">
            
            <button @click="deleteReply(reply.id)" class="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] mb-1 hover:text-red-600">
              حذف هذا الرد 🗑️
            </button>

            <div :class="reply.isAdmin ? 'bg-white border text-gray-800' : 'bg-green-600 text-white'" class="max-w-[90%] p-4 rounded-2xl shadow-md relative">
              <p class="text-[10px] font-bold mb-2 opacity-70 border-b border-white border-opacity-20 pb-1">{{ reply.sender }}</p>
              
              <p class="text-sm leading-relaxed whitespace-pre-wrap font-medium">{{ reply.text }}</p>

              <div v-if="reply.attachments && reply.attachments.length > 0" class="mt-4 pt-3 border-t border-white border-opacity-20">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[10px] font-bold">المرفقات ({{ reply.attachments.length }}):</span>
                  <button @click="printAll(reply.attachments)" class="text-[9px] bg-black bg-opacity-20 px-2 py-0.5 rounded hover:bg-opacity-40 transition-all">طباعة الكل 🖨️</button>
                </div>
                
                <div class="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  <div v-for="(file, fIdx) in reply.attachments" :key="fIdx" 
                       @click="openPreview(file)"
                       class="flex items-center justify-between p-2 rounded-lg bg-black bg-opacity-10 hover:bg-opacity-20 cursor-pointer transition-all border border-white border-opacity-10">
                    <div class="flex items-center gap-2 overflow-hidden">
                      <span>{{ isImage(file.type) ? '🖼️' : '📄' }}</span>
                      <span class="text-[11px] truncate w-40">{{ file.name }}</span>
                    </div>
                    <a :href="file.url" :download="file.name" @click.stop class="hover:scale-110">📥</a>
                  </div>
                </div>
              </div>
              <span class="text-[9px] mt-2 block opacity-50 text-left">{{ reply.time }}</span>
            </div>
          </div>
        </div>

        <div class="p-4 border-t bg-white shadow-inner">
          <div v-if="selectedFiles.length > 0" class="mb-3 space-y-1 max-h-32 overflow-y-auto p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div v-for="(file, fIndex) in selectedFiles" :key="fIndex" class="flex items-center justify-between text-[11px] p-1 border-b border-blue-100 last:border-0">
              <span class="truncate">📎 {{ file.name }}</span>
              <button @click="removeFile(fIndex)" class="text-red-500 font-bold px-2">✕</button>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <textarea v-model="newReply" rows="2" placeholder="اكتب ردك التوضيحي هنا (إلزامي)..." class="w-full border rounded-xl p-3 text-sm outline-none focus:border-green-500 bg-gray-50 resize-none"></textarea>
            <div class="flex justify-between items-center">
              <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept="image/*,.pdf" multiple />
              <button @click="$refs.fileInput.click()" class="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-1">
                إرفاق مستندات 
                <span v-if="selectedFiles.length" class="bg-blue-600 text-white px-1.5 rounded-full text-[10px]">{{ selectedFiles.length }}</span>
              </button>

              <button @click="sendReply" :disabled="!newReply.trim()" class="bg-green-600 text-white px-6 py-2 rounded-lg font-bold text-sm disabled:opacity-30 transition-all shadow-md active:scale-95">
                إرسال الرد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="previewFile" class="fixed inset-0 bg-black bg-opacity-90 z-[100] flex flex-col p-4 animate-fade-in" @click.self="closePreview">
       <div class="flex justify-between items-center mb-4 text-white">
          <h4 class="font-bold text-sm truncate max-w-xs">{{ previewFile.name }}</h4>
          <button @click="closePreview" class="bg-red-500 p-2 rounded-full text-white hover:bg-red-600">✕</button>
       </div>
       
          <img v-if="isImage(previewFile.type)" :src="previewFile.url" class="w-full h-full object-contain" />
          <iframe v-else :src="previewFile.url" class="w-full h-full border-none"></iframe>
     
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      currentPage: 1,
      pageSize: 10,
      showChat: false,
      selectedMail: null,
      newReply: '',
      selectedFiles: [],
      previewFile: null,
      mails: [
        { id: 1, reference_number: '101/2026', summary: 'صيانة الحاسبات القسم المالي', date: '2026-04-10' },
        { id: 2, reference_number: '102/2026', summary: 'طلب إجازة سنوية', date: '2026-04-12' }
      ],
      allReplies: []
    };
  },
  computed: {
    filteredMails() {
      return this.mails.filter(m => {
        if (!this.startDate && !this.endDate) return true;
        if (this.startDate && !this.endDate) return m.date >= this.startDate;
        if (!this.startDate && this.endDate) return m.date <= this.endDate;
        return m.date >= this.startDate && m.date <= this.endDate;
      });
    },
    totalPages() { return Math.ceil(this.filteredMails.length / this.pageSize) || 1; },
    paginatedMails() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredMails.slice(start, start + this.pageSize);
    },
    currentReplies() { return this.allReplies.filter(r => r.mailId === this.selectedMail?.id); },
    displayFrom() { return this.filteredMails.length ? (this.currentPage - 1) * this.pageSize + 1 : 0; },
    displayTo() { return Math.min(this.currentPage * this.pageSize, this.filteredMails.length); }
  },
  methods: {
    truncateText(text) { return text.length > 50 ? text.substring(0, 50) + '...' : text; },
    openChat(mail) {
      this.selectedMail = mail;
      this.showChat = true;
      this.scrollToBottom();
    },
    handleFileChange(event) {
      const files = Array.from(event.target.files);
      this.selectedFiles = [...this.selectedFiles, ...files];
      this.$refs.fileInput.value = '';
    },
    removeFile(fIndex) { this.selectedFiles.splice(fIndex, 1); },
    sendReply() {
      if (!this.newReply.trim()) return;

      const attachmentsData = this.selectedFiles.map(file => ({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      }));

      this.allReplies.push({
        id: Date.now(),
        mailId: this.selectedMail.id,
        sender: 'أنت',
        text: this.newReply,
        attachments: attachmentsData,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAdmin: false
      });

      this.newReply = '';
      this.selectedFiles = [];
      this.scrollToBottom();
    },
    deleteReply(replyId) {
      if (confirm("هل أنت متأكد من حذف هذا الرد؟")) {
        this.allReplies = this.allReplies.filter(r => r.id !== replyId);
      }
    },
    printAll(attachments) {
      attachments.forEach(file => {
        const win = window.open(file.url, '_blank');
        if (win) {
          win.onload = () => { win.print(); };
        }
      });
    },
    openPreview(file) { this.previewFile = file; },
    closePreview() { this.previewFile = null; },
    isImage(type) { return type?.startsWith('image/'); },
    scrollToBottom() {
      this.$nextTick(() => {
        const win = this.$refs.chatWindow;
        if (win) win.scrollTop = win.scrollHeight;
      });
    }
  },
  watch: {
    startDate() { this.currentPage = 1; },
    endDate() { this.currentPage = 1; }
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
.animate-slide-in { animation: slideLeft 0.3s ease-out; }
@keyframes slideLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
.animate-fade-in { animation: fadeIn 0.2s ease-in; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>