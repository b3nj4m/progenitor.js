var cache = require('../lib/cache');

describe('progeny cache', function() {
  describe('.get', function() {
    it('should return nothing', function() {
      expect(cache.get('FooBar')).toBeNull();
    });

    describe('when the class has been created', function() {
      var instance;

      beforeEach(function() {
        Object.progeny('FooBar', {
          say: function() { return 'hi' }
        });

        var FooBar = cache.get('FooBar');
        instance = new FooBar();
      });

      it('should have the class', function() {
        expect(cache.get('FooBar').className).toBe('FooBar');
      });

      it('should have the object', function() {
        console.log(cache.get('FooBar')());
        expect(instance.say()).toBe('hi');
        expect(instance.className).toBe('FooBar');
        expect(instance.class.className).toBe('FooBar');
      });
    });
  });
});

