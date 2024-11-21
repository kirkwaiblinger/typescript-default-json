import staticDefaultImport from '../src/jsonModule.json';
import * as staticNamespaceImport from '../src/jsonModule.json';


describe('the test suite', () => {
    it('should equal foobar when dynamic importing', async () => {
        // @ts-expect-error -- this is the runtime behavior but TS doesn't let me write it
        const jsonModuleDynamicImport: { "foo": string } = await import('../src/jsonModule.json');
        expect(jsonModuleDynamicImport).toEqual({ "foo": "bar" });
    })

    it('should equal default: foobar when dynamic importing', async () => {
        // this is not the runtime behavior. this test fails.
        const jsonModuleDynamicImport: { "foo": string } = (await import('../src/jsonModule.json')).default;
        expect(jsonModuleDynamicImport).toEqual({ "foo": "bar" });
    })

    it('should equal foobar when requiring', () => {
        const jsonModuleRequired: { "foo": string } = require('../src/jsonModule.json');
        expect(jsonModuleRequired).toEqual({ "foo": "bar" });
    })

    it('should be typed correctly as a static default import', () => {
        // this is undefined at runtime??
        staticDefaultImport satisfies { "foo": string };
        expect(staticDefaultImport).toEqual({ "foo": "bar" });
    })

    it('should be typed correctly as a static namespace import', () => {
        staticNamespaceImport satisfies { "foo": string };
        expect(staticNamespaceImport).toEqual({ "foo": "bar" });
    })
})