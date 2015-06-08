describe('progenitor', function() {
  var Athlete, Runner, instance;

  require('../lib/index')();

  describe('.progeny', function() {
    var inheritedArgs;

    it('beforeAll', function() {
      Athlete = Object.progeny('Athlete', {
        init: function(name) { this.name = name; },
        say: function() { return 'I am Fit' },
        speak: function() { return 'I am an '+this.className+' named: '+this.name }
      }, function() {
        return {
          classMethods: {
            inherited: function() { inheritedArgs = arguments; },
            salute: function() { return 'Good day' },
            speak: function() { return 'I am a '+ this.className }
          }
        }
      });

      Runner = Athlete.progeny('Runner', function() {
        return {
          init: function(name, avgMile) { this.avgMile = avgMile; },
          say: function() {
            return this.super('say')+' and I run '+this.avgMile+' miles per day, and my name is '+this.name;
          },
          run: function() { return 'Going out to run'; }
        }
      }, {
        classMethods: {
          speak: function() { return this.super('speak')+ ' and I need '+this.store(); },
          store: function() { return 'Shoes'; }
        }
      });
    });

    it('should cache the class definition', function() {
      expect(Athlete).toBe(Object.progeny('Athlete'));
      expect(Runner).toBe(Object.progeny('Runner'));
    });

    it('should have the name of the class', function() {
      expect(Athlete.className).toBe('Athlete');
      expect(Runner.className).toBe('Runner');
    });

    it('should have the super class', function() {
      expect(Athlete.class).toBe(Object);
      expect(Runner.class).toBe(Athlete);
    });

    it('should have the base classMethods', function() {
      expect(Object.keys(Athlete.classMethods)).toEqual(['inherited', 'class', 'className', 'super', 'progeny', 'salute', 'speak']);
    });

    it('should have the sub classMethods', function() {
      expect(Object.keys(Runner.classMethods)).toEqual(['inherited', 'class', 'className', 'super', 'progeny', 'salute', 'speak', 'store']);
    });

    it('should have the base instanceMethods', function() {
      expect(Object.keys(Athlete.instanceMethods)).toEqual(['init', 'constructor', 'class', 'className', 'super', 'say', 'speak']);
    });

    it('should have the sub instanceMethods', function() {
      expect(Object.keys(Runner.instanceMethods)).toEqual(['init', 'constructor', 'class', 'className', 'super', 'say', 'speak', 'run']);
    });

    it('calls class methods', function() {
      expect(Athlete.salute()).toBe('Good day');
      expect(Athlete.speak()).toBe('I am a Athlete');

      expect(Runner.salute()).toBe('Good day');
      expect(Runner.store()).toBe('Shoes');
    });

    it('should have the superclass value', function() {
      expect(Runner.speak()).toBe('I am a Runner and I need Shoes');
    });

    it('should have inherited from athlete', function() {
      expect(inheritedArgs.length).toBe(1);
      expect(inheritedArgs[0]).toBe(Runner);
    });

    describe('.new', function() {
      var athlete, runner;

      beforeEach(function() {
        athlete = new Athlete('John');
        runner = new Runner('George', 5.5);
      });

      it('instance should have the name of the class', function() {
        expect(athlete.className).toBe('Athlete');
        expect(runner.className).toBe('Runner');
      });

      it('should have the class', function() {
        expect(athlete.class).toBe(Athlete);
        expect(runner.class).toBe(Runner);
      });

      it('calls instance methods', function() {
        expect(athlete.say()).toBe('I am Fit');
        expect(athlete.speak()).toBe('I am an Athlete named: John');

        expect(runner.say()).toBe('I am Fit and I run 5.5 miles per day, and my name is George');
        expect(runner.speak()).toBe('I am an Runner named: George');
        expect(runner.run()).toBe('Going out to run');
      });

      it('has the given values', function() {
        expect(athlete.name).toBe('John');
        expect(athlete.avgMile).toBeUndefined();

        expect(runner.name).toBe('George');
        expect(runner.avgMile).toBe(5.5);
      });
    });
  });
});
