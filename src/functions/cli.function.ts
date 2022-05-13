import { PluginManager } from 'live-plugin-manager';
import * as vscode from 'vscode';

import { CLI_PACKAGE_NAME, eMessage, ePromptAnswer } from '../enums/message.enum';
import { execShell } from './exec-shell.function';

export const getInstalledVersion = async () => {
  try {
    const result = await execShell("ngxd --version");
    const matches = result.match(/(\d\.\d\.\d)/);
    if (!matches) return "";
    const version = matches[0];
    return version;
  } catch (e) {
    return "";
  }
};

export const installCliIfNotInstalled = async () => {
  const cliInstalledVersion = await getInstalledVersion();
  if (!cliInstalledVersion) return installCLI(eMessage.SHOULD_INSTALL_CLI);

  const manager = new PluginManager();
  const ngxdCliLatestVersion = (await manager.queryPackageFromNpm(CLI_PACKAGE_NAME)).version;

  const isCLIVersionUpToDate = cliInstalledVersion === ngxdCliLatestVersion;
  if (isCLIVersionUpToDate) return;

  await installCLI(eMessage.CLI_OUTDATED);
};

async function installCLI(message: string) {
  const response = await vscode.window.showInformationMessage(message, ePromptAnswer.YES, ePromptAnswer.NO);

  if (response === ePromptAnswer.NO) {
    return vscode.window.showErrorMessage(eMessage.CLI_REQUIRED);
  }

  await execShell(`npm i -g ${CLI_PACKAGE_NAME}@latest`);
  vscode.window.showInformationMessage(eMessage.CLI_INSTALLED);
}
