import config from '../../config/index.js';
import { COMMAND_DEACTIVATE } from '../../constants/command.js';
import { SETTING_AI_ACTIVATED } from '../../constants/setting.js';
import storage from '../../storage/index.js';
import Context from '../context.js';

/**
 * @param {Context} context
 * @returns {boolean}
 */
const isDeactivateCommand = (context) => context.isCommand(COMMAND_DEACTIVATE);

/**
 * @param {Context} context
 * @returns {Promise<Context>}
 */
const execDeactivateCommand = async (context) => {
  if (!config.VERCEL_ACCESS_TOKEN) context.pushText('Missing environment variable: VERCEL_ACCESS_TOKEN');
  try {
    await storage.setItem(SETTING_AI_ACTIVATED, false);
    context.pushText(COMMAND_DEACTIVATE.reply);
  } catch (err) {
    context.pushError(err);
  }
  return context;
};

export {
  isDeactivateCommand,
  execDeactivateCommand,
};
