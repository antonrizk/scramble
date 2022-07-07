/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/
// array for the words
const words = [
  'design',
  'computer',
  'gnosis',
  'scramble',
  'required',
  'wireless',
  'planner',
  'discombobulated',
  'supercalifragilisticexpialidocious'
]



const app = Vue.createApp({
  data: function (){
    return {
      maxGuess: 3,
      maxPass: 3,
      game: {
      guess: '',
      words: words,
      active: true,
      points: 0,
      strikes: 0,
      


    }
    }
  },
// start the game
  created: function (){
    const game = localStorage.getItem('game')
    if (game){
      this.game = JSON.parse(game)
    }
  },

  // Gets word and shuffles it
  computed: {
    // this gets the word from the array
    word: function () {
      return this.game.words[0]
    },
    // this gets the word from the word func and uses the shuffle function to shuffle it
    scrambled: function (){
      return shuffle(this.word)
    }
  },
  // 
  methods: {
    verifyGuess: function(){
      if (this.word === this.game.guess.toLowerCase()){
        this.game.points++
        // when gues is correct display new word. 
        this.game.words.shift()
        this.game.guess = ''
      }
      else{
        this.game.strikes++
        // this.game.words.shift()
        this.game.guess = ''
        
      }
    },

    // for when user clicks on pass btn

    pass: function () {
      if (this.maxPass){
        this.maxPass--
        this.game.strikes++
        this.game.words.shift()
      }
      else{
        this.restart()
      }
    },

    // restart game
    restart: function () {
      this.game.active = false
      this.game.guess = ''
      this.game.points = 0
      this.game.strikes = 0 
      this.maxPass = 3

    }
  },


  // watch
  watch: {
    game: {
      deep: true,
      handler: function (game) {
        localStorage.setItem('game', JSON.stringify(game))
      }
    }
  }
})

const vm = app.mount('#app')