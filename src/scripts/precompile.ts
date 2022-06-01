import { eCommandKey } from '../enums/command.enum';
import { menusFactory } from '../functions/menu-factory.function';
import { NgxdCommand } from '../interfaces/command.interface';

const COMMANDS: NgxdCommand[] = [
  {
    command: eCommandKey.GENERATE_ENTITY,
    title: "Ngxd: Generate Entity",
  },
  {
    command: eCommandKey.GENERATE_COMPONENT,
    title: "Ngxd: Generate Component",
  },
  {
    command: eCommandKey.GENERATE_SERVICE,
    title: "Ngxd: Generate Service",
  },
];

(async function main() {
  const npmCliPackageJson = require("@npmcli/package-json");
  const pkgJson = await npmCliPackageJson.load("./");

  pkgJson.update({
    contributes: {
      commands: COMMANDS,
      menus: menusFactory(COMMANDS),
    },
  });

  await pkgJson.save();
})();
