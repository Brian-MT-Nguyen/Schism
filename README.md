# Schism
Link to Deployed Game: https://brian-mt-nguyen.github.io/Schism/

## Credits:  
- Abraham Halim (Testing Lead, Programmer)
- Brian Nguyen (Technology Lead)
- Hazelle Malonzo (Art Co-Lead)
- Max Schwab (Art Co-Lead)
- Samip Niraula (Production Lead, Programmer)

## Explanation of Theme
This project was created for our final project in CMPM120. We wanted to implement the theme through our mehcnaics of having Lune jump between past and present, not only to solve puzzles, but for the player to see how the space has adapted over a large period of time. Some items in the levels will be broken in the present but still workable in the past and that shows how we utilize the theme throughout the entire narrative and level design.

## Compatibility Notes
- Mobile Exclusive Game
- Full Screen is not supported for Safari
- Intro Cinematic sometimes does not load for iOS devices, but does load (as shown in playthrough)

## Prototypes:
- Cinematics Prototype: https://brian-mt-nguyen.github.io/Schism/prototypes/cinematics/cinematics-1.html by Samip Niraula
- Core Gameplay Prototype: https://brian-mt-nguyen.github.io/Schism/prototypes/core%20gameplay/core-gameplay-1.html by Abraham Halim
- Scene Flow Prototype: https://brian-mt-nguyen.github.io/Schism/prototypes/scene%20flow/scene-flow-1.html By Brian Nguyen

