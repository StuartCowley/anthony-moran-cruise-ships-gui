(function exportPort() {
  class Port {
    constructor(_name) {
      this.name = _name;
      this.ships = [];
    }
  
    addShip(_ship) {
      this.ships.push(_ship);
    }

    removeShip(_ship) {
      this.ships = this.ships.filter(dockedShip => dockedShip !== _ship);
      console.log(_ship);
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Port;
  } else {
    window.Port = Port;
  }
})();
