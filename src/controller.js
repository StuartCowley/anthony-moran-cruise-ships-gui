(function exportController() {
  class Controller {
        constructor(_ship) {
          this.ship = _ship;
          this.initialiseSea();
          this.createHeadUpDisplay();
          this.updateHeadUpDisplay();

          document.querySelector('#sailbutton').addEventListener('click', () => {
            this.setSail();
          });
        }

        createHeadUpDisplay() {
          const headUpDisplay = document.createElement('div');
          headUpDisplay.id = 'headupdisplay';
          headUpDisplay.innerHTML = 
            `<div id='currentport'></div>
            <div id='nextport'></div>`;
          document.querySelector('#viewport').appendChild(headUpDisplay);
        }

        updateHeadUpDisplay() {
          const currentPort = document.querySelector('#currentport');
          currentPort.innerHTML = `Current Port: ${this.ship.currentPort.name}`;
          
          const nextPort = document.querySelector('#nextport');
          
          if (this.ship.itinerary.ports.indexOf(this.ship.currentPort) === this.ship.itinerary.ports.length - 1) {
            nextPort.innerHTML = "Next Port: End of Cruise, Goodbye!";
          } else {
            nextPort.innerHTML = `Next Port: ${this.ship.itinerary.ports[this.ship.itinerary.ports.indexOf(this.ship.currentPort) + 1].name}`;
          }
        }        
        
        initialiseSea() {
          const backgrounds = [
              './images/water0.png',
              './images/water1.png',
          ];
          let backgroundIndex = 0;
          window.setInterval(() => {
              document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
              backgroundIndex += 1;
              console.log("Interval Count");
          }, 1000);
        }

        renderShip() {
          const shipPortIndex = ship.itinerary.ports.indexOf(this.ship.currentPort);
          const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`); 
        
          const shipElement = document.querySelector('#ship');
          shipElement.style.top = `${portElement.offsetTop - 60}px`;
          shipElement.style.left = `${portElement.offsetLeft - 32}px`;
        }

        renderPorts() {
          let portsElement = document.querySelector('#ports');
          portsElement.style.width = '0px';
        
          if (portsElement.hasChildNodes()){ 
            while (portsElement.firstChild) {
              portsElement.removeChild(portsElement.firstChild);
            }
          }
            if(this.ship.itinerary.ports.length > 0){
            
            this.ship.itinerary.ports.forEach((_port, _index) => {
              const newPortElement = document.createElement('div');
              newPortElement.className = 'port';
              newPortElement.dataset.portName = _port.name;
              newPortElement.dataset.portIndex = _index;

              portsElement.appendChild(newPortElement);
              const portsElementWidth = parseInt(portsElement.style.width, 10);
              portsElement.style.width = `${portsElementWidth + 256}px`;
            });
          }
        }

        renderMessage(_message) {
          const messageElement = document.createElement("div");
          messageElement.id = "message";
          messageElement.innerHTML = _message;
    
          const viewport = document.querySelector("#viewport");
          viewport.appendChild(messageElement);
          
          setTimeout(() => {
            viewport.removeChild(messageElement);
          }, 2000);
        }
        
        setSail() {
          console.log("setSail")
          this.ship = ship;
          const currentPortIndex = this.ship.itinerary.ports.indexOf(this.ship.currentPort);
          console.log(currentPortIndex, "currentPortIndex");

          const nextPortIndex = currentPortIndex + 1;
          console.log(nextPortIndex, "NextPortIndex");

          const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`); 
          console.log(nextPortElement, "nextPortElement");

          if (!nextPortElement) {
            return this.renderMessage("End of Cruise, Goodbye!");
          }
          
        this.renderMessage(`Now departing ${ship.currentPort.name}`);
        const shipElement = document.querySelector('#ship');

        const portPosition = nextPortElement.offsetLeft;
        let shipPosition = shipElement.offsetLeft;
             
        ship.setSail();
          const sailInterval = setInterval(() => {
            if (shipPosition === portPosition - 32) {
              clearInterval(sailInterval);
              this.updateHeadUpDisplay();
            }

            shipElement.style.left = `${shipPosition + 1}px`;
            shipPosition += 1;
          }, 10);
          
        ship.shipDock();
        setTimeout(() => {
          this.renderMessage(
            `Now arriving at ${this.ship.itinerary.ports[nextPortIndex].name}`
          );
        }, 2000);
      }
    }
  
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = Controller;
      } else {
        window.Controller = Controller;
      }
}());
