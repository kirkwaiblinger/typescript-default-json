import * as mainModule from '../src/index';

jest.spyOn(mainModule, 'helloFromMain').mockImplementation((() => 'intercepted!'));

export {}