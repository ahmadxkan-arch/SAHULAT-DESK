import { FAQ } from "@/types";

export const initialFAQs: FAQ[] = [
  {
    id: "faq-cnic-1",
    question: "Can I renew my expired CNIC online without visiting a NADRA center?",
    questionUrdu: "کیا میں نادرا جائے بغیر شناختی کارڈ آن لائن رینیو کروا سکتا ہوں؟",
    answer: "Yes! If you do not require any changes to your permanent address, name, or marital status, you can renew your Smart CNIC completely online using the official Pak-ID mobile app or id.nadra.gov.pk. Your photo and biometric fingerprints can be scanned via your smartphone camera.",
    answerUrdu: "جی ہاں! اگر آپ کے مستقل پتہ، نام یا ازدواجی حیثیت میں کوئی تبدیلی نہیں ہے تو آپ پاک آئی ڈی ایپ کے ذریعے آن لائن شناختی کارڈ کی تجدید کروا سکتے ہیں اور کارڈ بذریعہ ڈاک حاصل کر سکتے ہیں۔",
    category: "Identity & Civil",
    relatedServiceId: "cnic-renewal"
  },
  {
    id: "faq-cnic-2",
    question: "Do I need blood relative presence or gazetted attestation for renewal?",
    questionUrdu: "کیا شناختی کارڈ رینیول کے لیے والد یا رشتہ دار کا ساتھ ہونا ضروری ہے؟",
    answer: "For standard renewal with no demographic changes, a blood relative is NOT mandatory if your biometric fingerprints match the existing NADRA database. If fingerprints have faded due to age or manual labor, a parent or sibling with valid CNIC must accompany you for biometric vouching.",
    answerUrdu: "عام تجدید کے لیے اگر آپ کے فنگر پرنٹس میچ ہو جائیں تو کسی رشتہ دار کی ضرورت نہیں ہوتی۔ اگر انگلیوں کے نشانات نہ ملیں تو قریبی خونی رشتہ دار (والد، والدہ، بھائی، بہن) کی بائیو میٹرک گواہی ضروری ہوتی ہے۔",
    category: "Identity & Civil",
    relatedServiceId: "cnic-renewal"
  },
  {
    id: "faq-dom-1",
    question: "Can a person hold dual domicile certificates in Pakistan?",
    questionUrdu: "کیا پاکستان میں ایک ہی شخص کے دو مختلف اضلاع سے ڈومیسائل ہو سکتے ہیں؟",
    answer: "No. Holding dual domicile is strictly illegal under the Pakistan Citizenship Act 1951. If you shift permanently to another district, you must surrender and cancel your previous domicile before applying for a new one.",
    answerUrdu: "ہرگز نہیں۔ سٹیزن شپ ایکٹ کے تحت دو اضلاع کا ڈومیسائل رکھنا غیر قانونی ہے۔ مستقل رہائش تبدیل کرنے کی صورت میں سابقہ ڈومیسائل منسوخ کروا کر نیا بنوانا پڑتا ہے۔",
    category: "Identity & Civil",
    relatedServiceId: "domicile-certificate"
  },
  {
    id: "faq-dom-2",
    question: "Why is Matriculation certificate mandatory for Domicile?",
    questionUrdu: "ڈومیسائل کے لیے میٹرک کی سند کیوں ضروری ہے؟",
    answer: "Matriculation (SSC) certificate serves as the official legal verification for date of birth and establishes candidate's continuous schooling record within the applied district.",
    answerUrdu: "میٹرک کی سند تاریخِ پیدائش کی قانونی تصدیق کرتی ہے اور یہ ثابت کرتی ہے کہ طالب علم نے کس ضلع کے اسکول سے تعلیم حاصل کی ہے۔",
    category: "Identity & Civil",
    relatedServiceId: "domicile-certificate"
  },
  {
    id: "faq-char-1",
    question: "How long is a Police Character Certificate valid?",
    questionUrdu: "پولیس کریکٹر سرٹیفکیٹ کتنی مدت کے لیے کارآمد ہوتا ہے؟",
    answer: "A Police Character Certificate is typically valid for 6 months from the date of issuance for international visas and embassy submissions.",
    answerUrdu: "پولیس کریکٹر سرٹیفکیٹ غیر ملکی ویزہ اور سفارت خانوں کے لیے اجرا کی تاریخ سے 6 ماہ کے لیے کارآمد ہوتا ہے۔",
    category: "Police & Verification",
    relatedServiceId: "character-certificate"
  },
  {
    id: "faq-char-2",
    question: "Can I get my character certificate attested by Ministry of Foreign Affairs (MOFA)?",
    questionUrdu: "کیا یہ سرٹیفکیٹ وزارت خارجہ (MOFA) سے تصدیق کروانا ضروری ہے؟",
    answer: "Yes, for overseas employment, immigration, or university admissions abroad, the certificate must first be issued by the Senior Superintendent of Police (SSP) or Police Khidmat Markaz with QR code, and then submitted to MOFA for apostille/stamp.",
    answerUrdu: "جی ہاں! بیرون ملک ویزہ کے لیے ایس ایس پی کے دستخط شدہ کیو آر کوڈ والے سرٹیفکیٹ کو وزارت خارجہ (MOFA) سے تصدیق کروانا لازمی ہوتا ہے۔",
    category: "Police & Verification",
    relatedServiceId: "character-certificate"
  },
  {
    id: "faq-dl-1",
    question: "Can I drive with a Learner Permit alone without a licensed driver?",
    questionUrdu: "کیا میں لرنر پرمٹ پر اکیلے گاڑی چلا سکتا ہوں؟",
    answer: "No. The law requires a driver holding a valid permanent license to accompany you in the front passenger seat, and red 'L' stickers must be displayed on front and rear windshields.",
    answerUrdu: "نہیں، قانون کے مطابق لرنر ڈرائیور کے ساتھ فرنٹ سیٹ پر مستقل لائسنس یافتہ ڈرائیور کا موجود ہونا اور گاڑی پر لال رنگ کا 'L' اسٹیکر لگانا لازمی ہے۔",
    category: "Transport & Travel",
    relatedServiceId: "driving-license"
  },
  {
    id: "faq-dl-2",
    question: "What is the passing criteria for the driving test in Punjab/Islamabad?",
    questionUrdu: "ڈرائیونگ ٹیسٹ پاس کرنے کا معیار کیا ہے؟",
    answer: "You must pass the computer touchscreen sign test (minimum 80% marks) and then successfully navigate the physical 'L' shaped track in forward and reverse without touching cones or stalling the engine.",
    answerUrdu: "کمپیوٹر سائن ٹیسٹ میں 80 فیصد درست جوابات درکار ہوتے ہیں، اور پریکٹیکل ٹیسٹ میں گاڑی کو بنا کسی کون کو چھوئے ریورس ایل ٹریک سے گزارنا ہوتا ہے۔",
    category: "Transport & Travel",
    relatedServiceId: "driving-license"
  },
  {
    id: "faq-hec-1",
    question: "Can I get my degree attested from HEC if my university is private?",
    questionUrdu: "کیا پرائیویٹ یونیورسٹی کی ڈگری ایچ ای سی سے تصدیق ہو جاتی ہے؟",
    answer: "Yes, provided the private university and your specific degree program and campus are duly chartered and recognized on the HEC list of recognized universities at the time of your graduation.",
    answerUrdu: "جی ہاں، بشرطیکہ وہ پرائیویٹ یونیورسٹی اور متعلقہ ڈگری پروگرام ایچ ای سی سے منظور شدہ اور الحاق شدہ ہو۔",
    category: "Education & Academics",
    relatedServiceId: "degree-verification"
  },
  {
    id: "faq-hec-2",
    question: "Does HEC attest photocopies of degrees without original?",
    questionUrdu: "کیا ایچ ای سی اصل ڈگری کے بغیر صرف فوٹو کاپی کی تصدیق کر دیتا ہے؟",
    answer: "No. HEC rules strictly mandate that original matric, intermediate, and university degrees must be presented even if you only need the photocopies attested.",
    answerUrdu: "ہرگز نہیں! فوٹو کاپی کی تصدیق کے لیے بھی اصل میٹرک، انٹر اور یونیورسٹی ڈگری کا دکھانا لازمی ہے۔",
    category: "Education & Academics",
    relatedServiceId: "degree-verification"
  },
  {
    id: "faq-tax-1",
    question: "Is there any penalty if a student or non-earning person becomes a tax filer?",
    questionUrdu: "کیا بے روزگار یا طالب علم کے فائلر بننے پر کوئی نقصان یا ٹیکس لگتا ہے؟",
    answer: "No penalty at all! Filing a 'Nil Return' (zero tax liability) gives you full Active Taxpayer status, saving you up to 50% withholding tax on vehicle purchase, property registration, and banking cash withdrawals.",
    answerUrdu: "کوئی نقصان نہیں! اگر آمدنی ٹیکس حد سے کم ہے تو 'نل ریٹرن' جمع ہوتی ہے اور آپ فائلر بن کر بینک کٹوتی اور پراپرٹی ٹوکن پر ہزاروں روپے کی بچت کر سکتے ہیں۔",
    category: "Taxation & Finance",
    relatedServiceId: "tax-ntn-guidance"
  },
  {
    id: "faq-pass-1",
    question: "Can I pay Passport fee in cash directly at the Passport Office counter?",
    questionUrdu: "کیا پاسپورٹ آفس کاؤنٹر پر کیش فیس جمع کروائی جا سکتی ہے؟",
    answer: "No. Passport offices do not accept cash at counters. You must generate PSID via the 'Passport Asaan' app and pay via mobile banking/JazzCash/EasyPaisa, or deposit cash at the National Bank of Pakistan (NBP) branch prior to entering.",
    answerUrdu: "نہیں۔ پاسپورٹ دفاتر کیش وصول نہیں کرتے۔ آپ کو 'پاسپورٹ فیس آسان' ایپ کے ذریعے یا نیشنل بینک کی برانچ میں فیس پہلے جمع کروانی ہوتی ہے۔",
    category: "Transport & Travel",
    relatedServiceId: "passport-guidance"
  }
];

