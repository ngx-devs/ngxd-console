"use strict";
exports.__esModule = true;
exports.menusFactory = void 0;
function menusFactory(commands) {
    var menus = commands.map(function (_a) {
        var command = _a.command;
        return {
            command: command,
            when: "explorerResourceIsFolder",
            group: "ngxd-console"
        };
    });
    return {
        "explorer/context": menus
    };
}
exports.menusFactory = menusFactory;
