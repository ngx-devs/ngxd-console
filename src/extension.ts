import * as vscode from 'vscode';

import { generateComponent } from './commands/generate-component.function';
import { generateEntity } from './commands/generate-entity.function';
import { generateService } from './commands/generate-service.function';
import { eCommandKey } from './enums/command.enum';
import { eMessage } from './enums/message.enum';
import { installCliIfNotInstalled } from './functions/cli.function';

export async function activate(context: vscode.ExtensionContext) {
  await installCliIfNotInstalled();
  console.info(eMessage.EXTENSION_ACTIVATED);

  const commands = [
    {
      command: eCommandKey.GENERATE_COMPONENT,
      callback: generateComponent,
    },
    {
      command: eCommandKey.GENERATE_SERVICE,
      callback: generateService,
    },
    {
      command: eCommandKey.GENERATE_ENTITY,
      callback: generateEntity,
    },
  ];

  const disposables = commands.map(({ command, callback }) => vscode.commands.registerCommand(command, callback));
  context.subscriptions.push(...disposables);
}

export function deactivate() {
  console.info(eMessage.EXTENSION_DEACTIVATED);
}
