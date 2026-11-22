# gta6_meme_loading

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/AARenor/gta6_meme_loading/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/AARenor/gta6_meme_loading/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

An entry for the make.fun bounty [Post a GTA 6 meme on X](https://make.fun/bounty/gta6-meme-x-01). The entry itself is the post on X that `POST.json` names: make.fun reads that post from X, and an AI judge compares the meme in it against the other posts. This repository carries the post's address and the small program that hands the address to the gate.

`POST.json` holds the post's URL. `main.ts` (Node 22) reads it from the repository directory, refuses it unless it holds a JSON object whose `url` is the address of a post on X, and copies the exact bytes it read to `/output/POST.json`, so the two runs of the entry write identical output. It uses no network, no clock and nothing outside Node's standard library.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=33j7v2e3&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
