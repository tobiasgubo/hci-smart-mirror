const InputEvent = require('input-event');

function init() {
    const input = new InputEvent('/dev/input/event0');

    const keyboard = new InputEvent.Keyboard(input);

    keyboard.on('keyup', console.log);
    keyboard.on('keydown', console.log);
    keyboard.on('keypress', console.log);
}

const KeyInputService = {
    init
};

module.exports = KeyInputService;