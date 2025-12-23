# Notes

## 1) مشكلة واجهتها أثناء Docker وكيف انحلت
أكثر مشكلة بتطلع عادةً هي إن الـ API يشتغل قبل ما PostgreSQL يكون جاهز.
الحل كان باستخدام `depends_on` مع `condition: service_healthy` + healthcheck للـ db.

## 2) أهم درس بخصوص Git / Project setup
- لازم تحط `.env.example` بدل `.env` عشان ما ترفع أسرارك على GitHub.
- خليك ملتزم بهيكلية واضحة (routes/controllers/services) عشان أي حد يفهم المشروع بسرعة.
