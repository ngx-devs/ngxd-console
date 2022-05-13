import * as vscode from 'vscode';

import { generateComponent } from './commands/generate-component.function';
import { eCommandKey } from './enums/command.enum';
import { eMessage } from './enums/message.enum';
import { installCliIfNotInstalled } from './functions/cli.function';

export async function activate(context: vscode.ExtensionContext) {
  await installCliIfNotInstalled();
  console.info(eMessage.EXTENSION_ACTIVATED);

  const generateComponentDisposable = vscode.commands.registerCommand(
    eCommandKey.GENERATE_COMPONENT,
    generateComponent
  );

  context.subscriptions.push(generateComponentDisposable);
}

export function deactivate() {
  console.info(eMessage.EXTENSION_DEACTIVATED);
}
