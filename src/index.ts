import staticDefault from './jsonModule.json';
import * as staticNamespace from './jsonModule.json';

async function main() {
    // apparently both of the following seem to match their runtime behavior.
    // which is recommended?
    staticDefault satisfies { "foo": string };
    console.log('contents of JSON module when statically imported', staticDefault)

    staticNamespace satisfies { "foo": string };
    console.log('contents of JSON module when statically namespace imported', staticNamespace);

    // ts-node catches this, but node on the built output does not :shrug:
    try {
        // @ts-expect-error -- TS is complaining of a type error, but node gives a runtime error about the import assertion missing.
        const jsonModuleDynamicImport: { "foo": string } = await import('./jsonModule.json');
        console.log('contents of JSON module when `await import`ing', jsonModuleDynamicImport)

    } catch (e) {
        console.error('error when `await import`ing', e)
    }

    
    // @ts-expect-error -- TS is apparently right to error here; the actual object has a .default.
    const jsonModuleDynamicImport: { "foo": string } = await import('./jsonModule.json', { assert: { type: 'json' } });
    console.log('contents of JSON module when `await import`ing with assert', jsonModuleDynamicImport)

    const jsonModuleDynamicDefault: { "foo": string } = (await import('./jsonModule.json', { assert: { type: 'json' } })).default;
    console.log('contents of JSON module .default when `await import`ing with assert', jsonModuleDynamicDefault)

    // this is all just `any`script, but it works.
    const jsonModuleRequired: { "foo": string } = require('./jsonModule.json');
    console.log('contents of JSON module when `require`ing', jsonModuleRequired)
}

main();

export {}