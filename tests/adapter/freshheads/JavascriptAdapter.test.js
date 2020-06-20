const { FreshheadsJavascriptAdapter } = require('../../../build/index');
const ProvidePlugin = require('webpack').ProvidePlugin;

describe('FreshheadsJavascriptAdapter', () => {
    describe('Without customn configuration', () => {
        it('should set the correct defaults', () => {
            const expectConfigFilePath = './babel.config.js';
            const adapter = new FreshheadsJavascriptAdapter({
                babelConfig: {
                    babelConfigurationFilePath: expectConfigFilePath,
                },
            });
            const webpackConfig = {};

            adapter.apply(webpackConfig, { env: 'dev' }, () => {});

            expect(webpackConfig).toHaveProperty('module.rules');
            expect(Array.isArray(webpackConfig.module.rules)).toBe(true);

            const rules = webpackConfig.module.rules;

            expect(rules).toHaveLength(1);

            const firstRule = rules[0];

            expect(firstRule).toHaveProperty('test');
            expect(firstRule).toHaveProperty('use');

            expect(Array.isArray(firstRule.use)).toBe(true);

            const firstRuleUse = firstRule.use;

            expect(firstRuleUse).toHaveLength(1);

            const firstRuleOnlyUse = firstRule.use[0];

            expect(firstRuleOnlyUse).toHaveProperty('loader', 'babel-loader');
            expect(firstRuleOnlyUse).toHaveProperty('options');

            const options = firstRuleOnlyUse.options;

            expect(options).toHaveProperty('configFile', expectConfigFilePath);
        });
    });

    describe('With custom configuration', () => {
        it('should set the correct defaults', () => {
            const expectedBabelConfigPath = './babel.config.js';
            const adapter = new FreshheadsJavascriptAdapter({
                babelConfig: {
                    include: ['./test', './anders'],
                    babelConfigurationFilePath: expectedBabelConfigPath,
                },
                jQuery: {
                    enabled: true,
                },
                typescript: true,
            });
            const webpackConfig = {};

            adapter.apply(webpackConfig, { env: 'dev' }, () => {});

            expect(webpackConfig).toHaveProperty('module.rules');
            expect(Array.isArray(webpackConfig.module.rules)).toBe(true);

            const rules = webpackConfig.module.rules;

            expect(rules).toHaveLength(1);

            const rule = rules[0];

            expect(rule).toHaveProperty('test');
            expect(rule).toHaveProperty('use');

            expect(Array.isArray(rule.use)).toBe(true);

            expect(rule.include).toHaveLength(2);

            const use = rule.use;

            expect(use).toHaveLength(1);

            const firstUse = rule.use[0];

            expect(firstUse).toHaveProperty('loader', 'babel-loader');
            expect(firstUse).toHaveProperty('options');

            const options = firstUse.options;

            expect(options).toHaveProperty(
                'configFile',
                expectedBabelConfigPath
            );

            const plugins = webpackConfig.plugins;

            expect(Array.isArray(plugins)).toBe(true);
            expect(plugins).toHaveLength(1);

            const onlyPlugin = plugins[0];

            expect(onlyPlugin).toBeInstanceOf(ProvidePlugin);
        });
    });

    describe('When done', () => {
        it("should call the 'next' callback", (done) => {
            const adapter = new FreshheadsJavascriptAdapter();

            const callback = () => {
                done();
            };

            adapter.apply({}, { env: 'production' }, callback);
        });
    });
});
