class JuejinFrontendEnginnerSpecification implements Specification {
  isSatisfiedBy (person) {
    return person.isInteresting() && person.canWriteBUG()
  }
}

class JuejinFrontendEnginner extends FrontendEngineer {
  constructor (person) {
    super(person)
    this.thingList = [
      'ES6+',
      'Node.js v8+',
      'Vue.js v2+',
      'SSR',
      'Chrome (Extension|Headless)',
      'Weixin',
      'Docker',
      'rm -rf /',
      'escape'
    ]
  }
  doSomeInterestingThings () {
    this.thingList.forEach(this.tryToPlay.bind(this))
  }
}

const juejinFrontendEnginnerSpecification = new JuejinFrontendEnginnerSpecification()

if (juejinFrontendEnginnerSpecification.isSatisfiedBy(you)) {
  new JuejinFrontendEnginner(you).doSomeInterestingThings()
}

