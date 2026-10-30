---
slug: fix-error-3008-itida-websign
path: /fix-error-3008-itida-websign
title: Fix error 3008 Error in verifying License in ITIDA WebSign for e-invoices and e-receipts
description: Fix error 3008 Error in verifying License when signing an e-invoice or e-receipt. A ready file and a step video, free from DTS.
cover: /images/knowledge/fix-3008.webp
category: Signature
topic: signature
featured: true
video: /videos/fix-error-3008-itida-websign.mp4
poster: /videos/fix-error-3008-itida-websign.jpg
download: /downloads/Fix-ITIDA-WebSign.bat
published: 2026-10-27
updated: 2026-10-27
---

**In short:** if ITIDA WebSign (WebSignClient) stops signing an e-invoice or e-receipt and shows error 3008, download the ready fix from DTS, run it as administrator, and try signing again. In most cases this takes less than a minute.

## What is error 3008?
Error 3008 is the message ITIDA WebSign shows when you sign an invoice or receipt on the tax authority system. The exact text is:

`3008 Error in verifying License`

The token certificates often disappear from the signing list at the same time.

## Cause (not the token or the certificate)
The problem is not the token and not the certificate. Newer Windows and server security settings often block the older connection method WebSignClient uses, so the program cannot verify its license. Anyone signing an e-invoice or e-receipt with a token on Windows can hit this.

The fix is to make the program use TLS 1.2 and the stronger crypto Windows expects. Any of the three methods below does that.

## Ready file
This is the easiest method, and the one we recommend:

1. **Download the fix** Fix-ITIDA-WebSign.bat from the button on this page.
2. **Run it as administrator** (right-click, **Run as administrator**). If Windows asks to allow changes, choose **Yes**, wait until the black window says it finished, then press any key to close it.
3. **Try signing again.** The certificates should appear and signing should work.

> If Windows warns that the file is from an unknown source, choose "More info" then "Run anyway".

## Copy the script yourself
If you do not want to download a file, you can make it in a minute:

1. **Copy this whole script:**

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

> **If the signer is installed somewhere else:** the path is on the line `set "DIR=C:\ProgramData\ESCC"`. Change `C:\ProgramData\ESCC` to the folder that contains `ItidaSignClient.exe`, and leave the rest as it is.

2. **Open a blank text file** in **Notepad**.
3. **Paste the script** and save.
4. **Change the extension from .txt to .bat:**
   - In Notepad choose **Save as type: All Files** and name it **Fix-ITIDA-WebSign.bat**,
   - or if it saved as .txt: in File Explorer turn on **View > File name extensions** and rename `Fix-ITIDA-WebSign.txt` to `Fix-ITIDA-WebSign.bat`.
5. **Run the file as administrator**, then **try signing again**.

## Manual steps
If you do not want to run a .bat file at all, you can write the config yourself. The video at the top of this page shows the steps.

1. **Close** WebSignClient if it is running.

2. **Check that `C:\ProgramData\ESCC` exists.** In File Explorer type `C:\ProgramData\ESCC` in the address bar. If it is missing, create a folder named `ESCC` inside `C:\ProgramData`. ProgramData is hidden, so type the path in the address bar.

3. **Open Notepad as administrator:** search for Notepad in Start, right-click, **Run as administrator**.

4. **Paste this exactly:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <runtime>
    <AppContextSwitchOverrides value="Switch.System.Net.DontEnableSchUseStrongCrypto=false;Switch.System.Net.DontEnableSystemDefaultTlsVersions=false" />
  </runtime>
</configuration>
```

5. **Save:** File > Save As, go to `C:\ProgramData\ESCC`, choose **Save as type: All Files**, name it **ItidaSignClient.exe.config**, set **Encoding: UTF-8**, and save. Replace the file if one already exists.

6. **Open the signer again and try signing.**

## Is the file safe?
Yes. It is short and you can read every line. It only:
- closes the signer if it is running,
- writes one config file for that program (`ItidaSignClient.exe.config` in `C:\ProgramData\ESCC`) so it uses TLS 1.2 and the stronger crypto Windows expects,
- starts the signer again.

It does not delete other files, change anything else on the PC, or send any data.

## If the error is still there
- Make sure the token is plugged in and ITIDA WebSign is installed.
- **Make sure the PC can reach the ITIDA server** (`escc.itida.gov.eg`). DNS, a proxy, a firewall, or antivirus can block it. Try another network or ask your network admin.
- **Check the clock:** date, time, and time zone must be correct. In Settings > Time & language turn on **Set time automatically** and **Set time zone automatically**.
- Restart the PC and try again.
- If it still fails, WhatsApp [**01050992816**](https://wa.me/201050992816?text=Hello%20DTS%2C%20I%20need%20help%20with%20error%203008) and the DTS team will help.

## Common questions
**Do I run the file every time?** No. Once is enough. If you reinstall the signer and the error comes back, run it again.

**Do I need to uninstall and reinstall the signer?** No. The file adjusts the program you already have.

**Why does Windows ask for permission?** The file changes a setting of the installed signer, and that needs your approval.

**Does this affect the token or the certificate?** No. Both stay as they are.
