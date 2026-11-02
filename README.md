# Excite at Brent Cross

A 3D third-person exploration game set in Brent Cross Shopping Centre, north London. You play as **Anita Sharma**, branch manager of the Excite store on the upper mall. It's Thursday 26 November, the night before Black Friday, and the store needs to be ready by morning.

## Play

Open `index.html` in a browser. It's a single self-contained page: the 3D model and artwork are embedded, and three.js loads from the jsDelivr CDN.

To serve it locally:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

To publish it on GitHub Pages, go to Settings → Pages and deploy from the `main` branch, root folder.

### Controls

| Keyboard / mouse | Touch | Action |
| --- | --- | --- |
| WASD or arrow keys | Left joystick | Walk |
| Shift | Run button | Run |
| Drag | Drag | Look around |
| Scroll | — | Zoom |
| E or Enter | Use button | Talk, use, continue dialogue |
| Q | Wave button | Wave |

### The shift

1. Get up to Excite on the upper mall.
2. Talk to Dev at the Phones counter.
3. Collect the Black Friday posters from the service corridor at the M&S end.
4. Find Mr Okafor, a lost customer by the fountain.
5. Walk him up to Kezia at the Audio counter.
6. Pick up coffees at Brew Cross Coffee.
7. Take Tomasz his coffee in the stockroom.
8. Put the posters up in the shop window.
9. Tell Dev the store is ready.

There are six lost receipts hidden around the centre.

## The mall

- **Layout:** two levels with glass balustrades, bridges, and escalators either side of Centre Court.
- **Centre Court:** the tiered fountain sits under a glass dome, with a barrel skylight running the length of the mall.
- **Anchors:** John Lewis & Partners at one end and M&S at the other.
- **Shops:** tenants include Apple, Zara, Hollister, Miniso, Superdrug, H&M, Gap, Mango, Vans and WHSmith. Units not confirmed as real tenants use generic names such as Opticians or Bakery.
- **Plaque:** marks the centre's opening in March 1976 as London's first purpose-built covered regional shopping centre.

## Anita's model

`assets/anita_sharma.glb` is a rigged, animated glTF binary of Anita, modelled from the reference artwork in `assets/anita-sharma-reference.png`.

- **Look:** long hair with blunt bangs, coral half-lidded eyes, maroon blazer over a white shirt, grey trousers and boots.
- **Skeleton:** 17 bones: `Hips`, `Spine`, `Chest`, `Neck`, `Head`, and `UpperArm`, `LowerArm`, `Hand`, `UpperLeg`, `LowerLeg`, `Foot` for each side (`_L` / `_R`).
- **Animations:**
  - `Idle`: arms crossed, as in the artwork, with breathing.
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

Anita Sharma character artwork: supplied by the project owner. Game and model built with [three.js](https://threejs.org) r160.
