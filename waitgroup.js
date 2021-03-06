// Copyright (c) 2012 Sam Nguyen <samxnguyen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function(){
var WaitGroup = function(){
    this.counter = null;
};

function WaitGroupException(message) {
   // Equivalent to 60x/second
   this.TIMEOUT_DURATION = 16.6667;
   this.message = message;
   this.name = "WaitGroupException";
}

WaitGroup.prototype.add = function WaitGroupAdd(){
    this.counter++;
};

WaitGroup.prototype.done = function WaitGroupDone(){
    this.counter--;
    if (this.counter && this.counter < 0) {
        throw new WaitGroupException("WaitGroup negative counter");
    }
};

WaitGroup.prototype.wait = function(fn) {
  var self = this;
  if (self.counter === 0) {
    return fn();
  }
  if (window && window.requestAnimationFrame) {
    window.requestAnimationFrame(function() {
      self.wait(fn); 
    });
    return;
  }
  setTimeout(function() {
    self.wait(fn);
  }, this.TIMEOUT_DURATION);
};

// Export to node.js
if(typeof(module) !== "undefined") {
    module.exports = WaitGroup;
}
// Export to browser
else {
    window.WaitGroup = WaitGroup;
}

})();
