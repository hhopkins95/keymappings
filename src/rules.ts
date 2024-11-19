import fs from "node:fs";
import { KarabinerRules } from "./types.ts";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils.ts";

const SystemRules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
          },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      // Remap hyper + tab to cmd + tab 
// { 
//         type: "basic",
//         description: "Hyper Key + Tab -> CMD + Tab",
//         from: {
//           key_code: "tab",
//           modifiers: {
//             optional: ["left_command", "shift", "left_alt", "left_option"],
//           },
//         },
//         to: [
//           {
//             key_code: "tab",
//             modifiers: ["left_command"],
//           },
//         ],
// },
    ],
  },
  ...createHyperSubLayers({
    spacebar: open(
      "raycast://"
    ),
    // b = "B"rowse
    b: {
      t: open("https://twitter.com"),
      // Quarterly "P"lan
      p: open("https://mxstbr.com/cal"),
      y: open("https://news.ycombinator.com"),
      f: open("https://facebook.com"),
      r: open("https://reddit.com"),
      h: open("https://hashnode.com/draft"),
    },
    // o = "Open" applications
    o: {
      1: app("1Password"),
      g: app("Google Chrome"),
      c: app("Notion Calendar"),
      v: app("Zed"),
      d: app("Discord"),
      s: app("Slack"),
      e: app("Superhuman"),
      n: app("Notion"),
      t: app("Terminal"),
      // Open todo list managed via *H*ypersonic
      h: open(
        "notion://www.notion.so/stellatehq/7b33b924746647499d906c55f89d5026"
      ),
      z: app("zoom.us"),
      // "M"arkdown (Reflect.app)
      m: app("Reflect"),
      r: app("Reflect"),
      f: app("Finder"),
      // "i"Message
      i: app("Texts"),
      p: app("Spotify"),
      a: app("iA Presenter"),
      // "W"hatsApp has been replaced by Texts
      w: open("Texts"),
      l: open(
        "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"
      ),
    },

    // w = "Window" via rectangle.app
    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      f: rectangle("main"),
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      // e: open(
      //   `raycast://extensions/thomas/elgato-key-light/toggle?launchType=background`
      // ),
      // // "D"o not disturb toggle
      // d: open(
      //   `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
      // ),
      // // "T"heme
      // t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
      // c: open("raycast://extensions/raycast/system/open-camera"),
      // 'v'oice
      v: {
        to: [
          {
            key_code: "spacebar",
            modifiers: ["left_option"],
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: "f", modifiers: ["right_control"] }],
        // TODO: Trigger Vim Easymotion when VSCode is focused
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "j", modifiers: ["right_control"] }],
      },
      d: {
        to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },
  }),
];



fs.writeFileSync(
  "system-hyper-karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            SystemRules,
          },
        },
      ],
    },
    null,
    2
  )
);


import { writeToProfile } from 'https://deno.land/x/karabinerts@1.30.1/deno.ts'
writeToProfile('Hunter', 
  // @ts-ignore -- incompatible description fields -- should be fine
  SystemRules
)
