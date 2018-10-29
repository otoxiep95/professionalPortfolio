"use strict";
import Swupjs from "swupjs";
const swupjs = new Swupjs(options);

let options = {
  animations: {
    "*": {
      in: function(next) {
        document.querySelector("#swup").style.opacity = 1;
        anime({
          targets: "#swup",
          opacity: 0,
          duration: 10000,
          complete: next
        });
      },
      out: function(next) {
        document.querySelector("#swup").style.opacity = 1;
        anime({
          targets: "#swup",
          opacity: 0,
          duration: 10000,
          complete: next
        });
      }
    }
  }
};
