# Excite Tycoon

A 3D shop-management game set in Brent Cross Shopping Centre, north London. You play as **Anita Sharma**, who has just been handed the keys to a small Excite tech store on the upper mall. Serve customers, keep the shelves stocked, hire a team and grow the store into the best in the centre.

## Play

Open `index.html` in a browser. It's a single self-contained page: the 3D model is embedded, and three.js loads from the jsDelivr CDN.

To serve it locally:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

To publish it on GitHub Pages, go to Settings → Pages and deploy from the `main` branch, root folder.

The game works on phones and tablets in portrait or landscape. Touch controls appear on touch devices automatically, and on a touchscreen laptop the first touch switches them on. Progress saves in the browser at the start of each trading day.

### Controls

| Keyboard / mouse | Touch | Action |
| --- | --- | --- |
| WASD or arrow keys | Left joystick | Walk |
| Shift | Run button | Run |
| Drag | Drag | Look around |
| Scroll | Pinch | Zoom |
| E or Enter | Use button, or tap the prompt | Serve, restock, talk |
| M | Manage button | Open the management panel |
| Q | — | Wave |

## How it works

- **Trading days:** the store opens at 09:00 and closes at 20:00, about four minutes of real time. At closing time you get a report of sales, stock costs, wages, rent and profit.
- **Customers:** shoppers walk in and wait at a department counter. Their bubble shows how patient they are. Serve them before it runs out, or they walk out and your rating drops. Not everyone buys.
- **Stock:** each sale uses one unit from the shelf. When a shelf runs low, pick up a box in the stockroom and carry it to the counter. Restocking buys the stock from the till.
- **Rating:** happy customers raise the star rating, and lost customers lower it. A higher rating brings more shoppers in.
- **Manage panel:**
  - **Grow:** open new departments (Phones, Audio, Laptops, Gaming) and buy upgrades: window display, staff coffee machine, bigger shelves, fast card tills, mall advertising boards, demo stations and a flagship refit.
  - **Staff:** hire specialists who serve one counter each (Dev, Kezia, Sam and Jordan), plus Tomasz, who restocks any department that runs low. Wages are paid at closing time.
  - **Prices:** choose discount, standard or premium pricing. This trades sales volume against margin and rating.
  - **Stats:** today's numbers and lifetime totals.
- **Goals:** a chain of goals guides you from your first sale to Store of the Year at £40,000 in lifetime sales, and then on to a five-star flagship. Each goal pays a cash bonus.
- **Running out of money:** if the account is more than £2,000 overdrawn at closing time, head office closes the unit and you start again.

## The mall

- **Layout:** two levels with glass balustrades, bridges, and escalators either side of Centre Court.
- **Centre Court:** the tiered fountain sits under a glass dome, with a barrel skylight running the length of the mall. The sky changes from day to dusk to night as closing time approaches.
- **Anchors:** Ashby & Rowe department store at one end and Fairfield at the other.
- **Shops:** every other shop has a made-up or generic name, such as Loom & Lane, Circuit Hub, Pages & Post, Opticians or Bakery. No real retailer names or branding are used.
- **Plaque:** marks the centre's opening in March 1976 as London's first purpose-built covered regional shopping centre.

## Anita's model

`assets/anita_sharma.glb` is a rigged, animated glTF binary of Anita, built entirely in code. The portraits on the title screen, the reports and in dialogue are rendered from this same 3D model when the game loads.

- **Look:** long hair with blunt bangs, coral half-lidded eyes, maroon blazer over a white shirt, grey trousers and boots.
- **Skeleton:** 17 bones: `Hips`, `Spine`, `Chest`, `Neck`, `Head`, and `UpperArm`, `LowerArm`, `Hand`, `UpperLeg`, `LowerLeg`, `Foot` for each side (`_L` / `_R`).
- **Animations:**
  - `Idle`: arms crossed, with breathing.
  - `Walk`
  - `Run`
  - `Wave`

The model opens in Blender (File → Import → glTF 2.0), Unity, Godot, three.js and other glTF tools.

### Rebuilding the model

The model is generated in code by `tools/anita-rig/anita_rig.js`:

1. Serve the repo locally.
2. Open `tools/anita-rig/preview.html`. It builds the mesh and skeleton, exports the GLB, reloads it and plays all four animations side by side.
3. Use **Download anita_sharma.glb** to save a fresh copy.

## Credits

Game and model built with [three.js](https://threejs.org) r160. Shop and brand names in the mall are fictional.
