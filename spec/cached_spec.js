describe('progeny cache', function() {
  describe('[]', function() {
    it('should return nothing', function() {
      expect(Object.progeny.cache['FooBar']).toBeUndefined();
    });

    describe('when the class has been created', function() {
      var instance;

      beforeEach(function() {
        Object.progeny('FooBar', {
          say: function() { return 'hi' }
        });

        var FooBar = Object.progeny.cache['FooBar'];
        instance = new FooBar();
      });

      it('should have the class', function() {
        expect(Object.progeny.cache['FooBar'].className).toBe('FooBar');
      });

      it('should have the object', function() {
        expect(instance.say()).toBe('hi');
        expect(instance.className).toBe('FooBar');
        expect(instance.class.className).toBe('FooBar');
      });
    });
  });
});

