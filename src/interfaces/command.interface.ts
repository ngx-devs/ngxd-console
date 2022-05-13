import { eCommandKey } from '../enums/command.enum';

export interface NgxdCommand {
  command: eCommandKey;
  title: string;
}

export interface MenuCommand {
  command: eCommandKey;
  when: string;
  group: "ngxd-console";
}
