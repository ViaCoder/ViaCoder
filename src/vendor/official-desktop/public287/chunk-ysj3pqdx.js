// @bun @bytecode
// Claude Code is a Beta product per Anthropic's Commercial Terms of Service.
// By using Claude Code, you agree that all code acceptance or rejection decisions you make,
// and the associated conversations in context, constitute Feedback under Anthropic's Commercial Terms,
// and may be used to improve Anthropic's products, including training models.
// You are responsible for reviewing any code suggestions before use.

// (c) Anthropic PBC. All rights reserved. Use is subject to the Legal Agreements outlined here: https://code.claude.com/docs/en/legal-and-compliance.

// Version: 2.1.287
var r5={clipboardRead:!1,clipboardWrite:!1,systemKeyCombos:!1};function i(e){return e.toLowerCase().split(/[\\/]/).pop()??""}var r=new Set(["com.apple.Terminal","com.googlecode.iterm2","com.microsoft.VSCode","dev.warp.Warp-Stable","com.github.wez.wezterm","org.alacritty","io.alacritty","net.kovidgoyal.kitty","co.zeit.hyper","com.mitchellh.ghostty","com.todesktop.230313mzl4w4u92","com.vscodium","com.exafunction.windsurf","dev.zed.Zed","org.tabby","com.jetbrains.intellij","com.jetbrains.pycharm"]),s=new Set(["com.apple.finder"]),t=new Set(["com.apple.systempreferences"]),d=new Set(["cmd.exe","powershell.exe","pwsh.exe","wt.exe","windowsterminal.exe","code.exe","cursor.exe","vscodium.exe","windsurf.exe","zed.exe","alacritty.exe","wezterm-gui.exe","warp.exe","hyper.exe","tabby.exe","idea64.exe","pycharm64.exe","conemu.exe","conemu64.exe"]),a=["Microsoft.WindowsTerminal_","Microsoft.WindowsTerminalPreview_","Microsoft.PowerShell_"],l=new Set(["explorer.exe"]),p=new Set(["systemsettings.exe"]),u=["windows.immersivecontrolpanel_"],g=new Set([...r,...s,...t]);function VPt(e){if(r.has(e))return"shell";if(s.has(e))return"filesystem";if(t.has(e))return"system_settings";if(a.some((n)=>e.startsWith(n)))return"shell";if(u.some((n)=>e.startsWith(n)))return"system_settings";let o=i(e);if(d.has(o))return"shell";if(l.has(o))return"filesystem";if(p.has(o))return"system_settings";return null}function Uwo(e){return VPt(e)!==null}
export{r5,VPt,Uwo};
