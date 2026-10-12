/** Local C: bounded OS glue via the SAME upstream opt-in run_shell tool.
 * Not a Rust tool, default feature enable, desktop driver, or second MCP host.
 * X11 is gated exactly like upstream x11_display.rs (never XWayland). Missing
 * primitives remain unavailable. Clipboard bytes never enter shell syntax. */
export const LINUX_DESKTOP_PORT_073 = String.raw`
import ctypes as C, ctypes.util, json, os, re, shutil, subprocess, sys
request=json.loads(sys.argv[1]); method=request['method']; args=request.get('args',{})
native=bool(os.environ.get('DISPLAY')) and (os.environ.get('XDG_SESSION_TYPE')=='x11' or (os.environ.get('XDG_SESSION_TYPE')!='wayland' and not os.environ.get('WAYLAND_DISPLAY')))
wayland=os.environ.get('XDG_SESSION_TYPE')=='wayland' or bool(os.environ.get('WAYLAND_DISPLAY'))
def run(argv, text=None):
    p=subprocess.run(argv,input=text,text=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=3,check=True)
    return p.stdout
def xopen():
    if not native: raise RuntimeError('Native X11 required; XWayland is not desktop authority')
    lib=C.CDLL(ctypes.util.find_library('X11'))
    lib.XOpenDisplay.argtypes=[C.c_char_p];lib.XOpenDisplay.restype=C.c_void_p
    d=lib.XOpenDisplay(None)
    if not d: raise RuntimeError('X11 display unavailable')
    lib.XDefaultRootWindow.argtypes=[C.c_void_p];lib.XDefaultRootWindow.restype=C.c_ulong
    lib.XCloseDisplay.argtypes=[C.c_void_p];lib.XFlush.argtypes=[C.c_void_p]
    return lib,d,lib.XDefaultRootWindow(d)
def pointer(lib,d,root):
    lib.XQueryPointer.argtypes=[C.c_void_p,C.c_ulong,C.POINTER(C.c_ulong),C.POINTER(C.c_ulong),C.POINTER(C.c_int),C.POINTER(C.c_int),C.POINTER(C.c_int),C.POINTER(C.c_int),C.POINTER(C.c_uint)]
    r,c=C.c_ulong(),C.c_ulong();x,y,wx,wy=C.c_int(),C.c_int(),C.c_int(),C.c_int();mask=C.c_uint()
    if not lib.XQueryPointer(d,root,C.byref(r),C.byref(c),C.byref(x),C.byref(y),C.byref(wx),C.byref(wy),C.byref(mask)): raise RuntimeError('Pointer is on a different X11 screen')
    return {'x':x.value,'y':y.value}
def under_point(lib,d,root,x,y):
    # XTranslateCoordinates returns the actual mapped child containing the
    # point in stacking order, without warping the cursor or activating apps.
    lib.XTranslateCoordinates.argtypes=[C.c_void_p,C.c_ulong,C.c_ulong,C.c_int,C.c_int,C.POINTER(C.c_int),C.POINTER(C.c_int),C.POINTER(C.c_ulong)]
    lib.XInternAtom.argtypes=[C.c_void_p,C.c_char_p,C.c_int];lib.XInternAtom.restype=C.c_ulong
    lib.XGetWindowProperty.argtypes=[C.c_void_p,C.c_ulong,C.c_ulong,C.c_long,C.c_long,C.c_int,C.c_ulong,C.POINTER(C.c_ulong),C.POINTER(C.c_int),C.POINTER(C.c_ulong),C.POINTER(C.c_ulong),C.POINTER(C.POINTER(C.c_ubyte))]
    lib.XFree.argtypes=[C.c_void_p]
    current=root;owner=None;seen=set()
    atom=lib.XInternAtom(d,b'_NET_WM_PID',1)
    for _ in range(64):
        if current in seen: raise RuntimeError('X11 window tree cycle')
        seen.add(current)
        if current!=root and atom:
            kind=C.c_ulong();fmt=C.c_int();count,left=C.c_ulong(),C.c_ulong();data=C.POINTER(C.c_ubyte)()
            status=lib.XGetWindowProperty(d,current,atom,0,1,0,6,C.byref(kind),C.byref(fmt),C.byref(count),C.byref(left),C.byref(data))
            try:
                if status==0 and kind.value==6 and fmt.value==32 and count.value==1 and data:
                    owner={'pid':int(C.cast(data,C.POINTER(C.c_ulong))[0]),'window_id':int(current)}
            finally:
                if data: lib.XFree(data)
        rx,ry=C.c_int(),C.c_int();child=C.c_ulong()
        if not lib.XTranslateCoordinates(d,root,current,x,y,C.byref(rx),C.byref(ry),C.byref(child)): raise RuntimeError('Point belongs to a different X11 screen')
        if not child.value:
            if current==root: return None
            if owner is None: raise RuntimeError('Mapped X11 window has no trusted process owner')
            return owner
        current=child.value
    raise RuntimeError('X11 window tree depth exceeded')
def monitors():
    if not native: raise RuntimeError('Physical monitor enumeration requires native X11')
    rows=[]
    for line in run(['xrandr','--listmonitors']).splitlines()[1:]:
        m=re.match(r'\s*(\d+):\s+([+*]*)(\S+)\s+(\d+)/\d+x(\d+)/\d+([+-]\d+)([+-]\d+)',line)
        if not m: raise RuntimeError('Unknown xrandr monitor response')
        i,flags,name,w,h,x,y=m.groups();rows.append({'displayId':int(i),'name':name,'isPrimary':'*' in flags,'width':int(w),'height':int(h),'originX':int(x),'originY':int(y),'scaleFactor':1})
    if not rows or sum(r['isPrimary'] for r in rows)!=1: raise RuntimeError('X11 primary monitor is ambiguous')
    return rows
if method=='describe':
    available=[]
    if native and ctypes.util.find_library('X11'):
        lib,d,root=xopen()
        try: pointer(lib,d,root)
        finally: lib.XCloseDisplay(d)
        available+=['cursor','move','underPoint']
        if shutil.which('xrandr'):
            monitors();available+=['displays']
    if wayland:
        if shutil.which('wl-paste'): available+=['readClipboard']
        if shutil.which('wl-copy'): available+=['writeClipboard']
    elif native and shutil.which('xclip'): available+=['readClipboard','writeClipboard']
    answer={'methods':available}
elif method=='displays': answer=monitors()
elif method in ('cursor','move','underPoint'):
    lib,d,root=xopen()
    try:
        if method=='cursor': answer=pointer(lib,d,root)
        elif method=='underPoint': answer=under_point(lib,d,root,int(args['x']),int(args['y']))
        else:
            lib.XWarpPointer.argtypes=[C.c_void_p,C.c_ulong,C.c_ulong,C.c_int,C.c_int,C.c_uint,C.c_uint,C.c_int,C.c_int]
            lib.XWarpPointer(d,0,root,0,0,0,0,int(args['x']),int(args['y']));lib.XFlush(d);answer=pointer(lib,d,root)
            if answer!={'x':int(args['x']),'y':int(args['y'])}: raise RuntimeError('X11 mouse movement did not land')
    finally: lib.XCloseDisplay(d)
elif method=='readClipboard': answer=run(['wl-paste','--no-newline','--type','text'] if wayland else ['xclip','-selection','clipboard','-out'])
elif method=='writeClipboard':
    run(['wl-copy','--type','text/plain;charset=utf-8'] if wayland else ['xclip','-selection','clipboard','-in'],args['text']);answer=None
else: raise RuntimeError('Unsupported C desktop primitive')
print(json.dumps(answer,ensure_ascii=False))
`

const quote = (text: string) => "'" + text.replaceAll("'", "'\\''") + "'"
export function linuxDesktopPortCommand073(method: string, args: Record<string, unknown> = {}) {
  return `python3 -c ${quote(LINUX_DESKTOP_PORT_073)} ${quote(JSON.stringify({method,args}))}`
}
