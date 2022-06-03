export enum eMessage {
  CLI_INSTALLED = "@ngx-devs/cli installed successfully",
  CLI_REQUIRED = "@ngx-devs/cli is required to run this extension",
  SHOULD_INSTALL_CLI = "@ngx-devs/cli is not installed do you want to install?",
  EXTENSION_ACTIVATED = 'Congratulations, your extension "ngxd-console" is now active!',
  EXTENSION_DEACTIVATED = "ngxd-console is now deactivated!",
}

export enum ePromptAnswer {
  YES = "Yes",
  NO = "No",
}

export const CLI_PACKAGE_NAME = "@ngx-devs/cli";
