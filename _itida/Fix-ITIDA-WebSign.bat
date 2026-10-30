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