## Core Requirements
- [project archive] The team has submitted a self-contained archive of their design and deployment work (e.g. a repository on GitHub). This archive contains some documentation (e.g. a README.md file) that is immediately visible even to non-technical audiences. ***SATISFIED*** as described below
    - [main game] The documentation links to a deployed version of the main game compatible with mobile browsers. (This might be on GitHub pages, Itch.io, or other web hosting site.) ***SATISFIED*** shown at the top below title
    - [prototypes] The documentation links to the deployed version of three playable prototypes (core gameplay, scene flow, and cinematics). (They don't need to be deployed on the same platform as the main game, but the audience needs to be able to play them by simply clicking a direct link to them.) ***SATISFIED*** shown above in Prototypes section
    - [theme] The documentation describes how the theme of "nearby in space, but distant in time" was addressed in the main game's design. (One sentence would be sufficient, but try to keep the description to a single paragraph even if you want to give more detail.) ***SATISFIED*** shown above in Explanation of Theme section
    - [selectable requirements] The documentation describes which of the three selectable requirements your team is attempting to satisfy (see below). ***SATISFIED*** shown below in Selectable Requirements section
    - [contributor credits] The documentation identifies all of the direct contributors to the code and their assigned roles (e.g. "testing lead") ***SATISFIED*** shown above in Credits section
    - [asset credits] If the team has built there game using assets created by anyone else (even if those assets were modified before inclusion in the game), the upstream source of those assets should be credited in the documentation as well. ***SATISFIED*** shown below in Asset Credits section
- [source code] The project's textual source code is visible in the team's repository, and specific changes to it are attributable to specific contributors with useful messages summarizing each change. ***SATISFIED*** as described below
    - The game was developed using a tool where most game rules are expressed in hand-typed textual program code (e.g. JavaScript or C#). ***SATISFIED*** used JavaScript
    - The team's repository directly shows contributions from several team members. ***SATISFIED*** All members have contributed once with Programmers contributing many times
    - Most of the recorded changes to the repository are associated with meaningful commit messages describing the change. ***SATISFIED*** as shown in commit history
- [mobile] Smooth experience of full-screen play in a mobile browser. ***SATISFIED*** as demonstrated in walkthrough below + described below except for compatibility notes shown in section above
    - The game is playable using only touch-screen controls. (The player might be allowed to use keyboard/mouse, but the game does not require this of them.) ***SATISFIED*** uses touch buttons
    - The game is playable full-screen in a mobile browser. (There is some way for the player to make the game display full-screen and for them to continue playing in that mode.) ***SATISFIED*** uses full screen button except for compatibility notes shown in section above
    - The game is free of distracting technical or design problems that get in the way of completing the entire game in a mobile browser. (For example, the game should not load so slowly that the player thinks the game is broken at first. Any on-screen buttons  should be appropriately sized to touch with typically sized human fingers. The animation frame rate should be sufficiently high that motions appear smooth, e.g. >24 fps at almost all times.) ***SATISFIED*** multiple devices playtested with smooth animation
- [self-teaching] The player is capable of learning to play from within the game, without consulting outside instructions. (For example, the game's website might say "a touchscreen is recommended for playing this game" but it should not say "tap and drag on the left side of side of the screen to make your character walk". This message should instead be conveyed inside of the game so that the player can learn this without leaving the full-screen mode.) ***SATISFIED*** dialogue explains mechanics to players and they encounter it
- [persistent music toggle] The player is capable of toggling background music from within the game, and this preference is saved across sessions. ***SATISFIED*** toggle sound button
    - The player can turn on and off the game's music independent of any other sound effects used by the game (i.e. we can turn off music but still hear other sounds). ***SATISFIED*** can turn off background music using sound button
    - The setting of this configuration value persists across gameplay sessions even if the player closes the browser tab and returns later. ***NOT SATISFIED***
- [completability] Core gameplay can be reached within 1 minute, and an experienced player of similar games can complete the experience within 10 minutes of their first exposure to the game. ***SATISFIED*** as shown in walkthrough below (about 50 seconds timed)
    - Core gameplay can be reached within 1 minute. ***SATISFIED*** as shown in walkthrough below (about 50 seconds timed)
    - The game's main progression can be followed to some satisfying ending point within 10 minutes by a player experienced with related videogames. ***SATISFIED*** Over 4 minutes of gameplay as shown in walkthrough below

## Selectable Requirements (choose 3)
- Data-driven experience progression (e.g. defined in a separate JSON/XML or other data file). You should be able to give us the name of one or more text files containing game design details in a format that isn't a programming language.  
(Satisfied via dialogue.json file that holds all the game's dialogue which is one of the indicators to advance player and levels)  
- Advanced visual assets (a file-based visual asset that isn't just an image or simple collection of images, such as a video, mesh, or mesh animation).
(Satisfied via cinematic intro mp4 video)
- Complete closed captioning (all sounds, not just speech, is described with on-screen text)
(Satisfied via dialogue + player action captions)

## Asset Credits
All Art was made by Hazelle Malonzo and Max Schwab except the following below\
\
Music Source: https://www.youtube.com/watch?v=H4BAEf5V-Yc&ab_channel=BreakingCopyright%E2%80%94RoyaltyFreeMusic (Trimmed it + Reverb + Tempo Increase + Higher Pitch + Copyright Free)\
For all these audio assets, we used audacity and recorded real life sound effects of the objects we wanted to represent.
  * FridgeClose.wav
  * FridgeOpen.wav

For all these image assets, we used illustrator and live painted pixel art except for the fridges.\
For the fridges, we took it from https://www.vecteezy.com/vector-art/5146413-refrigerator-pixel-art and changed it from white to green in illustrator (same live paint technique) and modified it further for the half opened and opened images.
  * GreenFridgeClosed.png
  * GreenFridgeHalfOpened.png
  * GreenFridgeOpened.png
  
## Walkthrough ##  
https://www.youtube.com/watch?v=OrQWdVzMFFA

## Coregameplay Summary
### Audio:
- Background Music Loops
- Sound Effects on time swapping and barking

### Visual:
- Character Animation Spritesheets
- Intro Cinematic MP4

### Motion:
- Player uses buttons to move left, right, and jump

### Progression:
- 3 Levels (6 scenes with 2 variations per level)

### Prefabs:
- Engine, Dog, Player, and UI

### Other:
- Dialogue.json for data driven progression (see below for better description)