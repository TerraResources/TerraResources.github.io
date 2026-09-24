
; TerraResources - Master Keyboard Shortcuts
; Requires AutoHotkey v2.0 (tested with the stable 2.x line).

#Requires AutoHotkey v2.0
#SingleInstance Force

;~ - - - - - - - - Numpad Rebindings - - - - - - - -
;GPT Search
 Numpad1::Run("https://chatgpt.com/?q=&hints=search")

;Youtube Homepage
 Numpad2::Run("https://www.youtube.com")

;Spotify
 Numpad3::Run("https://open.spotify.com")

; Numpad4 is left free for a custom launcher.

;Github Codespaces
 Numpad5::Run("https://github.com/codespaces")

; ------------------------------------------------------------
; LECTURE NOTES SETTINGS (used by Numpad7 / Numpad8 below) —
; shared with TerraResources-Lecture-Notes.ahk via
; TerraResources-Lecture-Settings.ahk (must be in the same folder as this
; file). Edit the text there to change what gets typed in both scripts.
; ------------------------------------------------------------
#Include TerraResources-Lecture-Settings.ahk

; Numpad7 = ;;lec equivalent — inserts a lecture header.
; Only active while Word is the focused window.
#HotIf WinActive("ahk_exe WINWORD.EXE")
Numpad7::
{
    global TitlePlaceholder, TopicPlaceholder, DateLabelText, DateFormat
    SendText(TitlePlaceholder "`n")
    Send("^+n")   ; Normal style for the rest of the header
    currentDate := FormatTime(, DateFormat)
    SendText(DateLabelText currentDate "`n")
    SendText(TopicPlaceholder "`n`n")
    Send("{Up 4}{Home}")
    Send("+{End}")   ; select the title placeholder
    Send("^!1")      ; apply Heading 1 (selection stays highlighted)
}

; Numpad8 = ;;sub equivalent — inserts a sub-topic heading.
Numpad8::
{
    global SubTopicPlaceholder
    SendText(SubTopicPlaceholder "`n")
    Send("^+n")
    Send("{Up}{Home}")
    Send("+{End}")   ; select the placeholder text
    Send("^!2")
}

; Numpad6 = ;;fig equivalent — inserts the italicized diagram
; placeholder note.
Numpad6::
{
    global DiagramMarkerText
    Send("^i")
    SendText(DiagramMarkerText)
    Send("^i")
    SendText("`n")
}
#HotIf

; Numpad9 = bullet toggle (Word's native Ctrl+Shift+L)
#HotIf WinActive("ahk_exe WINWORD.EXE")
Numpad9::Send("^+l")
#HotIf

;~ - - - - - - - - Additional Shortcuts - - - - - - - -
