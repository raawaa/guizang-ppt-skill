# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

## Current state in `raawaa/guizang-ppt-skill`

- ✅ `wontfix` (GitHub default, pre-existing)
- ❌ `needs-triage` / `needs-info` / `ready-for-agent` / `ready-for-human` (to be created on first use)

When a skill applies one of these labels and it does not exist, create it with `gh label create <name> --description "..." --color <hex>` before applying. Use the descriptions above for the `--description` flag and pick a distinct color per role:

| Label | Color | Why |
|---|---|---|
| `needs-triage` | `#d93f0b` | red-orange — attention needed |
| `needs-info` | `#fbca04` | yellow — pending external input |
| `ready-for-agent` | `#0e8a16` | green — work ready |
| `ready-for-human` | `#5319e7` | purple — human-only |

## When a skill mentions a role

Use the label string from the right column of the table above. The names match the canonical names, so default = canonical.
