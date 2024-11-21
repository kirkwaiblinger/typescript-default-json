import staticDefault from './jsonModule.json';
import * as staticNamespace from './jsonModule.json';

async function main() {
    staticDefault satisfies { "foo": string };
    console.log('contents of JSON module when statically imported', staticDefault)

    staticNamespace satisfies { "foo": string };
    console.log('contents of JSON module when statically namespace imported', staticNamespace);

    // ts-node catches this, but node on the built output does not :shrug:
    try {
        // @ts-expect-error 
        const jsonModuleDynamicImport: { "foo": string } = await import('./jsonModule.json');
        console.log('contents of JSON module when `await import`ing', jsonModuleDynamicImport)

    } catch (e) {
        console.error('error when `await import`ing', e)
    }

    
    // @ts-expect-error
    const jsonModuleDynamicImport: { "foo": string } = await import('./jsonModule.json', { assert: { type: 'json' } });
    console.log('contents of JSON module when `await import`ing with assert', jsonModuleDynamicImport)

    const jsonModuleDynamicDefault: { "foo": string } = (await import('./jsonModule.json', { assert: { type: 'json' } })).default;
    console.log('contents of JSON module default when `await import`ing with assert', jsonModuleDynamicDefault)

    const jsonModuleRequired: { "foo": string } = require('./jsonModule.json');
    console.log('contents of JSON module when `require`ing', jsonModuleRequired)
}

main();

export {}