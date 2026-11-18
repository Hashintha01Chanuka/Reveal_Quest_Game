import { Howl } from "howler"

export const sounds = {
  click: new Howl({
    src: ["https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"],
    volume: 0.5,
  }),
  correct: new Howl({
    src: ["https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3"],
    volume: 0.6,
  }),
  wrong: new Howl({
    src: ["https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3"],
    volume: 0.6,
  }),
  win: new Howl({
    src: ["https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3"],
    volume: 0.8,
  }),
  gameover: new Howl({
    src: ["https://assets.mixkit.co/active_storage/sfx/2332/2332-preview.mp3"],
    volume: 0.8,
  }),
}

export const playSound = (soundName) => {
  if (sounds[soundName]) {
    sounds[soundName].play()
  }
}
