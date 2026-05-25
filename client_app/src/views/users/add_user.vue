<template>
  <div class="p-6 bg-gray-50 min-h-screen" dir="rtl">
    
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border-b">
      <h2 class="text-xl font-bold text-gray-800 border-r-4 border-blue-500 pr-3">إدارة مستخدمي النظام</h2>
      <button @click="openAddModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-all">
        إضافة مستخدم جديد +
      </button>
    </div>

    <div class="mb-6 bg-white p-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
      <input v-model="searchQuery.name" @input="currentPage = 1" type="text" placeholder="البحث بالاسم..." class="border p-2 rounded-md text-sm outline-none focus:border-blue-500" />
      <input v-model="searchQuery.entity" @input="currentPage = 1" type="text" placeholder="البحث بالجهة..." class="border p-2 rounded-md text-sm outline-none focus:border-blue-500" />
      <input v-model="searchQuery.phone" @input="currentPage = 1" type="text" placeholder="رقم الهاتف..." class="border p-2 rounded-md text-sm outline-none focus:border-blue-500" />
      <input v-model="searchQuery.nationalId" @input="currentPage = 1" type="text" placeholder="الرقم الوطني..." class="border p-2 rounded-md text-sm outline-none focus:border-blue-500" />
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full text-right border-collapse">
        <thead>
          <tr class="bg-gray-100 border-b">
            <th class="p-4 text-sm font-bold text-gray-700">الاسم الرباعي</th>
            <th class="p-4 text-sm font-bold text-gray-700">اسم المستخدم</th>
            <th class="p-4 text-sm font-bold text-gray-700">الجهة التابع لها</th>
            <th class="p-4 text-sm font-bold text-gray-700">الرقم الوطني</th>
            <th class="p-4 text-sm font-bold text-gray-700">الحالة</th>
            <th class="p-4 text-sm font-bold text-gray-700 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" class="border-b hover:bg-blue-50 transition-colors">
            <td class="p-4 text-sm font-medium">{{ user.fullName }}</td>
            <td class="p-4 text-sm text-gray-600">{{ user.username }}</td>
            <td class="p-4 text-sm text-gray-600">{{ user.entity }}</td>
            <td class="p-4 text-sm text-gray-600">{{ user.nationalId }}</td>
            <td class="p-4 text-sm">
              <span :class="user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-3 py-1 rounded-full text-xs font-bold">
                {{ user.active ? 'مفعل' : 'غير مفعل' }}
              </span>
            </td>
            <td class="p-4 text-center">
              <button @click="editUser(user)" class="text-blue-600 hover:underline font-bold text-sm">تعديل</button>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="6" class="p-8 text-center text-gray-400 italic">لا توجد نتائج مطابقة للبحث</td>
          </tr>
        </tbody>
      </table>

      <div class="p-4 flex justify-between items-center bg-gray-50 border-t">
        <div class="text-xs font-bold text-gray-500">
          عرض {{ displayFrom }} إلى {{ displayTo }} من أصل {{ filteredUsers.length }} مستخدم
        </div>
        <div class="flex items-center gap-2">
          <button 
            @click="currentPage--" 
            :disabled="currentPage === 1"
            class="px-3 py-1 border rounded bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            السابق
          </button>
          
          <div class="flex gap-1">
            <button 
              v-for="page in totalPages" 
              :key="page" 
              @click="currentPage = page"
              :class="currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'"
              class="w-8 h-8 flex items-center justify-center border rounded text-xs font-bold transition-all shadow-sm"
            >
              {{ page }}
            </button>
          </div>

          <button 
            @click="currentPage++" 
            :disabled="currentPage >= totalPages"
            class="px-3 py-1 border rounded bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            التالي
          </button>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
       <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-xl">
          <h3 class="font-bold">{{ isEdit ? 'تعديل بيانات المستخدم' : 'إضافة مستخدم جديد' }}</h3>
          <button @click="showModal = false" class="text-xl">✕</button>
        </div>
        <form @submit.prevent="saveUser" class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold text-gray-600">الاسم الرباعي</label>
            <input v-model="form.fullName" type="text" required class="border p-2 rounded-md outline-none focus:border-blue-500" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold text-gray-600">اسم المستخدم</label>
            <input v-model="form.username" type="text" required class="border p-2 rounded-md outline-none focus:border-blue-500" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold text-gray-600">الرقم الوطني</label>
            <input v-model="form.nationalId" @input="validateNationalId" type="text" maxlength="12" required 
                   :class="nationalIdError ? 'border-red-500' : 'focus:border-blue-500'" class="border p-2 rounded-md outline-none" />
            <span v-if="nationalIdError" class="text-[10px] text-red-500">{{ nationalIdError }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold text-gray-600">رقم الهاتف</label>
            <input v-model="form.phone" type="tel" required class="border p-2 rounded-md outline-none focus:border-blue-500" />
          </div>
          <div class="flex flex-col gap-1 md:col-span-2">
            <label class="text-xs font-bold text-gray-600">الجهة التابع لها</label>
            <input list="entities" v-model="form.entity" placeholder="اكتب اسم الجهة..." class="border p-2 rounded-md outline-none focus:border-blue-500" />
            <datalist id="entities">
              <option v-for="ent in entities" :key="ent" :value="ent"></option>
            </datalist>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold text-gray-600">البريد الإلكتروني</label>
            <input v-model="form.email" type="email" required class="border p-2 rounded-md outline-none focus:border-blue-500" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold text-gray-600">كلمة المرور</label>
            <input v-model="form.password" type="password" :required="!isEdit" class="border p-2 rounded-md outline-none focus:border-blue-500" />
          </div>
          <div v-if="isEdit" class="flex flex-col gap-1 md:col-span-2">
            <label class="text-xs font-bold text-gray-600">حالة الحساب</label>
            <select v-model="form.active" class="border p-2 rounded-md outline-none">
              <option :value="true">مفعل</option>
              <option :value="false">غير مفعل</option>
            </select>
          </div>
          <div class="md:col-span-2 mt-4 flex gap-2">
            <button type="submit" :disabled="nationalIdError" class="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50">حفظ البيانات</button>
            <button type="button" @click="showModal = false" class="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-bold hover:bg-gray-200">إلغاء</button>
          </div>
        </form>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      isEdit: false,
      nationalIdError: "",
      searchQuery: { name: "", entity: "", phone: "", nationalId: "" },
      
      // الترقيم
      currentPage: 1,
      pageSize: 10,

      form: { id: null, fullName: "", username: "", entity: "", nationalId: "", phone: "", email: "", password: "", active: true },
      entities: ["وزارة الصحة", "وزارة التعليم", "شركة الكهرباء", "مركز المعلومات التوثيق", "مصلحة الأحوال المدنية"],
      
      // لنفترض أن المصفوفة ممتلئة بأكثر من 10 مستخدمين للتجربة
      users: Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        fullName: `مستخدم تجريبي رقم ${i + 1}`,
        username: `user_${i + 1}`,
        entity: i % 2 === 0 ? "وزارة الصحة" : "وزارة التعليم",
        nationalId: `11990012345${i}`,
        phone: `091000000${i}`,
        active: true
      }))
    };
  },
  computed: {
    // 1. تصفية البيانات بناءً على البحث
    filteredUsers() {
      return this.users.filter((u) => {
        return (
          u.fullName.includes(this.searchQuery.name) &&
          u.entity.includes(this.searchQuery.entity) &&
          u.phone.includes(this.searchQuery.phone) &&
          u.nationalId.includes(this.searchQuery.nationalId)
        );
      });
    },
    // 2. حساب إجمالي عدد الصفحات
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.pageSize) || 1;
    },
    // 3. عرض المستخدمين للصفحة الحالية فقط
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredUsers.slice(start, end);
    },
    // 4. نصوص توضيحية لعدد العناصر المعروضة
    displayFrom() {
      return this.filteredUsers.length ? (this.currentPage - 1) * this.pageSize + 1 : 0;
    },
    displayTo() {
      return Math.min(this.currentPage * this.pageSize, this.filteredUsers.length);
    }
  },
  methods: {
    openAddModal() {
      this.isEdit = false;
      this.form = { id: null, fullName: "", username: "", entity: "", nationalId: "", phone: "", email: "", password: "", active: true };
      this.showModal = true;
    },
    editUser(user) {
      this.isEdit = true;
      this.form = { ...user };
      this.showModal = true;
    },
    validateNationalId() {
      const val = this.form.nationalId;
      if (val.length > 0) {
        if (val.length !== 12) this.nationalIdError = "الرقم الوطني يجب أن يكون 12 رقم";
        else if (!["1", "2"].includes(val[0])) this.nationalIdError = "الرقم الوطني يجب أن يبدأ بـ 1 أو 2";
        else this.nationalIdError = "";
      } else this.nationalIdError = "";
    },
    saveUser() {
      if (this.nationalIdError) return;
      if (this.isEdit) {
        const index = this.users.findIndex((u) => u.id === this.form.id);
        this.users[index] = { ...this.form };
      } else {
        this.form.id = Date.now();
        this.users.push({ ...this.form });
      }
      this.showModal = false;
    }
  },
  // مراقبة التغييرات في البحث لإعادة الصفحة إلى 1 عند الفلترة
  watch: {
    searchQuery: {
      handler() {
        this.currentPage = 1;
      },
      deep: true
    }
  }
};
</script>