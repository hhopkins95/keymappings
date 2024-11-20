import fs from "node:fs";
import { KarabinerRules } from "./types.ts";
import { app, createHyperSubLayers, open, rectangle, shell } from "./utils.ts";

const SystemRules: KarabinerRules[] = [
  // Remap  ctrl <-> cmd
  // Hyper key cmd is inconvenient for a few functions like save or select all, so keep cmd accessible for these
  {
    manipulators: [
      {
        description: "",
        from: {
          key_code: "left_control",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_command",
          },
        ],
        type: "basic",
      },
      {
        description: "",
        from: {
          key_code: "left_command",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_control",
          },
        ],
        type: "basic",
      },
    ],
  },

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
    ],
  },

  ...createHyperSubLayers({
    /**
     * GLOBALS :
     *
     * -- Hyper maps to ctrl + cmd + alt + shift
     * - need to set up the shortcuts in the relevant apps (e.g. raycast, AltTab)
     */
    spacebar: {
      to: [
        {
          key_code: "spacebar",
          modifiers: [
            "left_option",
            "left_command",
            "left_control",
            "left_shift",
          ],
        },
      ],
    }, // Opens raycast search

    // App Switching -- Set up in AltTab
    tab: {
      to: [
        {
          key_code: "tab",
          modifiers: ["left_command"],
        },
      ],
    }, // Built in cmd + tab -- Quick switch within current app
    open_bracket: {
      to: [
        {
          key_code: "open_bracket",
          modifiers: ["left_command", "left_alt", "left_control", "left_shift"],
        },
      ],
    }, // Replacement for built in cmd + tab -- shows all open windows rather than on applictaion level
    close_bracket: {
      to: [{
        key_code: "close_bracket",
        modifiers: ["left_command", "left_alt", "left_control", "left_shift"],
      }],
    }, // shows all windows for current app

    /**
     * APPLICATION LEVELS
     *
     *  convenient modifiers for cmd and cmd + shift
     *
     * a = "cmd"
     * d = "cmd + shift"  -- navigation based (moving between windows, tabs, etc.)
     *
     * - set up relevant shortcuts in apps (ie VsCode, Arc...)
     */
    // a =
    a: {
      to: [
        {
          key_code: "left_command",
        },
      ],
    },

    s : { 
      to : [ 
        { 
          key_code: "left_control",
        }
      ]
    },  


    d: {
      to: [
        {
          key_code: "left_command",
          modifiers: ["left_shift"],
        },
      ],
    },

    /**
     * WINDOW
     */
    f: {
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
      m: rectangle("almost-maximize"),

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
      // m: {
      //   description: "Window: Forward",
      //   to: [
      //     {
      //       key_code: "close_bracket",
      //       modifiers: ["right_command"],
      //     },
      //   ],
      // },
    },

    /**
     * OTHER
     */
    // b = "B"rowse
    b: {
      t: open("https://twitter.com"),
      // Quarterly "P"lan
      p: open("https://mxstbr.com/cal"),
      y: open("https://news.ycombinator.com"),
      r: open("https://reddit.com"),
      h: open("https://hashnode.com/draft"),
    },
    // o = "Open" applications
    o: {
      // 1: app("1Password"),
      // g: app("Google Chrome"),
      // c: app("Notion Calendar"),
      // v: app("Zed"),
      d: app("Discord"),
      // s: app("Slack"),
      // e: app("Superhuman"),
      // n: app("Notion"),
      t: app("iTerm"),

      // Open todo list managed via *H*ypersonic
      h: open(
        "notion://www.notion.so/stellatehq/7b33b924746647499d906c55f89d5026",
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
        "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink",
      ),
    },

    // s = "System"
    z: {
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

// Write to local file for ref
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
    2,
  ),
);

// Write directly to Karabiner Profile
import { writeToProfile } from "https://deno.land/x/karabinerts@1.30.1/deno.ts";
writeToProfile(
  "Hunter",
  // @ts-ignore -- incompatible description fields -- should be fine
  SystemRules,
);
