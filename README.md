repo for remapping keybindings to home row mods, and some relevant configs for
different programs --

Apps needed :
- Raycast
- Karabiner-Elements
- Rectangle
- AltTab
wdf
Shortcuts : Mix of two methods that I found :

1. Hyper Key -- https://github.com/mxstbr/karabiner/tree/main /
   https://www.youtube.com/watch?v=j4b_uQX3Vu0
- remaps CapsLock to a 'Hyper' (holds ctrl + cmd + alt + shift at the same time)
  key + "layers" (spaces on top of the hyper key)

  shortcuts
- will use this for system-level shortcuts -- like changing window focus,
  switching tabs, etc.
  -[] can use hammerspoon for custom os level shortcuts -- map them to hyper key
  shortcuts

1. Home Row Mods --https://havn.blog/2024/03/03/a-good-way.html /
   https://github.com/Erlendms/karabiner-actions

- this lets us remap certain keys to emit different events if they are held --
  we can use this to remap home row keys to ctrl, alt, shift, etc.
- set up shortcuts on the application level to be compatible here

see : https://www.youtube.com/watch?v=sLWQ4Gx88h4
https://github.com/dreamsofcode-io/home-row-mods/tree/main/kanata/macos
