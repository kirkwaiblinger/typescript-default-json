import staticDefaultImport from '../src/jsonModule.json';
import * as staticNamespaceImport from '../src/jsonModule.json';


describe('the test suite', () => {
    it('should equal foobar when dynamic importing', async () => {
        // this test passes even though it's not technically expected by the types.
        // it's just to illustrate what's really happening.
        // @ts-expect-error 
        const jsonModuleDynamicImport: { "foo": string } = await import('../src/jsonModule.json');
        expect(jsonModuleDynamicImport).toEqual({ "foo": "bar", "default": { "foo": "bar" } });
    })

    it('should equal default: foobar when dynamic importing', async () => {
        // this is correct runtime behavior! (although maybe it should have an import attribute?)
        const jsonModuleDynamicImport: { "foo": string } = (await import('../src/jsonModule.json')).default;
        expect(jsonModuleDynamicImport).toEqual({ "foo": "bar" });
    })

    it('should equal foobar when requiring', () => {
        // this is correct runtime behavior!
        const jsonModuleRequired: { "foo": string } = require('../src/jsonModule.json');
        expect(jsonModuleRequired).toEqual({ "foo": "bar" });
    })

    it('should be typed correctly as a static default import', () => {
        staticDefaultImport satisfies { "foo": string };
        expect(staticDefaultImport).toEqual({ "foo": "bar" });
    })

    it('should be typed correctly as a static namespace import', () => {
        // This test fails. I think that maybe TS gives the wrong types here? 
        // This test probably shouldn't pass? Depending on esModuleInterop/allowSyntheticDefaultImports?
        // I'm not sure.
        staticNamespaceImport satisfies { "foo": string };
        expect(staticNamespaceImport).toEqual({ "foo": "bar" });
    })
})