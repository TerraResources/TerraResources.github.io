; TerraResources - Map Shortcuts
; Open OpenStreetMap and control browser zoom with function keys.
; Requires AutoHotkey v2.0 (tested with the stable 2.x line).
; F7-F9 only run while a supported browser is active.
; Press F10 to exit the script.

#Requires AutoHotkey v2.0
#SingleInstance Force

mapURL := "https://www.openstreetmap.org"

F6::Run(mapURL)
#HotIf WinActive("ahk_exe msedge.exe") || WinActive("ahk_exe chrome.exe") || WinActive("ahk_exe firefox.exe") || WinActive("ahk_exe brave.exe") || WinActive("ahk_exe vivaldi.exe") || WinActive("ahk_exe opera.exe")
F7::Send("^{+}")
F8::Send("^-")
F9::Send("^0")
#HotIf
F10::ExitApp
