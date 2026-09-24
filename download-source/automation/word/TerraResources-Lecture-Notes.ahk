; ============================================================
; Lecture Notes Toolkit — AutoHotkey v2
; ============================================================
; HOW TO USE:
; 1. Open this file in SciTE4AutoHotkey.
; 2. Press F5 (or the green Run arrow) to launch it.
; 3. Switch to Word and start typing — hotstrings trigger
;    automatically after you type the trigger + a space/punctuation.
; 4. Right-click the AutoHotkey tray icon (bottom-right, near clock)
;    to pause or exit the script.
; ============================================================

#Requires AutoHotkey v2.0
#SingleInstance Force

; ============================================================
; SETTINGS — shared with TerraResources-Master-Hotkeys.ahk. Edit the
; text in TerraResources-Lecture-Settings.ahk (must be in the same folder as
; this file) to change what gets typed everywhere at once.
; ============================================================
#Include TerraResources-Lecture-Settings.ahk

; ------------------------------------------------------------
; SECTION 1: Lecture header template
; ------------------------------------------------------------
; Type  ;;lec  then a space -> inserts a formatted lecture header.
; The title text is pre-selected — just type over it.
; Date is auto-filled. Topic is left as plain placeholder text to
; click into and replace.
; Restricted to Word only (uses Word-specific style shortcuts that
; could misfire elsewhere — e.g. Ctrl+Shift+N opens an Incognito
; window in Chrome).
#HotIf WinActive("ahk_exe WINWORD.EXE")
::;;lec::
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

; Type  ;;sub  then a space -> inserts a Heading 2 line, with
; the sub-topic text pre-selected so you can type straight over it.
::;;sub::
{
    global SubTopicPlaceholder
    SendText(SubTopicPlaceholder "`n")
    Send("^+n")
    Send("{Up}{Home}")
    Send("+{End}")   ; select the placeholder text
    Send("^!2")
}

; Type  ;;fig  then a space -> inserts an italicized note-to-self
; marking where a diagram/map/graph was shown, so you don't lose
; your flow trying to draw it live. Returns to normal formatting
; afterward.
::;;fig::
{
    global DiagramMarkerText
    Send("^i")
    SendText(DiagramMarkerText)
    Send("^i")
    SendText("`n")
}
#HotIf

; ------------------------------------------------------------
; SECTION 2: Quick heading/style hotkeys (no typing needed)
; ------------------------------------------------------------
; F2 = Heading 1, F3 = Heading 2, F4 = Normal body text.
; Only active while Word is the focused window.
#HotIf WinActive("ahk_exe WINWORD.EXE")
F2::Send("^!1")
F3::Send("^!2")
F4::Send("^+n")
; F5 = toggle Key Term formatting (bold + underline together).
; Press once before typing a term, press again to turn it off.
F5::
{
    Send("^b")
    Send("^u")
}
#HotIf

; ------------------------------------------------------------
; SECTION 3: Shorthand expansion (everyday note-taking)
; ------------------------------------------------------------
::w/::with
::w/o::without
::b/c::because
::b4::before
::eg::e.g.
::ie::i.e.
::def::Definition: 
::todo::TODO: 
::qq::Question: 
::->::→
::<-::←
::!!::Important: 

; ------------------------------------------------------------
; SECTION 4: (space for geography-specific shorthand — see below)
; ------------------------------------------------------------

; ------------------------------------------------------------
; SECTION 5: Timestamp / date insert (standalone, works anywhere)
; ------------------------------------------------------------
::;;date::
{
    global DateFormat
    SendText(FormatTime(, DateFormat))
}

::;;time::
{
    global TimeFormat
    SendText(FormatTime(, TimeFormat))
}

; ------------------------------------------------------------
; SECTION 6: Cheat sheet — press F1 anytime to see all shortcuts
; ------------------------------------------------------------
#HotIf WinActive("ahk_exe WINWORD.EXE")
F1::
{
    cheatSheet := "
    (
LECTURE NOTES — QUICK REFERENCE

TEMPLATES (type, then space)
  ;;lec   -> lecture header (title/date/topic)
  ;;sub   -> sub-topic heading
  ;;fig   -> diagram/map placeholder note (italic)
  ;;date  -> today's date (standalone)
  ;;time  -> current time (standalone)

HEADING KEYS (just press)
  F2  -> Heading 1
  F3  -> Heading 2
  F4  -> Normal (body text)
  F5  -> toggle Key Term (bold + underline)

SHORTHAND (type, then space)
  w/      -> with
  w/o     -> without
  b/c     -> because
  b4      -> before
  eg      -> e.g.
  ie      -> i.e.
  def     -> Definition:
  todo    -> TODO:
  qq      -> Question:
  ->      -> (arrow)
  <-      -> (arrow)
  !!      -> Important:

Press F1 anytime to see this again.
    )"
    MsgBox(cheatSheet, "Lecture Notes Cheat Sheet", "T15")
}
#HotIf
