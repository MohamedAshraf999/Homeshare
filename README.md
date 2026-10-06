# HomeShare Hybrid v4

This package provides:
- `extension/`: Manifest V3 browser extension entry point.
- `pwa/`: mobile-first HomeShare PWA.

## Important
The extension's `popup.js` contains:
`https://YOUR-DOMAIN.example/homeshare/`

Replace that with the real HTTPS URL where the `pwa/` folder is hosted.

The PWA is installable from Edge Android when served over HTTPS and when the browser offers installation.

## Architecture
Edge Desktop -> Extension
Edge Android -> Extension entry (where supported) -> PWA URL -> Install HomeShare

The PWA currently keeps its data locally in the browser. Cross-device sync is intentionally not enabled.
