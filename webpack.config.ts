import {Configuration} from 'webpack';
import merge from 'webpack-merge';
import {appPart} from './webpack/app-part';
import {modePart} from './webpack/mode-part';

export default function(_env: any, {mode}: {mode: 'none' | 'development' | 'production'}) {
    // console.log(mode, _env);

    return merge<Configuration>(appPart(mode), modePart(mode));
}
