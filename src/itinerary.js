(function exportItinerary() {
  class Itinerary {
    constructor(_ports) {
      this.ports = _ports;
      console.log(_ports);
    } 
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Itinerary;
  } else {
    window.Itinerary = Itinerary;
  }
}());  
