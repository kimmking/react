/**
 * Copyright 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails react-core
 */

'use strict';

var React;
var ReactFragment;

describe('ReactFragment', function() {

  beforeEach(function() {
    React = require('React');
    ReactFragment = require('ReactFragment');
  });

  it('should warn if a plain object is used as a child', function() {
    spyOn(console, 'warn');
    var children = {
      x: <span />,
      y: <span />
    };
    <div>{children}</div>;
    expect(console.warn.calls.length).toBe(1);
    expect(console.warn.calls[0].args[0]).toContain(
      'Any use of a keyed object'
    );
    // Only warn once for the same set of children
    var sameChildren = {
      x: <span />,
      y: <span />
    };
    <div>{sameChildren}</div>;
    expect(console.warn.calls.length).toBe(1);
  });

  it('should warn if a plain object even if it is deep', function() {
    spyOn(console, 'warn');
    var children = {
      x: <span />,
      y: <span />,
      z: <span />
    };
    var element = <div>{[children]}</div>;
    expect(console.warn.calls.length).toBe(0);
    var container = document.createElement('div');
    React.render(element, container);
    expect(console.warn.calls.length).toBe(1);
    expect(console.warn.calls[0].args[0]).toContain(
      'Any use of a keyed object'
    );
  });

  it('should warn if accessing any property on a fragment', function() {
    spyOn(console, 'warn');
    var children = {
      x: <span />,
      y: <span />
    };
    var frag = ReactFragment.create(children);
    frag.x;
    frag.y = 10;
    expect(console.warn.calls.length).toBe(1);
    expect(console.warn.calls[0].args[0]).toContain(
      'A ReactFragment is an opaque type'
    );
  });

});
