// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This implements a very limited version of Node's internal util/colors.js.
// We do this to get the functionality for logging without needing to pull
// in third party dependencies.
//
// https://github.com/nodejs/node/blob/73414f34e8f3e1f4dac3bb35e137c4030afb4267/lib/internal/util/colors.js#L9

import * as tty from 'tty';

/**
 * Handles figuring out if we can use ANSI colours and handing out the escape codes.
 *
 * This is for package-internal use only, and may change at any time.
 *
 * @private
 * @internal
 */
export class Colours {
  static enabled = false;
  static reset = '';
  static bright = '';
  static dim = '';

  static red = '';
  static green = '';
  static yellow = '';
  static blue = '';
  static magenta = '';
  static cyan = '';
  static white = '';
  static grey = '';

  /**
   * @param stream The stream (e.g. process.stderr)
   * @returns true if the stream should have colourization enabled
   */
  static isEnabled(stream: tty.WriteStream): boolean {
    return (
      stream.isTTY &&
      (typeof stream.getColorDepth === 'function'
        ? stream.getColorDepth() > 2
        : true)
    );
  }

  static refresh(): void {
    Colours.enabled = Colours.isEnabled(process.stderr);
    if (!this.enabled) {
      Colours.reset = '';
      Colours.bright = '';
      Colours.dim = '';
      Colours.red = '';
      Colours.green = '';
      Colours.yellow = '';
      Colours.blue = '';
      Colours.magenta = '';
      Colours.cyan = '';
      Colours.white = '';
      Colours.grey = '';
    } else {
      Colours.reset = '\u001b[0m';
      Colours.bright = '\u001b[1m';
      Colours.dim = '\u001b[2m';
      Colours.red = '\u001b[31m';
      Colours.green = '\u001b[32m';
      Colours.yellow = '\u001b[33m';
      Colours.blue = '\u001b[34m';
      Colours.magenta = '\u001b[35m';
      Colours.cyan = '\u001b[36m';
      Colours.white = '\u001b[37m';
      Colours.grey = '\u001b[90m';
    }
  }
}

Colours.refresh();