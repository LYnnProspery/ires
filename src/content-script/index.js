import ConfManager from './confManager';
import Lisenter from './listener';
import { injector } from './injector';

injector();

// Listen msg between injects_scripts and content_scripts
const listener = new Lisenter();
new ConfManager(listener);