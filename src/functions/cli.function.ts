import { PluginManager } from 'live-plugin-manager';
import * as vscode from 'vscode';

import { CLI_PACKAGE_NAME, eMessage, ePromptAnswer } from '../enums/message.enum';
import { execShell } from './exec-shell.function';

export const getInstalledVersion = async () => {
  try {
    const globalPackages = await execShell("npm list -g");
    const cliVersion = globalPackages
      .split("\n")
      .find((line) => line.includes(CLI_PACKAGE_NAME))
      ?.split("@ngx-devs/cli@")
      .reverse()[0];

    return cliVersion;
  } catch (e) {
    console.error(e);
  }
};

export const installCliIfNotInstalled = async () => {
  const cliInstalledVersion = await getInstalledVersion();

  if (!cliInstalledVersion) return installCLI(eMessage.SHOULD_INSTALL_CLI);

  const manager = new PluginManager();
  const ngxdCliLatestVersion = (await manager.queryPackageFromNpm(CLI_PACKAGE_NAME)).version;

  console.info(`ngxd CLI installed version: ${cliInstalledVersion}`);
  console.info(`ngxd CLI latest version: ${ngxdCliLatestVersion}`);

  const isCLIVersionUpToDate = cliInstalledVersion === ngxdCliLatestVersion;
  if (isCLIVersionUpToDate) return;

  await installCLI(
    `Your CLI version is out of date. Do you want to update version from ${cliInstalledVersion} to ${ngxdCliLatestVersion}?`
  );
};

async function installCLI(message: string) {
  const response = await vscode.window.showInformationMessage(message, ePromptAnswer.YES, ePromptAnswer.NO);

  if (response === ePromptAnswer.NO) {
    return vscode.window.showErrorMessage(eMessage.CLI_REQUIRED);
  }

  await execShell(`npm i -g ${CLI_PACKAGE_NAME}@latest`);
  vscode.window.showInformationMessage(eMessage.CLI_INSTALLED);
}
