const ShipComponentsBanner = require('../');

describe('ShipComponentsBanner', () => {

  it('should return string containing the package name', function () {
    var banner = new ShipComponentsBanner().build();
    expect(banner).toBeDefined();
    expect(typeof 'banner').toBe('string');
    expect(banner).toMatch(/ship-components-banner/);
  });

});
