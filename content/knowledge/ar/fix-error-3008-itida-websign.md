---
slug: fix-error-3008-itida-websign
path: /fix-error-3008-itida-websign
title: حل خطأ 3008 Error in verifying License في التوقيع الإلكتروني ITIDA WebSign للفاتورة والإيصال الإلكتروني بملف جاهز
description: حل خطأ 3008 Error in verifying License عند التوقيع على الفاتورة الإلكترونية والإيصال الإلكتروني. ملف جاهز وفيديو بالخطوات، مجاناً من DTS.
cover: /images/knowledge/fix-3008.webp
category: التوقيع
topic: signature
featured: true
video: /videos/fix-error-3008-itida-websign.mp4
poster: /videos/fix-error-3008-itida-websign.jpg
download: /downloads/Fix-ITIDA-WebSign.bat
published: 2026-10-27
updated: 2026-10-27
---

**الخلاصة:** لو برنامج التوقيع الإلكتروني ITIDA WebSign (WebSignClient) بطّل يوقّع على الفاتورة الإلكترونية أو الإيصال الإلكتروني وطلعتلك رسالة خطأ 3008، نزّل ملف الحل الجاهز من DTS، شغّله كمسؤول، وجرّب التوقيع تاني. وفي أغلب الحالات المشكلة بتتحل في أقل من دقيقة.

## ما هو خطأ 3008؟
خطأ 3008 هو رسالة بتظهر من برنامج التوقيع ITIDA WebSign لما تيجي توقّع فاتورة أو إيصال على منظومة مصلحة الضرائب، ونصها بالظبط:

`3008 Error in verifying License`

ومعاها غالبًا الشهادات بتاعة التوكن مش بتظهر في جدول التوقيع.

## سبب المشكلة (مش التوكن ولا الشهادة)
المشكلة مش في التوكن ولا في الشهادة. السبب غالبًا إن إعدادات الأمان الأحدث في ويندوز والسيرفرات بقت بتمنع طريقة الاتصال القديمة اللي برنامج WebSignClient بيستخدمها، فالبرنامج مش بيقدر يتأكد من الترخيص. وده ممكن يقابل أي حد بيوقّع على الفاتورة الإلكترونية أو الإيصال الإلكتروني بالتوكن على كمبيوتر ويندوز.

الحل إن البرنامج يتظبط يستخدم TLS 1.2 وطريقة التشفير الآمنة اللي ويندوز بيطلبها، وده اللي بتعمله أي طريقة من التلاتة اللي تحت.

## الحل بملف جاهز
الطريقة الأسهل وننصح بيها:

1. **نزّل ملف الحل** Fix-ITIDA-WebSign.bat من الزرار اللي في الصفحة دي.
2. **شغّل ملف الحل كمسؤول** (Run as administrator): اعمل كليك يمين على الملف واختار **Run as administrator**. لو ويندوز سألك "هل تسمح للبرنامج يعمل تغييرات؟" دوس **Yes / نعم**، واستنى ثواني لحد ما الشاشة السودا تقول إن العملية خلصت، وبعدين دوس أي زرار عشان تقفلها.
3. **جرّب التوقيع تاني**. هتلاقي الشهادات ظهرت وتقدر توقّع عادي.

> لو ويندوز طلعلك تحذير إن الملف من مصدر غير معروف، دوس "More info" وبعدين "Run anyway".

## الحل بنسخ الكود
لو مش عايز تنزّل ملف، تقدر تعمله بنفسك في دقيقة:

1. **انسخ النص ده كله:**

```bat
@echo off
:: Fix ITIDA WebSignClient error 3008 (Error in verifying License) - enables TLS 1.2
net session >nul 2>&1
if %errorlevel% neq 0 (
  echo Requesting administrator rights...
  powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
  exit /b
)
set "DIR=C:\ProgramData\ESCC"
set "CFG=%DIR%\ItidaSignClient.exe.config"
if not exist "%DIR%\ItidaSignClient.exe" (
  echo ItidaSignClient.exe not found in %DIR%. Install WebSignClient first.
  pause & exit /b 1
)
taskkill /F /IM ItidaSignClient.exe >nul 2>&1
(
echo ^<?xml version="1.0" encoding="utf-8"?^>
echo ^<configuration^>
echo   ^<runtime^>
echo     ^<AppContextSwitchOverrides value="Switch.System.Net.DontEnableSchUseStrongCrypto=false;Switch.System.Net.DontEnableSystemDefaultTlsVersions=false" /^>
echo   ^</runtime^>
echo ^</configuration^>
) > "%CFG%"
if exist "%CFG%" (echo Config written to %CFG%) else (echo FAILED to write config & pause & exit /b 1)
start "" "%DIR%\ItidaSignClient.exe"
echo Done. WebSignClient restarted. Try signing again.
pause
```

> **لو برنامج التوقيع متثبت في مكان تاني:** المسار موجود في السطر اللي فيه `set "DIR=C:\ProgramData\ESCC"`. غيّر `C:\ProgramData\ESCC` للفولدر اللي فيه `ItidaSignClient.exe` عندك، وسيب باقي النص زي ما هو.

