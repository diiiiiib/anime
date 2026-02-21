خطوات نشر قواعد Firestore و Storage وإعداد CORS (تعمل على Windows / PowerShell)

1) تثبيت Firebase CLI و Google Cloud SDK (gsutil)
- إن لم يكن مثبتًا:
  - Node/npm: https://nodejs.org
  - ثم: `npm install -g firebase-tools`
  - Google Cloud SDK لإستخدام `gsutil`: https://cloud.google.com/sdk/docs/install

2) تسجيل الدخول إلى Firebase وتهيئة المشروع (مرة واحدة)
```powershell
firebase login
firebase use --add
# اختر projectId (مثال: xodiib) أو نفّذ --project xodiib في أوامر النشر
```

3) نشر قواعد Firestore و Storage من المجلد `firebase/` في المشروع
```powershell
# من مجلد المشروع (d:\kaneki_ken)
firebase deploy --only firestore:rules --project xodiib
firebase deploy --only storage:rules --project xodiib
```

4) إعداد CORS على الـ Storage bucket (ضروري للرفع من browsers محلي)
- أنشئ ملف `cors.json` بمحتوى مثل:
```json
[
  {
    "origin": ["http://localhost:8000", "http://127.0.0.1:8000"],
    "method": ["GET", "POST", "PUT", "HEAD"],
    "responseHeader": ["Content-Type", "x-goog-resumable"],
    "maxAgeSeconds": 3600
  }
]
```
- ثم شغّل:
```powershell
# استبدل YOUR_BUCKET_NAME بـ اسم bucket (مثال xodiib.appspot.com)
gsutil cors set cors.json gs://YOUR_BUCKET_NAME
```

5) تحقق من تمكين Authentication (Email/Password أو Providers) في Firebase Console
- Console → Authentication → Sign-in method → فعّل ما تحتاجه (Email/Password أو Google).

6) اختبر محليًا:
```powershell
python -m http.server 8000
# افتح http://localhost:8000/chats.html
# اضغط "Run Firebase diagnostics" ثم انسخ المخرجات
```

ملاحظات أمان:
- قواعد `storage.rules` و`firestore.rules` هنا مريحة للتطوير لكنها ليست مُثالية للإنتاج. قبل الإطلاق، قُم بتشديد القواعد لتمنع أي كتابات عامة غير مقصودة، واسمح فقط بالعمليات اللازمة.
- احذف/عطّل مجموعة `debug_tests` وملفات debug بعد التحقق.

إذا تريـد، أستطيع توليد ملف `cors.json` هنا أو تشغيل تحقق إضافي لقواعدك إذا أعطيتني محتوى الردود الخطأ من Console بعد التجربة.