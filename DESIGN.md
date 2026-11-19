# Vesli style guide (dark tech theme)

Copy these values into the Figma file (Local styles / Variables) so Figma and code use the same names.

## Colours

| Name              | Value                     | Use                                  |
|-------------------|---------------------------|--------------------------------------|
| bg                | #050F0F                   | Page background                      |
| bg-raised         | #0B1C1B                   | Demo panels                          |
| glass             | white 4%                  | Cards, tabs, badges                  |
| glass-strong      | white 7%                  | Selected tab, card top               |
| border            | white 9%                  | Lines and card borders               |
| border-strong     | white 18%                 | Buttons, active borders              |
| text              | #E9F3F0                   | Main text                            |
| muted             | #93AAA5                   | Secondary text                       |
| accent (mint)     | #5EF2CF                   | Buttons, glow, highlights, focus     |
| accent-ink        | #032420                   | Text on mint buttons                 |
| glow-2            | #6F7DFF                   | Second glow colour (gradients only)  |

## Typography

| Role     | Font               | Size              | Weight |
|----------|--------------------|-------------------|--------|
| Hero H1  | Unbounded          | 38-80 px (fluid)  | 600    |
| H2       | Unbounded          | 30-44 px (fluid)  | 600    |
| H3       | Schibsted Grotesk  | 24 px             | 600    |
| Lead     | Schibsted Grotesk  | 19 px             | 400    |
| Body     | Schibsted Grotesk  | 17 px, line 1.6   | 400    |
| Small    | Schibsted Grotesk  | 14 px             | 400-600|

Both fonts are self-hosted in `static/fonts` (SIL Open Font License).

## Spacing and shape

- 8 px spacing scale: 8, 16, 24, 32, 48, 64
- Sections: 64-120 px vertical padding (fluid)
- Container: max 1184 px
- Radius: 10 px (small), 18 px (cards, devices), 26 px (large panels); buttons and tabs are pills

## Effects

- Glass header: background at 65%, 14 px blur
- Glows: large blurred radial gradients in mint and glow-2 behind the hero and CTA
- Spotlight: a soft mint light follows the pointer on cards and demos
- Mint button hover: 32 px mint glow

## Components

- Hero: badge with pulsing dot, centred Unbounded headline, animated 3D dot wave (canvas)
- Showcase: laptop + phone with example client sites, tabs that cycle every 6 seconds
- Tool marquee: scrolling list of what we build with
- Use-case tabs: Kappers / Cafés / Lunchrooms, each with features and a working demo
- Service cards, process timeline that fills on scroll, numbered project index, FAQ accordion, CTA with glow