2. **اعمل ملف تكست فاضي:** افتح **Notepad** (المفكرة).
3. **الزق النص** جوه الملف واحفظه.
4. **غيّر امتداد الملف من .txt لـ .bat:**
   - وانت بتحفظ من Notepad اختار **Save as type: All Files** وسمّي الملف **Fix-ITIDA-WebSign.bat**،
   - أو لو الملف اتحفظ .txt: من File Explorer فعّل **View > File name extensions** وغيّر الاسم من `Fix-ITIDA-WebSign.txt` لـ `Fix-ITIDA-WebSign.bat` ووافق على التغيير.
5. **شغّل الملف كمسؤول** (كليك يمين > Run as administrator)، وبعدين **جرّب التوقيع تاني**.

## الحل اليدوي بالخطوات
لو مش عايز تشغّل أي ملف .bat خالص، تقدر تعمل ملف الإعدادات بنفسك. وفيديو الخطوات موجود فوق في الصفحة.

1. **اقفل برنامج التوقيع** WebSignClient لو شغال.

2. **اتأكد إن الفولدر `C:\ProgramData\ESCC` موجود:** افتح File Explorer واكتب `C:\ProgramData\ESCC` في شريط العنوان. لو مش موجود، اعمله بنفسك (كليك يمين > New > Folder في `C:\ProgramData` وسمّيه `ESCC`). ملحوظة: فولدر ProgramData بيبقى مخفي، فاكتب المسار في شريط العنوان على طول.

3. **افتح Notepad كمسؤول:** دوّر على Notepad في قايمة Start، واعمل كليك يمين واختار **Run as administrator**.

4. **الزق النص ده بالظبط** في Notepad:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <runtime>
    <AppContextSwitchOverrides value="Switch.System.Net.DontEnableSchUseStrongCrypto=false;Switch.System.Net.DontEnableSystemDefaultTlsVersions=false" />
  </runtime>
</configuration>
```

5. **احفظ الملف:** من File > Save As، روح للفولدر `C:\ProgramData\ESCC`، واختار **Save as type: All Files**، وسمّي الملف **ItidaSignClient.exe.config** بالظبط، وخلي **Encoding: UTF-8**، ودوس Save. لو في ملف بنفس الاسم وافق على الاستبدال.

6. **افتح برنامج التوقيع تاني وجرّب التوقيع.**

## هل الملف آمن؟
أيوه. الملف صغير ومكتوب بشكل مفتوح وتقدر تشوف محتواه. كل اللي بيعمله:
- بيقفل برنامج التوقيع لو كان شغال.
- بيكتب ملف إعدادات صغير لبرنامج التوقيع بس (`ItidaSignClient.exe.config` في فولدر `C:\ProgramData\ESCC`) يخلي البرنامج يستخدم TLS 1.2 وطريقة التشفير الآمنة اللي ويندوز بيطلبها.
- بيفتح برنامج التوقيع تاني.

مش بيمسح أي ملفات تانية، ومش بيغيّر أي حاجة تانية في جهازك، ومش بيبعت أي بيانات.

## لو لسه الخطأ موجود
- اتأكد إن التوكن متركّب في الجهاز وإن برنامج ITIDA WebSign متثبت.
- **اتأكد إن الجهاز واصل لسيرفر ITIDA** (`escc.itida.gov.eg`): ممكن يكون في DNS أو بروكسي أو فايروول (أو أنتي فيرس) بيمنع الوصول ليه. جرّب من شبكة تانية أو كلّم مسؤول الشبكة عندك.
- **اتأكد إن ساعة الجهاز مظبوطة:** الوقت والتاريخ والمنطقة الزمنية لازم يكونوا صح. من Settings > Time & language فعّل **Set time automatically** و**Set time zone automatically**.
- اعمل ريستارت للجهاز وجرّب تاني.
- لو لسه مش شغال، كلّمنا واتساب على [**01050992816**](https://wa.me/201050992816?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20DTS%D8%8C%20%D9%85%D8%AD%D8%AA%D8%A7%D8%AC%20%D9%85%D8%B3%D8%A7%D8%B9%D8%AF%D8%A9%20%D9%81%D9%8A%20%D8%AE%D8%B7%D8%A3%203008) وفريق DTS هيساعدك.

## أسئلة شائعة
**هل لازم أشغّل الملف كل مرة؟** لا، مرة واحدة كفاية. لو مسحت برنامج التوقيع ونزّلته تاني ورجعت المشكلة، شغّل الملف تاني.

**هل محتاج أمسح برنامج التوقيع وأنزّله تاني؟** لا، الملف بيظبط البرنامج اللي عندك.

**ليه ويندوز بيطلب صلاحية؟** لأن الملف بيعدّل إعداد برنامج التوقيع المتثبت على الجهاز، وده محتاج إذن منك.

**هل الحل ده بيأثر على التوكن أو الشهادة؟** لا، التوكن والشهادة زي ما هما.
