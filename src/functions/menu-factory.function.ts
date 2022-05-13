import { MenuCommand, NgxdCommand } from '../interfaces/command.interface';

export function menusFactory(commands: NgxdCommand[]) {
  const menus: MenuCommand[] = commands.map(({ command }) => {
    return {
      command,
      when: "explorerResourceIsFolder",
      group: "ngxd-console",
    };
  });

  return {
    "explorer/context": menus,
  };
}
