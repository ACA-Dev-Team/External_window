<template>
  <span style="display:none"></span>
</template>

<script>
import introJs from 'intro.js';
import 'intro.js/introjs.css';

export default {
  name: 'ProfessionalTour',
  
  props: { 
    tourKey: { type: String, required: true },
    showTour: { type: Boolean, default: false }
  },

  mounted() {
    if (this.showTour) {
      setTimeout(() => { this.startTour(); }, 1500);
    }
  },

  methods: {
    startTour() {
      // 1. التحقق من التخزين المحلي لمنع التكرار
      const hasSeenTour = localStorage.getItem('hasSeenTour_' + this.tourKey);
      if (hasSeenTour) return;

      const elements = document.querySelectorAll('[data-tour]');
      if (elements.length === 0) return;

      const steps = Array.from(elements).map(el => ({
        element: el,
        intro: el.getAttribute('data-tour')
      }));

      const tour = introJs(); 
      tour.setOptions({
        steps: steps,
        nextLabel: 'التالي',
        prevLabel: 'السابق',
        skipLabel: 'تخطي',
        doneLabel: 'تم'
      });
      
      // 2. تسجيل الانتهاء في localStorage
      const markAsSeen = () => {
        localStorage.setItem('hasSeenTour_' + this.tourKey, 'true');
      };

      tour.onComplete(markAsSeen);
      tour.onExit(markAsSeen);

      // 3. المنطق الخاص بالتنقل بين الخطوات
      tour.onChange(() => {
        const currentStep = tour.getCurrentStep();
        console.log("Current Step:", currentStep);

        // التعامل مع الخطوة 11: تفعيل الفلتر
        if (currentStep === 4) {
          this.$parent.filter = true;
          this.$nextTick(() => { tour.refresh(); });
        }

        // التعامل مع الخطوة 14: إيقاف الفلتر
        if (currentStep ===7) {
          this.$parent.filter = false;
          this.$nextTick(() => { tour.refresh(); });
        }

        // التعامل مع الخطوة 16: تفعيل التور في الـ Parent
        if (currentStep === 9) {
          this.$parent.tour = true;
          this.$nextTick(() => { tour.refresh(); });
        }

        // التعامل مع الخطوة 23: إيقاف التور في الـ Parent
        if (currentStep === 16) {
          this.$parent.tour = false;
          this.$nextTick(() => { tour.refresh(); });
        }
      });

      tour.start();
    }
  }
};
</script>